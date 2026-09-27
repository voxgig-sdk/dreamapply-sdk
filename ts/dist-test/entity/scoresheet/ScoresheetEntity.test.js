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
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "confirmed": { "a": true, "h": "Confirmed", "n": "confirmed", "r": false, "t": "`$STRING`", "key$": "confirmed", "index$": 0 }, "created": { "a": true, "h": "Created", "n": "created", "r": false, "t": "`$STRING`", "key$": "created", "index$": 1 }, "date": { "a": true, "h": "Date", "n": "date", "r": false, "t": "`$STRING`", "key$": "date", "index$": 2 }, "depth": { "a": true, "h": "Depth", "n": "depth", "r": false, "t": "`$STRING`", "key$": "depth", "index$": 3 }, "group": { "a": true, "h": "Group", "n": "group", "r": false, "sh": "Sub-resource (object); see the DreamApply SDK.", "t": "`$OBJECT`", "key$": "group", "index$": 4 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "t": "`$STRING`", "key$": "id", "index$": 5 }, "instructions": { "a": true, "h": "Instructions", "n": "instructions", "r": false, "t": "`$STRING`", "key$": "instructions", "index$": 6 }, "language": { "a": true, "h": "Language", "n": "language", "r": false, "t": "`$STRING`", "key$": "language", "index$": 7 }, "maps": { "a": true, "h": "Maps", "n": "maps", "r": false, "t": "`$ARRAY`", "key$": "maps", "index$": 8 }, "name": { "a": true, "h": "Name", "n": "name", "r": false, "t": "`$STRING`", "key$": "name", "index$": 9 }, "rangeMax": { "a": true, "h": "Range Max", "n": "rangeMax", "r": false, "t": "`$STRING`", "key$": "rangeMax", "index$": 10 }, "rangeMin": { "a": true, "h": "Range Min", "n": "rangeMin", "r": false, "t": "`$STRING`", "key$": "rangeMin", "index$": 11 }, "reference": { "a": true, "h": "Reference", "n": "reference", "r": false, "t": "`$STRING`", "key$": "reference", "index$": 12 }, "scale": { "a": true, "h": "Scale", "n": "scale", "r": false, "t": "`$INTEGER`", "key$": "scale", "index$": 13 }, "scored": { "a": true, "h": "Scored", "n": "scored", "r": false, "t": "`$STRING`", "key$": "scored", "index$": 14 }, "scores": { "a": true, "h": "Scores", "n": "scores", "r": false, "sh": "Sub-resource (Scores); see the DreamApply SDK.", "t": "`$OBJECT`", "key$": "scores", "index$": 15 }, "subject": { "a": true, "h": "Subject", "n": "subject", "r": false, "t": "`$STRING`", "key$": "subject", "index$": 16 }, "type": { "a": true, "h": "Type", "n": "type", "r": false, "t": "`$STRING`", "key$": "type", "index$": 17 } }, "id": { "field": "id", "name": "id" }, "name": "scoresheet", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /scoresheets", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/scoresheets", "q": {}, "r": {}, "s": [{ "lit": "scoresheets" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /scoresheets/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/scoresheets/{id}", "q": { "exist": ["id"] }, "r": {}, "s": [{ "lit": "scoresheets" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "scoresheet", "name__orig": "scoresheet", "Name": "Scoresheet", "name_": "scoresheet", "name-": "scoresheet", "NAME": "SCORESHEET", "index$": 12 }, { "active": true, "entity": "scoresheet", "key$": "BasicScoresheetFlow", "kind": "basic", "name": "BasicScoresheetFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "scoresheet_ref01" } }], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "scoresheet_ref01", "srcdatavar": "scoresheet_ref01_data", "suffix": "_dt0" }, "m": { "id": "scoresheet01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-scoresheet_ref01" } }], "index$": 1 }] }, 'Scoresheet', { "GET /scoresheets": { "protocol": "http", "parameters": [] }, "GET /scoresheets/{id}": { "protocol": "http", "parameters": [{ "name": "id", "in": "path", "required": true, "schema": { "type": "integer" }, "index$": 0 }] } });
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