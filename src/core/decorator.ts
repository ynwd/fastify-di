/* eslint-disable new-cap */
import {
  controllerContainer,
  serviceContainer,
  methodContainer,
  hookContainer
} from './container'

/**
 * Controller decorator
 */
export function Controller (options?: any): ClassDecorator {
  return (target: any): any => {
    const instance = new target()
    const controllerName = target.name
    const methodList = methodContainer.filter(method => method.className === controllerName)
    const hookList = hookContainer.filter(hook => hook.className === controllerName)
    const controllerInstance = options
      ? { instance, options, methodList, hookList }
      : { instance, options: { prefix: '/' }, methodList, hookList }
    controllerContainer.set(controllerName, controllerInstance)
  }
}
/**
 * Service decorator
 */
export function Service (): ClassDecorator {
  return (target: any): any => {
    const serviceInstance = new target()
    serviceContainer.set(target.name, serviceInstance)
  }
}

/**
 * Inject decorator: inject a service to controller
 * @param service
 */
export function InjectService (service: Function) {
  return (prototype: any, propertyName: string): any => {
    // add new property from injected service
    Object.defineProperty(prototype, propertyName, {
      get (): any {
        return serviceContainer.get(service.name)
      },
      enumerable: true,
      configurable: true
    })
  }
}

/**
 * Save the function name to methodContainer
 * with key extracted from class name.
 *
 * className is used to methodContainer filtering
 * on controller decorator function
 * @param method
 */
function saveMethod (options: any): Function {
  return (target: any, functionName: string): any => {
    const className = target.constructor.name
    const method = options.url
      ? { className, functionName, options }
      : { className, functionName, options: { ...options, url: '/' } }
    methodContainer.push(method)
  }
}

type HookName = 'onRequest' | 'onResponse' | 'preParsing' | 'preValidation' | 'preHandler' | 'preSerialization'

export function Hook (hook: HookName): Function {
  return (target: any, hookFnName: string): any => {
    const className = target.constructor.name
    const routeHook = { className, hookFnName, hook }
    hookContainer.push(routeHook)
  }
}

export const Get = (options?: any): Function => saveMethod({ method: 'GET', ...options })

export const Post = (options?: any): Function => saveMethod({ method: 'POST', ...options })

export const Delete = (options?: any): Function => saveMethod({ method: 'DELETE', ...options })

export const Head = (options?: any): Function => saveMethod({ method: 'HEAD', ...options })

export const Patch = (options?: any): Function => saveMethod({ method: 'PATCH', ...options })

export const Put = (options?: any): Function => saveMethod({ method: 'PUT', ...options })

export const Options = (options?: any): Function => saveMethod({ method: 'OPTIONS', ...options })
