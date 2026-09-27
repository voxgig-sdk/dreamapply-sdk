

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"content":{"a":true,"h":"Content","n":"content","r":false,"sh":"Sub-resource (StreamInterface); see the DreamApply SDK.","t":"`$OBJECT`","key$":"content","index$":0},"created":{"a":true,"h":"Created","n":"created","r":false,"t":"`$STRING`","key$":"created","index$":1},"expires":{"a":true,"h":"Expires","n":"expires","r":false,"t":"`$STRING`","key$":"expires","index$":2},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$INTEGER`","key$":"id","index$":3},"mime":{"a":true,"h":"Mime","n":"mime","r":false,"t":"`$STRING`","key$":"mime","index$":4},"modified":{"a":true,"h":"Modified","n":"modified","r":false,"t":"`$STRING`","key$":"modified","index$":5},"name":{"a":true,"h":"Name","n":"name","r":false,"t":"`$STRING`","key$":"name","index$":6},"size":{"a":true,"h":"Size","n":"size","r":false,"t":"`$INTEGER`","key$":"size","index$":7},"tabledata":{"a":true,"h":"Tabledata","n":"tabledata","r":false,"t":"`$OBJECT`","key$":"tabledata","index$":8},"title":{"a":true,"h":"Title","n":"title","r":false,"t":"`$STRING`","key$":"title","index$":9},"uploaded":{"a":true,"h":"Uploaded","n":"uploaded","r":false,"t":"`$STRING`","key$":"uploaded","index$":10}},"id":{"field":"id","name":"id"},"name":"table_view","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /tableviews","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/tableviews","q":{},"r":{},"s":[{"lit":"tableviews"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /tableviews/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/tableviews/{id}","q":{"exist":["id"]},"r":{},"s":[{"lit":"tableviews"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.tabledata`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"table_view","name__orig":"table_view","Name":"TableView","name_":"table_view","name-":"table-view","NAME":"TABLE_VIEW","index$":13}, {"active":true,"entity":"table_view","key$":"BasicTableViewFlow","kind":"basic","name":"BasicTableViewFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"table_view_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"table_view_ref01","srcdatavar":"table_view_ref01_data","suffix":"_dt0"},"m":{"id":"table_view01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-table_view_ref01"}}],"index$":1}]}, 'TableView', {"GET /tableviews":{"protocol":"http","parameters":[]},"GET /tableviews/{id}":{"protocol":"http","parameters":[{"name":"id","in":"path","required":true,"schema":{"type":"integer"},"index$":0}]}})
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
  
