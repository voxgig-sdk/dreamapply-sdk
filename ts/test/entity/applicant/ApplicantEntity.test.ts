

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


describe('ApplicantEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DREAMAPPLY_TEST_LIVE=TRUE.
  afterEach(liveDelay('DREAMAPPLY_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DreamapplySDK.test()
    const ent = testsdk.Applicant()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DREAMAPPLY_TEST_LIVE
    for (const op of ['create', 'list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'applicant.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"address":{"a":true,"h":"Address","n":"address","r":false,"t":"`$STRING`","key$":"address","index$":0},"citizenship":{"a":true,"h":"Citizenship","n":"citizenship","r":false,"t":"`$STRING`","key$":"citizenship","index$":1},"email":{"a":true,"h":"Email","n":"email","r":false,"t":"`$STRING`","key$":"email","index$":2},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$INTEGER`","key$":"id","index$":3},"matriculation":{"a":true,"h":"Matriculation","n":"matriculation","r":false,"t":"`$STRING`","key$":"matriculation","index$":4},"name":{"a":true,"h":"Name","n":"name","r":false,"t":"`$OBJECT`","key$":"name","index$":5},"name_family":{"a":true,"h":"Name Family","n":"name_family","r":false,"t":"`$STRING`","key$":"name_family","index$":6},"name_given":{"a":true,"h":"Name Given","n":"name_given","r":false,"t":"`$STRING`","key$":"name_given","index$":7},"notes":{"a":true,"h":"Notes","n":"notes","r":false,"t":"`$STRING`","key$":"notes","index$":8},"phone":{"a":true,"h":"Phone","n":"phone","r":false,"t":"`$STRING`","key$":"phone","index$":9},"photo":{"a":true,"h":"Photo","n":"photo","r":false,"t":"`$OBJECT`","key$":"photo","index$":10},"reference":{"a":true,"h":"Reference","n":"reference","r":false,"t":"`$STRING`","key$":"reference","index$":11},"region":{"a":true,"h":"Region","n":"region","r":false,"t":"`$STRING`","key$":"region","index$":12},"registered":{"a":true,"h":"Registered","n":"registered","r":false,"t":"`$STRING`","key$":"registered","index$":13},"tracker_ID":{"a":true,"h":"Tracker Id","n":"tracker_ID","r":false,"t":"`$STRING`","key$":"tracker_ID","index$":14},"type":{"a":true,"h":"Type","n":"type","r":false,"t":"`$STRING`","key$":"type","index$":15},"vatin":{"a":true,"h":"Vatin","n":"vatin","r":false,"t":"`$STRING`","key$":"vatin","index$":16}},"id":{"field":"id","name":"id"},"name":"applicant","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /applicants","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/applicants","q":{},"r":{},"s":[{"lit":"applicants"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /applicants","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/applicants","q":{},"r":{},"s":[{"lit":"applicants"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /applicants/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/applicants/{id}","q":{"exist":["id"]},"r":{},"s":[{"lit":"applicants"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"applicant","name__orig":"applicant","Name":"Applicant","name_":"applicant","name-":"applicant","NAME":"APPLICANT","index$":3}, {"active":true,"entity":"applicant","key$":"BasicApplicantFlow","kind":"basic","name":"BasicApplicantFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"applicant_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"applicant_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"applicant_ref01","srcdatavar":"applicant_ref01_data","suffix":"_dt0"},"m":{"id":"applicant01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-applicant_ref01"}}],"index$":2}]}, 'Applicant', {"POST /applicants":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"citizenship":{"type":"string","key$":"citizenship"},"email":{"type":"string","key$":"email"},"matriculation":{"type":"string","key$":"matriculation"},"name":{"type":"string","key$":"name"},"name_family":{"type":"string","key$":"name_family"},"name_given":{"type":"string","key$":"name_given"},"notes":{"type":"string","key$":"notes"},"phone":{"type":"string","key$":"phone"},"reference":{"type":"string","key$":"reference"},"region":{"type":"string","key$":"region"},"tracker_ID":{"type":"string","key$":"tracker_ID"}},"x-ref":"#/components/schemas/ApplicantCreate","index$":1}}}},"parameters":[]},"GET /applicants":{"protocol":"http","parameters":[]},"GET /applicants/{id}":{"protocol":"http","parameters":[{"name":"id","in":"path","required":true,"schema":{"type":"integer"},"index$":0}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const applicant_ref01_ent = client.Applicant()
    let applicant_ref01_data = setup.data.new.applicant['applicant_ref01']

    applicant_ref01_data = (await applicant_ref01_ent.create(applicant_ref01_data)).data()
    assert(null != applicant_ref01_data.id)


    // LIST
    const applicant_ref01_match: any = {}

    const applicant_ref01_list = (await applicant_ref01_ent.list(applicant_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(applicant_ref01_list, { id: applicant_ref01_data.id })))


    // LOAD
    const applicant_ref01_match_dt0: any = {}
    applicant_ref01_match_dt0.id = applicant_ref01_data.id
    const applicant_ref01_data_dt0 = (await applicant_ref01_ent.load(applicant_ref01_match_dt0)).data()
    assert(applicant_ref01_data_dt0.id === applicant_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/applicant/ApplicantTestData.json')

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
    ['applicant01','applicant02','applicant03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DREAMAPPLY_TEST_APPLICANT_ENTID': idmap,
    'DREAMAPPLY_TEST_LIVE': 'FALSE',
    'DREAMAPPLY_TEST_EXPLAIN': 'FALSE',
    'DREAMAPPLY_APIKEY': '',
    'DREAMAPPLY_SERVER_INSTANCE': "demo",
  })

  idmap = env['DREAMAPPLY_TEST_APPLICANT_ENTID']

  const live = 'TRUE' === env.DREAMAPPLY_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DREAMAPPLY_TEST_APPLICANT_ENTID']
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
  
