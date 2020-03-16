// import path from 'path'
import glob from 'glob-promise'
import { createError } from './error'
// import { configuration } from './configuration'

export function getSourceDir (): string {
  const sourceDir = (
    process.env.NODE_ENV === 'development' ||
    process.env.NODE_ENV === 'production')
    ? '/dist' : '/src'

  const targetDir = process.cwd() + sourceDir
  // console.log('targetDir', targetDir)
  return targetDir
}

export const moduleLoader = async (globPattern: string): Promise<any> => {
  try {
    const targetDir = getSourceDir()
    const cwd = targetDir
    const files = await glob(globPattern, { cwd, ignore: '{**/*.spec, spec}.*s' })
    // console.log('target', targetDir)
    // console.log('files', files)
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
