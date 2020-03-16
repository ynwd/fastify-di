// import path from 'path'
import glob from 'glob-promise'
import { createError } from './error'

export function getSourceDir (): string {
  const sourceDir = (process.env.APP_ENV === 'development' || process.env.APP_ENV === 'production')
    ? '/dist' : '/src'
  return process.cwd() + sourceDir
}

export const moduleLoader = async (globPattern: string): Promise<any> => {
  try {
    const targetDir = getSourceDir()
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
