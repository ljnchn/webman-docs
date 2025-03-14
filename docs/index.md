---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Webman"
  text: "一样的写法\n十倍的性能"
  tagline: 超高性能可扩展 PHP 框架
  actions:
    - theme: brand
      text: webman 是什么？
      link: /webman/README
    - theme: alt
      text: 快速开始
      link: /webman/install

  image:
    src: /logo.gif
    alt: webman

features:
  - icon: 🚀
    title: 超高性能 HTTP 服务框架
    details: webman 性能高于传统 php-fpm 框架10-100倍左右，比go的gin echo等框架性能高1倍左右。
  - icon: 🐘
    title: 高稳定性、高复用、高扩展性、支持协程
    details: webman 仅提供最核心的功能(路由、中间件、session、自定义进程接口)。其余功能全部复用 composer 生态。
  - icon: 🗄️
    title: 数据库 ORM 支持
    details: 兼容 Laravel 的 illuminate/database， ThinkPHP 的 ThinkORM，还有其它组件如 Medoo
  - icon: 💬
    title: 不止 HTTP
    details: 可做 websocket 服务、物联网、游戏、TCP 服务、UDP 服务、unix socket服务等
---