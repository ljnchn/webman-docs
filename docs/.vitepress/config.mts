import { defineConfig, type DefaultTheme } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: "zh-Hans",
  title: "Webman",
  description: "性能爆炸的 PHP 内存框架",
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
  markdown: {
    // theme: {
    //   light: "github-light",
    //   dark: "one-dark-pro",
    // },
  },
  // https://vitepress.dev/reference/default-theme-config
  themeConfig: {

    search: {
      provider: "local",
    },

    nav: nav(),

    editLink: {
      pattern: 'https://github.com/ljnchn/webman-docs/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页面'
    },

    footer: {
      message: '基于 MIT 许可发布',
      copyright: `版权所有 © 2019-${new Date().getFullYear()}`
    },

    sidebar: {
      '/guide/': { base: '/guide/', items: sidebarGuide() },
    },

    socialLinks: [{ icon: "github", link: "https://github.com/walkor/webman" }],

    docFooter: {
      prev: "上一页",
      next: "下一页",
    },

    outline: {
      label: "页面导航",
    },

    lastUpdated: {
      text: "最后更新于",
      formatOptions: {
        dateStyle: "short",
        timeStyle: "medium",
      },
    },

    langMenuLabel: "多语言",
    returnToTopLabel: "回到顶部",
    sidebarMenuLabel: "菜单",
    darkModeSwitchLabel: "主题",
    lightModeSwitchTitle: "切换到浅色模式",
    darkModeSwitchTitle: "切换到深色模式",
  },
});

function nav(): DefaultTheme.NavItem[] {
  return [
    {
      text: '指南',
      link: '/guide/README',
      activeMatch: '/guide/'
    },
    { text: "官网", link: "https://www.workerman.net/" },
    { text: "社区", link: "https://www.workerman.net/questions" },
    { text: "插件", link: "https://www.workerman.net/webman" },
  ]
}


function sidebarGuide(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: "入门指引",
      collapsed: false,
      items: [
        { text: "webman是什么", link: "README" },
        { text: "编程须知", link: "attention" },
        // { text: "问答社区", link: "help" },
      ],
    },
    {
      text: "快速开始",
      collapsed: false,
      items: [
        { text: "安装", link: "install" },
        { text: "目录结构", link: "directory" },
        { text: "简单示例", link: "tutorial" },
      ],
    },
    {
      text: "基础功能",
      collapsed: false,
      items: [
        { text: "请求", link: "request" },
        { text: "响应", link: "response" },
        { text: "控制器", link: "controller" },
        { text: "路由", link: "route" },
        { text: "中间件", link: "middleware" },
        { text: "视图", link: "view" },
        { text: "静态文件", link: "static" },
        { text: "session管理", link: "session" },
        { text: "异常处理", link: "exception" },
        { text: "日志", link: "log" },
        { text: "配置文件", link: "config" },
        { text: "多应用", link: "multiapp" },
      ],
    },
    {
      text: "数据库",
      collapsed: false,
      items: [
        { text: "快速开始", link: "db/tutorial" },
        { text: "配置数据库", link: "db/config" },
        { text: "查询构造器", link: "db/queries" },
        { text: "模型", link: "db/model" },
        { text: "模型关联", link: "db/relationships" },
        { text: "分页", link: "db/paginator" },
        { text: "数据库迁移", link: "db/migration" },
        { text: "Redis", link: "db/redis" },
        { text: "Cache", link: "db/cache" },
        { text: "MongoDB", link: "db/mongo" },
        { text: "ThinkORM", link: "db/thinkorm" },
        { text: "ThinkCache", link: "db/thinkcache" },
        { text: "Medoo", link: "db/medoo" },
      ],
    },
    {
      text: "消息队列",
      collapsed: false,
      items: [
        { text: "Redis队列", link: "queue/redis" },
        { text: "Stomp", link: "queue/stomp" },
      ],
    },
    {
      text: "常用组件",
      collapsed: false,
      items: [
        { text: "验证器", link: "components/validation" },
        { text: "分页组件", link: "components/paginator" },
        { text: "多语言", link: "components/translation" },
        { text: "图像处理", link: "components/image" },
        { text: "验证码", link: "components/captcha" },
        { text: "Event事件", link: "components/event" },
        { text: "Env环境变量组件", link: "components/env" },
        { text: "Crontab定时任务", link: "components/crontab" },
        { text: "Excel表格", link: "components/excel" },
        { text: "微信SDK", link: "components/wechat" },
        { text: "支付SDK", link: "components/payment" },
        { text: "Casbin SDK", link: "components/casbin" },
        { text: "单元测试", link: "components/unitest" },
      ],
    },
    {
      text: "基础插件",
      collapsed: false,
      items: [
        { text: "基础插件", link: "plugin/base" },
        { text: "命令行", link: "plugin/console" },
        { text: "推送", link: "plugin/push" },
        { text: "基础插件市场", link: "plugin/market" },
        { text: "提交基础插件", link: "plugin/create" },
      ],
    },
    {
      text: "应用插件",
      collapsed: true,
      items: [
        { text: "介绍", link: "app/app" },
        { text: "规范", link: "app/standard" },
        { text: "创建应用", link: "app/create" },
        { text: "目录结构", link: "app/directory" },
        { text: "路由", link: "app/route" },
        { text: "配置文件", link: "app/config" },
        { text: "控制器", link: "app/controller" },
        { text: "视图", link: "app/view" },
        { text: "静态文件", link: "app/static" },
        { text: "数据库", link: "app/database" },
        { text: "Redis", link: "app/redis" },
        { text: "日志", link: "app/log" },
        { text: "接入webman-admin", link: "app/admin" },
        { text: "打包插件", link: "app/pack" },
        { text: "发布插件", link: "app/publish" },
        { text: "安装卸载", link: "app/install" },
        { text: "应用市场", link: "app/market" },
      ],
    },
    {
      text: "高级进阶",
      collapsed: false,
      items: [
        { text: "自定义进程", link: "process" },
        { text: "依赖注入", link: "di" },
        { text: "二进制打包", link: "others/bin" },
        { text: "AOP", link: "aop" },
      ],
    },
    {
      text: "其它",
      collapsed: false,
      items: [
        { text: "安全", link: "others/security" },
        { text: "数据库事务", link: "others/transaction" },
        { text: "函数禁用检查", link: "others/disable-function-check" },
        { text: "自定义脚本", link: "others/scripts" },
        { text: "自定义404 500", link: "others/custom-error-page" },
        { text: "升级方法", link: "others/upgrade" },
        { text: "nginx代理", link: "others/nginx-proxy" },
        { text: "phar打包", link: "others/phar" },
        { text: "启动流程", link: "others/process" },
        { text: "生命周期", link: "others/lifecycle" },
        { text: "内存泄漏", link: "others/memory-leak" },
        { text: "业务初始化", link: "others/bootstrap" },
        { text: "自动加载", link: "others/autoload" },
        { text: "慢业务处理", link: "others/task" },
        { text: "性能", link: "others/performance" },
        { text: "压力测试", link: "others/benchmarks" },
        { text: "文件监控", link: "others/monitor" },
      ],
    },
    {
      text: "升级",
      collapsed: false,
      items: [
        { text: "1.4", link: "upgrade/1-4" },
        { text: "1.6", link: "upgrade/1-6" },
        { text: "致谢", link: "thanks" },
      ],
    },
  ];
}

