

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


describe('JournalEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DREAMAPPLY_TEST_LIVE=TRUE.
  afterEach(liveDelay('DREAMAPPLY_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DreamapplySDK.test()
    const ent = testsdk.Journal()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DREAMAPPLY_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'journal.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"administrator":{"a":true,"h":"Administrator","n":"administrator","r":false,"t":"`$OBJECT`","key$":"administrator","index$":0},"applicant":{"a":true,"h":"Applicant","n":"applicant","r":false,"t":"`$OBJECT`","key$":"applicant","index$":1},"application":{"a":true,"h":"Application","n":"application","r":false,"t":"`$OBJECT`","key$":"application","index$":2},"bind":{"a":true,"h":"Bind","n":"bind","r":false,"t":"`$ARRAY`","key$":"bind","index$":3},"course":{"a":true,"h":"Course","n":"course","r":false,"t":"`$OBJECT`","key$":"course","index$":4},"document":{"a":true,"h":"Document","n":"document","r":false,"t":"`$OBJECT`","key$":"document","index$":5},"event":{"a":true,"h":"Event","n":"event","r":false,"t":"`$STRING`","key$":"event","index$":6},"flag":{"a":true,"h":"Flag","n":"flag","r":false,"t":"`$OBJECT`","key$":"flag","index$":7},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$INTEGER`","key$":"id","index$":8},"institution":{"a":true,"h":"Institution","n":"institution","r":false,"t":"`$OBJECT`","key$":"institution","index$":9},"invoice":{"a":true,"h":"Invoice","n":"invoice","r":false,"t":"`$OBJECT`","key$":"invoice","index$":10},"logged":{"a":true,"h":"Logged","n":"logged","r":false,"t":"`$STRING`","key$":"logged","index$":11},"offer":{"a":true,"h":"Offer","n":"offer","r":false,"t":"`$OBJECT`","key$":"offer","index$":12},"tracker":{"a":true,"h":"Tracker","n":"tracker","r":false,"t":"`$OBJECT`","key$":"tracker","index$":13}},"id":{"field":"id","name":"id"},"name":"journal","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /journal","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/journal","q":{},"r":{},"s":[{"lit":"journal"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"journal","name__orig":"journal","Name":"Journal","name_":"journal","name-":"journal","NAME":"JOURNAL","index$":10}, {"active":true,"entity":"journal","key$":"BasicJournalFlow","kind":"basic","name":"BasicJournalFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"journal_ref01"}}],"index$":0}]}, 'Journal', {"GET /journal":{"protocol":"http","parameters":[]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let journal_ref01_data = Object.values(setup.data.existing.journal)[0] as any

    // LIST
    const journal_ref01_ent = client.Journal()
    const journal_ref01_match: any = {}

    const journal_ref01_list = (await journal_ref01_ent.list(journal_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/journal/JournalTestData.json')

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
    ['journal01','journal02','journal03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DREAMAPPLY_TEST_JOURNAL_ENTID': idmap,
    'DREAMAPPLY_TEST_LIVE': 'FALSE',
    'DREAMAPPLY_TEST_EXPLAIN': 'FALSE',
    'DREAMAPPLY_APIKEY': '',
    'DREAMAPPLY_SERVER_INSTANCE': "demo",
  })

  idmap = env['DREAMAPPLY_TEST_JOURNAL_ENTID']

  const live = 'TRUE' === env.DREAMAPPLY_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DREAMAPPLY_TEST_JOURNAL_ENTID']
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
  
