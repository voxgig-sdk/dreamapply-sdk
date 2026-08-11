# Dreamapply SDK

from dreamapply_sdk.utility.voxgig_struct import voxgig_struct as vs
from dreamapply_sdk.core.utility_type import DreamapplyUtility
from dreamapply_sdk.core.spec import DreamapplySpec
from dreamapply_sdk.core import helpers

# Load utility registration (populates Utility._registrar)
from dreamapply_sdk.utility import register

# Load features
from dreamapply_sdk.feature.base_feature import DreamapplyBaseFeature
from dreamapply_sdk.features import _make_feature


class DreamapplySDK:

    def __init__(self, options=None):
        self.mode = "live"
        self.features = []
        self.options = None

        utility = DreamapplyUtility()
        self._utility = utility

        from dreamapply_sdk.config import make_config
        config = make_config()

        self._rootctx = utility.make_context({
            "client": self,
            "utility": utility,
            "config": config,
            "options": options if options is not None else {},
            "shared": {},
        }, None)

        self.options = utility.make_options(self._rootctx)

        if vs.getpath(self.options, "feature.test.active") is True:
            self.mode = "test"

        self._rootctx.options = self.options

        # Add features in the resolved order (make_options puts an explicit
        # list order first, else defaults to test-first). Ordering matters: the
        # `test` feature installs the base mock transport and the transport
        # features (retry/cache/netsim/proxy/ratelimit) wrap whatever is
        # current, so `test` must be added before them to sit at the base.
        feature_opts = helpers.to_map(vs.getprop(self.options, "feature"))
        if feature_opts is not None:
            featureorder = vs.getpath(self.options, "__derived__.featureorder")
            if isinstance(featureorder, list):
                for fname in featureorder:
                    fopts = helpers.to_map(feature_opts.get(fname))
                    if fopts is not None and fopts.get("active") is True:
                        utility.feature_add(self._rootctx, _make_feature(fname))

        # Add extension features.
        extend = vs.getprop(self.options, "extend")
        if isinstance(extend, list):
            for f in extend:
                if isinstance(f, dict) or (hasattr(f, "get_name") and callable(f.get_name)):
                    utility.feature_add(self._rootctx, f)

        # Initialize features.
        for f in self.features:
            utility.feature_init(self._rootctx, f)

        utility.feature_hook(self._rootctx, "PostConstruct")

        # #BuildFeatures

    def options_map(self):
        out = vs.clone(self.options)
        if isinstance(out, dict):
            return out
        return {}

    def get_utility(self):
        return DreamapplyUtility.copy(self._utility)

    def get_root_ctx(self):
        return self._rootctx

    def prepare(self, fetchargs=None):
        utility = self._utility

        if fetchargs is None:
            fetchargs = {}

        ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl"))
        if ctrl is None:
            ctrl = {}

        ctx = utility.make_context({
            "opname": "prepare",
            "ctrl": ctrl,
        }, self._rootctx)

        options = self.options

        path = vs.getprop(fetchargs, "path") or ""
        if not isinstance(path, str):
            path = ""

        method = vs.getprop(fetchargs, "method") or "GET"
        if not isinstance(method, str):
            method = "GET"

        params = helpers.to_map(vs.getprop(fetchargs, "params"))
        if params is None:
            params = {}
        query = helpers.to_map(vs.getprop(fetchargs, "query"))
        if query is None:
            query = {}

        headers = utility.prepare_headers(ctx)

        base = vs.getprop(options, "base") or ""
        if not isinstance(base, str):
            base = ""
        prefix = vs.getprop(options, "prefix") or ""
        if not isinstance(prefix, str):
            prefix = ""
        suffix = vs.getprop(options, "suffix") or ""
        if not isinstance(suffix, str):
            suffix = ""

        ctx.spec = DreamapplySpec({
            "base": base,
            "prefix": prefix,
            "suffix": suffix,
            "path": path,
            "method": method,
            "params": params,
            "query": query,
            "headers": headers,
            "body": vs.getprop(fetchargs, "body"),
            "step": "start",
        })

        # Merge user-provided headers.
        uh = vs.getprop(fetchargs, "headers")
        if isinstance(uh, dict):
            for k, v in uh.items():
                ctx.spec.headers[k] = v

        _, err = utility.prepare_auth(ctx)
        if err is not None:
            raise err

        fetchdef, err = utility.make_fetch_def(ctx)
        if err is not None:
            raise err

        return fetchdef

    def direct(self, fetchargs=None):
        utility = self._utility

        try:
            fetchdef = self.prepare(fetchargs)
        except Exception as err:
            # direct() is the raw-HTTP escape hatch: it never raises, it
            # returns a result object callers branch on via result["ok"].
            return {"ok": False, "err": err}

        if fetchargs is None:
            fetchargs = {}
        ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl"))
        if ctrl is None:
            ctrl = {}

        ctx = utility.make_context({
            "opname": "direct",
            "ctrl": ctrl,
        }, self._rootctx)

        url = fetchdef.get("url", "")
        fetched, fetch_err = utility.fetcher(ctx, url, fetchdef)

        if fetch_err is not None:
            return {"ok": False, "err": fetch_err}

        if fetched is None:
            return {
                "ok": False,
                "err": ctx.make_error("direct_no_response", "response: undefined"),
            }

        if isinstance(fetched, dict):
            status = helpers.to_int(vs.getprop(fetched, "status"))
            headers = vs.getprop(fetched, "headers") or {}

            # No-body responses (204, 304) and explicit zero content-length
            # must skip JSON parsing — calling json() on an empty body raises.
            content_length = None
            if isinstance(headers, dict):
                content_length = headers.get("content-length")
            no_body = status in (204, 304) or str(content_length) == "0"

            json_data = None
            if not no_body:
                jf = vs.getprop(fetched, "json")
                if callable(jf):
                    try:
                        json_data = jf()
                    except Exception:
                        # Non-JSON body (e.g. text/plain, text/html). Surface
                        # status + headers but leave data as None.
                        json_data = None

            return {
                "ok": status >= 200 and status < 300,
                "status": status,
                "headers": headers,
                "data": json_data,
            }

        return {
            "ok": False,
            "err": ctx.make_error("direct_invalid", "invalid response type"),
        }


    def AcademicTerm(self, data=None) -> "AcademicTermEntity":
        """Entity factory: client.AcademicTerm().list() / client.AcademicTerm().load({"id": ...})."""
        from dreamapply_sdk.entity.academic_term_entity import AcademicTermEntity
        return AcademicTermEntity(self, data)


    def AcademicYear(self, data=None) -> "AcademicYearEntity":
        """Entity factory: client.AcademicYear().list() / client.AcademicYear().load({"id": ...})."""
        from dreamapply_sdk.entity.academic_year_entity import AcademicYearEntity
        return AcademicYearEntity(self, data)


    def Administrator(self, data=None) -> "AdministratorEntity":
        """Entity factory: client.Administrator().list() / client.Administrator().load({"id": ...})."""
        from dreamapply_sdk.entity.administrator_entity import AdministratorEntity
        return AdministratorEntity(self, data)


    def Applicant(self, data=None) -> "ApplicantEntity":
        """Entity factory: client.Applicant().list() / client.Applicant().load({"id": ...})."""
        from dreamapply_sdk.entity.applicant_entity import ApplicantEntity
        return ApplicantEntity(self, data)


    def Application(self, data=None) -> "ApplicationEntity":
        """Entity factory: client.Application().list() / client.Application().load({"id": ...})."""
        from dreamapply_sdk.entity.application_entity import ApplicationEntity
        return ApplicationEntity(self, data)


    def Course(self, data=None) -> "CourseEntity":
        """Entity factory: client.Course().list() / client.Course().load({"id": ...})."""
        from dreamapply_sdk.entity.course_entity import CourseEntity
        return CourseEntity(self, data)


    def Fee(self, data=None) -> "FeeEntity":
        """Entity factory: client.Fee().list() / client.Fee().load({"id": ...})."""
        from dreamapply_sdk.entity.fee_entity import FeeEntity
        return FeeEntity(self, data)


    def Institution(self, data=None) -> "InstitutionEntity":
        """Entity factory: client.Institution().list() / client.Institution().load({"id": ...})."""
        from dreamapply_sdk.entity.institution_entity import InstitutionEntity
        return InstitutionEntity(self, data)


    def Intake(self, data=None) -> "IntakeEntity":
        """Entity factory: client.Intake().list() / client.Intake().load({"id": ...})."""
        from dreamapply_sdk.entity.intake_entity import IntakeEntity
        return IntakeEntity(self, data)


    def Invoice(self, data=None) -> "InvoiceEntity":
        """Entity factory: client.Invoice().list() / client.Invoice().load({"id": ...})."""
        from dreamapply_sdk.entity.invoice_entity import InvoiceEntity
        return InvoiceEntity(self, data)


    def Journal(self, data=None) -> "JournalEntity":
        """Entity factory: client.Journal().list() / client.Journal().load({"id": ...})."""
        from dreamapply_sdk.entity.journal_entity import JournalEntity
        return JournalEntity(self, data)


    def Login(self, data=None) -> "LoginEntity":
        """Entity factory: client.Login().list() / client.Login().load({"id": ...})."""
        from dreamapply_sdk.entity.login_entity import LoginEntity
        return LoginEntity(self, data)


    def Scoresheet(self, data=None) -> "ScoresheetEntity":
        """Entity factory: client.Scoresheet().list() / client.Scoresheet().load({"id": ...})."""
        from dreamapply_sdk.entity.scoresheet_entity import ScoresheetEntity
        return ScoresheetEntity(self, data)


    def TableView(self, data=None) -> "TableViewEntity":
        """Entity factory: client.TableView().list() / client.TableView().load({"id": ...})."""
        from dreamapply_sdk.entity.table_view_entity import TableViewEntity
        return TableViewEntity(self, data)



    @classmethod
    def test(cls, testopts=None, sdkopts=None) -> "DreamapplySDK":
        if sdkopts is None:
            sdkopts = {}
        sdkopts = vs.clone(sdkopts)
        if not isinstance(sdkopts, dict):
            sdkopts = {}

        if testopts is None:
            testopts = {}
        testopts = vs.clone(testopts)
        if not isinstance(testopts, dict):
            testopts = {}
        testopts["active"] = True

        vs.setpath(sdkopts, "feature.test", testopts)

        sdk = cls(sdkopts)
        sdk.mode = "test"

        return sdk


from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from dreamapply_sdk.entity.academic_term_entity import AcademicTermEntity
    from dreamapply_sdk.entity.academic_year_entity import AcademicYearEntity
    from dreamapply_sdk.entity.administrator_entity import AdministratorEntity
    from dreamapply_sdk.entity.applicant_entity import ApplicantEntity
    from dreamapply_sdk.entity.application_entity import ApplicationEntity
    from dreamapply_sdk.entity.course_entity import CourseEntity
    from dreamapply_sdk.entity.fee_entity import FeeEntity
    from dreamapply_sdk.entity.institution_entity import InstitutionEntity
    from dreamapply_sdk.entity.intake_entity import IntakeEntity
    from dreamapply_sdk.entity.invoice_entity import InvoiceEntity
    from dreamapply_sdk.entity.journal_entity import JournalEntity
    from dreamapply_sdk.entity.login_entity import LoginEntity
    from dreamapply_sdk.entity.scoresheet_entity import ScoresheetEntity
    from dreamapply_sdk.entity.table_view_entity import TableViewEntity
