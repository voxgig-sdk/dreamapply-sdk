"use strict";
// Dreamapply Ts SDK
Object.defineProperty(exports, "__esModule", { value: true });
exports.SDK = exports.DreamapplySDK = exports.DreamapplyEntityBase = exports.BaseFeature = exports.config = exports.stdutil = void 0;
const AcademicTermEntity_1 = require("./entity/AcademicTermEntity");
const AcademicYearEntity_1 = require("./entity/AcademicYearEntity");
const AdministratorEntity_1 = require("./entity/AdministratorEntity");
const ApplicantEntity_1 = require("./entity/ApplicantEntity");
const ApplicationEntity_1 = require("./entity/ApplicationEntity");
const CourseEntity_1 = require("./entity/CourseEntity");
const FeeEntity_1 = require("./entity/FeeEntity");
const InstitutionEntity_1 = require("./entity/InstitutionEntity");
const IntakeEntity_1 = require("./entity/IntakeEntity");
const InvoiceEntity_1 = require("./entity/InvoiceEntity");
const JournalEntity_1 = require("./entity/JournalEntity");
const LoginEntity_1 = require("./entity/LoginEntity");
const ScoresheetEntity_1 = require("./entity/ScoresheetEntity");
const TableViewEntity_1 = require("./entity/TableViewEntity");
const node_util_1 = require("node:util");
const Config_1 = require("./Config");
Object.defineProperty(exports, "config", { enumerable: true, get: function () { return Config_1.config; } });
const DreamapplyEntityBase_1 = require("./DreamapplyEntityBase");
Object.defineProperty(exports, "DreamapplyEntityBase", { enumerable: true, get: function () { return DreamapplyEntityBase_1.DreamapplyEntityBase; } });
const Utility_1 = require("./utility/Utility");
const BaseFeature_1 = require("./feature/base/BaseFeature");
Object.defineProperty(exports, "BaseFeature", { enumerable: true, get: function () { return BaseFeature_1.BaseFeature; } });
const stdutil = new Utility_1.Utility();
exports.stdutil = stdutil;
class DreamapplySDK {
    _mode = 'live';
    _options;
    _utility = new Utility_1.Utility();
    _features;
    _rootctx;
    constructor(options) {
        this._rootctx = this._utility.makeContext({
            client: this,
            utility: this._utility,
            config: Config_1.config,
            options,
            shared: new WeakMap()
        });
        this._options = this._utility.makeOptions(this._rootctx);
        const struct = this._utility.struct;
        const getpath = struct.getpath;
        if (true === getpath(this._options.feature, 'test.active')) {
            this._mode = 'test';
        }
        this._rootctx.options = this._options;
        this._features = [];
        const featureAdd = this._utility.featureAdd;
        const featureInit = this._utility.featureInit;
        // Add features in the resolved order (makeOptions puts an explicit
        // array order first, else defaults to test-first). Ordering matters:
        // the `test` feature installs the base mock transport and the transport
        // features (retry/cache/netsim/proxy/ratelimit) wrap whatever is current,
        // so `test` must be added before them to sit at the base of the chain.
        const featureorder = getpath(this._options, '__derived__.featureorder') || [];
        for (const fname of featureorder) {
            const fopts = this._options.feature[fname] || {};
            if (fopts.active) {
                featureAdd(this._rootctx, this._rootctx.config.makeFeature(fname));
            }
        }
        if (null != this._options.extend) {
            for (let f of this._options.extend) {
                featureAdd(this._rootctx, f);
            }
        }
        for (let f of this._features) {
            featureInit(this._rootctx, f);
        }
        const featureHook = this._utility.featureHook;
        featureHook(this._rootctx, 'PostConstruct');
    }
    options() {
        return this._utility.struct.clone(this._options);
    }
    utility() {
        return this._utility.struct.clone(this._utility);
    }
    async prepare(fetchargs) {
        const utility = this._utility;
        const struct = utility.struct;
        const clone = struct.clone;
        const { makeContext, makeFetchDef, prepareHeaders, prepareAuth, } = utility;
        fetchargs = fetchargs || {};
        let ctx = makeContext({
            opname: 'prepare',
            ctrl: fetchargs.ctrl || {},
        }, this._rootctx);
        const options = this._options;
        // Build spec directly from SDK options + user-provided fetch args.
        const spec = {
            base: options.base,
            prefix: options.prefix,
            suffix: options.suffix,
            path: fetchargs.path || '',
            method: fetchargs.method || 'GET',
            params: fetchargs.params || {},
            query: fetchargs.query || {},
            headers: prepareHeaders(ctx),
            body: fetchargs.body,
            step: 'start',
        };
        ctx.spec = spec;
        // Merge user-provided headers over SDK defaults.
        if (fetchargs.headers) {
            const uheaders = fetchargs.headers;
            for (let key in uheaders) {
                spec.headers[key] = uheaders[key];
            }
        }
        // Apply SDK auth (apikey, auth prefix, etc.)
        const authResult = prepareAuth(ctx);
        if (authResult instanceof Error) {
            return authResult;
        }
        return makeFetchDef(ctx);
    }
    async direct(fetchargs) {
        const utility = this._utility;
        const fetcher = utility.fetcher;
        const makeContext = utility.makeContext;
        const fetchdef = await this.prepare(fetchargs);
        if (fetchdef instanceof Error) {
            return fetchdef;
        }
        let ctx = makeContext({
            opname: 'direct',
            ctrl: (fetchargs || {}).ctrl || {},
        }, this._rootctx);
        try {
            const fetched = await fetcher(ctx, fetchdef.url, fetchdef);
            if (null == fetched) {
                return { ok: false, err: ctx.error('direct_no_response', 'response: undefined') };
            }
            else if (fetched instanceof Error) {
                return { ok: false, err: fetched };
            }
            const status = fetched.status;
            // No body responses (204 No Content, 304 Not Modified) and explicit
            // zero content-length must skip JSON parsing — fetched.json() would
            // throw `Unexpected end of JSON input` on an empty body.
            const headers = fetched.headers;
            const contentLength = headers && 'function' === typeof headers.get
                ? headers.get('content-length')
                : (headers || {})['content-length'];
            const noBody = 204 === status || 304 === status || '0' === String(contentLength);
            let json = undefined;
            if (!noBody) {
                try {
                    json = 'function' === typeof fetched.json ? await fetched.json() : fetched.json;
                }
                catch (parseErr) {
                    // Body wasn't valid JSON — surface the raw response rather than
                    // throwing. data stays undefined; callers can inspect status/headers.
                    json = undefined;
                }
            }
            return {
                ok: status >= 200 && status < 300,
                status,
                headers: fetched.headers,
                data: json,
            };
        }
        catch (err) {
            return { ok: false, err };
        }
    }
    // Entity access: `client.AcademicTerm().list()` / `client.AcademicTerm().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AcademicTerm(entopts) {
        const self = this;
        return new AcademicTermEntity_1.AcademicTermEntity(self, entopts);
    }
    // Entity access: `client.AcademicYear().list()` / `client.AcademicYear().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AcademicYear(entopts) {
        const self = this;
        return new AcademicYearEntity_1.AcademicYearEntity(self, entopts);
    }
    // Entity access: `client.Administrator().list()` / `client.Administrator().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Administrator(entopts) {
        const self = this;
        return new AdministratorEntity_1.AdministratorEntity(self, entopts);
    }
    // Entity access: `client.Applicant().list()` / `client.Applicant().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Applicant(entopts) {
        const self = this;
        return new ApplicantEntity_1.ApplicantEntity(self, entopts);
    }
    // Entity access: `client.Application().list()` / `client.Application().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Application(entopts) {
        const self = this;
        return new ApplicationEntity_1.ApplicationEntity(self, entopts);
    }
    // Entity access: `client.Course().list()` / `client.Course().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Course(entopts) {
        const self = this;
        return new CourseEntity_1.CourseEntity(self, entopts);
    }
    // Entity access: `client.Fee().list()` / `client.Fee().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Fee(entopts) {
        const self = this;
        return new FeeEntity_1.FeeEntity(self, entopts);
    }
    // Entity access: `client.Institution().list()` / `client.Institution().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Institution(entopts) {
        const self = this;
        return new InstitutionEntity_1.InstitutionEntity(self, entopts);
    }
    // Entity access: `client.Intake().list()` / `client.Intake().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Intake(entopts) {
        const self = this;
        return new IntakeEntity_1.IntakeEntity(self, entopts);
    }
    // Entity access: `client.Invoice().list()` / `client.Invoice().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Invoice(entopts) {
        const self = this;
        return new InvoiceEntity_1.InvoiceEntity(self, entopts);
    }
    // Entity access: `client.Journal().list()` / `client.Journal().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Journal(entopts) {
        const self = this;
        return new JournalEntity_1.JournalEntity(self, entopts);
    }
    // Entity access: `client.Login().list()` / `client.Login().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Login(entopts) {
        const self = this;
        return new LoginEntity_1.LoginEntity(self, entopts);
    }
    // Entity access: `client.Scoresheet().list()` / `client.Scoresheet().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Scoresheet(entopts) {
        const self = this;
        return new ScoresheetEntity_1.ScoresheetEntity(self, entopts);
    }
    // Entity access: `client.TableView().list()` / `client.TableView().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    TableView(entopts) {
        const self = this;
        return new TableViewEntity_1.TableViewEntity(self, entopts);
    }
    static test(testoptsarg, sdkoptsarg) {
        const struct = stdutil.struct;
        const setpath = struct.setpath;
        const getdef = struct.getdef;
        const clone = struct.clone;
        const setprop = struct.setprop;
        const sdkopts = getdef(clone(sdkoptsarg), {});
        const testopts = getdef(clone(testoptsarg), {});
        setprop(testopts, 'active', true);
        setpath(sdkopts, 'feature.test', testopts);
        const testsdk = new DreamapplySDK(sdkopts);
        testsdk._mode = 'test';
        return testsdk;
    }
    tester(testopts, sdkopts) {
        return DreamapplySDK.test(testopts, sdkopts);
    }
    toJSON() {
        return { name: 'Dreamapply' };
    }
    toString() {
        return 'Dreamapply ' + this._utility.struct.jsonify(this.toJSON());
    }
    [node_util_1.inspect.custom]() {
        return this.toString();
    }
}
exports.DreamapplySDK = DreamapplySDK;
const SDK = DreamapplySDK;
exports.SDK = SDK;
//# sourceMappingURL=DreamapplySDK.js.map