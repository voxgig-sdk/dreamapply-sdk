"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('ScoresheetEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when DREAMAPPLY_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('DREAMAPPLY_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.DreamapplySDK.test();
        const ent = testsdk.Scoresheet();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.DREAMAPPLY_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'scoresheet.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "confirmed", "req": false, "type": "`$STRING`", "index$": 0 }, { "active": true, "name": "created", "req": false, "type": "`$STRING`", "index$": 1 }, { "active": true, "name": "date", "req": false, "type": "`$STRING`", "index$": 2 }, { "active": true, "name": "depth", "req": false, "type": "`$STRING`", "index$": 3 }, { "active": true, "name": "group", "req": false, "short": "Sub-resource (object); see the DreamApply SDK.", "type": "`$OBJECT`", "index$": 4 }, { "active": true, "name": "id", "req": false, "type": "`$STRING`", "index$": 5 }, { "active": true, "name": "instructions", "req": false, "type": "`$STRING`", "index$": 6 }, { "active": true, "name": "language", "req": false, "type": "`$STRING`", "index$": 7 }, { "active": true, "name": "maps", "req": false, "type": "`$ARRAY`", "index$": 8 }, { "active": true, "name": "name", "req": false, "type": "`$STRING`", "index$": 9 }, { "active": true, "name": "rangeMax", "req": false, "type": "`$STRING`", "index$": 10 }, { "active": true, "name": "rangeMin", "req": false, "type": "`$STRING`", "index$": 11 }, { "active": true, "name": "reference", "req": false, "type": "`$STRING`", "index$": 12 }, { "active": true, "name": "scale", "req": false, "type": "`$INTEGER`", "index$": 13 }, { "active": true, "name": "scored", "req": false, "type": "`$STRING`", "index$": 14 }, { "active": true, "name": "scores", "req": false, "short": "Sub-resource (Scores); see the DreamApply SDK.", "type": "`$OBJECT`", "index$": 15 }, { "active": true, "name": "subject", "req": false, "type": "`$STRING`", "index$": 16 }, { "active": true, "name": "type", "req": false, "type": "`$STRING`", "index$": 17 }], "id": { "field": "id", "name": "id" }, "name": "scoresheet", "op": { "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": {}, "contract": { "id": "GET /scoresheets", "json": "{\"operationId\":\"listScoresheets\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"confirmed\":{\"type\":\"string\"},\"created\":{\"type\":\"string\"},\"date\":{\"type\":\"string\"},\"depth\":{\"type\":\"string\"},\"group\":{\"description\":\"Sub-resource (object); see the DreamApply SDK.\",\"nullable\":true,\"type\":\"object\"},\"instructions\":{\"type\":\"string\"},\"language\":{\"type\":\"string\"},\"maps\":{\"nullable\":true,\"type\":\"array\"},\"name\":{\"type\":\"string\"},\"rangeMax\":{\"type\":\"string\"},\"rangeMin\":{\"type\":\"string\"},\"reference\":{\"type\":\"string\"},\"scale\":{\"type\":\"integer\"},\"scored\":{\"type\":\"string\"},\"scores\":{\"description\":\"Sub-resource (Scores); see the DreamApply SDK.\",\"type\":\"object\"},\"subject\":{\"type\":\"string\"},\"type\":{\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Scoresheets list\"}},\"security\":[{\"apiKey\":[]}],\"securitySchemes\":{\"apiKey\":{\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"definition\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/scoresheets", "segments": [{ "lit": "scoresheets" }], "select": {}, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "id", "orig": "id", "reqd": true, "type": "`$INTEGER`", "index$": 0 }] }, "contract": { "id": "GET /scoresheets/{id}", "json": "{\"operationId\":\"getScoresheet\",\"parameters\":[{\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"confirmed\":{\"type\":\"string\"},\"created\":{\"type\":\"string\"},\"date\":{\"type\":\"string\"},\"depth\":{\"type\":\"string\"},\"group\":{\"description\":\"Sub-resource (object); see the DreamApply SDK.\",\"nullable\":true,\"type\":\"object\"},\"instructions\":{\"type\":\"string\"},\"language\":{\"type\":\"string\"},\"maps\":{\"nullable\":true,\"type\":\"array\"},\"name\":{\"type\":\"string\"},\"rangeMax\":{\"type\":\"string\"},\"rangeMin\":{\"type\":\"string\"},\"reference\":{\"type\":\"string\"},\"scale\":{\"type\":\"integer\"},\"scored\":{\"type\":\"string\"},\"scores\":{\"description\":\"Sub-resource (Scores); see the DreamApply SDK.\",\"type\":\"object\"},\"subject\":{\"type\":\"string\"},\"type\":{\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Scoresheet\"}},\"security\":[{\"apiKey\":[]}],\"securitySchemes\":{\"apiKey\":{\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"definition\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/scoresheets/{id}", "segments": [{ "lit": "scoresheets" }, { "var": "id" }], "select": { "exist": ["id"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "scoresheet", "name__orig": "scoresheet", "Name": "Scoresheet", "name_": "scoresheet", "name-": "scoresheet", "NAME": "SCORESHEET", "index$": 12 }, { "active": true, "entity": "scoresheet", "key$": "BasicScoresheetFlow", "kind": "basic", "name": "BasicScoresheetFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": {}, "match": {}, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "scoresheet_ref01" } }], "index$": 0 }, { "active": true, "data": {}, "input": { "ref": "scoresheet_ref01", "srcdatavar": "scoresheet_ref01_data", "suffix": "_dt0" }, "match": { "id": "scoresheet01" }, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-scoresheet_ref01" } }], "index$": 1 }] }, 'Scoresheet');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let scoresheet_ref01_data = Object.values(setup.data.existing.scoresheet)[0];
        // LIST
        const scoresheet_ref01_ent = client.Scoresheet();
        const scoresheet_ref01_match = {};
        const scoresheet_ref01_list = (await scoresheet_ref01_ent.list(scoresheet_ref01_match)).map((e) => e.data());
        // LOAD
        const scoresheet_ref01_match_dt0 = {};
        scoresheet_ref01_match_dt0.id = scoresheet_ref01_data.id;
        const scoresheet_ref01_data_dt0 = (await scoresheet_ref01_ent.load(scoresheet_ref01_match_dt0)).data();
        (0, node_assert_1.default)(scoresheet_ref01_data_dt0.id === scoresheet_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/scoresheet/ScoresheetTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.DreamapplySDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['scoresheet01', 'scoresheet02', 'scoresheet03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'DREAMAPPLY_TEST_SCORESHEET_ENTID': idmap,
        'DREAMAPPLY_TEST_LIVE': 'FALSE',
        'DREAMAPPLY_TEST_EXPLAIN': 'FALSE',
        'DREAMAPPLY_APIKEY': '',
        'DREAMAPPLY_SERVER_INSTANCE': "demo",
    });
    idmap = env['DREAMAPPLY_TEST_SCORESHEET_ENTID'];
    const live = 'TRUE' === env.DREAMAPPLY_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['DREAMAPPLY_TEST_SCORESHEET_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.DreamapplySDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {
                apikey: env.DREAMAPPLY_APIKEY,
                server: {
                    instance: env.DREAMAPPLY_SERVER_INSTANCE,
                },
            },
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.DREAMAPPLY_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=ScoresheetEntity.test.js.map