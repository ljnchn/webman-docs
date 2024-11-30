# webman GatewayWorker插件
webman是一款高性能HTTP框架，是对workerman的一层业务封装，让我们更容易组织业务目录，以及使用mysql、redis、队列等众多组件。当你的项目需要在GatewayWorker中实现业务逻辑时，可以基于webman的GatewayWorker组件开发。

## 创建webman项目

1、创建项目

`composer create-project workerman/webman`

2、给webman安装GatewayWorker插件

进入webman目录

`cd webman`
执行
`composer require webman/gateway-worker`

3、配置及业务目录
配置文件在 config/plugin/webman/gateway-worker/目录
业务目录在 plugin/webman/gateway 目录

## 启动停止
命令与workerman用法相同
`php start.php start` 或 `php start.php start -d`

## webman手册
如需使用mysql redis等组件参考[webman手册](https://www.workerman.net/doc/webman/db/tutorial.html)



