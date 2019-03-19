"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extend = extend;

var _tools = require("./tools");

function _possibleConstructorReturn(self, call) {
  if (call && ((0, _tools.typeTest)(call) === 'object' || typeof call === 'function')) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError('Super expression must either be null or a function');
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  var _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _getPrototypeOf(o) {
  var _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };

  return _getPrototypeOf(o);
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ('value' in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}
/**
 *
 * @param {*} superClass
 * @param {[{key,value }]} instanceProps
 * @param {[{key,value,writerable... }]} protoProps
 * @param {[{key,value,writerable... }]} staticProps
 */


function extend(superClass) {
  var instanceProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var protoProps = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var staticProps = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
  return function (superClass) {
    _inherits(subClass, superClass);

    function subClass() {
      var _getPrototypeOf2;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var __this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(subClass)).call.apply(_getPrototypeOf2, [this].concat(args))); // 添加实例属性


      instanceProps.forEach(function (item) {
        __this[item.key] = (0, _tools.typeTest)(item.value, 'function') ? item.value.bind(__this) : item.value;
      });
      return __this;
    }

    _createClass(subClass, protoProps, staticProps);

    return subClass;
  }(superClass);
}