function sidebarReference(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: "参考",
      items: [
        { text: "站点配置", link: "site-config" },
        { text: "frontmatter 配置", link: "frontmatter-config" },
        { text: "运行时 API", link: "runtime-api" },
        { text: "CLI", link: "cli" },
        {
          text: "默认主题",
          base: "/zh/reference/default-theme-",
          items: [
            { text: "概览", link: "config" },
            { text: "导航栏", link: "nav" },
            { text: "侧边栏", link: "sidebar" },
            { text: "主页", link: "home-page" },
            { text: "页脚", link: "footer" },
            { text: "布局", link: "layout" },
            { text: "徽章", link: "badge" },
            { text: "团队页", link: "team-page" },
            { text: "上下页链接", link: "prev-next-links" },
            { text: "编辑链接", link: "edit-link" },
            { text: "最后更新时间戳", link: "last-updated" },
            { text: "搜索", link: "search" },
            { text: "Carbon Ads", link: "carbon-ads" },
          ],
        },
      ],
    },
  ];
}

export const search: DefaultTheme.AlgoliaSearchOptions["locales"] = {
  zh: {
    placeholder: "搜索文档",
    translations: {
      button: {
        buttonText: "搜索文档",
        buttonAriaLabel: "搜索文档",
      },
      modal: {
        searchBox: {
          resetButtonTitle: "清除查询条件",
          resetButtonAriaLabel: "清除查询条件",
          cancelButtonText: "取消",
          cancelButtonAriaLabel: "取消",
        },
        startScreen: {
          recentSearchesTitle: "搜索历史",
          noRecentSearchesText: "没有搜索历史",
          saveRecentSearchButtonTitle: "保存至搜索历史",
          removeRecentSearchButtonTitle: "从搜索历史中移除",
          favoriteSearchesTitle: "收藏",
          removeFavoriteSearchButtonTitle: "从收藏中移除",
        },
        errorScreen: {
          titleText: "无法获取结果",
          helpText: "你可能需要检查你的网络连接",
        },
        footer: {
          selectText: "选择",
          navigateText: "切换",
          closeText: "关闭",
          searchByText: "搜索提供者",
        },
        noResultsScreen: {
          noResultsText: "无法找到相关结果",
          suggestedQueryText: "你可以尝试查询",
          reportMissingResultsText: "你认为该查询应该有结果？",
          reportMissingResultsLinkText: "点击反馈",
        },
      },
    },
  },
};

