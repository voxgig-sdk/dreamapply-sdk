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
(0, node_test_1.describe)('ApplicantEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when DREAMAPPLY_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('DREAMAPPLY_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.DreamapplySDK.test();
        const ent = testsdk.Applicant();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.DREAMAPPLY_TEST_LIVE;
        for (const op of ['create', 'list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'applicant.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "address", "req": false, "type": "`$STRING`", "index$": 0 }, { "active": true, "name": "citizenship", "req": false, "type": "`$STRING`", "index$": 1 }, { "active": true, "name": "email", "req": false, "type": "`$STRING`", "index$": 2 }, { "active": true, "name": "id", "req": false, "type": "`$INTEGER`", "index$": 3 }, { "active": true, "name": "matriculation", "req": false, "type": "`$STRING`", "index$": 4 }, { "active": true, "name": "name", "req": false, "type": "`$OBJECT`", "index$": 5 }, { "active": true, "name": "name_family", "req": false, "type": "`$STRING`", "index$": 6 }, { "active": true, "name": "name_given", "req": false, "type": "`$STRING`", "index$": 7 }, { "active": true, "name": "notes", "req": false, "type": "`$STRING`", "index$": 8 }, { "active": true, "name": "phone", "req": false, "type": "`$STRING`", "index$": 9 }, { "active": true, "name": "photo", "req": false, "type": "`$OBJECT`", "index$": 10 }, { "active": true, "name": "reference", "req": false, "type": "`$STRING`", "index$": 11 }, { "active": true, "name": "region", "req": false, "type": "`$STRING`", "index$": 12 }, { "active": true, "name": "registered", "req": false, "type": "`$STRING`", "index$": 13 }, { "active": true, "name": "tracker_ID", "req": false, "type": "`$STRING`", "index$": 14 }, { "active": true, "name": "type", "req": false, "type": "`$STRING`", "index$": 15 }, { "active": true, "name": "vatin", "req": false, "type": "`$STRING`", "index$": 16 }], "id": { "field": "id", "name": "id" }, "name": "applicant", "op": { "create": { "input": "data", "name": "create", "points": [{ "active": true, "args": {}, "contract": { "id": "POST /applicants", "json": "{\"operationId\":\"createApplicant\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"citizenship\":{\"type\":\"string\"},\"email\":{\"type\":\"string\"},\"matriculation\":{\"type\":\"string\"},\"name\":{\"type\":\"string\"},\"name_family\":{\"type\":\"string\"},\"name_given\":{\"type\":\"string\"},\"notes\":{\"type\":\"string\"},\"phone\":{\"type\":\"string\"},\"reference\":{\"type\":\"string\"},\"region\":{\"type\":\"string\"},\"tracker_ID\":{\"type\":\"string\"}},\"type\":\"object\"}}},\"required\":true},\"responses\":{\"201\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"address\":{\"nullable\":true,\"type\":\"string\"},\"citizenship\":{\"type\":\"string\"},\"email\":{\"type\":\"string\"},\"id\":{\"type\":\"integer\"},\"matriculation\":{\"type\":\"string\"},\"name\":{\"properties\":{\"family\":{\"type\":\"string\"},\"full\":{\"type\":\"string\"},\"given\":{\"type\":\"string\"},\"legal\":{\"type\":\"string\"},\"middle\":{\"type\":\"string\"},\"parent\":{\"type\":\"string\"}},\"type\":\"object\"},\"notes\":{\"type\":\"string\"},\"phone\":{\"type\":\"string\"},\"photo\":{\"properties\":{\"content\":{\"description\":\"Sub-resource (StreamInterface); see the DreamApply SDK.\",\"type\":\"object\"},\"expires\":{\"nullable\":true,\"type\":\"string\"},\"mime\":{\"type\":\"string\"},\"name\":{\"type\":\"string\"},\"size\":{\"type\":\"integer\"},\"uploaded\":{\"nullable\":true,\"type\":\"string\"}},\"type\":\"object\"},\"reference\":{\"type\":\"string\"},\"registered\":{\"type\":\"string\"},\"type\":{\"enum\":[\"Child\",\"Legal\",\"Natural\"],\"type\":\"string\"},\"vatin\":{\"nullable\":true,\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Applicant created\"}},\"security\":[{\"apiKey\":[]}],\"securitySchemes\":{\"apiKey\":{\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"definition\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "POST", "orig": "/applicants", "segments": [{ "lit": "applicants" }], "select": {}, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": {}, "contract": { "id": "GET /applicants", "json": "{\"operationId\":\"listApplicants\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"address\":{\"nullable\":true,\"type\":\"string\"},\"citizenship\":{\"type\":\"string\"},\"email\":{\"type\":\"string\"},\"id\":{\"type\":\"integer\"},\"matriculation\":{\"type\":\"string\"},\"name\":{\"properties\":{\"family\":{\"type\":\"string\"},\"full\":{\"type\":\"string\"},\"given\":{\"type\":\"string\"},\"legal\":{\"type\":\"string\"},\"middle\":{\"type\":\"string\"},\"parent\":{\"type\":\"string\"}},\"type\":\"object\"},\"notes\":{\"type\":\"string\"},\"phone\":{\"type\":\"string\"},\"photo\":{\"properties\":{\"content\":{\"description\":\"Sub-resource (StreamInterface); see the DreamApply SDK.\",\"type\":\"object\"},\"expires\":{\"nullable\":true,\"type\":\"string\"},\"mime\":{\"type\":\"string\"},\"name\":{\"type\":\"string\"},\"size\":{\"type\":\"integer\"},\"uploaded\":{\"nullable\":true,\"type\":\"string\"}},\"type\":\"object\"},\"reference\":{\"type\":\"string\"},\"registered\":{\"type\":\"string\"},\"type\":{\"enum\":[\"Child\",\"Legal\",\"Natural\"],\"type\":\"string\"},\"vatin\":{\"nullable\":true,\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Applicants list\"}},\"security\":[{\"apiKey\":[]}],\"securitySchemes\":{\"apiKey\":{\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"definition\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/applicants", "segments": [{ "lit": "applicants" }], "select": {}, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "id", "orig": "id", "reqd": true, "type": "`$INTEGER`", "index$": 0 }] }, "contract": { "id": "GET /applicants/{id}", "json": "{\"operationId\":\"getApplicant\",\"parameters\":[{\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"address\":{\"nullable\":true,\"type\":\"string\"},\"citizenship\":{\"type\":\"string\"},\"email\":{\"type\":\"string\"},\"id\":{\"type\":\"integer\"},\"matriculation\":{\"type\":\"string\"},\"name\":{\"properties\":{\"family\":{\"type\":\"string\"},\"full\":{\"type\":\"string\"},\"given\":{\"type\":\"string\"},\"legal\":{\"type\":\"string\"},\"middle\":{\"type\":\"string\"},\"parent\":{\"type\":\"string\"}},\"type\":\"object\"},\"notes\":{\"type\":\"string\"},\"phone\":{\"type\":\"string\"},\"photo\":{\"properties\":{\"content\":{\"description\":\"Sub-resource (StreamInterface); see the DreamApply SDK.\",\"type\":\"object\"},\"expires\":{\"nullable\":true,\"type\":\"string\"},\"mime\":{\"type\":\"string\"},\"name\":{\"type\":\"string\"},\"size\":{\"type\":\"integer\"},\"uploaded\":{\"nullable\":true,\"type\":\"string\"}},\"type\":\"object\"},\"reference\":{\"type\":\"string\"},\"registered\":{\"type\":\"string\"},\"type\":{\"enum\":[\"Child\",\"Legal\",\"Natural\"],\"type\":\"string\"},\"vatin\":{\"nullable\":true,\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Applicant\"}},\"security\":[{\"apiKey\":[]}],\"securitySchemes\":{\"apiKey\":{\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"definition\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/applicants/{id}", "segments": [{ "lit": "applicants" }, { "var": "id" }], "select": { "exist": ["id"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "applicant", "name__orig": "applicant", "Name": "Applicant", "name_": "applicant", "name-": "applicant", "NAME": "APPLICANT", "index$": 3 }, { "active": true, "entity": "applicant", "key$": "BasicApplicantFlow", "kind": "basic", "name": "BasicApplicantFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "applicant_ref01" }, "match": {}, "op": "create", "spec": [], "valid": [], "index$": 0 }, { "active": true, "data": {}, "input": {}, "match": {}, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "applicant_ref01" } }], "index$": 1 }, { "active": true, "data": {}, "input": { "ref": "applicant_ref01", "srcdatavar": "applicant_ref01_data", "suffix": "_dt0" }, "match": { "id": "applicant01" }, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-applicant_ref01" } }], "index$": 2 }] }, 'Applicant');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const applicant_ref01_ent = client.Applicant();
        let applicant_ref01_data = setup.data.new.applicant['applicant_ref01'];
        applicant_ref01_data = (await applicant_ref01_ent.create(applicant_ref01_data)).data();
        (0, node_assert_1.default)(null != applicant_ref01_data.id);
        // LIST
        const applicant_ref01_match = {};
        const applicant_ref01_list = (await applicant_ref01_ent.list(applicant_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(applicant_ref01_list, { id: applicant_ref01_data.id })));
        // LOAD
        const applicant_ref01_match_dt0 = {};
        applicant_ref01_match_dt0.id = applicant_ref01_data.id;
        const applicant_ref01_data_dt0 = (await applicant_ref01_ent.load(applicant_ref01_match_dt0)).data();
        (0, node_assert_1.default)(applicant_ref01_data_dt0.id === applicant_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/applicant/ApplicantTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.DreamapplySDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['applicant01', 'applicant02', 'applicant03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'DREAMAPPLY_TEST_APPLICANT_ENTID': idmap,
        'DREAMAPPLY_TEST_LIVE': 'FALSE',
        'DREAMAPPLY_TEST_EXPLAIN': 'FALSE',
        'DREAMAPPLY_APIKEY': '',
        'DREAMAPPLY_SERVER_INSTANCE': "demo",
    });
    idmap = env['DREAMAPPLY_TEST_APPLICANT_ENTID'];
    const live = 'TRUE' === env.DREAMAPPLY_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['DREAMAPPLY_TEST_APPLICANT_ENTID'];
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
//# sourceMappingURL=ApplicantEntity.test.js.map