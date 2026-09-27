

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { DreamapplySDK, BaseFeature, stdutil } from '../../..'

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


describe('AcademicTermEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DREAMAPPLY_TEST_LIVE=TRUE.
  afterEach(liveDelay('DREAMAPPLY_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DreamapplySDK.test()
    const ent = testsdk.AcademicTerm()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DREAMAPPLY_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'academic_term.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"finish":{"a":true,"h":"Finish","n":"finish","r":false,"t":"`$STRING`","key$":"finish","index$":0},"grace":{"a":true,"h":"Grace","n":"grace","r":false,"t":"`$STRING`","key$":"grace","index$":1},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$INTEGER`","key$":"id","index$":2},"name":{"a":true,"h":"Name","n":"name","r":false,"t":"`$STRING`","key$":"name","index$":3},"start":{"a":true,"h":"Start","n":"start","r":false,"t":"`$STRING`","key$":"start","index$":4},"type":{"a":true,"h":"Type","n":"type","r":false,"t":"`$OBJECT`","key$":"type","index$":5},"year":{"a":true,"h":"Year","n":"year","r":false,"t":"`$OBJECT`","key$":"year","index$":6}},"id":{"field":"id","name":"id"},"name":"academic_term","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /academic-terms","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/academic-terms","q":{},"r":{},"s":[{"lit":"academic-terms"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /academic-terms/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/academic-terms/{id}","q":{"exist":["id"]},"r":{},"s":[{"lit":"academic-terms"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"academic_term","name__orig":"academic_term","Name":"AcademicTerm","name_":"academic_term","name-":"academic-term","NAME":"ACADEMIC_TERM","index$":0}, {"active":true,"entity":"academic_term","key$":"BasicAcademicTermFlow","kind":"basic","name":"BasicAcademicTermFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"academic_term_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"academic_term_ref01","srcdatavar":"academic_term_ref01_data","suffix":"_dt0"},"m":{"id":"academic_term01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-academic_term_ref01"}}],"index$":1}]}, 'AcademicTerm', {"GET /academic-terms":{"protocol":"http","parameters":[]},"GET /academic-terms/{id}":{"protocol":"http","parameters":[{"name":"id","in":"path","required":true,"schema":{"type":"integer"},"index$":0}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let academic_term_ref01_data = Object.values(setup.data.existing.academic_term)[0] as any

    // LIST
    const academic_term_ref01_ent = client.AcademicTerm()
    const academic_term_ref01_match: any = {}

    const academic_term_ref01_list = (await academic_term_ref01_ent.list(academic_term_ref01_match)).map((e: any) => e.data())


    // LOAD
    const academic_term_ref01_match_dt0: any = {}
    academic_term_ref01_match_dt0.id = academic_term_ref01_data.id
    const academic_term_ref01_data_dt0 = (await academic_term_ref01_ent.load(academic_term_ref01_match_dt0)).data()
    assert(academic_term_ref01_data_dt0.id === academic_term_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/academic_term/AcademicTermTestData.json')

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
    ['academic_term01','academic_term02','academic_term03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DREAMAPPLY_TEST_ACADEMIC_TERM_ENTID': idmap,
    'DREAMAPPLY_TEST_LIVE': 'FALSE',
    'DREAMAPPLY_TEST_EXPLAIN': 'FALSE',
    'DREAMAPPLY_APIKEY': '',
    'DREAMAPPLY_SERVER_INSTANCE': "demo",
  })

  idmap = env['DREAMAPPLY_TEST_ACADEMIC_TERM_ENTID']

  const live = 'TRUE' === env.DREAMAPPLY_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DREAMAPPLY_TEST_ACADEMIC_TERM_ENTID']
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
  
