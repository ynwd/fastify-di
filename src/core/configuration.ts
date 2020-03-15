import { createError } from './error'

function loadConfig (): any {
  try {
    const configFile = process.cwd() + '/server.config.js'
    return require(configFile)
  } catch (error) {
    throw createError('LOAD_CONFIG_ERROR', error)
  }
}

export const configuration = loadConfig()
