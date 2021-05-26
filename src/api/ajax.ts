import axios from 'axios'
import store from '@/store'

interface Headers {
  ['Content-Type']: string
}

interface ConfigProps {
  headers?: Headers
}

const ajax = (baseURL: string, url: string, data = {}, method = 'GET', config?: ConfigProps) => {
  const instance = axios.create({
    baseURL,
    timeout: 5000
  })
  instance.interceptors.request.use(
    req => {
      store.commit('setLoading', true)
      store.commit('setError', { status: false, message: '' })
      return req
    },
    err => err
  )

  instance.interceptors.response.use(
    res => {
      // setTimeout(() => store.commit('setLoading', false), 2000)
      store.commit('setLoading', false)
      return res
    },
    err => {
      const { error } = err.response.data
      store.commit('setError', { status: true, message: error })
      store.commit('setLoading', false)
      return Promise.reject(err.response.data)
    }
  )

  switch (method) {
    case 'POST':
      if (config) {
        const { headers } = config
        return instance.post(url, data, { headers })
      }
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
