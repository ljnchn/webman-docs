# Register类的使用
Register类其实也是基于基础的Worker开发的。Gateway进程和BusinessWorker进程启动后分别向Register进程注册自己的通讯地址，Gateway进程和BusinessWorker通过Register进程得到通讯地址后，就可以建立起连接并通讯了。

## 注意
register端口千万不能开放给外网，否则可能遭受攻击

客户端不要连接Register服务的端口，Register服务是GatewayWorker内部通讯用的。参见[原理](principle.md)。

register服务只能开一个进程，不能开启多个进程。

register不支持Gateway接口(包括GatewayClient接口)，不要在register进程写任何业务。

## Register类可以定制的内容

Register类只能定制监听的ip和端口，并且目前只能使用text协议。
