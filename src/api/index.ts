/* api */

// http://api.vikingship.xyz/api/columns

import ajax from '@/api/ajax'

const BASE_URL = '/api'

/* 用户模块
-----------------------------------------------------------------*/

/* 专栏模块
-----------------------------------------------------------------*/
export const reqColumns = () => ajax(BASE_URL, '/columns')
