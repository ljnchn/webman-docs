# 监控文件更新

GatewayWorker是常驻内存的，磁盘上的文件更改后需要reload或者restart后才能生效，这在开发功能时非常麻烦。

为解决这个问题，Workerman官方提供了一个文件监控及自动reload服务。

代码地址在：https://github.com/walkor/workerman-filemonitor

把FileMonitor目录放到你的Applications下重启即可。

```注意：文件监控组件不支持windows系统```
