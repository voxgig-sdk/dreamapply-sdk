

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { DreamapplySDK, BaseFeature, config, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('ApplicationEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DREAMAPPLY_TEST_LIVE=TRUE.
  afterEach(liveDelay('DREAMAPPLY_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DreamapplySDK.test()
    const ent = testsdk.Application()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('application hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of DreamapplySDK.test(offline).Application().stream('list')) { }
    }, /offline/)

    for await (const _item of DreamapplySDK.test(offline).Application()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = DreamapplySDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.Application().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of DreamapplySDK.test().Application().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new DreamapplySDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.Application().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.Application().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DreamapplySDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Application().list({"created":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DREAMAPPLY_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'application.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"academicTerm":{"a":true,"h":"Academic Term","n":"academicTerm","r":false,"sh":"Sub-resource (AcademicTerm); see the DreamApply SDK.","t":"`$OBJECT`","key$":"academicTerm","index$":0},"activities":{"a":true,"h":"Activities","n":"activities","r":false,"t":"`$ARRAY`","key$":"activities","index$":1},"applicant":{"a":true,"h":"Applicant","n":"applicant","r":false,"t":"`$OBJECT`","key$":"applicant","index$":2},"career":{"a":true,"h":"Career","n":"career","r":false,"t":"`$ARRAY`","key$":"career","index$":3},"contact":{"a":true,"h":"Contact","n":"contact","r":false,"t":"`$ARRAY`","key$":"contact","index$":4},"created":{"a":true,"h":"Created","n":"created","r":false,"t":"`$STRING`","key$":"created","index$":5},"education":{"a":true,"h":"Education","n":"education","r":false,"t":"`$ARRAY`","key$":"education","index$":6},"extras":{"a":true,"h":"Extras","n":"extras","r":false,"t":"`$ARRAY`","key$":"extras","index$":7},"grades":{"a":true,"h":"Grades","n":"grades","r":false,"t":"`$ARRAY`","key$":"grades","index$":8},"home":{"a":true,"h":"Home","n":"home","r":false,"t":"`$ARRAY`","key$":"home","index$":9},"host":{"a":true,"h":"Host","n":"host","r":false,"t":"`$ARRAY`","key$":"host","index$":10},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$INTEGER`","key$":"id","index$":11},"languages":{"a":true,"h":"Languages","n":"languages","r":false,"t":"`$ARRAY`","key$":"languages","index$":12},"legal":{"a":true,"h":"Legal","n":"legal","r":false,"t":"`$ARRAY`","key$":"legal","index$":13},"misc":{"a":true,"h":"Misc","n":"misc","r":false,"t":"`$ARRAY`","key$":"misc","index$":14},"motivation":{"a":true,"h":"Motivation","n":"motivation","r":false,"t":"`$ARRAY`","key$":"motivation","index$":15},"pdf":{"a":true,"h":"Pdf","n":"pdf","r":false,"t":"`$OBJECT`","key$":"pdf","index$":16},"profile":{"a":true,"h":"Profile","n":"profile","r":false,"t":"`$ARRAY`","key$":"profile","index$":17},"residences":{"a":true,"h":"Residences","n":"residences","r":false,"t":"`$ARRAY`","key$":"residences","index$":18},"revised":{"a":true,"h":"Revised","n":"revised","r":false,"t":"`$STRING`","key$":"revised","index$":19},"status":{"a":true,"h":"Status","n":"status","r":false,"t":"`$STRING`","key$":"status","index$":20},"submitted":{"a":true,"h":"Submitted","n":"submitted","r":false,"t":"`$STRING`","key$":"submitted","index$":21},"visa":{"a":true,"h":"Visa","n":"visa","r":false,"t":"`$ARRAY`","key$":"visa","index$":22}},"id":{"field":"id","name":"id"},"name":"application","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /applications","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/applications","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"applications"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /applications/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/applications/{id}","q":{"exist":["id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"applications"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"application","name__orig":"application","Name":"Application","name_":"application","name-":"application","NAME":"APPLICATION","index$":4}, {"active":true,"entity":"application","key$":"BasicApplicationFlow","kind":"basic","name":"BasicApplicationFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"application_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"application_ref01","srcdatavar":"application_ref01_data","suffix":"_dt0"},"m":{"id":"application01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-application_ref01"}}],"index$":1}]}, 'Application', {"GET /applications":{"protocol":"http","parameters":[]},"GET /applications/{id}":{"protocol":"http","parameters":[{"name":"id","in":"path","required":true,"schema":{"type":"integer"},"index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let application_ref01_data = Object.values(setup.data.existing.application)[0] as any

    // LIST
    const application_ref01_ent = client.Application()
    const application_ref01_match: any = {}

    const application_ref01_list = (await application_ref01_ent.list(application_ref01_match)).map((e: any) => e.data())


    // LOAD
    const application_ref01_match_dt0: any = {}
    application_ref01_match_dt0.id = application_ref01_data.id
    const application_ref01_data_dt0 = (await application_ref01_ent.load(application_ref01_match_dt0)).data()
    assert(application_ref01_data_dt0.id === application_ref01_data.id)


  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/application/ApplicationTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = DreamapplySDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['application01','application02','application03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DREAMAPPLY_TEST_APPLICATION_ENTID': idmap,
    'DREAMAPPLY_TEST_LIVE': 'FALSE',
    'DREAMAPPLY_TEST_EXPLAIN': 'FALSE',
    'DREAMAPPLY_APIKEY': '',
    'DREAMAPPLY_SERVER_INSTANCE': "demo",
  })

  idmap = env['DREAMAPPLY_TEST_APPLICATION_ENTID']

  const live = 'TRUE' === env.DREAMAPPLY_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DREAMAPPLY_TEST_APPLICATION_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new DreamapplySDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
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
    ]))
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
  }

  return setup
}
  
