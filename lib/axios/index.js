import { create } from './hook'
import { extend } from '../utils/inherits'

export default function initAxiosClass (Axios) {
  let staticProps = [
    {
      key: 'create',
      value: create(Axios)
    }
  ]
  return extend(Axios, [], [], staticProps)
}
