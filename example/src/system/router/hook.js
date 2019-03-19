"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerScriptInit = registerScriptInit;
exports.registerPermission = registerPermission;
exports.beforeEach = beforeEach;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _fnStorage = _interopRequireDefault(require("../define/fn-storage"));

function registerPermission(fn) {
  this.permissionInit = new _fnStorage.default(fn);
}

function registerScriptInit(fn) {
  this.scriptInit = new _fnStorage.default(fn);
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


function exec(_x, _x2, _x3, _x4, _x5) {
  return _exec.apply(this, arguments);
}
/**
 *
 * @param {*} fn 要执行的beforeEach函数
 * @param {*} to
 * @param {*} from
 * @param {*} next
 */


function _exec() {
  _exec = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(fn, to, from, next, permissionInit) {
    var permission;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            permission = true;

            if (!permissionInit) {
              _context.next = 12;
              break;
            }

            _context.prev = 2;
            _context.next = 5;
            return permissionInit(to, from, next);

          case 5:
            permission = _context.sent;
            _context.next = 12;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](2);
            console.log('权限鉴定失败');
            console.log(_context.t0);

          case 12:
            if (permission !== false) {
              fn(to, from, next);
            }

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 8]]);
  }));
  return _exec.apply(this, arguments);
}

function beforeEach(_x6, _x7, _x8, _x9) {
  return _beforeEach.apply(this, arguments);
}

function _beforeEach() {
  _beforeEach = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee2(fn, to, from, next) {
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!(this.scriptInit && !this.scriptInitDone)) {
              _context2.next = 12;
              break;
            }

            _context2.prev = 1;
            _context2.next = 4;
            return this.scriptInit();

          case 4:
            this.scriptInitDone = true;
            _context2.next = 12;
            break;

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](1);
            console.log('初始化全局script失败');
            console.log(_context2.t0);
            this.scriptInitDone = false;

          case 12:
            exec(fn, to, from, next, this.permissionInit);

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this, [[1, 7]]);
  }));
  return _beforeEach.apply(this, arguments);
}