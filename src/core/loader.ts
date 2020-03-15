// import path from 'path'
import glob from 'glob-promise'
import { createError } from './error'
import { configuration } from './configuration'

export const moduleLoader = async (globPattern: string): Promise<any> => {
  try {
    const sourceDir = configuration.app.env === 'test' ? '/src' : '/dist'
    const targetDir = process.cwd() + sourceDir
    const cwd = targetDir
    const files = await glob(globPattern, { cwd, ignore: '{**/*.spec, spec}.*s' })
    return files.map(file => require(`${targetDir}/${file}`))
  } catch (error) {
    throw createError('MODULE_LOADER_ERROR', error)
  }
}

export const loader = async (): Promise<any[]> => {
  return moduleLoader('**/*.{service,controller}.*s')
}

export const pluginsLoader = async (): Promise<any[]> => {
  return moduleLoader('**/*.plugin.*s')
}
