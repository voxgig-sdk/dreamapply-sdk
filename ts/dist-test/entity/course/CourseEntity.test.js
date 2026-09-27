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
(0, node_test_1.describe)('CourseEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when DREAMAPPLY_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('DREAMAPPLY_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.DreamapplySDK.test();
        const ent = testsdk.Course();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.DREAMAPPLY_TEST_LIVE;
        for (const op of ['create', 'list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'course.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "accreditation": { "a": true, "h": "Accreditation", "n": "accreditation", "r": false, "t": "`$STRING`", "key$": "accreditation", "index$": 0 }, "address": { "a": true, "h": "Address", "n": "address", "r": false, "t": "`$STRING`", "key$": "address", "index$": 1 }, "awards_abbr": { "a": true, "h": "Awards Abbr", "n": "awards_abbr", "r": false, "t": "`$STRING`", "key$": "awards_abbr", "index$": 2 }, "awards_full": { "a": true, "h": "Awards Full", "n": "awards_full", "r": false, "t": "`$STRING`", "key$": "awards_full", "index$": 3 }, "code": { "a": true, "h": "Code", "n": "code", "r": false, "t": "`$STRING`", "key$": "code", "index$": 4 }, "codeInternal": { "a": true, "h": "Code Internal", "n": "codeInternal", "r": false, "t": "`$STRING`", "key$": "codeInternal", "index$": 5 }, "country": { "a": true, "h": "Country", "n": "country", "r": false, "t": "`$STRING`", "key$": "country", "index$": 6 }, "credits": { "a": true, "h": "Credits", "n": "credits", "r": false, "t": "`$STRING`", "key$": "credits", "index$": 7 }, "departments": { "a": true, "h": "Departments", "n": "departments", "r": false, "sh": "Sub-resource (InstitutionDepartments); see the DreamApply SDK.", "t": "`$OBJECT`", "key$": "departments", "index$": 8 }, "duration": { "a": true, "h": "Duration", "n": "duration", "r": false, "t": "`$STRING`", "key$": "duration", "index$": 9 }, "erasmus": { "a": true, "h": "Erasmus", "n": "erasmus", "r": false, "t": "`$STRING`", "key$": "erasmus", "index$": 10 }, "featured": { "a": true, "h": "Featured", "n": "featured", "r": false, "t": "`$STRING`", "key$": "featured", "index$": 11 }, "iban": { "a": true, "h": "Iban", "n": "iban", "r": false, "t": "`$STRING`", "key$": "iban", "index$": 12 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "t": "`$INTEGER`", "key$": "id", "index$": 13 }, "institution": { "a": true, "h": "Institution", "n": "institution", "r": false, "t": "`$STRING`", "key$": "institution", "index$": 14 }, "language": { "a": true, "h": "Language", "n": "language", "r": false, "t": "`$STRING`", "key$": "language", "index$": 15 }, "location": { "a": true, "h": "Location", "n": "location", "r": false, "t": "`$STRING`", "key$": "location", "index$": 16 }, "mode": { "a": true, "h": "Mode", "n": "mode", "r": false, "t": "`$STRING`", "key$": "mode", "index$": 17 }, "name": { "a": true, "h": "Name", "n": "name", "r": false, "t": "`$STRING`", "key$": "name", "index$": 18 }, "prospect_uri": { "a": true, "h": "Prospect Uri", "n": "prospect_uri", "r": false, "t": "`$STRING`", "key$": "prospect_uri", "index$": 19 }, "quota": { "a": true, "h": "Quota", "n": "quota", "r": false, "t": "`$STRING`", "key$": "quota", "index$": 20 }, "registration": { "a": true, "h": "Registration", "n": "registration", "r": false, "t": "`$STRING`", "key$": "registration", "index$": 21 }, "status": { "a": true, "h": "Status", "n": "status", "r": false, "t": "`$STRING`", "key$": "status", "index$": 22 }, "type": { "a": true, "h": "Type", "n": "type", "r": false, "t": "`$STRING`", "key$": "type", "index$": 23 }, "updated": { "a": true, "h": "Updated", "n": "updated", "r": false, "t": "`$STRING`", "key$": "updated", "index$": 24 }, "vat": { "a": true, "h": "Vat", "n": "vat", "r": false, "t": "`$STRING`", "key$": "vat", "index$": 25 }, "www": { "a": true, "h": "Www", "n": "www", "r": false, "t": "`$STRING`", "key$": "www", "index$": 26 } }, "id": { "field": "id", "name": "id" }, "name": "course", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /courses", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/courses", "q": {}, "r": {}, "s": [{ "lit": "courses" }], "t": { "req": "`reqdata`", "res": "`body.institution`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /courses", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/courses", "q": {}, "r": {}, "s": [{ "lit": "courses" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /courses/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/courses/{id}", "q": { "exist": ["id"] }, "r": {}, "s": [{ "lit": "courses" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body.institution`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "course", "name__orig": "course", "Name": "Course", "name_": "course", "name-": "course", "NAME": "COURSE", "index$": 5 }, { "active": true, "entity": "course", "key$": "BasicCourseFlow", "kind": "basic", "name": "BasicCourseFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "course_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "course_ref01" } }], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "course_ref01", "srcdatavar": "course_ref01_data", "suffix": "_dt0" }, "m": { "id": "course01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-course_ref01" } }], "index$": 2 }] }, 'Course', { "POST /courses": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "awards_abbr": { "type": "string", "key$": "awards_abbr" }, "awards_full": { "type": "string", "key$": "awards_full" }, "code": { "type": "string", "key$": "code" }, "country": { "type": "string", "key$": "country" }, "institution": { "type": "string", "key$": "institution" }, "language": { "type": "string", "key$": "language" }, "location": { "type": "string", "key$": "location" }, "mode": { "type": "string", "key$": "mode" }, "name": { "type": "string", "key$": "name" }, "prospect_uri": { "type": "string", "key$": "prospect_uri" }, "type": { "type": "string", "key$": "type" } }, "x-ref": "#/components/schemas/CourseCreate", "index$": 1 } } } }, "parameters": [] }, "GET /courses": { "protocol": "http", "parameters": [] }, "GET /courses/{id}": { "protocol": "http", "parameters": [{ "name": "id", "in": "path", "required": true, "schema": { "type": "integer" }, "index$": 0 }] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const course_ref01_ent = client.Course();
        let course_ref01_data = setup.data.new.course['course_ref01'];
        course_ref01_data = (await course_ref01_ent.create(course_ref01_data)).data();
        (0, node_assert_1.default)(null != course_ref01_data.id);
        // LIST
        const course_ref01_match = {};
        const course_ref01_list = (await course_ref01_ent.list(course_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(course_ref01_list, { id: course_ref01_data.id })));
        // LOAD
        const course_ref01_match_dt0 = {};
        course_ref01_match_dt0.id = course_ref01_data.id;
        const course_ref01_data_dt0 = (await course_ref01_ent.load(course_ref01_match_dt0)).data();
        (0, node_assert_1.default)(course_ref01_data_dt0.id === course_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/course/CourseTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.DreamapplySDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['course01', 'course02', 'course03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'DREAMAPPLY_TEST_COURSE_ENTID': idmap,
        'DREAMAPPLY_TEST_LIVE': 'FALSE',
        'DREAMAPPLY_TEST_EXPLAIN': 'FALSE',
        'DREAMAPPLY_APIKEY': '',
        'DREAMAPPLY_SERVER_INSTANCE': "demo",
    });
    idmap = env['DREAMAPPLY_TEST_COURSE_ENTID'];
    const live = 'TRUE' === env.DREAMAPPLY_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['DREAMAPPLY_TEST_COURSE_ENTID'];
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
//# sourceMappingURL=CourseEntity.test.js.map