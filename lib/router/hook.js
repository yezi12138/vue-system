import FnStorage from '../define/fn-storage'

function registerPermission (fn) {
  this.permissionInit = new FnStorage(fn)
}

function registerScriptInit (fn) {
  this.scriptInit = new FnStorage(fn)
}

/**
 * 
 * @param {*} fn 要执行的beforeEach函数
 * @param {*} to 
 * @param {*} from 
 * @param {*} next 
 * @param {*} permissionInit 鉴权的函数
 * 如果permissionInit返回false， 则不执行beforeEach函数
 */
async function exec (fn, to, from, next, permissionInit) {
  let permission = true
  if (permissionInit) {
    try {
      permission = await permissionInit(to, from, next)
    } catch (e) {
      {
        console.log('权限鉴定失败')
        console.log(e)
      }
    }
  }
  if (permission !== false) {
    fn(to, from, next)
  }
}

/**
 *
 * @param {*} fn 要执行的beforeEach函数
 * @param {*} to
 * @param {*} from
 * @param {*} next
 */
async function beforeEach (fn, to, from, next) {
  if (this.scriptInit && !this.scriptInitDone) {
    try {
      await this.scriptInit()
      this.scriptInitDone = true
    } catch (e) {
      console.log('初始化全局script失败')
      console.log(e)
      this.scriptInitDone = false
    }
  }
  exec(fn, to, from, next, this.permissionInit)
}

export { registerScriptInit, registerPermission, beforeEach }
