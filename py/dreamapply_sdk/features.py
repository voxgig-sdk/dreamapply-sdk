# Dreamapply SDK feature factory

from dreamapply_sdk.feature.base_feature import DreamapplyBaseFeature
from dreamapply_sdk.feature.debug_feature import DreamapplyDebugFeature
from dreamapply_sdk.feature.idempotency_feature import DreamapplyIdempotencyFeature
from dreamapply_sdk.feature.metrics_feature import DreamapplyMetricsFeature
from dreamapply_sdk.feature.paging_feature import DreamapplyPagingFeature
from dreamapply_sdk.feature.ratelimit_feature import DreamapplyRatelimitFeature
from dreamapply_sdk.feature.retry_feature import DreamapplyRetryFeature
from dreamapply_sdk.feature.test_feature import DreamapplyTestFeature
from dreamapply_sdk.feature.timeout_feature import DreamapplyTimeoutFeature


_FEATURES = {
    "base": lambda: DreamapplyBaseFeature(),
    "debug": lambda: DreamapplyDebugFeature(),
    "idempotency": lambda: DreamapplyIdempotencyFeature(),
    "metrics": lambda: DreamapplyMetricsFeature(),
    "paging": lambda: DreamapplyPagingFeature(),
    "ratelimit": lambda: DreamapplyRatelimitFeature(),
    "retry": lambda: DreamapplyRetryFeature(),
    "test": lambda: DreamapplyTestFeature(),
    "timeout": lambda: DreamapplyTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
