/**
 * 对象数组的深度拷贝.
 * obj是原数组
 */
const clone = function(obj) {
  if (obj === null) return null
  if (typeof obj !== 'object') return obj
  if (obj.constructor === Date) return new Date(obj)
  if (obj.constructor === RegExp) return new RegExp(obj)
  // eslint-disable-next-line
  let constructor = obj.constructor()
  var newObj = new obj.constructor() // 保持继承链
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      // 不遍历其原型链上的属性
      var val = obj[key]
      newObj[key] = typeof val === 'object' ? clone(val) : val
    }
  }
  return newObj
}

/**
 * 类型检测
 * @prop <String> type 类型
 * 带type则检测是否为该类型，没有则返回值的类型
 * @return <Boolean, String>
 */

function typeTest(obj, type) {
  if (type) {
    type = type.replace(/\w/, $1 => $1.toUpperCase())
    return Object.prototype.toString.call(obj) === `[object ${type}]`
  } else {
    let typeStr = Object.prototype.toString.call(obj)
    return typeStr.slice(8, -1).toLowerCase()
  }
}

/**
 * 不改变a的作用域指向，仅仅添加默认参数,不覆盖原对象的参数
 * @param {*} a 作用域的对象
 * @param {*} b 默认对象参数
 */
function merge(a, b) {
  try {
    for (let key in b) {
      if (a.hasOwnProperty(key)) {
        // console.log('hasOwnProperty', key)
        if (typeTest(b[key]) === typeTest(a[key])) {
          if (typeTest(b[key], 'object')) {
            merge(a[key], b[key])
          } else {
            continue
          }
        } else {
          console.log('%calert: %s 的值类型不相同', 'color:red', key)
          continue
        }
      } else {
        // console.log('no hasOwnProperty', key)
        a[key] = clone(b[key])
      }
    }
    return a
  } catch (e) {
    throw new Error(e)
  }
}

export {
  merge,
  typeTest,
  clone
}
