

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


describe('CourseEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DREAMAPPLY_TEST_LIVE=TRUE.
  afterEach(liveDelay('DREAMAPPLY_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DreamapplySDK.test()
    const ent = testsdk.Course()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DREAMAPPLY_TEST_LIVE
    for (const op of ['create', 'list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'course.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"accreditation","req":false,"type":"`$STRING`","index$":0},{"active":true,"name":"address","req":false,"type":"`$STRING`","index$":1},{"active":true,"name":"awards_abbr","req":false,"type":"`$STRING`","index$":2},{"active":true,"name":"awards_full","req":false,"type":"`$STRING`","index$":3},{"active":true,"name":"code","req":false,"type":"`$STRING`","index$":4},{"active":true,"name":"codeInternal","req":false,"type":"`$STRING`","index$":5},{"active":true,"name":"country","req":false,"type":"`$STRING`","index$":6},{"active":true,"name":"credits","req":false,"type":"`$STRING`","index$":7},{"active":true,"name":"departments","req":false,"short":"Sub-resource (InstitutionDepartments); see the DreamApply SDK.","type":"`$OBJECT`","index$":8},{"active":true,"name":"duration","req":false,"type":"`$STRING`","index$":9},{"active":true,"name":"erasmus","req":false,"type":"`$STRING`","index$":10},{"active":true,"name":"featured","req":false,"type":"`$STRING`","index$":11},{"active":true,"name":"iban","req":false,"type":"`$STRING`","index$":12},{"active":true,"name":"id","req":false,"type":"`$INTEGER`","index$":13},{"active":true,"name":"institution","req":false,"type":"`$STRING`","index$":14},{"active":true,"name":"language","req":false,"type":"`$STRING`","index$":15},{"active":true,"name":"location","req":false,"type":"`$STRING`","index$":16},{"active":true,"name":"mode","req":false,"type":"`$STRING`","index$":17},{"active":true,"name":"name","req":false,"type":"`$STRING`","index$":18},{"active":true,"name":"prospect_uri","req":false,"type":"`$STRING`","index$":19},{"active":true,"name":"quota","req":false,"type":"`$STRING`","index$":20},{"active":true,"name":"registration","req":false,"type":"`$STRING`","index$":21},{"active":true,"name":"status","req":false,"type":"`$STRING`","index$":22},{"active":true,"name":"type","req":false,"type":"`$STRING`","index$":23},{"active":true,"name":"updated","req":false,"type":"`$STRING`","index$":24},{"active":true,"name":"vat","req":false,"type":"`$STRING`","index$":25},{"active":true,"name":"www","req":false,"type":"`$STRING`","index$":26}],"id":{"field":"id","name":"id"},"name":"course","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{},"contract":{"id":"POST /courses","json":"{\"operationId\":\"createCourse\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"awards_abbr\":{\"type\":\"string\"},\"awards_full\":{\"type\":\"string\"},\"code\":{\"type\":\"string\"},\"country\":{\"type\":\"string\"},\"institution\":{\"type\":\"string\"},\"language\":{\"type\":\"string\"},\"location\":{\"type\":\"string\"},\"mode\":{\"type\":\"string\"},\"name\":{\"type\":\"string\"},\"prospect_uri\":{\"type\":\"string\"},\"type\":{\"type\":\"string\"}},\"type\":\"object\"}}},\"required\":true},\"responses\":{\"201\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"accreditation\":{\"type\":\"string\"},\"code\":{\"type\":\"string\"},\"codeInternal\":{\"nullable\":true,\"type\":\"string\"},\"country\":{\"type\":\"string\"},\"credits\":{\"type\":\"string\"},\"duration\":{\"type\":\"string\"},\"featured\":{\"type\":\"string\"},\"id\":{\"type\":\"integer\"},\"institution\":{\"properties\":{\"address\":{\"type\":\"string\"},\"country\":{\"type\":\"string\"},\"departments\":{\"description\":\"Sub-resource (InstitutionDepartments); see the DreamApply SDK.\",\"type\":\"object\"},\"erasmus\":{\"type\":\"string\"},\"iban\":{\"type\":\"string\"},\"id\":{\"type\":\"integer\"},\"location\":{\"type\":\"string\"},\"name\":{\"type\":\"string\"},\"registration\":{\"type\":\"string\"},\"status\":{\"type\":\"string\"},\"vat\":{\"type\":\"string\"},\"www\":{\"type\":\"string\"}},\"type\":\"object\"},\"language\":{\"type\":\"string\"},\"location\":{\"type\":\"string\"},\"mode\":{\"type\":\"string\"},\"name\":{\"type\":\"string\"},\"quota\":{\"type\":\"string\"},\"status\":{\"enum\":[\"Archived\",\"Closed\",\"Draft\",\"Online\",\"Private\",\"Standby\"],\"type\":\"string\"},\"type\":{\"type\":\"string\"},\"updated\":{\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Course created\"}},\"security\":[{\"apiKey\":[]}],\"securitySchemes\":{\"apiKey\":{\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/courses","segments":[{"lit":"courses"}],"select":{},"transform":{"req":"`reqdata`","res":"`body.institution`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"active":true,"args":{},"contract":{"id":"GET /courses","json":"{\"operationId\":\"listCourses\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"accreditation\":{\"type\":\"string\"},\"code\":{\"type\":\"string\"},\"codeInternal\":{\"nullable\":true,\"type\":\"string\"},\"country\":{\"type\":\"string\"},\"credits\":{\"type\":\"string\"},\"duration\":{\"type\":\"string\"},\"featured\":{\"type\":\"string\"},\"id\":{\"type\":\"integer\"},\"institution\":{\"properties\":{\"address\":{\"type\":\"string\"},\"country\":{\"type\":\"string\"},\"departments\":{\"description\":\"Sub-resource (InstitutionDepartments); see the DreamApply SDK.\",\"type\":\"object\"},\"erasmus\":{\"type\":\"string\"},\"iban\":{\"type\":\"string\"},\"id\":{\"type\":\"integer\"},\"location\":{\"type\":\"string\"},\"name\":{\"type\":\"string\"},\"registration\":{\"type\":\"string\"},\"status\":{\"type\":\"string\"},\"vat\":{\"type\":\"string\"},\"www\":{\"type\":\"string\"}},\"type\":\"object\"},\"language\":{\"type\":\"string\"},\"location\":{\"type\":\"string\"},\"mode\":{\"type\":\"string\"},\"name\":{\"type\":\"string\"},\"quota\":{\"type\":\"string\"},\"status\":{\"enum\":[\"Archived\",\"Closed\",\"Draft\",\"Online\",\"Private\",\"Standby\"],\"type\":\"string\"},\"type\":{\"type\":\"string\"},\"updated\":{\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Courses list\"}},\"security\":[{\"apiKey\":[]}],\"securitySchemes\":{\"apiKey\":{\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/courses","segments":[{"lit":"courses"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"id","reqd":true,"type":"`$INTEGER`","index$":0}]},"contract":{"id":"GET /courses/{id}","json":"{\"operationId\":\"getCourse\",\"parameters\":[{\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"accreditation\":{\"type\":\"string\"},\"code\":{\"type\":\"string\"},\"codeInternal\":{\"nullable\":true,\"type\":\"string\"},\"country\":{\"type\":\"string\"},\"credits\":{\"type\":\"string\"},\"duration\":{\"type\":\"string\"},\"featured\":{\"type\":\"string\"},\"id\":{\"type\":\"integer\"},\"institution\":{\"properties\":{\"address\":{\"type\":\"string\"},\"country\":{\"type\":\"string\"},\"departments\":{\"description\":\"Sub-resource (InstitutionDepartments); see the DreamApply SDK.\",\"type\":\"object\"},\"erasmus\":{\"type\":\"string\"},\"iban\":{\"type\":\"string\"},\"id\":{\"type\":\"integer\"},\"location\":{\"type\":\"string\"},\"name\":{\"type\":\"string\"},\"registration\":{\"type\":\"string\"},\"status\":{\"type\":\"string\"},\"vat\":{\"type\":\"string\"},\"www\":{\"type\":\"string\"}},\"type\":\"object\"},\"language\":{\"type\":\"string\"},\"location\":{\"type\":\"string\"},\"mode\":{\"type\":\"string\"},\"name\":{\"type\":\"string\"},\"quota\":{\"type\":\"string\"},\"status\":{\"enum\":[\"Archived\",\"Closed\",\"Draft\",\"Online\",\"Private\",\"Standby\"],\"type\":\"string\"},\"type\":{\"type\":\"string\"},\"updated\":{\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Course\"}},\"security\":[{\"apiKey\":[]}],\"securitySchemes\":{\"apiKey\":{\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/courses/{id}","segments":[{"lit":"courses"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body.institution`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"course","name__orig":"course","Name":"Course","name_":"course","name-":"course","NAME":"COURSE","index$":5}, {"active":true,"entity":"course","key$":"BasicCourseFlow","kind":"basic","name":"BasicCourseFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"course_ref01"},"match":{},"op":"create","spec":[],"valid":[],"index$":0},{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"course_ref01"}}],"index$":1},{"active":true,"data":{},"input":{"ref":"course_ref01","srcdatavar":"course_ref01_data","suffix":"_dt0"},"match":{"id":"course01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-course_ref01"}}],"index$":2}]}, 'Course')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const course_ref01_ent = client.Course()
    let course_ref01_data = setup.data.new.course['course_ref01']

    course_ref01_data = (await course_ref01_ent.create(course_ref01_data)).data()
    assert(null != course_ref01_data.id)


    // LIST
    const course_ref01_match: any = {}

    const course_ref01_list = (await course_ref01_ent.list(course_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(course_ref01_list, { id: course_ref01_data.id })))


    // LOAD
    const course_ref01_match_dt0: any = {}
    course_ref01_match_dt0.id = course_ref01_data.id
    const course_ref01_data_dt0 = (await course_ref01_ent.load(course_ref01_match_dt0)).data()
    assert(course_ref01_data_dt0.id === course_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/course/CourseTestData.json')

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
    ['course01','course02','course03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DREAMAPPLY_TEST_COURSE_ENTID': idmap,
    'DREAMAPPLY_TEST_LIVE': 'FALSE',
    'DREAMAPPLY_TEST_EXPLAIN': 'FALSE',
    'DREAMAPPLY_APIKEY': '',
    'DREAMAPPLY_SERVER_INSTANCE': "demo",
  })

  idmap = env['DREAMAPPLY_TEST_COURSE_ENTID']

  const live = 'TRUE' === env.DREAMAPPLY_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DREAMAPPLY_TEST_COURSE_ENTID']
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
  
