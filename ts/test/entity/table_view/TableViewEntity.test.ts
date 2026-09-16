

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


describe('TableViewEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DREAMAPPLY_TEST_LIVE=TRUE.
  afterEach(liveDelay('DREAMAPPLY_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DreamapplySDK.test()
    const ent = testsdk.TableView()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DREAMAPPLY_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'table_view.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"content","req":false,"short":"Sub-resource (StreamInterface); see the DreamApply SDK.","type":"`$OBJECT`","index$":0},{"active":true,"name":"created","req":false,"type":"`$STRING`","index$":1},{"active":true,"name":"expires","req":false,"type":"`$STRING`","index$":2},{"active":true,"name":"id","req":false,"type":"`$INTEGER`","index$":3},{"active":true,"name":"mime","req":false,"type":"`$STRING`","index$":4},{"active":true,"name":"modified","req":false,"type":"`$STRING`","index$":5},{"active":true,"name":"name","req":false,"type":"`$STRING`","index$":6},{"active":true,"name":"size","req":false,"type":"`$INTEGER`","index$":7},{"active":true,"name":"tabledata","req":false,"type":"`$OBJECT`","index$":8},{"active":true,"name":"title","req":false,"type":"`$STRING`","index$":9},{"active":true,"name":"uploaded","req":false,"type":"`$STRING`","index$":10}],"id":{"field":"id","name":"id"},"name":"table_view","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{},"contract":{"id":"GET /tableviews","json":"{\"operationId\":\"listTableViews\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"created\":{\"type\":\"string\"},\"id\":{\"type\":\"integer\"},\"modified\":{\"type\":\"string\"},\"tabledata\":{\"properties\":{\"content\":{\"description\":\"Sub-resource (StreamInterface); see the DreamApply SDK.\",\"type\":\"object\"},\"expires\":{\"nullable\":true,\"type\":\"string\"},\"mime\":{\"type\":\"string\"},\"name\":{\"type\":\"string\"},\"size\":{\"type\":\"integer\"},\"uploaded\":{\"nullable\":true,\"type\":\"string\"}},\"type\":\"object\"},\"title\":{\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"TableViews list\"}},\"security\":[{\"apiKey\":[]}],\"securitySchemes\":{\"apiKey\":{\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/tableviews","segments":[{"lit":"tableviews"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"id","reqd":true,"type":"`$INTEGER`","index$":0}]},"contract":{"id":"GET /tableviews/{id}","json":"{\"operationId\":\"getTableView\",\"parameters\":[{\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"created\":{\"type\":\"string\"},\"id\":{\"type\":\"integer\"},\"modified\":{\"type\":\"string\"},\"tabledata\":{\"properties\":{\"content\":{\"description\":\"Sub-resource (StreamInterface); see the DreamApply SDK.\",\"type\":\"object\"},\"expires\":{\"nullable\":true,\"type\":\"string\"},\"mime\":{\"type\":\"string\"},\"name\":{\"type\":\"string\"},\"size\":{\"type\":\"integer\"},\"uploaded\":{\"nullable\":true,\"type\":\"string\"}},\"type\":\"object\"},\"title\":{\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"TableView\"}},\"security\":[{\"apiKey\":[]}],\"securitySchemes\":{\"apiKey\":{\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/tableviews/{id}","segments":[{"lit":"tableviews"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body.tabledata`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"table_view","name__orig":"table_view","Name":"TableView","name_":"table_view","name-":"table-view","NAME":"TABLE_VIEW","index$":13}, {"active":true,"entity":"table_view","key$":"BasicTableViewFlow","kind":"basic","name":"BasicTableViewFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"table_view_ref01"}}],"index$":0},{"active":true,"data":{},"input":{"ref":"table_view_ref01","srcdatavar":"table_view_ref01_data","suffix":"_dt0"},"match":{"id":"table_view01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-table_view_ref01"}}],"index$":1}]}, 'TableView')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let table_view_ref01_data = Object.values(setup.data.existing.table_view)[0] as any

    // LIST
    const table_view_ref01_ent = client.TableView()
    const table_view_ref01_match: any = {}

    const table_view_ref01_list = (await table_view_ref01_ent.list(table_view_ref01_match)).map((e: any) => e.data())


    // LOAD
    const table_view_ref01_match_dt0: any = {}
    table_view_ref01_match_dt0.id = table_view_ref01_data.id
    const table_view_ref01_data_dt0 = (await table_view_ref01_ent.load(table_view_ref01_match_dt0)).data()
    assert(table_view_ref01_data_dt0.id === table_view_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/table_view/TableViewTestData.json')

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
    ['table_view01','table_view02','table_view03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DREAMAPPLY_TEST_TABLE_VIEW_ENTID': idmap,
    'DREAMAPPLY_TEST_LIVE': 'FALSE',
    'DREAMAPPLY_TEST_EXPLAIN': 'FALSE',
    'DREAMAPPLY_APIKEY': '',
    'DREAMAPPLY_SERVER_INSTANCE': "demo",
  })

  idmap = env['DREAMAPPLY_TEST_TABLE_VIEW_ENTID']

  const live = 'TRUE' === env.DREAMAPPLY_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DREAMAPPLY_TEST_TABLE_VIEW_ENTID']
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
  
