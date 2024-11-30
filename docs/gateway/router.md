# router

## 说明:
```php
callback Gateway::$router
```

设置Gateway到BusinessWorker路由规则。默认规则是Gateway随机选择一个BusinessWorker进程，然后把当前client_id与这个BusinessWorker进程**绑定**，以后这个client_id的所有数据（onConnect/onMessage/onClose事件）都交给这个绑定的BusinessWorker进程处理。

期待该回调函数从所有到BusinessWorker进程的连接对象中选择一个并返回。


## 回调函数的参数

* ``` $worker_connnections ```

是一个包含了所有到BusinessWorker进程的连接对象数组。数组的下标是格式为```ip:worker_name:worker_id```的字符串。其中ip为worker所在服务器的ip，worker_name为```$businessworker->name```的值([name属性参见workerman手册](https://doc.workerman.net/worker/name.html))，worker_id为自动分配的进程id编号([进程编号参见workerman手册](https://doc.workerman.net/worker/workerid.html))。这样通过下标就可以知道连接对应的worker在哪个服务器，属于哪组worker，进程编号是多少，可以方便的将消息路由给期望的服务器上的进程中去处理。

如果打印``` var_dump($worker_connnections) ```，则是类似这样的数据。
```
array(4) {
  ["127.0.0.1:ChatBusinessWorker:0"]=>object(Workerman\Connection\TcpConnection)...,
  ["127.0.0.1:ChatBusinessWorker:1"]=>object(Workerman\Connection\TcpConnection)...,
  ["127.0.0.1:ChatBusinessWorker:2"]=>object(Workerman\Connection\TcpConnection)...,
  ["127.0.0.1:ChatBusinessWorker:3"]=>object(Workerman\Connection\TcpConnection)...,
}
```

（注意：GatewayWorker2.0.4之前版本数组下标为ip:port，并非ip:worker_name:worker_id）


* ``` $client_connection ```

客户端连接对象,可以通过此对象获得客户端ip端口等信息，也可以向其添加一些动态属性用来保存当前连接的相关信息。


* ``` $cmd ```

当前什么类型的消息，是个数字，分别可能为

CMD_ON_CONNECTION，即连接事件

CMD_ON_MESSAGE，即消息事件

CMD_ON_CLOSE，即客户端关闭事件


* ``` $buffer ```

客户端发来的数据。注意只有当 ``` $cmd ``` 为``` CMD_ON_MESSAGE ```时 ```$buffer ```才有值

## 返回值
返回 ```$worker_connnections``` 中的一个连接对象。


## 范例 1 随机路由

```php
use \GatewayWorker\Gateway;
$gateway = new Gateway("Websocket://0.0.0.0:8585");
// ===随机路由开始===
$gateway->router = function($worker_connections, $client_connection, $cmd, $buffer)
{
    return $worker_connections[array_rand($worker_connections)];
};
// ===随机路由结束===

$gateway->name = ...
...省略...

if(!defined('GLOBAL_START'))
{
    Worker::runAll();
}
```

## 范例 2 随机绑定
```php
use \GatewayWorker\Gateway;
$gateway = new Gateway("Websocket://0.0.0.0:8585");

// ==绑定==
$gateway->router = function($worker_connections, $client_connection, $cmd, $buffer)
{
    // 临时给客户端连接设置一个businessworker_address属性，用来存储该连接被绑定的worker进程下标
    if (!isset($client_connection->businessworker_address) || !isset($worker_connections[$client_connection->businessworker_address])) {
            $client_connection->businessworker_address = array_rand($worker_connections);
        }
        return $worker_connections[$client_connection->businessworker_address];
};
// ==绑定==

$gateway->name = ...
...省略...

if(!defined('GLOBAL_START'))
{
    Worker::runAll();
}
```


