
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { DreamapplySDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await DreamapplySDK.test()
    equal(null !== testsdk, true)
  })

})
