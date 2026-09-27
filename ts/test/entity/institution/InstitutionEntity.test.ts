

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


describe('InstitutionEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DREAMAPPLY_TEST_LIVE=TRUE.
  afterEach(liveDelay('DREAMAPPLY_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DreamapplySDK.test()
    const ent = testsdk.Institution()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DREAMAPPLY_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'institution.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"address":{"a":true,"h":"Address","n":"address","r":false,"t":"`$STRING`","key$":"address","index$":0},"country":{"a":true,"h":"Country","n":"country","r":false,"t":"`$STRING`","key$":"country","index$":1},"departments":{"a":true,"h":"Departments","n":"departments","r":false,"sh":"Sub-resource (InstitutionDepartments); see the DreamApply SDK.","t":"`$OBJECT`","key$":"departments","index$":2},"erasmus":{"a":true,"h":"Erasmus","n":"erasmus","r":false,"t":"`$STRING`","key$":"erasmus","index$":3},"iban":{"a":true,"h":"Iban","n":"iban","r":false,"t":"`$STRING`","key$":"iban","index$":4},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$INTEGER`","key$":"id","index$":5},"location":{"a":true,"h":"Location","n":"location","r":false,"t":"`$STRING`","key$":"location","index$":6},"name":{"a":true,"h":"Name","n":"name","r":false,"t":"`$STRING`","key$":"name","index$":7},"registration":{"a":true,"h":"Registration","n":"registration","r":false,"t":"`$STRING`","key$":"registration","index$":8},"status":{"a":true,"h":"Status","n":"status","r":false,"t":"`$STRING`","key$":"status","index$":9},"vat":{"a":true,"h":"Vat","n":"vat","r":false,"t":"`$STRING`","key$":"vat","index$":10},"www":{"a":true,"h":"Www","n":"www","r":false,"t":"`$STRING`","key$":"www","index$":11}},"id":{"field":"id","name":"id"},"name":"institution","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /institutions","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/institutions","q":{},"r":{},"s":[{"lit":"institutions"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /institutions/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/institutions/{id}","q":{"exist":["id"]},"r":{},"s":[{"lit":"institutions"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.departments`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"institution","name__orig":"institution","Name":"Institution","name_":"institution","name-":"institution","NAME":"INSTITUTION","index$":7}, {"active":true,"entity":"institution","key$":"BasicInstitutionFlow","kind":"basic","name":"BasicInstitutionFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"institution_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"institution_ref01","srcdatavar":"institution_ref01_data","suffix":"_dt0"},"m":{"id":"institution01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-institution_ref01"}}],"index$":1}]}, 'Institution', {"GET /institutions":{"protocol":"http","parameters":[]},"GET /institutions/{id}":{"protocol":"http","parameters":[{"name":"id","in":"path","required":true,"schema":{"type":"integer"},"index$":0}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let institution_ref01_data = Object.values(setup.data.existing.institution)[0] as any

    // LIST
    const institution_ref01_ent = client.Institution()
    const institution_ref01_match: any = {}

    const institution_ref01_list = (await institution_ref01_ent.list(institution_ref01_match)).map((e: any) => e.data())


    // LOAD
    const institution_ref01_match_dt0: any = {}
    institution_ref01_match_dt0.id = institution_ref01_data.id
    const institution_ref01_data_dt0 = (await institution_ref01_ent.load(institution_ref01_match_dt0)).data()
    assert(institution_ref01_data_dt0.id === institution_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/institution/InstitutionTestData.json')

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
    ['institution01','institution02','institution03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DREAMAPPLY_TEST_INSTITUTION_ENTID': idmap,
    'DREAMAPPLY_TEST_LIVE': 'FALSE',
    'DREAMAPPLY_TEST_EXPLAIN': 'FALSE',
    'DREAMAPPLY_APIKEY': '',
    'DREAMAPPLY_SERVER_INSTANCE': "demo",
  })

  idmap = env['DREAMAPPLY_TEST_INSTITUTION_ENTID']

  const live = 'TRUE' === env.DREAMAPPLY_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DREAMAPPLY_TEST_INSTITUTION_ENTID']
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
  
