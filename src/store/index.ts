import { createStore } from 'vuex'
import { testPosts } from '@/testData'
import { reqColumns } from '@/api'

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
  id: number
  title: string
  content: string
  image?: string
  createdAt: string
  columnId: number
}

export interface GlobalDataProps {
  columns: ColumnProps[]
  posts: PostProps[]
  user: UserProps
}

const store = createStore<GlobalDataProps>({
  state: {
    columns: [],
    posts: testPosts,
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
      state.columns = rawData.list
    }
  },
  actions: {
    async getColumns(ctx) {
      const res = await reqColumns()
      ctx.commit('getColumns', res.data)
    }
  },
  getters: {
    // biggerColumnsLen(state) {
    //   return state.columns.filter(c => c.id > 2).length
    // },
    // getColumnById: state => (id: number) => {
    //   return state.columns.find(c => c.id === id)
    // },
    getPostsById: state => (cid: number) => {
      return state.posts.filter(post => post.columnId === cid)
    }
  }
})

export default store
