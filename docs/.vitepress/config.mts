import { defineConfig, type DefaultTheme } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: "zh-Hans",
  title: "Webman",
  description: "性能爆炸的 PHP 内存框架",
  head: [["link", { rel: "icon", href: "/favicon.ico" }]],
  sitemap: {
    hostname: "https://webman.rmb.run",
  },
  markdown: {
    image: {
      // 默认禁用；设置为 true 可为所有图片启用懒加载。
      lazyLoading: true,
    },
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
      pattern: "https://github.com/ljnchn/webman-docs/edit/main/docs/:path",
      text: "在 GitHub 上编辑此页面",
    },

    footer: {
      message: "基于 MIT 许可发布",
      copyright: `版权所有 © 2019-${new Date().getFullYear()}`,
    },

    sidebar: {
      "/webman/": { base: "/webman/", items: sidebarWebman() },
      // "/guide/": { base: "/guide/", items: sidebarGuide() },
      "/workerman/": { base: "/workerman/", items: sidebarWorkerman() },
      "/gateway/": { base: "/gateway/", items: sidebarGateway() },
    },

    socialLinks: [{ icon: "github", link: "https://github.com/ljnchn/webman-docs" }],

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
      text: "指南",
      link: "/webman/README",
      activeMatch: "/webman/",
    },
    {
      text: "其它",
      items: [
        {
          text: "workerman",
          link: "/workerman/README",
          activeMatch: "/workerman/",
        },
        {
          text: "gateway",
          link: "/gateway/README",
          activeMatch: "/gateway/",
        },
        {
          text: "webman v1",
          link: "https://v1.webman.rmb.run",
        },
      ],
    },
    { text: "官网", link: "https://www.workerman.net/" },
    { text: "社区", link: "https://www.workerman.net/questions" },
    { text: "插件", link: "https://www.workerman.net/webman" },
  ];
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

