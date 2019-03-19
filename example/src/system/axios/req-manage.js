"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

function getRouterPath() {
  var routerMode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'hash';
  var path = '';

  switch (routerMode) {
    case 'hash':
      path = location.hash.slice(1, location.hash.length);
      break;

    case 'history':
      path = location.pathname;
      break;

    default:
      path = '';
      throw new Error('router mode is not hash or history');
  }

  if (path.substr(-1, 1) === '/') {
    path = path.slice(0, path.length - 1);
  }

  return path;
}

var ReqClass =
/*#__PURE__*/
function () {
  function ReqClass() {
    var req = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var Axios = arguments.length > 1 ? arguments[1] : undefined;
    (0, _classCallCheck2.default)(this, ReqClass);
    var id = this.initId(req.url);
    var CancelToken = Axios.CancelToken;
    var source = CancelToken.source();
    req.cancelToken = source.token;
    var unit = {
      id: id,
      url: req.url,
      instance: req,
      cancel: source.cancel,
      canCancel: true
    };
    req.reqManageUnit = unit;
    return unit;
  }

  (0, _createClass2.default)(ReqClass, [{
    key: "initId",
    value: function initId(reqUrl) {
      if (!reqUrl) {
        throw new Error('req.url not exist');
      }

      var str = Math.random() * Math.pow(10, Math.floor(Math.random() * 10 + 1));
      return JSON.stringify(str);
    }
  }]);
  return ReqClass;
}();
/**
 * 结构： map[{ url, instance }]
 * routerMode [string] 路由的模式
 */


var StackManage =
/*#__PURE__*/
function () {
  function StackManage() {
    var routerMode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'hash';
    var Axios = arguments.length > 1 ? arguments[1] : undefined;
    (0, _classCallCheck2.default)(this, StackManage);
    this.routerMode = routerMode;
    this.reqWhitelist = [];
    this.stack = new Map();
    this.Axios = Axios;
  }

  (0, _createClass2.default)(StackManage, [{
    key: "set",
    value: function set(req) {
      var reqObj = new ReqClass(req, this.Axios);

      try {
        var routerPath = getRouterPath(this.routerMode);
        var manage = this.stack.get(routerPath);

        if (!manage) {
          this.stack.set(routerPath, (0, _defineProperty2.default)({}, reqObj.id, reqObj));
        } else {
          manage[reqObj.id] = reqObj;
        }
      } catch (e) {
        console.log(e);
      }

      return reqObj;
    }
  }, {
    key: "get",
    value: function get(reqUrl) {
      var routerPath = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      if (routerPath) {
        var routerReq = this.getRouterReq(routerPath);

        if (routerReq) {
          var values = Object.values(routerReq);

          for (var i = 0; i < values.length; i++) {
            if (values[i].url === reqUrl) {
              return values[i];
            }
          }
        } else {
          return null;
        }
      } else {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = this.stack[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var item = _step.value;

            var _values = Object.values(item[1]);

            for (var _i = 0; _i < _values.length; _i++) {
              if (_values[_i].url === reqUrl) {
                return _values[_i];
              }
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }
    }
  }, {
    key: "getRouterReq",
    value: function getRouterReq(routerPath) {
      return this.stack.get(routerPath);
    }
  }, {
    key: "cancelRouterReq",
    value: function cancelRouterReq(routerPath) {
      var _this = this;

      var routerReq = this.getRouterReq(routerPath);

      try {
        if (routerReq) {
          var keys = Object.keys(routerReq);
          keys.forEach(function (key) {
            var item = routerReq[key];
            console.log(item.url);

            var isIngore = _this.reqWhitelist.find(function (url) {
              return url === item.url;
            });

            if (!isIngore) {
              item.cancel(item.url + ' 请求取消');
              item.canCancel = false;
            }
          });
          this.stack.delete(routerPath);
        }
      } catch (e) {
        console.log(e);
      }
    }
  }, {
    key: "clear",
    value: function clear() {
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        var _loop = function _loop() {
          var item = _step2.value;
          var values = item[1];
          Object.keys(values).forEach(function (key) {
            var reqClass = values[key];

            if (!reqClass.cancelToken) {
              delete values[key];
            }
          });
        };

        for (var _iterator2 = this.stack[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          _loop();
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }
  }, {
    key: "show",
    value: function show() {
      return this.stack;
    }
    /**
     *
     * @param {Array} list
     * 注册白名单
     */

  }, {
    key: "registerWhiteList",
    value: function registerWhiteList(list) {
      this.reqWhitelist = list;
    }
  }]);
  return StackManage;
}();

var _default = StackManage;
exports.default = _default;