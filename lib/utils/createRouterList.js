var fs = require('fs')
var path = require('path')

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
        obj[name] = {
          name,
          shortName: _geShortName(name),
          relativePath: _getRelativePath(filePath),
          absulutePath: filePath,
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

function _geShortName (name = '') {
  return name.replace(/\.vue/, '')
}

function _getRelativePath (absolutePath = '') {
  // C:\\Users\\yyq\\Desktop\\vue-system\\example\\src\\pages/arcticle/_id.vue
  return absolutePath.replace(/.+\\[^\/]+\//, '')
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
        path: item.relativePath,
        name: item.shortName,
        component: () => require(item.absolutePath)
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
  return _createRouter(list)
}


/**
 * test
 */
let routeList = init('../../example/src/pages')
console.log(routeList)

exports = {
  init
}
