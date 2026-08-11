# Dreamapply SDK utility: make_context

from dreamapply_sdk.core.context import DreamapplyContext


def make_context_util(ctxmap, basectx):
    return DreamapplyContext(ctxmap, basectx)
