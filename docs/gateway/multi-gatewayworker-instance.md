# 运行多个gatewayWorker实例
可以运行多个GatewayWorker实例，步骤如下。

假设已有Applications/Chat，想增加Applications/Chat2

1、拷贝Applications/Chat到Applications/Chat2

2、更改Applications/Chat2/start_register.php中的端口，1236改为1237(或者改为其它未被占用端口)

3、更改Applications/Chat2/start_businessworker.php中的registerAddress为127.0.0.1:1237

4、更改Applications/Chat2/start_gateway.php中的属性，包括**gateway端口**、**startPort**、**registerAddress**和**进程名**如下

```php
// ===更改gateway进程端口，这里改为8282===
$gateway = new Gateway("Websocket://0.0.0.0:8282");
// ===更改名称，方便status时查看===
$gateway->name = 'ChatGateway2';
$gateway->count = 4;
$gateway->lanIp = '127.0.0.1';
// ===更改注册服务地址，端口由1236改为1237===
$gateway->registerAddress = '127.0.0.1:1237';
// ===更改内部通讯起始端口，这里改为4000====
// ===一定要改，比原来大一些，不然会端口冲突===
$gateway->startPort = 4000;

$gateway->pingInterval = 10;
$gateway->pingData = '{"type":"ping"}';
```

5、更改Applications/Chat2/start_web.php中的WebServer端口(如果没有这个文件请忽略)，

```php
// 这里改成55252
$web = new WebServer("http://0.0.0.0:55252");
$web->count = 2;
$web->addRoot('www.your_domain.com', __DIR__.'/Web');
```

6、由于gateway端口更改了，所以前端js连接gateway的端口也要做相应的更改

打开 /Applications/Chat2/Web/index.php

```javascript
// 改成gateway端口8282
ws = new WebSocket("ws://"+document.domain+":8282");
```
