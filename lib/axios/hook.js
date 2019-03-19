import RegManage from './req-manage'

function reqManageInterceptor (config) {
  this.reqManage && this.reqManage.set(config)
  return config
}

function resManageInterceptor (data) {
  if (data.config && data.config.reqManageUnit) {
    data.config.reqManageUnit.canCancel = false
    this.reqManage.clear()
  }
  return data
}

function registerReqManage (reqWhitelist = [], mode = 'hash') {
  this.reqManage = new RegManage(mode, this.superClass)
  this.reqManage.registerWhiteList(reqWhitelist)
  this.interceptors.request.use(reqManageInterceptor.bind(this))
  this.interceptors.response.use(resManageInterceptor.bind(this))
}
function create (Axios) {
  return function (instanceConfig) {
    let instance = Axios.create(instanceConfig)
    instance.superClass = Axios
    instance.registerReqManage = registerReqManage
    return instance
  }
}

export { create }
