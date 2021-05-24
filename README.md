# vue-shujian

> wyh | 2021-05-09

**说明：**

- 项目：喻鉴专栏，一个类似知乎专栏的网站

- 技术栈：vue3 + ts + bootstrap + vuex + vue-router + axios

- 规范：eslint-standard，需vscode插件EditorConfig for VS Code、vetur、Prettier - Code formatter

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
