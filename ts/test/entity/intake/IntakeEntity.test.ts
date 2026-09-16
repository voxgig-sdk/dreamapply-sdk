

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


describe('IntakeEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DREAMAPPLY_TEST_LIVE=TRUE.
  afterEach(liveDelay('DREAMAPPLY_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DreamapplySDK.test()
    const ent = testsdk.Intake()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DREAMAPPLY_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'intake.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"arrival","req":false,"type":"`$STRING`","index$":0},{"active":true,"name":"commence","req":false,"type":"`$STRING`","index$":1},{"active":true,"name":"decision","req":false,"type":"`$OBJECT`","index$":2},{"active":true,"name":"id","req":false,"type":"`$INTEGER`","index$":3},{"active":true,"name":"name","req":false,"type":"`$STRING`","index$":4},{"active":true,"name":"policy","req":false,"type":"`$STRING`","index$":5},{"active":true,"name":"pre","req":false,"type":"`$OBJECT`","index$":6},{"active":true,"name":"start","req":false,"type":"`$STRING`","index$":7}],"id":{"field":"id","name":"id"},"name":"intake","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{},"contract":{"id":"GET /intakes","json":"{\"operationId\":\"listIntakes\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"arrival\":{\"type\":\"string\"},\"commence\":{\"type\":\"string\"},\"decision\":{\"properties\":{\"date\":{\"nullable\":true,\"type\":\"string\"},\"days\":{\"nullable\":true,\"type\":\"integer\"},\"policy\":{\"type\":\"string\"}},\"type\":\"object\"},\"id\":{\"type\":\"integer\"},\"name\":{\"type\":\"string\"},\"policy\":{\"enum\":[\"Flexible\",\"Rolling\"],\"type\":\"string\"},\"pre\":{\"properties\":{\"deadline\":{\"type\":\"string\"},\"info\":{\"type\":\"string\"},\"mask\":{\"type\":\"boolean\"}},\"type\":\"object\"},\"start\":{\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Intakes list\"}},\"security\":[{\"apiKey\":[]}],\"securitySchemes\":{\"apiKey\":{\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/intakes","segments":[{"lit":"intakes"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"id","reqd":true,"type":"`$INTEGER`","index$":0}]},"contract":{"id":"GET /intakes/{id}","json":"{\"operationId\":\"getIntake\",\"parameters\":[{\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"arrival\":{\"type\":\"string\"},\"commence\":{\"type\":\"string\"},\"decision\":{\"properties\":{\"date\":{\"nullable\":true,\"type\":\"string\"},\"days\":{\"nullable\":true,\"type\":\"integer\"},\"policy\":{\"type\":\"string\"}},\"type\":\"object\"},\"id\":{\"type\":\"integer\"},\"name\":{\"type\":\"string\"},\"policy\":{\"enum\":[\"Flexible\",\"Rolling\"],\"type\":\"string\"},\"pre\":{\"properties\":{\"deadline\":{\"type\":\"string\"},\"info\":{\"type\":\"string\"},\"mask\":{\"type\":\"boolean\"}},\"type\":\"object\"},\"start\":{\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Intake\"}},\"security\":[{\"apiKey\":[]}],\"securitySchemes\":{\"apiKey\":{\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/intakes/{id}","segments":[{"lit":"intakes"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"intake","name__orig":"intake","Name":"Intake","name_":"intake","name-":"intake","NAME":"INTAKE","index$":8}, {"active":true,"entity":"intake","key$":"BasicIntakeFlow","kind":"basic","name":"BasicIntakeFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"intake_ref01"}}],"index$":0},{"active":true,"data":{},"input":{"ref":"intake_ref01","srcdatavar":"intake_ref01_data","suffix":"_dt0"},"match":{"id":"intake01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-intake_ref01"}}],"index$":1}]}, 'Intake')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let intake_ref01_data = Object.values(setup.data.existing.intake)[0] as any

    // LIST
    const intake_ref01_ent = client.Intake()
    const intake_ref01_match: any = {}

    const intake_ref01_list = (await intake_ref01_ent.list(intake_ref01_match)).map((e: any) => e.data())


    // LOAD
    const intake_ref01_match_dt0: any = {}
    intake_ref01_match_dt0.id = intake_ref01_data.id
    const intake_ref01_data_dt0 = (await intake_ref01_ent.load(intake_ref01_match_dt0)).data()
    assert(intake_ref01_data_dt0.id === intake_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/intake/IntakeTestData.json')

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
    ['intake01','intake02','intake03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DREAMAPPLY_TEST_INTAKE_ENTID': idmap,
    'DREAMAPPLY_TEST_LIVE': 'FALSE',
    'DREAMAPPLY_TEST_EXPLAIN': 'FALSE',
    'DREAMAPPLY_APIKEY': '',
    'DREAMAPPLY_SERVER_INSTANCE': "demo",
  })

  idmap = env['DREAMAPPLY_TEST_INTAKE_ENTID']

  const live = 'TRUE' === env.DREAMAPPLY_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DREAMAPPLY_TEST_INTAKE_ENTID']
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
  
