/**
 *
 * @param {*} fn 需要执行的异步/同步函数
 * 始终返回一个promise对象
 */
class FnStorage {
  constructor(fn = {}) {
    if (!fn) {
      throw new Error(`Lost argument`)
    }

    if (typeof fn !== 'function') {
      throw new Error(`The scriptInit argument must be a function`)
    }

    function dealWithResult (result) {
      if (result instanceof Promise) {
        return result
      } else if (typeof result === 'function') {
        return dealWithResult(result())
      } else {
        return new Promise(function(resolve) {
          resolve(result)
        })
      }
    }

    function run (...args) {
      let result = fn(...args)
      return dealWithResult(result)
    }
    
    return run
  }
}

export default FnStorage