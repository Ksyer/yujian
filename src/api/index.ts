/* api */

// http://api.vikingship.xyz/api/columns

import ajax from '@/api/ajax'
import { LoginProps } from '@/store'

const BASE_URL = '/api'

/* 用户模块
-----------------------------------------------------------------*/
// 请求登录
export const reqLogin = (user: LoginProps) => ajax(BASE_URL, '/user/login', user, 'POST')

// 请求当前用户信息
export const reqCurrentUser = () => ajax(BASE_URL, '/user/current')

/* 专栏模块
-----------------------------------------------------------------*/
// 请求专栏列表
export const reqColumns = () => ajax(BASE_URL, '/columns')

// 通过id请求专栏
export const reqColumn = (cid: string) => ajax(BASE_URL, `/columns/${cid}`)

// 通过id请求文章列表
export const reqPosts = (cid: string) => ajax(BASE_URL, `/columns/${cid}/posts`)
