import { FastifyInstance } from 'fastify'
import { createServer, serviceContainer } from '../../../core'
import { UserService } from '../user.service'
import path from 'path'

const targetDir = path.join(__dirname, '../')
let server: FastifyInstance
let service: UserService

beforeAll(async () => {
  server = await createServer({ logger: false }, targetDir)
  service = serviceContainer.get('UserService')
  service.deleteAll()
})

afterAll(() => {
  server.close()
})

test('GET /user', async done => {
  const result = await server.inject({
    url: '/user',
    method: 'GET'
  })
  expect(result.payload).toBe('{"error":true,"message":"User not found"}')
  done()
})

test('POST /user', async done => {
  const result = await server.inject({
    url: '/user',
    method: 'POST',
    payload: {
      email: 'pram@diversa.id',
      username: 'zaid',
      password: 'secret'
    }
  })
  expect(result.statusCode).toBe(200)
  done()
})
