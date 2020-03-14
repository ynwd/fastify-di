import fastify, { FastifyInstance } from 'fastify'
import { loader } from './loader'
import { configuration } from './configuration'
import { createConnection } from './database'
import { createError } from './error'
import { corePlugin } from './coreplugin'
import { createPlugins, createControllers } from './module.creator'

export const createServer = async (fastifyOpts: any, targetDir: string): Promise<FastifyInstance> => {
  try {
    const entityFiles = `${targetDir}/**/**/*.entity.*s`
    const conn = await createConnection(entityFiles)
    await loader(targetDir) // load all service & controller classes for dependency injection
    const database = {
      name: conn.name,
      database: conn.driver.database,
      connected: conn.isConnected
    }
    let server = fastify(fastifyOpts)
    server.log.info(database, 'connected')
    server = await createPlugins(server, targetDir)
    const controllers = await createControllers()
    server
      .register(corePlugin)
      .register(controllers)
    return server
  } catch (error) {
    throw createError('CREATE_SERVER_ERROR', error)
  }
}

export const start = async (server: FastifyInstance): Promise<void> => {
  await server.ready()
  console.info('Loading all modules finished')
  server.listen(configuration.app.port, (error: Error) => {
    console.info('Server running on port:', configuration.app.port)
    if (error) {
      createError('START_SERVER_ERROR', error)
      process.exit(1)
    }
  })
}
