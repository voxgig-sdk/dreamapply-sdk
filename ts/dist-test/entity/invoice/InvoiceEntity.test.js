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
(0, node_test_1.describe)('InvoiceEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when DREAMAPPLY_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('DREAMAPPLY_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.DreamapplySDK.test();
        const ent = testsdk.Invoice();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.DREAMAPPLY_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'invoice.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "applicant", "req": false, "type": "`$OBJECT`", "index$": 0 }, { "active": true, "name": "application", "req": false, "type": "`$OBJECT`", "index$": 1 }, { "active": true, "name": "collected", "req": false, "type": "`$STRING`", "index$": 2 }, { "active": true, "name": "course", "req": false, "type": "`$OBJECT`", "index$": 3 }, { "active": true, "name": "currency", "req": false, "type": "`$STRING`", "index$": 4 }, { "active": true, "name": "deadline", "req": false, "type": "`$STRING`", "index$": 5 }, { "active": true, "name": "delivered", "req": false, "type": "`$STRING`", "index$": 6 }, { "active": true, "name": "id", "req": false, "type": "`$INTEGER`", "index$": 7 }, { "active": true, "name": "instructions", "req": false, "type": "`$STRING`", "index$": 8 }, { "active": true, "name": "issued", "req": false, "type": "`$STRING`", "index$": 9 }, { "active": true, "name": "nr", "req": false, "type": "`$STRING`", "index$": 10 }, { "active": true, "name": "payer", "req": false, "type": "`$OBJECT`", "index$": 11 }, { "active": true, "name": "reminded", "req": false, "type": "`$STRING`", "index$": 12 }, { "active": true, "name": "smallprint", "req": false, "type": "`$STRING`", "index$": 13 }], "id": { "field": "id", "name": "id" }, "name": "invoice", "op": { "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": {}, "contract": { "id": "GET /invoices", "json": "{\"operationId\":\"listInvoices\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"applicant\":{\"properties\":{\"address\":{\"nullable\":true,\"type\":\"string\"},\"citizenship\":{\"type\":\"string\"},\"email\":{\"type\":\"string\"},\"id\":{\"type\":\"integer\"},\"matriculation\":{\"type\":\"string\"},\"name\":{\"properties\":{\"family\":{\"type\":\"string\"},\"full\":{\"type\":\"string\"},\"given\":{\"type\":\"string\"},\"legal\":{\"type\":\"string\"},\"middle\":{\"type\":\"string\"},\"parent\":{\"type\":\"string\"}},\"type\":\"object\"},\"notes\":{\"type\":\"string\"},\"phone\":{\"type\":\"string\"},\"photo\":{\"properties\":{\"content\":{\"description\":\"Sub-resource (StreamInterface); see the DreamApply SDK.\",\"type\":\"object\"},\"expires\":{\"nullable\":true,\"type\":\"string\"},\"mime\":{\"type\":\"string\"},\"name\":{\"type\":\"string\"},\"size\":{\"type\":\"integer\"},\"uploaded\":{\"nullable\":true,\"type\":\"string\"}},\"type\":\"object\"},\"reference\":{\"type\":\"string\"},\"registered\":{\"type\":\"string\"},\"type\":{\"enum\":[\"Child\",\"Legal\",\"Natural\"],\"type\":\"string\"},\"vatin\":{\"nullable\":true,\"type\":\"string\"}},\"type\":\"object\"},\"application\":{\"properties\":{\"academicTerm\":{\"description\":\"Sub-resource (AcademicTerm); see the DreamApply SDK.\",\"type\":\"object\"},\"activities\":{\"type\":\"array\"},\"applicant\":{\"properties\":{\"address\":{\"nullable\":true,\"type\":\"string\"},\"citizenship\":{\"type\":\"string\"},\"email\":{\"type\":\"string\"},\"id\":{\"type\":\"integer\"},\"matriculation\":{\"type\":\"string\"},\"name\":{\"properties\":{\"family\":{\"type\":\"string\"},\"full\":{\"type\":\"string\"},\"given\":{\"type\":\"string\"},\"legal\":{\"type\":\"string\"},\"middle\":{\"type\":\"string\"},\"parent\":{\"type\":\"string\"}},\"type\":\"object\"},\"notes\":{\"type\":\"string\"},\"phone\":{\"type\":\"string\"},\"photo\":{\"properties\":{\"content\":{\"description\":\"Sub-resource (StreamInterface); see the DreamApply SDK.\",\"type\":\"object\"},\"expires\":{\"nullable\":true,\"type\":\"string\"},\"mime\":{\"type\":\"string\"},\"name\":{\"type\":\"string\"},\"size\":{\"type\":\"integer\"},\"uploaded\":{\"nullable\":true,\"type\":\"string\"}},\"type\":\"object\"},\"reference\":{\"type\":\"string\"},\"registered\":{\"type\":\"string\"},\"type\":{\"enum\":[\"Child\",\"Legal\",\"Natural\"],\"type\":\"string\"},\"vatin\":{\"nullable\":true,\"type\":\"string\"}},\"type\":\"object\"},\"career\":{\"type\":\"array\"},\"contact\":{\"type\":\"array\"},\"created\":{\"type\":\"string\"},\"education\":{\"type\":\"array\"},\"extras\":{\"type\":\"array\"},\"grades\":{\"type\":\"array\"},\"home\":{\"type\":\"array\"},\"host\":{\"type\":\"array\"},\"id\":{\"type\":\"integer\"},\"languages\":{\"type\":\"array\"},\"legal\":{\"type\":\"array\"},\"misc\":{\"type\":\"array\"},\"motivation\":{\"type\":\"array\"},\"pdf\":{\"properties\":{\"content\":{\"description\":\"Sub-resource (StreamInterface); see the DreamApply SDK.\",\"type\":\"object\"},\"expires\":{\"nullable\":true,\"type\":\"string\"},\"mime\":{\"type\":\"string\"},\"name\":{\"type\":\"string\"},\"size\":{\"type\":\"integer\"},\"uploaded\":{\"nullable\":true,\"type\":\"string\"}},\"type\":\"object\"},\"profile\":{\"type\":\"array\"},\"residences\":{\"type\":\"array\"},\"revised\":{\"nullable\":true,\"type\":\"string\"},\"status\":{\"enum\":[\"Blank\",\"Closed\",\"Draft\",\"Inactive\",\"Reopened\",\"Submitted\",\"Withdrawn\"],\"type\":\"string\"},\"submitted\":{\"nullable\":true,\"type\":\"string\"},\"visa\":{\"type\":\"array\"}},\"type\":\"object\"},\"collected\":{\"type\":\"string\"},\"course\":{\"properties\":{\"accreditation\":{\"type\":\"string\"},\"code\":{\"type\":\"string\"},\"codeInternal\":{\"nullable\":true,\"type\":\"string\"},\"country\":{\"type\":\"string\"},\"credits\":{\"type\":\"string\"},\"duration\":{\"type\":\"string\"},\"featured\":{\"type\":\"string\"},\"id\":{\"type\":\"integer\"},\"institution\":{\"properties\":{\"address\":{\"type\":\"string\"},\"country\":{\"type\":\"string\"},\"departments\":{\"description\":\"Sub-resource (InstitutionDepartments); see the DreamApply SDK.\",\"type\":\"object\"},\"erasmus\":{\"type\":\"string\"},\"iban\":{\"type\":\"string\"},\"id\":{\"type\":\"integer\"},\"location\":{\"type\":\"string\"},\"name\":{\"type\":\"string\"},\"registration\":{\"type\":\"string\"},\"status\":{\"type\":\"string\"},\"vat\":{\"type\":\"string\"},\"www\":{\"type\":\"string\"}},\"type\":\"object\"},\"language\":{\"type\":\"string\"},\"location\":{\"type\":\"string\"},\"mode\":{\"type\":\"string\"},\"name\":{\"type\":\"string\"},\"quota\":{\"type\":\"string\"},\"status\":{\"enum\":[\"Archived\",\"Closed\",\"Draft\",\"Online\",\"Private\",\"Standby\"],\"type\":\"string\"},\"type\":{\"type\":\"string\"},\"updated\":{\"type\":\"string\"}},\"type\":\"object\"},\"currency\":{\"type\":\"string\"},\"deadline\":{\"type\":\"string\"},\"delivered\":{\"type\":\"string\"},\"id\":{\"type\":\"integer\"},\"instructions\":{\"type\":\"string\"},\"issued\":{\"type\":\"string\"},\"nr\":{\"type\":\"string\"},\"payer\":{\"properties\":{\"email\":{\"type\":\"string\"},\"name\":{\"type\":\"string\"}},\"type\":\"object\"},\"reminded\":{\"type\":\"string\"},\"smallprint\":{\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Invoices list\"}},\"security\":[{\"apiKey\":[]}],\"securitySchemes\":{\"apiKey\":{\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"definition\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/invoices", "segments": [{ "lit": "invoices" }], "select": {}, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "id", "orig": "id", "reqd": true, "type": "`$INTEGER`", "index$": 0 }] }, "contract": { "id": "GET /invoices/{id}", "json": "{\"operationId\":\"getInvoice\",\"parameters\":[{\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"applicant\":{\"properties\":{\"address\":{\"nullable\":true,\"type\":\"string\"},\"citizenship\":{\"type\":\"string\"},\"email\":{\"type\":\"string\"},\"id\":{\"type\":\"integer\"},\"matriculation\":{\"type\":\"string\"},\"name\":{\"properties\":{\"family\":{\"type\":\"string\"},\"full\":{\"type\":\"string\"},\"given\":{\"type\":\"string\"},\"legal\":{\"type\":\"string\"},\"middle\":{\"type\":\"string\"},\"parent\":{\"type\":\"string\"}},\"type\":\"object\"},\"notes\":{\"type\":\"string\"},\"phone\":{\"type\":\"string\"},\"photo\":{\"properties\":{\"content\":{\"description\":\"Sub-resource (StreamInterface); see the DreamApply SDK.\",\"type\":\"object\"},\"expires\":{\"nullable\":true,\"type\":\"string\"},\"mime\":{\"type\":\"string\"},\"name\":{\"type\":\"string\"},\"size\":{\"type\":\"integer\"},\"uploaded\":{\"nullable\":true,\"type\":\"string\"}},\"type\":\"object\"},\"reference\":{\"type\":\"string\"},\"registered\":{\"type\":\"string\"},\"type\":{\"enum\":[\"Child\",\"Legal\",\"Natural\"],\"type\":\"string\"},\"vatin\":{\"nullable\":true,\"type\":\"string\"}},\"type\":\"object\"},\"application\":{\"properties\":{\"academicTerm\":{\"description\":\"Sub-resource (AcademicTerm); see the DreamApply SDK.\",\"type\":\"object\"},\"activities\":{\"type\":\"array\"},\"applicant\":{\"properties\":{\"address\":{\"nullable\":true,\"type\":\"string\"},\"citizenship\":{\"type\":\"string\"},\"email\":{\"type\":\"string\"},\"id\":{\"type\":\"integer\"},\"matriculation\":{\"type\":\"string\"},\"name\":{\"properties\":{\"family\":{\"type\":\"string\"},\"full\":{\"type\":\"string\"},\"given\":{\"type\":\"string\"},\"legal\":{\"type\":\"string\"},\"middle\":{\"type\":\"string\"},\"parent\":{\"type\":\"string\"}},\"type\":\"object\"},\"notes\":{\"type\":\"string\"},\"phone\":{\"type\":\"string\"},\"photo\":{\"properties\":{\"content\":{\"description\":\"Sub-resource (StreamInterface); see the DreamApply SDK.\",\"type\":\"object\"},\"expires\":{\"nullable\":true,\"type\":\"string\"},\"mime\":{\"type\":\"string\"},\"name\":{\"type\":\"string\"},\"size\":{\"type\":\"integer\"},\"uploaded\":{\"nullable\":true,\"type\":\"string\"}},\"type\":\"object\"},\"reference\":{\"type\":\"string\"},\"registered\":{\"type\":\"string\"},\"type\":{\"enum\":[\"Child\",\"Legal\",\"Natural\"],\"type\":\"string\"},\"vatin\":{\"nullable\":true,\"type\":\"string\"}},\"type\":\"object\"},\"career\":{\"type\":\"array\"},\"contact\":{\"type\":\"array\"},\"created\":{\"type\":\"string\"},\"education\":{\"type\":\"array\"},\"extras\":{\"type\":\"array\"},\"grades\":{\"type\":\"array\"},\"home\":{\"type\":\"array\"},\"host\":{\"type\":\"array\"},\"id\":{\"type\":\"integer\"},\"languages\":{\"type\":\"array\"},\"legal\":{\"type\":\"array\"},\"misc\":{\"type\":\"array\"},\"motivation\":{\"type\":\"array\"},\"pdf\":{\"properties\":{\"content\":{\"description\":\"Sub-resource (StreamInterface); see the DreamApply SDK.\",\"type\":\"object\"},\"expires\":{\"nullable\":true,\"type\":\"string\"},\"mime\":{\"type\":\"string\"},\"name\":{\"type\":\"string\"},\"size\":{\"type\":\"integer\"},\"uploaded\":{\"nullable\":true,\"type\":\"string\"}},\"type\":\"object\"},\"profile\":{\"type\":\"array\"},\"residences\":{\"type\":\"array\"},\"revised\":{\"nullable\":true,\"type\":\"string\"},\"status\":{\"enum\":[\"Blank\",\"Closed\",\"Draft\",\"Inactive\",\"Reopened\",\"Submitted\",\"Withdrawn\"],\"type\":\"string\"},\"submitted\":{\"nullable\":true,\"type\":\"string\"},\"visa\":{\"type\":\"array\"}},\"type\":\"object\"},\"collected\":{\"type\":\"string\"},\"course\":{\"properties\":{\"accreditation\":{\"type\":\"string\"},\"code\":{\"type\":\"string\"},\"codeInternal\":{\"nullable\":true,\"type\":\"string\"},\"country\":{\"type\":\"string\"},\"credits\":{\"type\":\"string\"},\"duration\":{\"type\":\"string\"},\"featured\":{\"type\":\"string\"},\"id\":{\"type\":\"integer\"},\"institution\":{\"properties\":{\"address\":{\"type\":\"string\"},\"country\":{\"type\":\"string\"},\"departments\":{\"description\":\"Sub-resource (InstitutionDepartments); see the DreamApply SDK.\",\"type\":\"object\"},\"erasmus\":{\"type\":\"string\"},\"iban\":{\"type\":\"string\"},\"id\":{\"type\":\"integer\"},\"location\":{\"type\":\"string\"},\"name\":{\"type\":\"string\"},\"registration\":{\"type\":\"string\"},\"status\":{\"type\":\"string\"},\"vat\":{\"type\":\"string\"},\"www\":{\"type\":\"string\"}},\"type\":\"object\"},\"language\":{\"type\":\"string\"},\"location\":{\"type\":\"string\"},\"mode\":{\"type\":\"string\"},\"name\":{\"type\":\"string\"},\"quota\":{\"type\":\"string\"},\"status\":{\"enum\":[\"Archived\",\"Closed\",\"Draft\",\"Online\",\"Private\",\"Standby\"],\"type\":\"string\"},\"type\":{\"type\":\"string\"},\"updated\":{\"type\":\"string\"}},\"type\":\"object\"},\"currency\":{\"type\":\"string\"},\"deadline\":{\"type\":\"string\"},\"delivered\":{\"type\":\"string\"},\"id\":{\"type\":\"integer\"},\"instructions\":{\"type\":\"string\"},\"issued\":{\"type\":\"string\"},\"nr\":{\"type\":\"string\"},\"payer\":{\"properties\":{\"email\":{\"type\":\"string\"},\"name\":{\"type\":\"string\"}},\"type\":\"object\"},\"reminded\":{\"type\":\"string\"},\"smallprint\":{\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Invoice\"}},\"security\":[{\"apiKey\":[]}],\"securitySchemes\":{\"apiKey\":{\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"definition\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/invoices/{id}", "segments": [{ "lit": "invoices" }, { "var": "id" }], "select": { "exist": ["id"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" }, "remove": { "input": "data", "name": "remove", "points": [{ "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "id", "orig": "id", "reqd": true, "type": "`$INTEGER`", "index$": 0 }] }, "contract": { "id": "DELETE /invoices/{id}", "json": "{\"operationId\":\"deleteInvoice\",\"parameters\":[{\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"204\":{\"description\":\"Deleted\"}},\"security\":[{\"apiKey\":[]}],\"securitySchemes\":{\"apiKey\":{\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"definition\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "DELETE", "orig": "/invoices/{id}", "segments": [{ "lit": "invoices" }, { "var": "id" }], "select": { "exist": ["id"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" } }, "relations": { "ancestors": [] }, "key$": "invoice", "name__orig": "invoice", "Name": "Invoice", "name_": "invoice", "name-": "invoice", "NAME": "INVOICE", "index$": 9 }, { "active": true, "entity": "invoice", "key$": "BasicInvoiceFlow", "kind": "basic", "name": "BasicInvoiceFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": {}, "match": {}, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "invoice_ref01" } }], "index$": 0 }, { "active": true, "data": {}, "input": { "ref": "invoice_ref01", "srcdatavar": "invoice_ref01_data", "suffix": "_dt0" }, "match": { "id": "invoice01" }, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-invoice_ref01" } }], "index$": 1 }] }, 'Invoice');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let invoice_ref01_data = Object.values(setup.data.existing.invoice)[0];
        // LIST
        const invoice_ref01_ent = client.Invoice();
        const invoice_ref01_match = {};
        const invoice_ref01_list = (await invoice_ref01_ent.list(invoice_ref01_match)).map((e) => e.data());
        // LOAD
        const invoice_ref01_match_dt0 = {};
        invoice_ref01_match_dt0.id = invoice_ref01_data.id;
        const invoice_ref01_data_dt0 = (await invoice_ref01_ent.load(invoice_ref01_match_dt0)).data();
        (0, node_assert_1.default)(invoice_ref01_data_dt0.id === invoice_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/invoice/InvoiceTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.DreamapplySDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['invoice01', 'invoice02', 'invoice03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'DREAMAPPLY_TEST_INVOICE_ENTID': idmap,
        'DREAMAPPLY_TEST_LIVE': 'FALSE',
        'DREAMAPPLY_TEST_EXPLAIN': 'FALSE',
        'DREAMAPPLY_APIKEY': '',
        'DREAMAPPLY_SERVER_INSTANCE': "demo",
    });
    idmap = env['DREAMAPPLY_TEST_INVOICE_ENTID'];
    const live = 'TRUE' === env.DREAMAPPLY_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['DREAMAPPLY_TEST_INVOICE_ENTID'];
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
//# sourceMappingURL=InvoiceEntity.test.js.map