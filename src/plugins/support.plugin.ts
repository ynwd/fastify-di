import { FastifyInstance } from 'fastify'

export const plugin = function (fastify: FastifyInstance, opts: any, next: Function): void {
  fastify.decorate('someSupport', () => 'hugs')
  next()
}
