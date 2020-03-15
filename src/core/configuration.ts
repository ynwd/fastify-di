import { createError } from './error'
import fs from 'fs'

export type config = {
  app: {
    env: string;
    port: number;
  };
  mysql: {
    name: string;
    type: 'mysql';
    port: number;
    username: string;
    password: string;
    database: string;
    synchronize?: boolean;
    logging?: boolean;
  };
}

function loadConfig (): config {
  try {
    const configFile = process.cwd() + '/server.config.js'
    if (!fs.existsSync(configFile)) throw new Error('Config is not found. Create a `server.config.js` file on your root project folder.')
    return require(configFile)
  } catch (error) {
    throw createError('LOAD_CONFIG_ERROR', error)
  }
}

export const configuration = loadConfig()
