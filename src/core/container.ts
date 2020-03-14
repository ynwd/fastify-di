export const controllerContainer = new Map<string | symbol | Object, any>()
export const serviceContainer = new Map<string | symbol | Object, any>()
export const methodContainer: any[] = []
export const hookContainer: any[] = []
export const pluginContainer: any[] = []
export const token = Symbol('token')
