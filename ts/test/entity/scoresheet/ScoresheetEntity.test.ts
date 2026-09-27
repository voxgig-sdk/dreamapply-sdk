

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


describe('ScoresheetEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DREAMAPPLY_TEST_LIVE=TRUE.
  afterEach(liveDelay('DREAMAPPLY_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DreamapplySDK.test()
    const ent = testsdk.Scoresheet()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DREAMAPPLY_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'scoresheet.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"confirmed":{"a":true,"h":"Confirmed","n":"confirmed","r":false,"t":"`$STRING`","key$":"confirmed","index$":0},"created":{"a":true,"h":"Created","n":"created","r":false,"t":"`$STRING`","key$":"created","index$":1},"date":{"a":true,"h":"Date","n":"date","r":false,"t":"`$STRING`","key$":"date","index$":2},"depth":{"a":true,"h":"Depth","n":"depth","r":false,"t":"`$STRING`","key$":"depth","index$":3},"group":{"a":true,"h":"Group","n":"group","r":false,"sh":"Sub-resource (object); see the DreamApply SDK.","t":"`$OBJECT`","key$":"group","index$":4},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":5},"instructions":{"a":true,"h":"Instructions","n":"instructions","r":false,"t":"`$STRING`","key$":"instructions","index$":6},"language":{"a":true,"h":"Language","n":"language","r":false,"t":"`$STRING`","key$":"language","index$":7},"maps":{"a":true,"h":"Maps","n":"maps","r":false,"t":"`$ARRAY`","key$":"maps","index$":8},"name":{"a":true,"h":"Name","n":"name","r":false,"t":"`$STRING`","key$":"name","index$":9},"rangeMax":{"a":true,"h":"Range Max","n":"rangeMax","r":false,"t":"`$STRING`","key$":"rangeMax","index$":10},"rangeMin":{"a":true,"h":"Range Min","n":"rangeMin","r":false,"t":"`$STRING`","key$":"rangeMin","index$":11},"reference":{"a":true,"h":"Reference","n":"reference","r":false,"t":"`$STRING`","key$":"reference","index$":12},"scale":{"a":true,"h":"Scale","n":"scale","r":false,"t":"`$INTEGER`","key$":"scale","index$":13},"scored":{"a":true,"h":"Scored","n":"scored","r":false,"t":"`$STRING`","key$":"scored","index$":14},"scores":{"a":true,"h":"Scores","n":"scores","r":false,"sh":"Sub-resource (Scores); see the DreamApply SDK.","t":"`$OBJECT`","key$":"scores","index$":15},"subject":{"a":true,"h":"Subject","n":"subject","r":false,"t":"`$STRING`","key$":"subject","index$":16},"type":{"a":true,"h":"Type","n":"type","r":false,"t":"`$STRING`","key$":"type","index$":17}},"id":{"field":"id","name":"id"},"name":"scoresheet","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /scoresheets","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/scoresheets","q":{},"r":{},"s":[{"lit":"scoresheets"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /scoresheets/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/scoresheets/{id}","q":{"exist":["id"]},"r":{},"s":[{"lit":"scoresheets"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"scoresheet","name__orig":"scoresheet","Name":"Scoresheet","name_":"scoresheet","name-":"scoresheet","NAME":"SCORESHEET","index$":12}, {"active":true,"entity":"scoresheet","key$":"BasicScoresheetFlow","kind":"basic","name":"BasicScoresheetFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"scoresheet_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"scoresheet_ref01","srcdatavar":"scoresheet_ref01_data","suffix":"_dt0"},"m":{"id":"scoresheet01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-scoresheet_ref01"}}],"index$":1}]}, 'Scoresheet', {"GET /scoresheets":{"protocol":"http","parameters":[]},"GET /scoresheets/{id}":{"protocol":"http","parameters":[{"name":"id","in":"path","required":true,"schema":{"type":"integer"},"index$":0}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let scoresheet_ref01_data = Object.values(setup.data.existing.scoresheet)[0] as any

    // LIST
    const scoresheet_ref01_ent = client.Scoresheet()
    const scoresheet_ref01_match: any = {}

    const scoresheet_ref01_list = (await scoresheet_ref01_ent.list(scoresheet_ref01_match)).map((e: any) => e.data())


    // LOAD
    const scoresheet_ref01_match_dt0: any = {}
    scoresheet_ref01_match_dt0.id = scoresheet_ref01_data.id
    const scoresheet_ref01_data_dt0 = (await scoresheet_ref01_ent.load(scoresheet_ref01_match_dt0)).data()
    assert(scoresheet_ref01_data_dt0.id === scoresheet_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/scoresheet/ScoresheetTestData.json')

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
    ['scoresheet01','scoresheet02','scoresheet03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DREAMAPPLY_TEST_SCORESHEET_ENTID': idmap,
    'DREAMAPPLY_TEST_LIVE': 'FALSE',
    'DREAMAPPLY_TEST_EXPLAIN': 'FALSE',
    'DREAMAPPLY_APIKEY': '',
    'DREAMAPPLY_SERVER_INSTANCE': "demo",
  })

  idmap = env['DREAMAPPLY_TEST_SCORESHEET_ENTID']

  const live = 'TRUE' === env.DREAMAPPLY_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DREAMAPPLY_TEST_SCORESHEET_ENTID']
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
  
