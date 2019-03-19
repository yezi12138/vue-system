"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

/**
 *
 * @param {*} fn 需要执行的异步/同步函数
 * 始终返回一个promise对象
 */
var FnStorage = function FnStorage() {
  var fn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  (0, _classCallCheck2.default)(this, FnStorage);

  if (!fn) {
    throw new Error("Lost argument");
  }

  if (typeof fn !== 'function') {
    throw new Error("The scriptInit argument must be a function");
  }

  function dealWithResult(result) {
    if (result instanceof Promise) {
      return result;
    } else if (typeof result === 'function') {
      return dealWithResult(result());
    } else {
      return new Promise(function (resolve) {
        resolve(result);
      });
    }
  }

  function run() {
    var result = fn.apply(void 0, arguments);
    return dealWithResult(result);
  }

  return run;
};

var _default = FnStorage;
exports.default = _default;