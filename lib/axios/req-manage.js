
function getRouterPath(routerMode = 'hash') {
  let path = ''
  switch (routerMode) {
    case 'hash':
      path = location.hash.slice(1, location.hash.length)
      break
    case 'history':
      path = location.pathname
      break
    default:
      path = ''
      throw new Error('router mode is not hash or history')
  }
  if (path.substr(-1, 1) === '/') {
    path = path.slice(0, path.length - 1)
  }
  return path
}

class ReqClass {
  constructor(req = {}, Axios) {
    let id = this.initId(req.url)
    let CancelToken = Axios.CancelToken
    let source = CancelToken.source()
    req.cancelToken = source.token
    let unit = {
      id,
      url: req.url,
      instance: req,
      cancel: source.cancel,
      canCancel: true
    }
    req.reqManageUnit = unit
    return unit
  }
  initId(reqUrl) {
    if (!reqUrl) {
      throw new Error('req.url not exist')
    }
    let str = Math.random() * Math.pow(10, Math.floor(Math.random() * 10 + 1))
    return JSON.stringify(str)
  }
}

/**
 * 结构： map[{ url, instance }]
 * routerMode [string] 路由的模式
 */
class StackManage {
  constructor(routerMode = 'hash', Axios) {
    this.routerMode = routerMode
    this.reqWhitelist = []
    this.stack = new Map()
    this.Axios = Axios
  }
  set(req) {
    let reqObj = new ReqClass(req, this.Axios)
    try {
      let routerPath = getRouterPath(this.routerMode)
      let manage = this.stack.get(routerPath)
      if (!manage) {
        this.stack.set(routerPath, { [reqObj.id]: reqObj })
      } else {
        manage[reqObj.id] = reqObj
      }
    } catch (e) {
      console.log(e)
    }
    return reqObj
  }
  get(reqUrl, routerPath = null) {
    if (routerPath) {
      let routerReq = this.getRouterReq(routerPath)
      if (routerReq) {
        let values = Object.values(routerReq)
        for (let i = 0; i < values.length; i++) {
          if (values[i].url === reqUrl) {
            return values[i]
          }
        }
      } else {
        return null
      }
    } else {
      for (let item of this.stack) {
        let values = Object.values(item[1])
        for (let i = 0; i < values.length; i++) {
          if (values[i].url === reqUrl) {
            return values[i]
          }
        }
      }
    }
  }
  getRouterReq(routerPath) {
    return this.stack.get(routerPath)
  }
  cancelRouterReq(routerPath) {
    let routerReq = this.getRouterReq(routerPath)
    try {
      if (routerReq) {
        let keys = Object.keys(routerReq)
        keys.forEach((key) => {
          let item = routerReq[key]
          console.log(item.url)
          let isIngore = this.reqWhitelist.find(url => url === item.url)
          if (!isIngore) {
            item.cancel(item.url + ' 请求取消')
            item.canCancel = false
          }
        })
        this.stack.delete(routerPath)
      }
    } catch (e) {
      console.log(e)
    }
  }
  clear () {
    for (let item of this.stack) {
      let values = item[1]
      Object.keys(values).forEach((key) => {
        let reqClass = values[key]
        if (!reqClass.cancelToken) {
          delete values[key]
        }
      })
    }
  }
  show() {
    return this.stack
  }
  /**
   *
   * @param {Array} list
   * 注册白名单
   */
  registerWhiteList(list) {
    this.reqWhitelist = list
  }
}

export default StackManage
