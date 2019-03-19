"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _router = _interopRequireDefault(require("./router"));

var _axios = _interopRequireDefault(require("./axios"));

var System = function System(Axios, Router) {
  (0, _classCallCheck2.default)(this, System);
  this.axios = (0, _axios.default)(Axios);
  this.router = (0, _router.default)(Router);
};

var _default = System;
exports.default = _default;