import { createStore } from 'vuex'
import { reqColumns, reqColumn, reqPosts, reqLogin, reqCurrentUser } from '@/api'
import axios from 'axios'

export interface LoginProps {
  email: string
  password: string
}

export interface UserProps {
  isLogin: boolean
  nickName?: string
  _id?: string
  column?: string
  email?: string
}

interface ImageProps {
  _id?: string
  url?: string
  createdAt?: string
  fitUrl?: string
}

export interface ColumnProps {
  _id: string
  title: string
  avatar?: ImageProps
  description: string
}

export interface PostProps {
  _id: string
  title: string
  excerpt?: string
  content?: string
  image?: string
  createdAt: string
  column: string
}

export interface GlobalErrorProps {
  status: boolean
  message?: string
}

export interface GlobalDataProps {
  error: GlobalErrorProps
  token: string
  isLoading: boolean
  columns: ColumnProps[]
  posts: PostProps[]
  user: UserProps
}

const store = createStore<GlobalDataProps>({
  state: {
    error: { status: false },
    token: localStorage.getItem('token') || '',
    isLoading: false,
    columns: [],
    posts: [],
    user: { isLogin: false }
  },
  mutations: {
    createPost(state, newPost) {
      state.posts.push(newPost)
    },
    getColumns(state, rawData) {
      state.columns = rawData.data.list
    },
    getColumn(state, rawData) {
      state.columns = [rawData.data]
    },
    getPosts(state, rawData) {
      state.posts = rawData.data.list
    },
    setLoading(state, status) {
      state.isLoading = status
    },
    login(state, rawData) {
      const { token } = rawData.data
      state.token = token
      localStorage.setItem('token', token)
      axios.defaults.headers.common.Authorization = `Bearer ${token}`
    },
    getCurrentUser(state, rawData) {
      state.user = { isLogin: true, ...rawData.data }
    },
    setError(state, e: GlobalErrorProps) {
      state.error = e
    }
  },
  actions: {
    async getColumns(ctx) {
      const res = await reqColumns()
      ctx.commit('getColumns', res)
    },
    async getColumn({ commit }, cid: string) {
      const res = await reqColumn(cid)
      commit('getColumn', res)
    },
    async getPosts({ commit }, cid: string) {
      const res = await reqPosts(cid)
      commit('getPosts', res)
    },
    async login({ commit }, payload: LoginProps) {
      const res = await reqLogin(payload)
      commit('login', res)
    },
    async getCurrentUser({ commit }) {
      const res = await reqCurrentUser()
      commit('getCurrentUser', res)
    },
    loginAndCurrentUser({ dispatch }, loginData: LoginProps) {
      return dispatch('login', loginData).then(() => {
        return dispatch('getCurrentUser')
      })
    }
  },
  getters: {
    getColumnById: state => (id: string) => {
      return state.columns.find(c => c._id === id)
    },
    getPostsById: state => (cid: string) => {
      return state.posts.filter(post => post.column === cid)
    }
  }
})

export default store
