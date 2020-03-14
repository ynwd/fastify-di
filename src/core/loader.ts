// import path from 'path'
import glob from 'glob-promise'
import { createError } from './error'

export const moduleLoader = async (targetDir: string, globPattern: string): Promise<any> => {
  try {
    const cwd = targetDir
    const files = await glob(globPattern, { cwd, ignore: '{**/*.spec, spec}.*s' })
    return files.map(file => require(`${targetDir}/${file}`))
  } catch (error) {
    throw createError('MODULE_LOADER_ERROR', error)
  }
}

export const loader = async (targetDir: string): Promise<any[]> => {
  return moduleLoader(targetDir, '**/*.{service,controller}.*s')
}

export const pluginsLoader = async (targetDir: string): Promise<any[]> => {
  return moduleLoader(targetDir, '**/*.plugin.*s')
}
