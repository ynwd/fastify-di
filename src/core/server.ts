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
    const sourceDir = process.env.APP_ENV ? '/dist' : '/src'
    const targetDir = process.cwd() + sourceDir
    const conn = await createConnection()
    await loader() // load all service & controller classes for dependency injection
    const database = {
      name: conn.name,
      database: conn.driver.database,
      connected: conn.isConnected
    }
    let server = fastify(options)
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
  server.listen(configuration.app.port, (error: Error) => {
    console.info(configuration)
    console.info('Loading all modules finished')
    if (error) {
      createError('START_SERVER_ERROR', error)
      process.exit(1)
    }
  })
}
