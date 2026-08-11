
import { Context } from './Context'


class DreamapplyError extends Error {

  isDreamapplyError = true

  sdk = 'Dreamapply'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  DreamapplyError
}

