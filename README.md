# yujian

> wyh | 2021-05-09

[在线演示](http://1.116.123.217:8001/)

**说明：**

- 项目：喻鉴专栏，一个类似知乎专栏的网站

- 技术栈：vue3 + ts + bootstrap5 + vuex + vue-router + axios

- 规范：
  - RESTful
  - eslint-standard，需vscode插件EditorConfig for VS Code、vetur、Prettier - Code formatter

  ```json
  // vscode setting.json
  "vetur.format.defaultFormatterOptions": {
    "prettier": {
        "singleQuote": true,
        "arrowParens": "avoid",
        "semi": false,
        "trailingComma": "none"
    },
    ...
  }
  "vetur.experimental.templateInterpolationService": true, // 通过把vue转换成ts，分析补全再转成vue
  ```

## 项目启动

```cmd
git clone git@github.com:Ksyer/yujian.git

cd yujian

yarn install

yarn serve
```

## 项目内容

功能：

- [x] 已完成专栏列表展示
- [x] 已完成专栏详情展示
- [x] 已完成文章列表展示
- [x] 已完成文章详情展示
- [x] 已完成用户登录注册及退出登录
- [x] 已完成新建文章
- [x] 已完成编辑文章
- [x] 已完我的专栏

组件：

- [x] 验证表单组件封装
- [x] 加载组件封装
- [x] 模态框组件封装
- [x] 文件上传组件封装
- [x] 全局信息提示组件封装
- [x] 下拉框组件封装

hooks：

- [x] useClickOutside
- [x] useDOMCreate
- [x] useLoadMore

其它：

- [x] axios自定义封装
- [x] 路由鉴权：前置守卫结合元信息
  
## 目录结构

```js
+-- node_modules/         node模块目录
+-- public
|   --- index.html        首页入口html文               
|   ...
+-- src
|   +-- api               http请求存放目录
|   |   --- ajax.ts       axios封装
|   |   --- index.ts      api请求配置
|   +-- assets            静态资源
|   +-- components        公共组件
|   +-- hooks             自定义钩子函数
|   +-- store             状态管理
|   +-- views             页面模块
|   --- App.vue           布局页面（应用访问入口）
|   --- main.ts           App渲染入口
|   --- router.ts         路由配置
|   --- shims-vue.d.ts    
--- .browserslistrc       浏览器兼容配置 
--- .editorconfig         文件格式配置
--- .eslintrc.js          es规范配置
--- .gitignore            提交忽略文件配置
--- package.json          项目的配置信息
--- README.md             项目文档
--- tsconfig.json         TS配置信息
--- yarn.lock             node模块（简称包）版本管理
```

## 项目优化

- [x] 减少不必要的重复请求
- [x] 状态管理的数据结构优化：数组、对象转换，减少多层次遍历

日后考虑优化或项目升级

- [x] 浏览器缓存优化
- [x] 懒加载
- [x] 按需引入
- [x] 服务端渲染
- [x] SEO——搜索引擎优化
- [ ] ...
