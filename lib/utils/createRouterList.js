var fs = require('fs')
var path = require('path')

var resolve = function (dir) {
  return path.join(__dirname, dir)
}

var createRouterList = function(path) {
  path = resolve(path)
  let dirs = fs.readdirSync(path)
  if (dirs) {
    dirs.forEach(function (item) {
      let file = fs.statSync(path + '/' + item)
      console.log(file.isDirectory())
    })
  }
  console.log(dirs)
}

createRouterList('../router')

// export default createRouterList
