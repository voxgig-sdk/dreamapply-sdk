

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


describe('CourseEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DREAMAPPLY_TEST_LIVE=TRUE.
  afterEach(liveDelay('DREAMAPPLY_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DreamapplySDK.test()
    const ent = testsdk.Course()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('course hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of DreamapplySDK.test(offline).Course().stream('list')) { }
    }, /offline/)

    for await (const _item of DreamapplySDK.test(offline).Course()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = DreamapplySDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.Course().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of DreamapplySDK.test().Course().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new DreamapplySDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.Course().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.Course().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DreamapplySDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Course().list({"accreditation":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DREAMAPPLY_TEST_LIVE
    for (const op of ['create', 'list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'course.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"accreditation":{"a":true,"h":"Accreditation","n":"accreditation","r":false,"t":"`$STRING`","key$":"accreditation","index$":0},"awards_abbr":{"a":true,"h":"Awards Abbr","n":"awards_abbr","r":false,"t":"`$STRING`","key$":"awards_abbr","index$":1},"awards_full":{"a":true,"h":"Awards Full","n":"awards_full","r":false,"t":"`$STRING`","key$":"awards_full","index$":2},"code":{"a":true,"h":"Code","n":"code","r":false,"t":"`$STRING`","key$":"code","index$":3},"codeInternal":{"a":true,"h":"Code Internal","n":"codeInternal","r":false,"t":"`$STRING`","key$":"codeInternal","index$":4},"country":{"a":true,"h":"Country","n":"country","r":false,"t":"`$STRING`","key$":"country","index$":5},"credits":{"a":true,"h":"Credits","n":"credits","r":false,"t":"`$STRING`","key$":"credits","index$":6},"duration":{"a":true,"h":"Duration","n":"duration","r":false,"t":"`$STRING`","key$":"duration","index$":7},"featured":{"a":true,"h":"Featured","n":"featured","r":false,"t":"`$STRING`","key$":"featured","index$":8},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$INTEGER`","key$":"id","index$":9},"institution":{"a":true,"h":"Institution","n":"institution","r":false,"t":"`$OBJECT`","key$":"institution","index$":10},"language":{"a":true,"h":"Language","n":"language","r":false,"t":"`$STRING`","key$":"language","index$":11},"location":{"a":true,"h":"Location","n":"location","r":false,"t":"`$STRING`","key$":"location","index$":12},"mode":{"a":true,"h":"Mode","n":"mode","r":false,"t":"`$STRING`","key$":"mode","index$":13},"name":{"a":true,"h":"Name","n":"name","r":false,"t":"`$STRING`","key$":"name","index$":14},"prospect_uri":{"a":true,"h":"Prospect Uri","n":"prospect_uri","r":false,"t":"`$STRING`","key$":"prospect_uri","index$":15},"quota":{"a":true,"h":"Quota","n":"quota","r":false,"t":"`$STRING`","key$":"quota","index$":16},"status":{"a":true,"h":"Status","n":"status","r":false,"t":"`$STRING`","key$":"status","index$":17},"type":{"a":true,"h":"Type","n":"type","r":false,"t":"`$STRING`","key$":"type","index$":18},"updated":{"a":true,"h":"Updated","n":"updated","r":false,"t":"`$STRING`","key$":"updated","index$":19}},"id":{"field":"id","name":"id"},"name":"course","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["awards_abbr","awards_full","code","country","institution","language","location","mode","name","prospect_uri","type"],"co":{"id":"POST /courses","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/courses","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"courses"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /courses","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/courses","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"courses"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /courses/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/courses/{id}","q":{"exist":["id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"courses"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"course","name__orig":"course","Name":"Course","name_":"course","name-":"course","NAME":"COURSE","index$":5}, {"active":true,"entity":"course","key$":"BasicCourseFlow","kind":"basic","name":"BasicCourseFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"course_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"course_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"course_ref01","srcdatavar":"course_ref01_data","suffix":"_dt0"},"m":{"id":"course01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-course_ref01"}}],"index$":2}]}, 'Course', {"POST /courses":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"awards_abbr":{"type":"string","key$":"awards_abbr"},"awards_full":{"type":"string","key$":"awards_full"},"code":{"type":"string","key$":"code"},"country":{"type":"string","key$":"country"},"institution":{"type":"string","key$":"institution"},"language":{"type":"string","key$":"language"},"location":{"type":"string","key$":"location"},"mode":{"type":"string","key$":"mode"},"name":{"type":"string","key$":"name"},"prospect_uri":{"type":"string","key$":"prospect_uri"},"type":{"type":"string","key$":"type"}},"x-ref":"#/components/schemas/CourseCreate","index$":1}}}},"parameters":[]},"GET /courses":{"protocol":"http","parameters":[]},"GET /courses/{id}":{"protocol":"http","parameters":[{"name":"id","in":"path","required":true,"schema":{"type":"integer"},"index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const course_ref01_ent = client.Course()
    let course_ref01_data = setup.data.new.course['course_ref01']

    course_ref01_data = (await course_ref01_ent.create(course_ref01_data)).data()
    assert(null != course_ref01_data.id)


    // LIST
    const course_ref01_match: any = {}

    const course_ref01_list = (await course_ref01_ent.list(course_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(course_ref01_list, { id: course_ref01_data.id })))


    // LOAD
    const course_ref01_match_dt0: any = {}
    course_ref01_match_dt0.id = course_ref01_data.id
    const course_ref01_data_dt0 = (await course_ref01_ent.load(course_ref01_match_dt0)).data()
    assert(course_ref01_data_dt0.id === course_ref01_data.id)


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
      '../../../../.sdk/test/entity/course/CourseTestData.json')

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
    ['course01','course02','course03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DREAMAPPLY_TEST_COURSE_ENTID': idmap,
    'DREAMAPPLY_TEST_LIVE': 'FALSE',
    'DREAMAPPLY_TEST_EXPLAIN': 'FALSE',
    'DREAMAPPLY_APIKEY': '',
    'DREAMAPPLY_SERVER_INSTANCE': "demo",
  })

  idmap = env['DREAMAPPLY_TEST_COURSE_ENTID']

  const live = 'TRUE' === env.DREAMAPPLY_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DREAMAPPLY_TEST_COURSE_ENTID']
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
  
