import axios from 'axios'
import store from '@/store'

const ajax = (baseURL: string, url: string, data = {}, method = 'GET') => {
  const instance = axios.create({
    baseURL,
    timeout: 5000
  })
  instance.interceptors.request.use(
    req => {
      store.commit('setLoading', true)
      return req
    },
    err => err
  )

  instance.interceptors.response.use(
    res => {
      // setTimeout(() => store.commit('setLoading', false), 2000)
      store.commit('setLoading', false)
      return res.data
    },
    err => err
  )

  switch (method) {
    case 'POST':
      return instance.post(url, data)
    case 'PUT':
      return instance.put(url, data)
    case 'PACTH':
      return instance.patch(url, data)
    case 'DELETE':
      return instance.delete(url, data)

    default:
      return instance.get(url, { params: data })
  }
}

export default ajax
