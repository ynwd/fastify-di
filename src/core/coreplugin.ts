import fp from 'fastify-plugin'
import { FastifyInstance, FastifyReply, FastifyError } from 'fastify'
import { ServerResponse } from 'http'
import { getConnection } from 'typeorm'

// the use of fastify-plugin is required to be able
// to export the decorators to the outer scope

export const corePlugin = fp(async function (fastify: FastifyInstance, opts: any, next: any) {
  fastify
    .decorateReply('sendOk', function<T> (this: FastifyReply<ServerResponse>, payload: T, message?: string, statusCode?: number) {
      if (!statusCode) statusCode = 200
      if (!message) message = 'OK'
      this
        .code(statusCode)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({ data: payload, message, error: false })
    })
    .decorateReply('sendError', function (this: FastifyReply<ServerResponse>, error: FastifyError) {
      let code = error.statusCode
      if (!code) code = 500
      this.code(code)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({ error: true, message: error.message })
    })
    .addHook('onRegister', (instance: FastifyInstance, opts: any) => {
      // console.log('opts', opts)
    })
    .addHook('onClose', (instance, done) => {
      getConnection().close()
      instance.log.info('db-connection closed')
      done()
    })
  next()
})
