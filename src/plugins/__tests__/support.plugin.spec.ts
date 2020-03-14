import fastify from 'fastify'
import fp from 'fastify-plugin'
import { plugin } from '../support.plugin'

const server = fastify()

beforeAll(async () => {
  server.register(fp(plugin))
})

afterAll(() => {
  server.close()
})

describe('supportPlugin test', () => {
  test('/', async done => {
    await server.ready()
    expect(server.someSupport()).toBe('hugs')
    done()
  })
})
