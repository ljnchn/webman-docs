# 入门指引

## 重要的事情说三遍
业务开发只需要关注 Applications/项目/Events.php一个文件即可。
业务开发只需要关注 Applications/项目/Events.php一个文件即可。
业务开发只需要关注 Applications/项目/Events.php一个文件即可。

开放的端口及协议在start_gateway.php中更改。参见[Gateway类的使用](gateway.md)一章。


## 注意
1、服务端启动成功，但是无法通讯，请检查服务器防火墙。

2、客户端只能连接Gateway端口，不要连接Register端口。

3、客户端与服务端要能保持正常通讯，需要保证客户端与服务端的通讯协议是一致的。比如服务端是websocket协议，客户端也要使用websocket协议才能通讯，否则无法通讯。

4、长连接应用切记需要开启应用层心跳(GatewayWorker提供了设置，参加[心跳检测](heartbeat.md))，心跳间隔20-30秒最佳，为了避免长连接因为长时间不通讯被节点防火墙断开。

5、如果业务并发连接数超过1000同时在线，请务必[优化linux内核](https://doc.workerman.net/appendices/kernel-optimization.html)，并[安装event扩展或者libevent扩展](https://doc.workerman.net/install/install.html)。

6、业务代码更改后请运行 `php start.php reload` 更新代码，否则更改的代码不会生效。

## 目录结构
```
.
├── Applications // 这里是所有开发者应用项目
│   └── YourApp  // 其中一个项目目录，目录名可以自定义
│       ├── Events.php // 开发者只需要关注这个文件
│       ├── start_gateway.php // gateway进程启动脚本，包括端口号等设置
│       ├── start_businessworker.php // businessWorker进程启动脚本
│       └── start_register.php // 注册服务启动脚本
│
├── start.php // 全局启动脚本，此脚本会依次加载Applications/项目/start_*.php启动脚本
│
└── vendor    // GatewayWorker框架和Workerman框架源码目录，此目录开发者不用关心
```

## 说明

一般来说开发者只需要关注Applications/YourApp/Events.php。因为所有业务代码都在这里开始的。vendor目录为框架目录，开发者不要改动，也不用去理解。

其它start_gateway.php start_businessworker.php start_register.php分别是进程启动脚本，开发者一般不需要改动这三个文件。三个脚本统一由根目录的start.php启动。


## Events.php

例如下面是一个简单的聊天室示例

```php
<?php
use \GatewayWorker\Lib\Gateway;
class Events
{
    /**
     * 当客户端连接时触发
     * 如果业务不需此回调可以删除onConnect
     * @param int $client_id 连接id
     */
    public static function onConnect($client_id)
    {
        // 向当前client_id发送数据
        Gateway::sendToClient($client_id, "Hello $client_id");
        // 向所有人发送
        Gateway::sendToAll("$client_id login");
    }

   /**
    * 当客户端发来消息时触发
    * @param int $client_id 连接id
    * @param string $message 具体消息
    */
   public static function onMessage($client_id, $message)
   {
        // 向所有人发送
        Gateway::sendToAll("$client_id said $message");
   }

   /**
    * 当用户断开连接时触发
    * @param int $client_id 连接id
    */
   public static function onClose($client_id)
   {
       // 向所有人发送
       GateWay::sendToAll("$client_id logout");
   }
}
```

Events.php中定义5个事件回调方法，

  * onWorkerStart businessWorker进程启动事件（一般用不到）
  * onConnect 连接事件(比较少用到)
  * onMessage 消息事件(必用)
  * onClose   连接断开事件(比较常用到)
  * onWorkerStop businessWorker进程退出事件（几乎用不到）


5个回调接口说明参见 Events类的回调接口 一节

其中消息事件onMessage是必须的，其它事件回调可以不实现。


```php
<?php
use \GatewayWorker\Lib\Gateway;
class Events
{
   /**
    * 当客户端发来消息时触发
    * @param int $client_id 连接id
    * @param string $message 具体消息
    */
   public static function onMessage($client_id, $message)
   {
        // 向所有人发送
        Gateway::sendToAll("$client_id said $message");
   }
}
```

## start_gateway.php
start_gateway.php为gateway进程启动脚本，主要定义了客户端连接的端口号、协议等信息，具体参见 Gateway类的使用一节。

客户端连接的就是start_gateway.php中初始化的Gateway端口。

## start_businessworker.php
start_businessworker.php为businessWorker进程启动脚本，也即是调用Events.php的业务处理进程，具体参见 BusinessWorker类的使用一节。

## start_register.php
start_register.php为注册服务启动脚本，用于协调GatewayWorker集群内部Gateway与Worker的通信，参见Register类使用一节。

```注意：客户端不要连接Register服务端口，客户端应该连接Gateway端口```