function sidebarWorkerman(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: "序言",
      link: "README",
    },
    {
      text: "原理",
      link: "principle",
    },
    {
      text: "开发必读",
      link: "must-read",
    },
    {
      text: "入门指引",
      collapsed: false,
      items: [
        { text: "特性", link: "getting-started/feature" },
        { text: "简单的开发示例", link: "getting-started/simple-example" },
      ],
    },
    {
      text: "安装",
      collapsed: false,
      items: [
        { text: "环境要求", link: "install/requirement" },
        { text: "下载安装", link: "install/install" },
        { text: "启动停止", link: "install/start-and-stop" },
      ],
    },
    {
      text: "开发流程",
      collapsed: false,
      items: [
        { text: "开发前必读", link: "development/before-development" },
        { text: "目录结构", link: "development/directory-structure" },
        { text: "开发规范", link: "development/standard" },
        { text: "基本流程", link: "development/process" },
      ],
    },
    {
      text: "通讯协议",
      collapsed: false,
      items: [
        { text: "通讯协议作用", link: "protocols/why-protocols" },
        { text: "定制通讯协议", link: "protocols/how-protocols" },
        { text: "一些例子", link: "protocols/example" },
      ],
    },
    {
      text: "Worker类",
      collapsed: false,
      link: "worker",
      items: [
        { text: "构造函数", link: "worker/construct" },
        {
          text: "属性",
          items: [
            { text: "id", link: "worker/workerid" },
            { text: "count", link: "worker/count" },
            { text: "name", link: "worker/name" },
            { text: "protocol", link: "worker/protocol" },
            { text: "transport", link: "worker/transport" },
            { text: "reusePort", link: "worker/reuse-port" },
            { text: "connections", link: "worker/connections" },
            { text: "stdoutFile", link: "worker/stdout-file" },
            { text: "pidFile", link: "worker/pid-file" },
            { text: "logFile", link: "worker/log-file" },
            { text: "user", link: "worker/user" },
            { text: "reloadable", link: "worker/reloadable" },
            { text: "daemonize", link: "worker/daemonize" },
            { text: "globalEvent", link: "worker/global-event" },
          ],
        },
        {
          text: "回调属性",
          items: [
            { text: "onWorkerStart", link: "worker/on-worker-start" },
            { text: "onWorkerReload", link: "worker/on-worker-reload" },
            { text: "onConnect", link: "worker/on-connect" },
            { text: "onMessage", link: "worker/on-message" },
            { text: "onClose", link: "worker/on-close" },
            { text: "onBufferFull", link: "worker/on-buffer-full" },
            { text: "onBufferDrain", link: "worker/on-buffer-drain" },
            { text: "onError", link: "worker/on-error" },
          ],
        },
        {
          text: "接口",
          items: [
            { text: "runAll", link: "worker/run-all" },
            { text: "stopAll", link: "worker/stop-all" },
            { text: "listen", link: "worker/listen" },
          ],
        },
      ],
    },
    {
      text: "TcpConnection类",
      collapsed: false,
      link: "tcp-connection",
      items: [
        {
          text: "属性",
          items: [
            { text: "id", link: "tcp-connection/id" },
            { text: "protocol", link: "tcp-connection/protocol" },
            { text: "worker", link: "tcp-connection/worker" },
            {
              text: "maxSendBufferSize",
              link: "tcp-connection/max-send-buffer-size",
            },
            {
              text: "defaultMaxSendBufferSize",
              link: "tcp-connection/default-max-send-buffer-size",
            },
            {
              text: "defaultMaxPackageSize",
              link: "tcp-connection/default-max-package-size",
            },
          ],
        },
        {
          text: "回调属性",
          items: [
            { text: "onMessage", link: "tcp-connection/on-message" },
            { text: "onClose", link: "tcp-connection/on-close" },
            { text: "onBufferFull", link: "tcp-connection/on-buffer-full" },
            {
              text: "onBufferDrain",
              link: "tcp-connection/on-buffer-drain",
            },
            { text: "onError", link: "tcp-connection/on-error" },
          ],
        },
        {
          text: "接口",
          items: [
            { text: "send", link: "tcp-connection/send" },
            { text: "getRemoteIp", link: "tcp-connection/get-remote-ip" },
            {
              text: "getRemotePort",
              link: "tcp-connection/get-remote-port",
            },
            { text: "close", link: "tcp-connection/close" },
            { text: "destroy", link: "tcp-connection/destroy" },
            { text: "pauseRecv", link: "tcp-connection/pause-recv" },
            { text: "resumeRecv", link: "tcp-connection/resume-recv" },
            { text: "pipe", link: "tcp-connection/pipe" },
          ],
        },
      ],
    },
    {
      text: "AsyncTcpConnection类",
      collapsed: false,
      link: "async-tcp-connection",
      items: [
        { text: "__construct", link: "async-tcp-connection/construct" },
        { text: "connect", link: "async-tcp-connection/connect" },
        { text: "reconnect", link: "async-tcp-connection/reconnect" },
        { text: "transport", link: "async-tcp-connection/transport" },
      ],
    },
    {
      text: "AsyncUdpConnection类",
      collapsed: false,
      link: "async-udp-connection",
      items: [
        { text: "__construct", link: "async-udp-connection/construct" },
        { text: "connect", link: "async-udp-connection/connect" },
        { text: "send", link: "async-udp-connection/send" },
        { text: "close", link: "async-udp-connection/close" },
      ],
    },
    {
      text: "Timer定时器类",
      collapsed: false,
      items: [
        { text: "add", link: "timer/add" },
        { text: "del", link: "timer/del" },
        { text: "定时器注意事项", link: "timer/notice" },
        { text: "crontab", link: "timer/crontab" },
      ],
    },
    {
      text: "Http服务",
      collapsed: false,
      items: [
        { text: "请求", link: "http/request" },
        { text: "响应", link: "http/response" },
        { text: "session会话", link: "http/session" },
        { text: "session管理", link: "http/session-control" },
        { text: "SSE", link: "http/SSE" },
      ],
    },
    {
      text: "调试",
      collapsed: false,
      items: [
        { text: "基本调试", link: "debug/base" },
        { text: "status命令查看运行状态", link: "debug/status" },
        { text: "调试busy进程", link: "debug/busy-process" },
        { text: "网络抓包", link: "debug/tcpdump" },
        { text: "跟踪系统调用", link: "debug/strace" },
      ],
    },
    {
      text: "常用组件",
      collapsed: false,
      items: [
        {
          text: "GlobalData数据共享组件",
          link: "components/global-data",
          items: [
            {
              text: "GlobalDataServer",
              link: "components/global-data-server",
            },
            {
              text: "GlobalDataClient",
              link: "components/global-data-client",
              items: [
                { text: "add", link: "components/global-data-client-add" },
                { text: "cas", link: "components/global-data-client-cas" },
                {
                  text: "increment",
                  link: "components/global-data-client-increment",
                },
              ],
            },
          ],
        },
        {
          text: "Channel分布式通讯组件",
          link: "components/channel",
          items: [
            { text: "ChannelServer", link: "components/channel-server" },
            {
              text: "channelClient",
              link: "components/channel-client",
              items: [
                {
                  text: "connect",
                  link: "components/channel-client-connect",
                },
                { text: "on", link: "components/channel-client-on" },
                {
                  text: "publish",
                  link: "components/channel-client-publish",
                },
                {
                  text: "unsubsribe",
                  link: "components/channel-client-unsubsribe",
                },
              ],
            },
            { text: "例子-集群推送", link: "components/channel-examples" },
            { text: "例子-分组发送", link: "components/channel-examples2" },
          ],
        },
        {
          text: "FileMonitor文件监控组件",
          link: "components/file-monitor",
        },
        {
          text: "MySQL组件",
          link: "components/mysql",
          items: [{ text: "数据库类", link: "components/other-mysql-class" }],
        },
        {
          text: "Redis组件",
          link: "components/redis",
          items: [
            { text: "workerman/redis", link: "components/workerman-redis" },
          ],
        },
        {
          text: "异步http组件",
          link: "components/async-http",
          items: [
            {
              text: "workerman/http-client",
              link: "components/workerman-http-client",
            },
          ],
        },
        {
          text: "异步消息队列组件",
          link: "components/async-message-queue",
          items: [
            { text: "workemran/mqtt", link: "components/workerman-mqtt" },
            {
              text: "workerman/redis-queue",
              link: "components/workerman-redis-queue",
            },
            { text: "workerman/stomp", link: "components/workerman-stomp" },
            {
              text: "workerman/rabbitmq",
              link: "components/workerman-rabbitmq",
            },
          ],
        },
        { text: "Crontab定时任务", link: "components/crontab" },
        { text: "Memcache", link: "components/memcache" },
      ],
    },
    {
      text: "常见问题",
      collapsed: false,
      items: [
        { text: "心跳", link: "faq/heartbeat" },
        { text: "自动加载", link: "faq/autoload" },
        { text: "客户端连接失败原因", link: "faq/client-connect-fail" },
        { text: "是否支持多线程", link: "faq/about-multi-thread" },
        { text: "与其它框架整合", link: "faq/work-with-other-framework" },
        { text: "运行多个workerman", link: "faq/running-concurent" },
        { text: "支持哪些协议", link: "faq/protocols" },
        { text: "如何设置进程数", link: "faq/processes-count" },
        { text: "查看客户端连接数", link: "faq/connection-status" },
        {
          text: "对象和资源的持久化",
          link: "faq/persistent-data-and-resources",
        },
        { text: "例子无法工作", link: "faq/demo-not-work" },
        { text: "启动失败", link: "faq/workerman-start-fail" },
        { text: "停止失败", link: "faq/stop-fail" },
        { text: "支持多少并发", link: "faq/how-many-connections" },
        { text: "更改代码不生效", link: "faq/change-code-not-work" },
        { text: "向指定客户端发送数据", link: "faq/send-data-to-client" },
        { text: "如何主动推送消息", link: "faq/active-push" },
        { text: "在其它项目中推送", link: "faq/push-in-other-project" },
        { text: "如何实现异步任务", link: "faq/async-task" },
        { text: "status里send_fail的原因", link: "faq/about-send-fail" },
        { text: "Windows下开发Linux下部署", link: "faq/windows-to-linux" },
        { text: "是否支持socket.io", link: "faq/socketio-support" },
        {
          text: "终端关闭导致workerman关闭",
          link: "faq/ssh-close-and-workerman-stop",
        },
        {
          text: "与nginx apache的关系",
          link: "faq/relationship-with-apache-nginx",
        },
        { text: "禁用函数检查", link: "faq/disable-function-check" },
        { text: "平滑重启原理", link: "faq/reload-principle" },
        { text: "为Flash开843端口", link: "faq/flash-843" },
        { text: "如何广播数据", link: "faq/how-to-broadcast" },
        { text: "如何建立udp服务", link: "faq/how-to-create-udp-service" },
        { text: "监听ipv6", link: "faq/ipv6" },
        {
          text: "关闭未认证的连接",
          link: "faq/close-unauthed-connections",
        },
        { text: "传输加密-ssl/tls", link: "faq/ssl-support" },
        { text: "创建wss服务", link: "faq/secure-websocket-server" },
        { text: "创建https服务", link: "faq/secure-http-server" },
        {
          text: "workerman作为客户端",
          link: "faq/use-workerman-as-client-side",
        },
        { text: "作为ws/wss客户端", link: "faq/as-wss-client" },
        { text: "微信小程序", link: "faq/weixin-app" },
        { text: "PHP的几种回调写法", link: "faq/callback_methods" },
        {
          text: "透过代理获取客户端真实ip",
          link: "faq/get-real-ip-from-proxy",
        },
        { text: "开机启动", link: "faq/start-with-system" },
        {
          text: "接收和发送16进制数据",
          link: "faq/send-recv-hexadecimal-data",
        },
        { text: "接收一定请求后重启", link: "faq/max-requests" },
        {
          text: "win下初始化多个worker",
          link: "faq/multi-woker-for-windows",
        },
        {
          text: "请求集中在某些进程",
          link: "faq/requests-concentrated-in-certain-processes",
        },
      ],
    },
    {
      text: "附录",
      collapsed: false,
      items: [
        { text: "优化Linux内核", link: "appendices/kernel-optimization" },
        { text: "压力测试", link: "appendices/stress-test" },
        { text: "安装扩展", link: "appendices/install-extension" },
        { text: "websocket协议", link: "appendices/about-websocket" },
        { text: "ws协议", link: "appendices/about-ws" },
        { text: "text协议", link: "appendices/about-text" },
        { text: "frame协议", link: "appendices/about-frame" },
        {
          text: "不支持的函数/特性",
          link: "appendices/unavailable-functions",
        },
      ],
    },
    {
      text: "版权信息",
      link: "license",
    },
  ];
}

