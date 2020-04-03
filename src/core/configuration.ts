import { createError } from './error'
import fs from 'fs'

async function loadConfig (): Promise<any> {
  try {
    const configFile = process.cwd() + '/server.config.js'
    if (!fs.existsSync(configFile)) {
      throw new Error(`Config is not found. Create a 'server.config.js' file on your root project folder. 
      Check this: https://github.com/ynwd/fastify-di/blob/master/server.config.js`)
    }
    const config = await import(configFile)
    delete config.default
    const { app, database } = config
    if (!app) throw new Error('`app` field is empty. check this: https://github.com/ynwd/fastify-di/blob/master/server.config.js')
    if (!database) throw new Error('`database` field is empty. check this: https://github.com/ynwd/fastify-di/blob/master/server.config.js')
    return config
  } catch (error) {
    throw createError('LOAD_CONFIG_ERROR', error)
  }
}

const configuration = loadConfig()

export { configuration }
