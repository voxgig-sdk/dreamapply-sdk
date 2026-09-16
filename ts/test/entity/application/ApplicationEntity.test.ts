

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


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
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


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DREAMAPPLY_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'application.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"academicTerm","req":false,"short":"Sub-resource (AcademicTerm); see the DreamApply SDK.","type":"`$OBJECT`","index$":0},{"active":true,"name":"activities","req":false,"type":"`$ARRAY`","index$":1},{"active":true,"name":"applicant","req":false,"type":"`$OBJECT`","index$":2},{"active":true,"name":"career","req":false,"type":"`$ARRAY`","index$":3},{"active":true,"name":"contact","req":false,"type":"`$ARRAY`","index$":4},{"active":true,"name":"created","req":false,"type":"`$STRING`","index$":5},{"active":true,"name":"education","req":false,"type":"`$ARRAY`","index$":6},{"active":true,"name":"extras","req":false,"type":"`$ARRAY`","index$":7},{"active":true,"name":"grades","req":false,"type":"`$ARRAY`","index$":8},{"active":true,"name":"home","req":false,"type":"`$ARRAY`","index$":9},{"active":true,"name":"host","req":false,"type":"`$ARRAY`","index$":10},{"active":true,"name":"id","req":false,"type":"`$INTEGER`","index$":11},{"active":true,"name":"languages","req":false,"type":"`$ARRAY`","index$":12},{"active":true,"name":"legal","req":false,"type":"`$ARRAY`","index$":13},{"active":true,"name":"misc","req":false,"type":"`$ARRAY`","index$":14},{"active":true,"name":"motivation","req":false,"type":"`$ARRAY`","index$":15},{"active":true,"name":"pdf","req":false,"type":"`$OBJECT`","index$":16},{"active":true,"name":"profile","req":false,"type":"`$ARRAY`","index$":17},{"active":true,"name":"residences","req":false,"type":"`$ARRAY`","index$":18},{"active":true,"name":"revised","req":false,"type":"`$STRING`","index$":19},{"active":true,"name":"status","req":false,"type":"`$STRING`","index$":20},{"active":true,"name":"submitted","req":false,"type":"`$STRING`","index$":21},{"active":true,"name":"visa","req":false,"type":"`$ARRAY`","index$":22}],"id":{"field":"id","name":"id"},"name":"application","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{},"contract":{"id":"GET /applications","json":"{\"operationId\":\"listApplications\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"academicTerm\":{\"description\":\"Sub-resource (AcademicTerm); see the DreamApply SDK.\",\"type\":\"object\"},\"activities\":{\"type\":\"array\"},\"applicant\":{\"properties\":{\"address\":{\"nullable\":true,\"type\":\"string\"},\"citizenship\":{\"type\":\"string\"},\"email\":{\"type\":\"string\"},\"id\":{\"type\":\"integer\"},\"matriculation\":{\"type\":\"string\"},\"name\":{\"properties\":{\"family\":{\"type\":\"string\"},\"full\":{\"type\":\"string\"},\"given\":{\"type\":\"string\"},\"legal\":{\"type\":\"string\"},\"middle\":{\"type\":\"string\"},\"parent\":{\"type\":\"string\"}},\"type\":\"object\"},\"notes\":{\"type\":\"string\"},\"phone\":{\"type\":\"string\"},\"photo\":{\"properties\":{\"content\":{\"description\":\"Sub-resource (StreamInterface); see the DreamApply SDK.\",\"type\":\"object\"},\"expires\":{\"nullable\":true,\"type\":\"string\"},\"mime\":{\"type\":\"string\"},\"name\":{\"type\":\"string\"},\"size\":{\"type\":\"integer\"},\"uploaded\":{\"nullable\":true,\"type\":\"string\"}},\"type\":\"object\"},\"reference\":{\"type\":\"string\"},\"registered\":{\"type\":\"string\"},\"type\":{\"enum\":[\"Child\",\"Legal\",\"Natural\"],\"type\":\"string\"},\"vatin\":{\"nullable\":true,\"type\":\"string\"}},\"type\":\"object\"},\"career\":{\"type\":\"array\"},\"contact\":{\"type\":\"array\"},\"created\":{\"type\":\"string\"},\"education\":{\"type\":\"array\"},\"extras\":{\"type\":\"array\"},\"grades\":{\"type\":\"array\"},\"home\":{\"type\":\"array\"},\"host\":{\"type\":\"array\"},\"id\":{\"type\":\"integer\"},\"languages\":{\"type\":\"array\"},\"legal\":{\"type\":\"array\"},\"misc\":{\"type\":\"array\"},\"motivation\":{\"type\":\"array\"},\"pdf\":{\"properties\":{\"content\":{\"description\":\"Sub-resource (StreamInterface); see the DreamApply SDK.\",\"type\":\"object\"},\"expires\":{\"nullable\":true,\"type\":\"string\"},\"mime\":{\"type\":\"string\"},\"name\":{\"type\":\"string\"},\"size\":{\"type\":\"integer\"},\"uploaded\":{\"nullable\":true,\"type\":\"string\"}},\"type\":\"object\"},\"profile\":{\"type\":\"array\"},\"residences\":{\"type\":\"array\"},\"revised\":{\"nullable\":true,\"type\":\"string\"},\"status\":{\"enum\":[\"Blank\",\"Closed\",\"Draft\",\"Inactive\",\"Reopened\",\"Submitted\",\"Withdrawn\"],\"type\":\"string\"},\"submitted\":{\"nullable\":true,\"type\":\"string\"},\"visa\":{\"type\":\"array\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Applications list\"}},\"security\":[{\"apiKey\":[]}],\"securitySchemes\":{\"apiKey\":{\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/applications","segments":[{"lit":"applications"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"id","reqd":true,"type":"`$INTEGER`","index$":0}]},"contract":{"id":"GET /applications/{id}","json":"{\"operationId\":\"getApplication\",\"parameters\":[{\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"academicTerm\":{\"description\":\"Sub-resource (AcademicTerm); see the DreamApply SDK.\",\"type\":\"object\"},\"activities\":{\"type\":\"array\"},\"applicant\":{\"properties\":{\"address\":{\"nullable\":true,\"type\":\"string\"},\"citizenship\":{\"type\":\"string\"},\"email\":{\"type\":\"string\"},\"id\":{\"type\":\"integer\"},\"matriculation\":{\"type\":\"string\"},\"name\":{\"properties\":{\"family\":{\"type\":\"string\"},\"full\":{\"type\":\"string\"},\"given\":{\"type\":\"string\"},\"legal\":{\"type\":\"string\"},\"middle\":{\"type\":\"string\"},\"parent\":{\"type\":\"string\"}},\"type\":\"object\"},\"notes\":{\"type\":\"string\"},\"phone\":{\"type\":\"string\"},\"photo\":{\"properties\":{\"content\":{\"description\":\"Sub-resource (StreamInterface); see the DreamApply SDK.\",\"type\":\"object\"},\"expires\":{\"nullable\":true,\"type\":\"string\"},\"mime\":{\"type\":\"string\"},\"name\":{\"type\":\"string\"},\"size\":{\"type\":\"integer\"},\"uploaded\":{\"nullable\":true,\"type\":\"string\"}},\"type\":\"object\"},\"reference\":{\"type\":\"string\"},\"registered\":{\"type\":\"string\"},\"type\":{\"enum\":[\"Child\",\"Legal\",\"Natural\"],\"type\":\"string\"},\"vatin\":{\"nullable\":true,\"type\":\"string\"}},\"type\":\"object\"},\"career\":{\"type\":\"array\"},\"contact\":{\"type\":\"array\"},\"created\":{\"type\":\"string\"},\"education\":{\"type\":\"array\"},\"extras\":{\"type\":\"array\"},\"grades\":{\"type\":\"array\"},\"home\":{\"type\":\"array\"},\"host\":{\"type\":\"array\"},\"id\":{\"type\":\"integer\"},\"languages\":{\"type\":\"array\"},\"legal\":{\"type\":\"array\"},\"misc\":{\"type\":\"array\"},\"motivation\":{\"type\":\"array\"},\"pdf\":{\"properties\":{\"content\":{\"description\":\"Sub-resource (StreamInterface); see the DreamApply SDK.\",\"type\":\"object\"},\"expires\":{\"nullable\":true,\"type\":\"string\"},\"mime\":{\"type\":\"string\"},\"name\":{\"type\":\"string\"},\"size\":{\"type\":\"integer\"},\"uploaded\":{\"nullable\":true,\"type\":\"string\"}},\"type\":\"object\"},\"profile\":{\"type\":\"array\"},\"residences\":{\"type\":\"array\"},\"revised\":{\"nullable\":true,\"type\":\"string\"},\"status\":{\"enum\":[\"Blank\",\"Closed\",\"Draft\",\"Inactive\",\"Reopened\",\"Submitted\",\"Withdrawn\"],\"type\":\"string\"},\"submitted\":{\"nullable\":true,\"type\":\"string\"},\"visa\":{\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Application\"}},\"security\":[{\"apiKey\":[]}],\"securitySchemes\":{\"apiKey\":{\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/applications/{id}","segments":[{"lit":"applications"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"application","name__orig":"application","Name":"Application","name_":"application","name-":"application","NAME":"APPLICATION","index$":4}, {"active":true,"entity":"application","key$":"BasicApplicationFlow","kind":"basic","name":"BasicApplicationFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"application_ref01"}}],"index$":0},{"active":true,"data":{},"input":{"ref":"application_ref01","srcdatavar":"application_ref01_data","suffix":"_dt0"},"match":{"id":"application01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-application_ref01"}}],"index$":1}]}, 'Application')
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
  
