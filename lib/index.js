import initRouterClass from './router'
import initAxiosClass from './axios'

class System {
  constructor (Axios, Router) {
    this.Axios = initAxiosClass(Axios)
    this.Router = initRouterClass(Router)
  }
}

export default System