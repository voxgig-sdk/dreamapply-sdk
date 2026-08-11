package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/dreamapply-sdk/go"
	"github.com/voxgig-sdk/dreamapply-sdk/go/core"

	vs "github.com/voxgig-sdk/dreamapply-sdk/go/utility/struct"
)

func TestApplicantEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Applicant(nil)
		if ent == nil {
			t.Fatal("expected non-nil ApplicantEntity")
		}
	})

	// Feature #4: the entity Stream(action, ...) method runs the op pipeline and
	// returns a channel over result items. With the streaming feature active it
	// yields the feature's incremental output; otherwise it falls back to the
	// materialised list so Stream always yields.
	t.Run("stream", func(t *testing.T) {
		seed := map[string]any{
			"entity": map[string]any{
				"applicant": map[string]any{
					"s1": map[string]any{"id": "s1"},
					"s2": map[string]any{"id": "s2"},
					"s3": map[string]any{"id": "s3"},
				},
			},
		}

		// Fallback: streaming inactive -> yields the materialised list items.
		base := sdk.TestSDK(seed, nil)
		var seen []any
		for item := range base.Applicant(nil).Stream("list", nil, nil) {
			seen = append(seen, item)
		}
		if len(seen) != 3 {
			t.Fatalf("expected 3 streamed items, got %d", len(seen))
		}

		// Inbound: streaming active -> yields each item from the feature iterator.
		hasStreaming := false
		if fm, ok := core.MakeConfig()["feature"].(map[string]any); ok {
			_, hasStreaming = fm["streaming"]
		}
		if hasStreaming {
			streamSdk := sdk.TestSDK(seed, map[string]any{
				"feature": map[string]any{"streaming": map[string]any{"active": true}},
			})
			var got []any
			for item := range streamSdk.Applicant(nil).Stream("list", nil, nil) {
				if sub, ok := item.([]any); ok {
					got = append(got, sub...)
				} else {
					got = append(got, item)
				}
			}
			if len(got) != 3 {
				t.Fatalf("expected 3 items via streaming feature, got %d", len(got))
			}
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := applicantBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "applicant." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set DREAMAPPLY_TEST_APPLICANT_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		applicantRef01Ent := client.Applicant(nil)
		applicantRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath([]any{"new", "applicant"}, setup.data), "applicant_ref01"))

		applicantRef01DataResult, err := applicantRef01Ent.Create(applicantRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		applicantRef01Data = core.ToMapAny(applicantRef01DataResult)
		if applicantRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if applicantRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		// LIST
		applicantRef01Match := map[string]any{}

		applicantRef01ListResult, err := applicantRef01Ent.List(applicantRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		applicantRef01List, applicantRef01ListOk := applicantRef01ListResult.([]any)
		if !applicantRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", applicantRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(applicantRef01List), map[string]any{"id": applicantRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		// LOAD
		applicantRef01MatchDt0 := map[string]any{
			"id": applicantRef01Data["id"],
		}
		applicantRef01DataDt0Loaded, err := applicantRef01Ent.Load(applicantRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		applicantRef01DataDt0LoadResult := core.ToMapAny(applicantRef01DataDt0Loaded)
		if applicantRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if applicantRef01DataDt0LoadResult["id"] != applicantRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

	})
}

func applicantBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "applicant", "ApplicantTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read applicant test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse applicant test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"applicant01", "applicant02", "applicant03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("DREAMAPPLY_TEST_APPLICANT_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"DREAMAPPLY_TEST_APPLICANT_ENTID": idmap,
		"DREAMAPPLY_TEST_LIVE":      "FALSE",
		"DREAMAPPLY_TEST_EXPLAIN":   "FALSE",
		"DREAMAPPLY_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["DREAMAPPLY_TEST_APPLICANT_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["DREAMAPPLY_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["DREAMAPPLY_APIKEY"],
			},
			extra,
		})
		client = sdk.NewDreamapplySDK(core.ToMapAny(mergedOpts))
	}

	live := env["DREAMAPPLY_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["DREAMAPPLY_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
