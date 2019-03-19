import initRouterClass from './router'
import initAxiosClass from './axios'

class System {
  constructor (Axios, Router) {
    this.axios = initAxiosClass(Axios)
    this.router = initRouterClass(Router)
  }
}

export default System