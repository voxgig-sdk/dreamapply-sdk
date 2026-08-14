# Fee entity test

import json
import os
import time

import pytest

from dreamapply_sdk.utility.voxgig_struct import voxgig_struct as vs
from dreamapply_sdk import DreamapplySDK
from dreamapply_sdk.core import helpers

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner


class TestFeeEntity:

    def test_should_create_instance(self):
        testsdk = DreamapplySDK.test(None, None)
        ent = testsdk.Fee(None)
        assert ent is not None

    def test_should_stream(self):
        # Feature #4: the entity stream(action, ...) method runs the op
        # pipeline and yields result items. With the streaming feature active
        # it yields the feature's incremental output; otherwise it falls back
        # to the materialised list so stream always yields.
        seed = {
            "entity": {
                "fee": {
                    "s1": {"id": "s1"},
                    "s2": {"id": "s2"},
                    "s3": {"id": "s3"},
                }
            }
        }

        # Fallback: streaming inactive -> yields the materialised list items.
        base = DreamapplySDK.test(seed, None)
        seen = list(base.Fee(None).stream("list", None, None))
        assert len(seen) == 3

        # Inbound: streaming active -> yields each item from the feature.
        from dreamapply_sdk.config import shared_config
        cfg = shared_config()
        if isinstance(cfg.get("feature"), dict) and "streaming" in cfg["feature"]:
            sdk = DreamapplySDK.test(
                seed, {"feature": {"streaming": {"active": True}}})
            got = []
            for item in sdk.Fee(None).stream("list", None, None):
                if isinstance(item, list):
                    got.extend(item)
                else:
                    got.append(item)
            assert len(got) == 3

    def test_should_run_basic_flow(self):
        setup = _fee_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["list", "load"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "fee." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        # The basic flow consumes synthetic IDs from the fixture. In live mode
        # without an *_ENTID env override, those IDs hit the live API and 4xx.
        if setup.get("synthetic_only"):
            pytest.skip("live entity test uses synthetic IDs from fixture — "
                        "set DREAMAPPLY_TEST_FEE_ENTID JSON to run live")
        client = setup["client"]

        # Bootstrap entity data from existing test data.
        fee_ref01_data_raw = vs.items(helpers.to_map(
            vs.getpath(setup["data"], "existing.fee")))
        fee_ref01_data = None
        if len(fee_ref01_data_raw) > 0:
            fee_ref01_data = helpers.to_map(fee_ref01_data_raw[0][1])

        # LIST
        fee_ref01_ent = client.Fee(None)
        fee_ref01_match = {}

        fee_ref01_list_result = fee_ref01_ent.list(fee_ref01_match, None)
        assert isinstance(fee_ref01_list_result, list)

        # LOAD
        fee_ref01_match_dt0 = {}
        fee_ref01_data_dt0_loaded = fee_ref01_ent.load(fee_ref01_match_dt0, None)
        assert fee_ref01_data_dt0_loaded is not None



def _fee_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/fee/FeeTestData.json")
    with open(entity_data_file, "r") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = DreamapplySDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["fee01", "fee02", "fee03"],
        {
            "`$PACK`": ["", {
                "`$KEY`": "`$COPY`",
                "`$VAL`": ["`$FORMAT`", "upper", "`$COPY`"],
            }],
        }
    )

    # Detect ENTID env override before envOverride consumes it. When live
    # mode is on without a real override, the basic test runs against synthetic
    # IDs from the fixture and 4xx's. We surface this so the test can skip.
    _entid_env_raw = os.environ.get(
        "DREAMAPPLY_TEST_FEE_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "DREAMAPPLY_TEST_FEE_ENTID": idmap,
        "DREAMAPPLY_TEST_LIVE": "FALSE",
        "DREAMAPPLY_TEST_EXPLAIN": "FALSE",
        "DREAMAPPLY_APIKEY": "NONE",
    })

    idmap_resolved = helpers.to_map(
        env.get("DREAMAPPLY_TEST_FEE_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)

    if env.get("DREAMAPPLY_TEST_LIVE") == "TRUE":
        merged_opts = vs.merge([
            {
                "apikey": env.get("DREAMAPPLY_APIKEY"),
            },
            extra or {},
        ])
        client = DreamapplySDK(helpers.to_map(merged_opts))

    _live = env.get("DREAMAPPLY_TEST_LIVE") == "TRUE"
    return {
        "client": client,
        "data": entity_data,
        "idmap": idmap_resolved,
        "env": env,
        "explain": env.get("DREAMAPPLY_TEST_EXPLAIN") == "TRUE",
        "live": _live,
        "synthetic_only": _live and not _idmap_overridden,
        "now": int(time.time() * 1000),
    }
