# vue-shujian

> wyh | 2021-05-09

**说明：**

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

## 开发流程

- 将UI划分出组件的层级
- 创建应用的静态版本
