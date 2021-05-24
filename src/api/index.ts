/* api */

// http://api.vikingship.xyz/api/columns

import ajax from '@/api/ajax'

const BASE_URL = '/api'

/* 用户模块
-----------------------------------------------------------------*/

/* 专栏模块
-----------------------------------------------------------------*/
// 请求专栏列表
export const reqColumns = () => ajax(BASE_URL, '/columns')

// 通过id请求专栏
export const reqColumn = (cid: string) => ajax(BASE_URL, `/columns/${cid}`)

// 通过id请求文章列表
export const reqPosts = (cid: string) => ajax(BASE_URL, `/columns/${cid}/posts`)
