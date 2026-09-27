
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { DreamapplySDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = DreamapplySDK.test()
    equal(testsdk instanceof DreamapplySDK, true,
      'DreamapplySDK.test() must return a client synchronously')
  })

})
