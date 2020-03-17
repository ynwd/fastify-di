import fastify, { FastifyInstance } from 'fastify'
import { loader } from './loader'
import { configuration } from './configuration'
import { createConnection } from './database'
import { createError } from './error'
import { corePlugin } from './coreplugin'
import { createPlugins, createControllers } from './module.creator'

/**
 * Create fastify server.
 * Check this for detail options: https://www.fastify.io/docs/latest/Server/
 * @param options - Fastify server options
 */
export const createServer = async (options?: fastify.ServerOptions): Promise<FastifyInstance> => {
  try {
    const conn = await createConnection()
    await loader() // load all service & controller classes for dependency injection
    const database = {
      name: conn.name,
      database: conn.driver.database,
      connected: conn.isConnected
    }
    let server = fastify(options)
    server.log.info(database, 'connected')
    server = await createPlugins(server)
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
  server.listen(configuration.app.port, (error: Error) => {
    configuration.mysql.password = configuration.mysql.password.replace(/[a-z0-9]/g, '*')
    configuration.mysql.username = configuration.mysql.username.replace(/[a-z0-9]/g, '*')
    console.info(configuration)
    console.info('Loading all modules finished')
    console.info('Server running on port:', configuration.app.port)
    if (error) {
      createError('START_SERVER_ERROR', error)
      process.exit(1)
    }
  })
}
