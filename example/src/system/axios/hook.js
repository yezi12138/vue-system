"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = create;

var _reqManage = _interopRequireDefault(require("./req-manage"));

function reqManageInterceptor(config) {
  this.reqManage && this.reqManage.set(config);
  return config;
}

function resManageInterceptor(data) {
  if (data.config && data.config.reqManageUnit) {
    data.config.reqManageUnit.canCancel = false;
    this.reqManage.clear();
  }

  return data;
}

function registerReqManage() {
  var reqWhitelist = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var mode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'hash';
  this.reqManage = new _reqManage.default(mode, this.superClass);
  this.reqManage.registerWhiteList(reqWhitelist);
  this.interceptors.request.use(reqManageInterceptor.bind(this));
  this.interceptors.response.use(resManageInterceptor.bind(this));
}

function create(Axios) {
  return function (instanceConfig) {
    var instance = Axios.create(instanceConfig);
    instance.superClass = Axios;
    instance.registerReqManage = registerReqManage;
    return instance;
  };
}