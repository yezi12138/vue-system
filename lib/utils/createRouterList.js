var fs = require('fs')
var path = require('path')
var a = require('../../example/src/pages/a.vue')
var VueCompiler = require('vue-template-compiler')
console.log(VueCompiler.parseComponent(a))

var _resolve = function (dir) {
  return path.join(__dirname, dir)
}

/**
 * 
 * @param {*} list vue文件数组
 */
var _createRouterList = function (list) {
  //
}


/**
 * 获取路径下的所有文件，包括子集文件
 * @param {*} path 
 * @param {*} isAbsulutePath 是否为绝对路径
 */
function _getFiles (path, isAbsulutePath) {
  !isAbsulutePath && (path = _resolve(path))
  let dirs = fs.readdirSync(path)
  let obj = {}
  if (dirs) {
    dirs.forEach(function (name) {
      let filePath = `${path}/${name}`
      let file = fs.statSync(filePath)
      let isFile = file.isDirectory()
      if (name.indexOf('.vue') > -1 || isFile) {
        let relativePath = _getRelativePath(filePath)
        obj[name] = {
          name,
          shortName: _deleteSuffix(name),
          shortPath: _deleteSuffix(relativePath),
          relativePath: relativePath,
          absulutePath: filePath.split('\\').join('/'),
          children: null
        }
      }
      if (isFile) {
        obj[name].children = _getFiles(filePath, true)
      }
    })
    return obj
  } else {
    return null
  }
}

/**
 * 处理.vue后缀
 * @param {*} str 
 */
function _deleteSuffix (str = '') {
  return str.replace(/\.vue/, '')
}

/**
 * 获取相对路径
 * @param {*} absolutePath 
 */
function _getRelativePath (absolutePath = '') {
  // C:\\Users\\yyq\\Desktop\\vue-system\\example\\src\\pages/arcticle/_id.vue
  return absolutePath.replace(/.+\\[^\/]+\//, '')
}


function _filter_DynamicRoutePath (str = '') {
  // '_a/_dxc'.replace(/\/_|^_/g, ':')
  // return str.replace(/\/_|^_/g, ':')
  return str.replace(/^_/g, ':')
}

function _filter_DynamicRouteName (str = '') {
  // '_a/_dxc'.replace(/\/_|^_/g, ':')
  // return str.replace(/\/_|^_/g, ':')
  return str.replace(/\/_/g, '-')
}

function _filter_AbsolutePath (str = '') {
  // \\ ==> /
  return str.replace()
}

/**
 * 创建路由列表
 * @param {*} fileList 
 */
function _createRouter (fileList) {
  let routeList = []
  if (fileList) {
    Object.values(fileList).forEach(function (item) {
      let route = {
        path: _filter_DynamicRoutePath(item.shortName),
        name: _filter_DynamicRouteName(item.shortPath),
        component: item.absulutePath
      }
      if (item.children) {
        route.children = _createRouter(item.children)
      }
      routeList.push(route)
    })
    return routeList
  } else {
    return null
  }
}

function init (path, isAbsulutePath = false) {
  let list = _getFiles(path, isAbsulutePath)
  // console.log(list)
  return _createRouter(list)
}


/**
 * test
 */
let routeList = init('../../example/src/pages')
// console.log(routeList)

exports = {
  init
}
