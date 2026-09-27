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
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "applicant": { "a": true, "h": "Applicant", "n": "applicant", "r": false, "t": "`$OBJECT`", "key$": "applicant", "index$": 0 }, "application": { "a": true, "h": "Application", "n": "application", "r": false, "t": "`$OBJECT`", "key$": "application", "index$": 1 }, "collected": { "a": true, "h": "Collected", "n": "collected", "r": false, "t": "`$STRING`", "key$": "collected", "index$": 2 }, "course": { "a": true, "h": "Course", "n": "course", "r": false, "t": "`$OBJECT`", "key$": "course", "index$": 3 }, "currency": { "a": true, "h": "Currency", "n": "currency", "r": false, "t": "`$STRING`", "key$": "currency", "index$": 4 }, "deadline": { "a": true, "h": "Deadline", "n": "deadline", "r": false, "t": "`$STRING`", "key$": "deadline", "index$": 5 }, "delivered": { "a": true, "h": "Delivered", "n": "delivered", "r": false, "t": "`$STRING`", "key$": "delivered", "index$": 6 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "t": "`$INTEGER`", "key$": "id", "index$": 7 }, "instructions": { "a": true, "h": "Instructions", "n": "instructions", "r": false, "t": "`$STRING`", "key$": "instructions", "index$": 8 }, "issued": { "a": true, "h": "Issued", "n": "issued", "r": false, "t": "`$STRING`", "key$": "issued", "index$": 9 }, "nr": { "a": true, "h": "Nr", "n": "nr", "r": false, "t": "`$STRING`", "key$": "nr", "index$": 10 }, "payer": { "a": true, "h": "Payer", "n": "payer", "r": false, "t": "`$OBJECT`", "key$": "payer", "index$": 11 }, "reminded": { "a": true, "h": "Reminded", "n": "reminded", "r": false, "t": "`$STRING`", "key$": "reminded", "index$": 12 }, "smallprint": { "a": true, "h": "Smallprint", "n": "smallprint", "r": false, "t": "`$STRING`", "key$": "smallprint", "index$": 13 } }, "id": { "field": "id", "name": "id" }, "name": "invoice", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /invoices", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/invoices", "q": {}, "r": {}, "s": [{ "lit": "invoices" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /invoices/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/invoices/{id}", "q": { "exist": ["id"] }, "r": {}, "s": [{ "lit": "invoices" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /invoices/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "DELETE", "o": "/invoices/{id}", "q": { "exist": ["id"] }, "r": {}, "s": [{ "lit": "invoices" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" } }, "relations": { "ancestors": [] }, "key$": "invoice", "name__orig": "invoice", "Name": "Invoice", "name_": "invoice", "name-": "invoice", "NAME": "INVOICE", "index$": 9 }, { "active": true, "entity": "invoice", "key$": "BasicInvoiceFlow", "kind": "basic", "name": "BasicInvoiceFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "invoice_ref01" } }], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "invoice_ref01", "srcdatavar": "invoice_ref01_data", "suffix": "_dt0" }, "m": { "id": "invoice01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-invoice_ref01" } }], "index$": 1 }] }, 'Invoice', { "GET /invoices": { "protocol": "http", "parameters": [] }, "GET /invoices/{id}": { "protocol": "http", "parameters": [{ "name": "id", "in": "path", "required": true, "schema": { "type": "integer" }, "index$": 0 }] }, "DELETE /invoices/{id}": { "protocol": "http", "parameters": [{ "name": "id", "in": "path", "required": true, "schema": { "type": "integer" }, "index$": 0 }] } });
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