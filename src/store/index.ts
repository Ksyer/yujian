import { createStore } from 'vuex'
import { reqColumns, reqColumn, reqPosts } from '@/api'

export interface UserProps {
  isLogin: boolean
  name?: string
  id?: number
  columnId?: number
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

export interface GlobalDataProps {
  columns: ColumnProps[]
  posts: PostProps[]
  user: UserProps
}

const store = createStore<GlobalDataProps>({
  state: {
    columns: [],
    posts: [],
    user: { isLogin: true, name: 'wyh', columnId: 1 }
  },
  mutations: {
    login(state) {
      state.user = { ...state.user, isLogin: true, name: 'wyh' }
    },
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
    }
  },
  actions: {
    async getColumns(ctx) {
      const res = await reqColumns()
      ctx.commit('getColumns', res)
    },
    async getColumn({ commit }, cid) {
      const res = await reqColumn(cid)
      commit('getColumn', res)
    },
    async getPosts({ commit }, cid) {
      const res = await reqPosts(cid)
      commit('getPosts', res)
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
