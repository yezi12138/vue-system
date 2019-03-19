import { registerScriptInit, registerPermission, beforeEach } from './hook'
import { extend } from '../utils/inherits'

/**
 * 增加路由鉴权的钩子
 * 增加全局首加载配置的钩子
 */
export default function initRouterClass(Router) {
  let instanceProps = [
    {
      key: 'scriptInit',
      value: null
    },
    {
      key: 'scriptInitDone',
      value: false
    },
    {
      key: 'permissionInit',
      value: null
    },
    {
      key: 'registerInitScript',
      value: registerScriptInit
    },
    {
      key: 'registerPermission',
      value: registerPermission
    },
    {
      key: 'beforeEach',
      value: function(fn) {
        let originBeforeEach = Router.prototype.beforeEach
        originBeforeEach.bind(this)(beforeEach.bind(this, fn))
      }
    }
  ]
  return extend(
    Router,
    instanceProps
  )
}
