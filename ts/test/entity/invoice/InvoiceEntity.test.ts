

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


describe('InvoiceEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DREAMAPPLY_TEST_LIVE=TRUE.
  afterEach(liveDelay('DREAMAPPLY_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DreamapplySDK.test()
    const ent = testsdk.Invoice()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('invoice hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of DreamapplySDK.test(offline).Invoice().stream('list')) { }
    }, /offline/)

    for await (const _item of DreamapplySDK.test(offline).Invoice()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = DreamapplySDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.Invoice().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of DreamapplySDK.test().Invoice().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new DreamapplySDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.Invoice().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.Invoice().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DreamapplySDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Invoice().list({"collected":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DREAMAPPLY_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'invoice.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"applicant":{"a":true,"h":"Applicant","n":"applicant","r":false,"t":"`$OBJECT`","key$":"applicant","index$":0},"application":{"a":true,"h":"Application","n":"application","r":false,"t":"`$OBJECT`","key$":"application","index$":1},"collected":{"a":true,"h":"Collected","n":"collected","r":false,"t":"`$STRING`","key$":"collected","index$":2},"course":{"a":true,"h":"Course","n":"course","r":false,"t":"`$OBJECT`","key$":"course","index$":3},"currency":{"a":true,"h":"Currency","n":"currency","r":false,"t":"`$STRING`","key$":"currency","index$":4},"deadline":{"a":true,"h":"Deadline","n":"deadline","r":false,"t":"`$STRING`","key$":"deadline","index$":5},"delivered":{"a":true,"h":"Delivered","n":"delivered","r":false,"t":"`$STRING`","key$":"delivered","index$":6},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$INTEGER`","key$":"id","index$":7},"instructions":{"a":true,"h":"Instructions","n":"instructions","r":false,"t":"`$STRING`","key$":"instructions","index$":8},"issued":{"a":true,"h":"Issued","n":"issued","r":false,"t":"`$STRING`","key$":"issued","index$":9},"nr":{"a":true,"h":"Nr","n":"nr","r":false,"t":"`$STRING`","key$":"nr","index$":10},"payer":{"a":true,"h":"Payer","n":"payer","r":false,"t":"`$OBJECT`","key$":"payer","index$":11},"reminded":{"a":true,"h":"Reminded","n":"reminded","r":false,"t":"`$STRING`","key$":"reminded","index$":12},"smallprint":{"a":true,"h":"Smallprint","n":"smallprint","r":false,"t":"`$STRING`","key$":"smallprint","index$":13}},"id":{"field":"id","name":"id"},"name":"invoice","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /invoices","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/invoices","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"invoices"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /invoices/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/invoices/{id}","q":{"exist":["id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"invoices"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /invoices/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"DELETE","o":"/invoices/{id}","q":{"exist":["id"]},"r":{},"s":[{"lit":"invoices"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"}},"relations":{"ancestors":[]},"key$":"invoice","name__orig":"invoice","Name":"Invoice","name_":"invoice","name-":"invoice","NAME":"INVOICE","index$":9}, {"active":true,"entity":"invoice","key$":"BasicInvoiceFlow","kind":"basic","name":"BasicInvoiceFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"invoice_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"invoice_ref01","srcdatavar":"invoice_ref01_data","suffix":"_dt0"},"m":{"id":"invoice01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-invoice_ref01"}}],"index$":1}]}, 'Invoice', {"GET /invoices":{"protocol":"http","parameters":[]},"GET /invoices/{id}":{"protocol":"http","parameters":[{"name":"id","in":"path","required":true,"schema":{"type":"integer"},"index$":0}]},"DELETE /invoices/{id}":{"protocol":"http","parameters":[{"name":"id","in":"path","required":true,"schema":{"type":"integer"},"index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let invoice_ref01_data = Object.values(setup.data.existing.invoice)[0] as any

    // LIST
    const invoice_ref01_ent = client.Invoice()
    const invoice_ref01_match: any = {}

    const invoice_ref01_list = (await invoice_ref01_ent.list(invoice_ref01_match)).map((e: any) => e.data())


    // LOAD
    const invoice_ref01_match_dt0: any = {}
    invoice_ref01_match_dt0.id = invoice_ref01_data.id
    const invoice_ref01_data_dt0 = (await invoice_ref01_ent.load(invoice_ref01_match_dt0)).data()
    assert(invoice_ref01_data_dt0.id === invoice_ref01_data.id)


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
      '../../../../.sdk/test/entity/invoice/InvoiceTestData.json')

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
    ['invoice01','invoice02','invoice03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DREAMAPPLY_TEST_INVOICE_ENTID': idmap,
    'DREAMAPPLY_TEST_LIVE': 'FALSE',
    'DREAMAPPLY_TEST_EXPLAIN': 'FALSE',
    'DREAMAPPLY_APIKEY': '',
    'DREAMAPPLY_SERVER_INSTANCE': "demo",
  })

  idmap = env['DREAMAPPLY_TEST_INVOICE_ENTID']

  const live = 'TRUE' === env.DREAMAPPLY_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DREAMAPPLY_TEST_INVOICE_ENTID']
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
  
