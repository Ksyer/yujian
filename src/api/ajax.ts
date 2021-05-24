import axios from 'axios'

const ajax = (baseURL: string, url: string, data = {}, method = 'GET') => {
  const instance = axios.create({
    baseURL,
    timeout: 5000
  })

  instance.interceptors.response.use(
    res => res.data,
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
