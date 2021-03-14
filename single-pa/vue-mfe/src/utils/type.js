export const isArray = (arr) => Array.isArray(arr)

export const isFunction = (fn) => fn && typeof fn === 'function'

export const isObject = (obj) => obj && typeof obj === 'object'

export const isString = (str) => typeof str === 'string'

export const isPromise = (p) =>
  isObject(p) && p instanceof Promise && isFunction(p.then)
