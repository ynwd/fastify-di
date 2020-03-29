import { Connection, createConnection as create } from 'typeorm'
import { configuration } from './configuration'
import { createError } from './error'
import { getSourceDir } from './loader'

export async function createConnection (): Promise<Connection> {
  try {
    const targetDir = getSourceDir()
    const entities = `${targetDir}/**/**/*.entity.*s`
    const typeOrmConfig: any = configuration.database
    typeOrmConfig.entities = [entities]
    return create(typeOrmConfig)
  } catch (error) {
    throw createError('CREATE_CONNECTION_ERROR', error)
  }
}
