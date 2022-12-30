module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', ['build', 'feature', 'update', 'fixbug', 'refactor', 'optimize', 'style', 'docs', 'chore']],
    'subject-full-stop': [0, 'never'],
    'subject-case': [0, 'never'],
  },

  /**
   * build 编译相关的修改 - 发布版本、对项目构建或者依赖的改动
   * feature：新功能
   * update：更新某功能
   * fixbug：修补某功能的bug
   * refactor：重构某个功能
   * optimize: 优化构建工具或运行时性能
   * style：仅样式改动
   * docs：仅文档新增/改动
   * chore：构建过程或辅助工具的变动
   */
};
