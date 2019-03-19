"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = initAxiosClass;

var _hook = require("./hook");

var _inherits = require("../utils/inherits");

function initAxiosClass(Axios) {
  var staticProps = [{
    key: 'create',
    value: (0, _hook.create)(Axios)
  }];
  return (0, _inherits.extend)(Axios, [], [], staticProps);
}