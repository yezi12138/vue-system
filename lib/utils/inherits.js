import { typeTest } from './tools'
function _possibleConstructorReturn(self, call) {
  if (call && (typeTest(call) === 'object' || typeof call === 'function')) {
    return call
  }
  return _assertThisInitialized(self)
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    )
  }
  return self
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError('Super expression must either be null or a function')
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: { value: subClass, writable: true, configurable: true }
  })
  if (superClass) _setPrototypeOf(subClass, superClass)
}

function _setPrototypeOf(o, p) {
  let _setPrototypeOf =
    Object.setPrototypeOf ||
    function _setPrototypeOf(o, p) {
      o.__proto__ = p
      return o
    }
  return _setPrototypeOf(o, p)
}

function _getPrototypeOf(o) {
  let _getPrototypeOf = Object.setPrototypeOf
    ? Object.getPrototypeOf
    : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o)
      }
  return _getPrototypeOf(o)
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i]
    descriptor.enumerable = descriptor.enumerable || false
    descriptor.configurable = true
    if ('value' in descriptor) descriptor.writable = true
    Object.defineProperty(target, descriptor.key, descriptor)
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps)
  if (staticProps) _defineProperties(Constructor, staticProps)
  return Constructor
}

/**
 *
 * @param {*} superClass
 * @param {[{key,value }]} instanceProps
 * @param {[{key,value,writerable... }]} protoProps
 * @param {[{key,value,writerable... }]} staticProps
 */
function extend(
  superClass,
  instanceProps = [],
  protoProps = [],
  staticProps = []
) {
  return (function(superClass) {
    _inherits(subClass, superClass)
    function subClass(...args) {
      let __this = _possibleConstructorReturn(
        this,
        _getPrototypeOf(subClass).call(this, ...args)
      )
      // 添加实例属性
      instanceProps.forEach(item => {
        __this[item.key] = typeTest(item.value, 'function')
          ? item.value.bind(__this)
          : item.value
      })
      return __this
    }
    _createClass(subClass, protoProps, staticProps)
    return subClass
  })(superClass)
}

export { extend }
