# GatewayWorker2.x 3.x 手册
本手册适用于GatewayWorker2.x版本以及3.x版本。

## GatewayWorker 手册
GatewayWorker基于Workerman开发的一个项目框架，用于快速开发TCP长连接应用，例如app推送服务端、即时IM服务端、游戏服务端、物联网、智能家居等等

GatewayWorker使用经典的Gateway和Worker进程模型。Gateway进程负责维持客户端连接，并转发客户端的数据给BusinessWorker进程处理，BusinessWorker进程负责处理实际的业务逻辑（默认调用Events.php处理业务），并将结果推送给对应的客户端。Gateway服务和BusinessWorker服务可以分开部署在不同的服务器上，实现分布式集群。

GatewayWorker提供非常方便的API，可以全局广播数据、可以向某个群体广播数据、也可以向某个特定客户端推送数据。配合Workerman的定时器，也可以定时推送数据。

## GatewayWorker 与 Workerman的关系
Workerman可以看做是一个纯粹的socket类库，可以开发几乎所有的网络应用，不管是TCP的还是UDP的，长连接的还是短连接的。Workerman代码精简，功能强大，使用灵活，能够快速开发出各种网络应用。同时Workerman相比GatewayWorker也更底层，需要开发者有一定的多进程编程经验。

因为绝大多数开发者的目标是基于Workerman开发TCP长连接应用，而长连接应用服务端有很多共同之处，例如它们有相同的进程模型以及单发、群发、广播等接口需求。所以才有了GatewayWorker框架，GatewayWorker是基于Workerman开发的一个TCP长连接框架，实现了单发、群送、广播等长连接必用的接口。GatewayWorker框架实现了Gateway Worker进程模型，天然支持分布式多服务器部署，扩容缩容非常方便，能够应对海量并发连接。可以说GatewayWorker是基于Workerman实现的一个更完善的专门用于实现TCP长连接的项目框架。

## 用GatewayWorker还是Workerman？
如果你的项目是长连接并且需要客户端与客户端之间通讯，建议使用GatewayWorker。
短连接或者不需要客户端与客户端之间通讯的项目建议使用Workerman。
GatewayWorker不支持UDP监听，所以UDP服务请选择Workerman。
如果你是一个有多进程socket编程经验的人，喜欢定制自己的进程模型，可以选择Workerman。


## Linux系统快速开始（从一个精简的聊天demo开始）
1、[下载demo](https://www.workerman.net/download/GatewayWorker.zip)

2、命令行运行 ```unzip GatewayWorker.zip``` 解压缩GatewayWorker.zip

3、命令行运行 ```cd GatewayWorker``` 进入GatewayWorker目录

4、命令行运行 ```php start.php start``` 启动GatewayWorker

5、**新开几个**命令行窗口运行 ```telnet 127.0.0.1 8282```，输入任意字符即可聊天（非本机测试请将127.0.0.1替换成实际ip）。

> **注意**
> 如果telnet超时请设置服务器安全组将8282端口开放。
> 如果需要测试websocket协议，需要将start_gateway.php中`tcp`改成`websocket`

## Windows系统快速开始（从一个精简的聊天demo开始）
1、[下载demo](https://www.workerman.net/download/GatewayWorker.zip)

2、解压到任意位置

3、进入GatewayWorker目录

4、双击start_for_win.bat启动。（如果出现错误请参考[这里](https://www.workerman.net/windows)设置php环境变量）

5、**新开几个**cmd命令行窗口运行 ```telnet 127.0.0.1 8282```，输入任意字符即可聊天（非本机测试请将127.0.0.1替换成实际ip，）。

> **注意**
> windows系统telnet可能需要安装，安装方法可以baidu下
> windows系统telnet是逐字符发送的，可能无法发送完整的单词语句
> 如果telnet超时请设置服务器安全组将8282端口开放
> 如果需要测试websocket协议，需要将start_gateway.php中`tcp`改成`websocket`



## GatewayWorker 源码地址
只包含GatewayWorker内核
https://github.com/walkor/GatewayWorker








