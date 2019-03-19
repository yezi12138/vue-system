"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = initRouterClass;

var _hook = require("./hook");

var _inherits = require("../utils/inherits");

/**
 * 增加路由鉴权的钩子
 * 增加全局首加载配置的钩子
 */
function initRouterClass(Router) {
  var instanceProps = [{
    key: 'scriptInit',
    value: null
  }, {
    key: 'scriptInitDone',
    value: false
  }, {
    key: 'permissionInit',
    value: null
  }, {
    key: 'registerInitScript',
    value: _hook.registerScriptInit
  }, {
    key: 'registerPermission',
    value: _hook.registerPermission
  }, {
    key: 'beforeEach',
    value: function value(fn) {
      var originBeforeEach = Router.prototype.beforeEach;
      originBeforeEach.bind(this)(_hook.beforeEach.bind(this, fn));
    }
  }];
  return (0, _inherits.extend)(Router, instanceProps);
}