import { Connection, createConnection as create } from 'typeorm'
import { configuration } from './configuration'
import { createError } from './error'

export async function createConnection (): Promise<Connection> {
  try {
    const sourceDir = configuration.app.env === 'test' ? '/src' : '/dist'
    const targetDir = process.cwd() + sourceDir
    const entities = `${targetDir}/**/**/*.entity.*s`
    const typeOrmConfig: any = configuration.mysql
    typeOrmConfig.entities = [entities]
    return create(typeOrmConfig)
  } catch (error) {
    throw createError('CREATE_CONNECTION_ERROR', error)
  }
}
