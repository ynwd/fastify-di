import { Controller, Get } from '../../core'
import { FastifyReply, FastifyRequest } from 'fastify'
import { Http2ServerResponse } from 'http2'

@Controller()
export class WebController {
  @Get()
  sayHello (request: FastifyRequest, reply: FastifyReply<Http2ServerResponse>): any {
    reply.sendOk('hello')
  }
}
