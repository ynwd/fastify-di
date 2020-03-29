import { FastifyInstance } from 'fastify'
import fp from 'fastify-plugin'
import { pluginsLoader } from './loader'
import { controllerContainer } from './container'
import { createError } from './error'

interface Controller {
  instance: any;
  options: any;
  methodList: any[];
  hookList: any[];
  hookOptions: any;
}

export const createPlugins = async (server: FastifyInstance): Promise<any> => {
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

const createRoutes = (controller: Controller): any => {
  const { instance, methodList, hookOptions } = controller
  return (fastify: FastifyInstance, opts: any, next: Function): void => {
    try {
      methodList.map(controllerMethod => {
        const { functionName, options } = controllerMethod
        const handler: any = async (...args: any) => instance[functionName](...args)
        const routeOptions = { ...options, handler }
        if (hookOptions) {
          const routeOptions = { ...options, handler }
          fastify.route({ ...routeOptions, ...hookOptions })
        } else fastify.route(routeOptions)
      })
      methodList.length = 0
      next()
    } catch (error) {
      throw createError('CREATE_ROUTES_ERROR', error)
    }
  }
}

export const createHooks = (controller: Controller): any => {
  const { instance, hookList } = controller
  let hookOptions: any
  if (hookList.length > 0) {
    hookList.map(item => {
      const { hookFnName, hook } = item
      const hookHandler: any = async (...args: any) => instance[hookFnName](...args)
      hookOptions = { ...{}, [hook]: hookHandler }
    })
    controller.hookOptions = hookOptions
  }
  hookList.length = 0
  return createRoutes(controller)
}

export const createControllers = async (): Promise<any> => {
  return (fastify: FastifyInstance, opts: any, next: Function): void => {
    try {
      controllerContainer.forEach((controller) => {
        const routeList = createHooks(controller)
        fastify.register(routeList, controller.options)
      })
      controllerContainer.clear()
      next()
    } catch (error) {
      throw createError('CREATE_CONTROLLER_ERROR', error)
    }
  }
}