function sidebarGateway(): DefaultTheme.SidebarItem[] {
  return [
    { text: "序言", link: "README" },
    { text: "特性", link: "feature" },
    { text: "原理", link: "principle" },
    { text: "开发必读", link: "getting-started" },
    { text: "启动与停止", link: "start-and-stop" },
    { text: "与ThinkPHP等框架结合", link: "work-with-other-frameworks" },
    { text: "与webman结合", link: "webman" },
    { text: "Register类的使用", link: "register" },
    { text: "Gateway类的使用", link: "gateway" },
    { text: "BusinessWorker类的使用", link: "business-worker" },
    {
      text: "Events类的回调属性",
      link: "event-functions",
      items: [
        { text: "onWorkerStart", link: "on-worker-start" },
        { text: "onConnect", link: "on-connect" },
        { text: "onWebSocketConnect", link: "on-web-socket-connect" },
        { text: "onMesssge", link: "on-messsge" },
        { text: "onClose", link: "on-close" },
        { text: "onWorkerStop", link: "on-worker-stop" },
      ],
    },
    {
      text: "Lib/Gateway类提供的接口",
      link: "lib-gateway-functions",
      items: [
        { text: "sendToAll", link: "send-to-all" },
        { text: "sendToClient", link: "send-to-client" },
        { text: "closeClient", link: "close-client" },
        { text: "isOnline", link: "is-online" },
        { text: "bindUid", link: "bind-uid" },
        { text: "unbindUid", link: "unbind-uid" },
        { text: "isUidOnline", link: "is-uid-online" },
        { text: "getClientIdByUid", link: "get-client-id-by-uid" },
        { text: "getUidByClientId", link: "get-uid-by-client-id" },
        { text: "sendToUid", link: "send-to-uid" },
        { text: "joinGroup", link: "join-group" },
        { text: "leaveGroup", link: "leave-group" },
        { text: "ungroup", link: "ungroup" },
        { text: "sendToGroup", link: "send-to-group" },
        {
          text: "getClientIdCountByGroup",
          link: "get-client-id-count-by-group",
        },
        {
          text: "getClientSessionsByGroup",
          link: "get-client-sessions-by-group",
        },
        { text: "getAllClientIdCount", link: "get-all-client-id-count" },
        { text: "getAllClientSessions", link: "get-all-client-sessions" },
        { text: "setSession", link: "set-session" },
        { text: "updateSession", link: "update-session" },
        { text: "getSession", link: "get-session" },
        {
          text: "getClientIdListByGroup",
          link: "get-client-id-list-by-group",
        },
        { text: "getAllClientIdList", link: "get-all-client-id-list" },
        { text: "getUidListByGroup", link: "get-uid-list-by-group" },
        { text: "getUidCountByGroup", link: "get-uid-count-by-group" },
        { text: "getAllUidList", link: "get-all-uid-list" },
        { text: "getAllUidCount", link: "get-all-uid-count" },
        { text: "getAllGroupIdList", link: "get-all-group-id-list" },
      ],
    },
    { text: "定时器", link: "timer" },
    { text: "心跳检测", link: "heartbeat" },
    { text: "设置路由", link: "router" },
    { text: "超全局数组$_SESSION", link: "session" },
    { text: "超全局数组$_SERVER", link: "server" },
    { text: "常用组件", link: "component" },
    {
      text: "分布式部署",
      link: "distributed",
      items: [
        { text: "为什么要分布式部署", link: "why-distributed" },
        { text: "如何分布式部署", link: "how-distributed" },
        { text: "Gateway Worker分离部署", link: "gateway-worker-separation" },
      ],
    },
    {
      text: "常见问题",
      link: "faq",
      items: [
        { text: "关于client_id", link: "client_id" },
        { text: "在其它项目中主动推送消息", link: "push-in-other-project" },
        { text: "开启多少进程合适", link: "process-count-seting" },
        { text: "多协议支持", link: "multi-protocols" },
        { text: "多协议如何区分端口", link: "get-gateway-port" },
        { text: "定制通讯协议", link: "protocols" },
        {
          text: "运行多个GatewayWorker实例",
          link: "multi-gatewayworker-instance",
        },
        { text: "使用mysql", link: "mysql" },
        { text: "监控文件更新", link: "file-monitor" },
        { text: "如何获得客户端ip", link: "get-ip" },
        { text: "关闭未认证的链接", link: "close-unauthed-connections" },
        { text: "获取GatewayWorker版本", link: "get-gateway-version" },
        { text: "创建wss服务", link: "secure-websocket-server" },
        { text: "更多常见问题", link: "more-faq" },
        { text: "send buffer overflow", link: "send-buffer-overflow" },
        {
          text: "send buffer to worker fail",
          link: "send-buffer-to-worker-fail",
        },
        { text: "register auth timeout", link: "register-auth-timeout" },
      ],
    },
  ];
}

