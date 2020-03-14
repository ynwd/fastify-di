import { FastifyInstance } from 'fastify'
import { createServer } from '../../../core'
import path from 'path'

const targetDir = path.join(__dirname, '../../../')
let server: FastifyInstance

beforeAll(async () => {
  server = await createServer({ logger: false }, targetDir)
})

afterAll(() => {
  server.close()
})

describe('simple test', () => {
  test('/', async done => {
    const result = await server.inject({
      url: '/',
      method: 'GET'
    })
    // console.log(result.payload)
    expect(result.payload).toContain('hello')
    done()
  })
})
