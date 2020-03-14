import { createConnection, loader, serviceContainer } from '../../../core'
import { UserService } from '../user.service'
import path from 'path'

const workingDir = '../'
const targetDir = path.join(__dirname, workingDir)
const entity = path.join(__dirname, `${workingDir}*.entity.*s`)

let service: UserService

beforeAll(async () => {
  await createConnection(entity)
  await loader(targetDir)
  service = serviceContainer.get('UserService')
  service.deleteAll()
})

afterAll(() => {
  service.close()
})

describe('user service', () => {
  test('add user', async done => {
    const payload = {
      email: 'pram2016@gmail.com',
      username: 'zaid',
      password: 'secret'
    }
    const users = await service.register(payload)
    expect(users.username).toBe('zaid')
    done()
  })
  test('get all', async done => {
    const users = await service.getAllUser()
    expect(users.length).not.toBe(0)
    done()
  })
})
