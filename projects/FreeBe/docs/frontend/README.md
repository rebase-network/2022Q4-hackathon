## FreeBe Web Client

为了自由人的价值贡献合理权益分配 🕊️

## 框架及依赖

#### 架构

- components/Native - 放着公共可复用的组件
- views/components - 放着当前views文件中的组件
- 每个Api都有一套Types的接口规范

#### 配置

- husky: Git钩子工具 - 对应文件 commitlint.config.cjs
- normalize.css: css原生文件
- unplugin-auto-import: Vue钩子自动导入  - 在vite.config.ts中plugin中配置 - 对应生成文件 auto-import.d.ts
- unplugin-vue-components: 页面与组件自动导入  - 在vite.config.ts中plugin中配置 - 对应生成文件 - components.d.ts
- @vueuse/core: Vue函数封装库
- vee-validate: 表单验证工具
- zod: 强校验语法库

#### UI选型

- headless Tailwind UI -  精简但功能少
- Vuetify - 国际化 功能多 Meteral模式
- 目前占比: 自定义70% + Vuetify20% + handless 10%

#### 主题

- 主题色cyan：#0FBCC0
- 主题背景色light cyan：#F1F5F9
- 辅助色yellow：#F2D943
- 辅助色pink:#FF7083
- 黑色：#060608
- 蓝灰色：#71718A
