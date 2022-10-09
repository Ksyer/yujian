/* api */

// http://api.vikingship.xyz/api/columns

import ajax from '@/api/ajax'
import { LoginProps, PostProps, pageParams, fetchPostsParams } from '@/store'

interface SigProps {
  email: string
  nickName: string
  password: string
}

let BASE_URL = '/api'
if (process.env.NODE_ENV === 'test') {
  BASE_URL = process.env.VUE_APP_BASEURL
}

/* 用户模块
-----------------------------------------------------------------*/
// 请求登录
export const reqLogin = (user: LoginProps) => ajax(BASE_URL, '/user/login', user, 'POST')

// 请求当前用户信息
export const reqCurrentUser = () => ajax(BASE_URL, '/user/current')

// 请求注册用户
export const reqSignup = (user: SigProps) => ajax(BASE_URL, '/users', user, 'POST')

/* 专栏模块
-----------------------------------------------------------------*/
// 请求专栏列表
export const reqColumns = (page: pageParams) => ajax(BASE_URL, `/columns?currentPage=${page.currentPage}&pageSize=${page.pageSize}`)

// 通过id请求专栏
export const reqColumn = (cid: string) => ajax(BASE_URL, `/columns/${cid}`)

/* 文章模块
-----------------------------------------------------------------*/
// 通过id请求文章列表
export const reqPosts = (params: fetchPostsParams) => ajax(BASE_URL, `/columns/${params.cid}/posts?currentPage=${params.currentPage}&pageSize=${params.pageSize}`)

// 文件上传
export const reqUpload = <T>(url: string, formData: T) => ajax(BASE_URL, url, formData, 'POST')

// 新建文章
export const reqCreatePost = (post: PostProps) => ajax(BASE_URL, '/posts', post, 'POST')

// 通过id查询文章
export const reqPost = (id: string) => ajax(BASE_URL, `/posts/${id}`)

// 更新文章
export const reqUpdatePost = (post: PostProps) => ajax(BASE_URL, `/posts/${post._id}`, post, 'PATCH')

// 删除文章
export const reqDeletePost = (id: string) => ajax(BASE_URL, `/posts/${id}`, {}, 'DELETE')
