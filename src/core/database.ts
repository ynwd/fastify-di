import { Connection, createConnection as create } from 'typeorm'
import { configuration } from './configuration'
import { createError } from './error'

export async function createConnection (targetDir: string): Promise<Connection> {
  try {
    const entity = targetDir
    const typeOrmConfig: any = configuration.mysql
    typeOrmConfig.entities = [entity]
    return create(typeOrmConfig)
  } catch (error) {
    throw createError('CREATE_CONNECTION_ERROR', error)
  }
}
