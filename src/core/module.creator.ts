import { FastifyInstance } from 'fastify'
import fp from 'fastify-plugin'
import { pluginsLoader } from './loader'
import { controllerContainer } from './container'
import { createError } from './error'

interface Controller {
  instance: any;
  options: any;
  methodList: any[];
}

export const createPlugins = async (server: FastifyInstance, targetDir: string): Promise<any> => {
  try {
    const plugins = await pluginsLoader()
    plugins.map(item => {
      server.register(fp(item.plugin))
    })
    return server
  } catch (error) {
    throw createError('CREATE_PLUGINS_ERROR', error)
  }
}

export const createRoutes = (controller: Controller): any => {
  const { instance, methodList } = controller
  return function buildRoutes (fastify: FastifyInstance, opts: any, next: Function): void {
    try {
      methodList.map(controllerMethod => {
        const { functionName, options: { url, method, schema, ...args } } = controllerMethod
        const handler: any = async (...args: any) => instance[functionName](...args)
        fastify.route({ url, method, schema, handler, ...args })
      })
      // clear methodList array
      methodList.length = 0
      next()
    } catch (error) {
      throw createError('CREATE_ROUTES_ERROR', error)
    }
  }
}

export const createControllers = async (): Promise<any> => {
  return function (fastify: FastifyInstance, opts: any, next: Function): void {
    try {
      controllerContainer.forEach((controller) => {
        const routeList = createRoutes(controller)
        fastify.register(routeList, controller.options)
      })
      // clear controllerContainer map
      controllerContainer.clear()
      next()
    } catch (error) {
      throw createError('CREATE_CONTROLLER_ERROR', error)
    }
  }
}
