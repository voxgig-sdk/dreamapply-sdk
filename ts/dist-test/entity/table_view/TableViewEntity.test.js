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
(0, node_test_1.describe)('TableViewEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when DREAMAPPLY_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('DREAMAPPLY_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.DreamapplySDK.test();
        const ent = testsdk.TableView();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.DREAMAPPLY_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'table_view.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "content": { "a": true, "h": "Content", "n": "content", "r": false, "sh": "Sub-resource (StreamInterface); see the DreamApply SDK.", "t": "`$OBJECT`", "key$": "content", "index$": 0 }, "created": { "a": true, "h": "Created", "n": "created", "r": false, "t": "`$STRING`", "key$": "created", "index$": 1 }, "expires": { "a": true, "h": "Expires", "n": "expires", "r": false, "t": "`$STRING`", "key$": "expires", "index$": 2 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "t": "`$INTEGER`", "key$": "id", "index$": 3 }, "mime": { "a": true, "h": "Mime", "n": "mime", "r": false, "t": "`$STRING`", "key$": "mime", "index$": 4 }, "modified": { "a": true, "h": "Modified", "n": "modified", "r": false, "t": "`$STRING`", "key$": "modified", "index$": 5 }, "name": { "a": true, "h": "Name", "n": "name", "r": false, "t": "`$STRING`", "key$": "name", "index$": 6 }, "size": { "a": true, "h": "Size", "n": "size", "r": false, "t": "`$INTEGER`", "key$": "size", "index$": 7 }, "tabledata": { "a": true, "h": "Tabledata", "n": "tabledata", "r": false, "t": "`$OBJECT`", "key$": "tabledata", "index$": 8 }, "title": { "a": true, "h": "Title", "n": "title", "r": false, "t": "`$STRING`", "key$": "title", "index$": 9 }, "uploaded": { "a": true, "h": "Uploaded", "n": "uploaded", "r": false, "t": "`$STRING`", "key$": "uploaded", "index$": 10 } }, "id": { "field": "id", "name": "id" }, "name": "table_view", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /tableviews", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/tableviews", "q": {}, "r": {}, "s": [{ "lit": "tableviews" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /tableviews/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/tableviews/{id}", "q": { "exist": ["id"] }, "r": {}, "s": [{ "lit": "tableviews" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body.tabledata`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "table_view", "name__orig": "table_view", "Name": "TableView", "name_": "table_view", "name-": "table-view", "NAME": "TABLE_VIEW", "index$": 13 }, { "active": true, "entity": "table_view", "key$": "BasicTableViewFlow", "kind": "basic", "name": "BasicTableViewFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "table_view_ref01" } }], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "table_view_ref01", "srcdatavar": "table_view_ref01_data", "suffix": "_dt0" }, "m": { "id": "table_view01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-table_view_ref01" } }], "index$": 1 }] }, 'TableView', { "GET /tableviews": { "protocol": "http", "parameters": [] }, "GET /tableviews/{id}": { "protocol": "http", "parameters": [{ "name": "id", "in": "path", "required": true, "schema": { "type": "integer" }, "index$": 0 }] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let table_view_ref01_data = Object.values(setup.data.existing.table_view)[0];
        // LIST
        const table_view_ref01_ent = client.TableView();
        const table_view_ref01_match = {};
        const table_view_ref01_list = (await table_view_ref01_ent.list(table_view_ref01_match)).map((e) => e.data());
        // LOAD
        const table_view_ref01_match_dt0 = {};
        table_view_ref01_match_dt0.id = table_view_ref01_data.id;
        const table_view_ref01_data_dt0 = (await table_view_ref01_ent.load(table_view_ref01_match_dt0)).data();
        (0, node_assert_1.default)(table_view_ref01_data_dt0.id === table_view_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/table_view/TableViewTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.DreamapplySDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['table_view01', 'table_view02', 'table_view03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'DREAMAPPLY_TEST_TABLE_VIEW_ENTID': idmap,
        'DREAMAPPLY_TEST_LIVE': 'FALSE',
        'DREAMAPPLY_TEST_EXPLAIN': 'FALSE',
        'DREAMAPPLY_APIKEY': '',
        'DREAMAPPLY_SERVER_INSTANCE': "demo",
    });
    idmap = env['DREAMAPPLY_TEST_TABLE_VIEW_ENTID'];
    const live = 'TRUE' === env.DREAMAPPLY_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['DREAMAPPLY_TEST_TABLE_VIEW_ENTID'];
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
//# sourceMappingURL=TableViewEntity.test.js.map