function sidebarWebman(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: "入门指引",
      collapsed: false,
      items: [
        { text: "webman 是什么", link: "README" },
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
        { text: "session 管理", link: "session" },
        { text: "异常处理", link: "exception" },
        { text: "日志", link: "log" },
        { text: "配置文件", link: "config" },
        { text: "多应用", link: "multiapp" },
        { text: "协程", link: "coroutine/coroutine" },
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
        { text: "Redis 队列", link: "queue/redis" },
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
        { text: "Event 事件", link: "components/event" },
        { text: "Env 环境变量组件", link: "components/env" },
        { text: "Crontab 定时任务", link: "components/crontab" },
        { text: "Excel 表格", link: "components/excel" },
        { text: "微信 SDK", link: "components/wechat" },
        { text: "支付 SDK", link: "components/payment" },
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
        { text: "接入 webman-admin", link: "app/admin" },
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
        { text: "nginx 代理", link: "others/nginx-proxy" },
        { text: "phar 打包", link: "others/phar" },
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
        { text: "1.5", link: "upgrade/1-5" },
        { text: "1.6", link: "upgrade/1-6" },
        { text: "2.0", link: "upgrade/2-0" },
        { text: "2.1", link: "upgrade/2-1" },
        { text: "致谢", link: "thanks" },
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
