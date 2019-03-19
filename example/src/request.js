import system from './system.js'
// import axios from 'axios'

function requestInterceptor (config) {
  console.log('requestInterceptor', config)
  return config
}
let instance = system.axios.create({
  baseURL: '/api'
})

// let instance = axios.create({
//   baseURL: '/api'
// })

instance.registerReqManage([
  // '/Management/GetDetailControlById',
  // '/Report/E2EConversationInfo'
])

// instance.interceptors.request.use(requestInterceptor)
instance.interceptors.response.use(requestInterceptor)

export default instance
