# Dreamapply SDK feature factory

from dreamapply_sdk.feature.base_feature import DreamapplyBaseFeature
from dreamapply_sdk.feature.test_feature import DreamapplyTestFeature


def _make_feature(name):
    features = {
        "base": lambda: DreamapplyBaseFeature(),
        "test": lambda: DreamapplyTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
