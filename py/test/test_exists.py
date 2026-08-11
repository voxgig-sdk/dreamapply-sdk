# ProjectName SDK exists test

import pytest
from dreamapply_sdk import DreamapplySDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = DreamapplySDK.test(None, None)
        assert testsdk is not None
