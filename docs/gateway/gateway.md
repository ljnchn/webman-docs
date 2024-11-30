# Gateway类的使用

文件位置：GatewayWorker/Gateway.php

Gateway类用于初始化Gateway进程。Gateway进程是暴露给客户端的让其连接的进程。所有客户端的请求都是由Gateway接收然后分发给BusinessWorker处理，同样BusinessWorker也会将要发给客户端的响应通过Gateway转发出去。

Gateway类是基于基础的Worker开发的。可以给Gateway对象的onWorkerStart、onWorkerStop、onConnect、onClose设置回调函数，但是无法给设置onMessage回调。Gateway的onMessage行为固定为将客户端数据转发给BusinessWorker。

## 初始化
初始化Gateway进程类似下面的代码

```php
$gateway = new Gateway('protocol://ip:port');
```

其中参数各参数含义如下：

**protocol：**

为应用层协议，目前支持的协议有
1、[websocket协议](https://doc.workerman.net/appendices/about-websocket.html)
2、[text协议](https://doc.workerman.net/appendices/about-text.html)
3、[Frame协议](https://doc.workerman.net/appendices/about-frame.html)
4、[自定义通讯协议](https://doc.workerman.net/protocols/how-protocols.html)
5、[tcp](https://baike.baidu.com/item/TCP/33012)，直接裸tcp，不推荐，见[通讯协议作用](https://doc.workerman.net/protocols/why-protocols.html)。


 ``` 注意 ```:GatewayWorker不支持监听Http协议。但是可以在业务中以客户端的形式通过http协议(比如curl)访问远程服务器。

**ip：**

1、如果写0.0.0.0代表监听本机所有网卡，也就是内网、外网、本机都可以访问到

2、如果是127.0.0.1，代表只能本机通过127.0.0.1访问，外网和内网都访问不到

3、如果是内网ip例如:192.168.10.11，代表只能通过192.168.10.11访问，也就是只能内网访问，本机127.0.0.1也访问不了（如果监听的ip不属于本机则会报错）

4、如果是外网ip例如110.110.110.110，代表只能通过外网ip 110.110.110.110访问，内网和本机127.0.0.1都访问不了(如果监听的ip不属于本机则会报错)

**port：**

端口不能大于65535，请确认端口没有被其它程序占用，否则启动会报错。如果端口小于1024，需要root权限运行GatewayWorker才能有权限监听，否则报错没有权限。


## Gateway类可以定制的内容

1、 协议

和Worker一样，在初始化Gateway对象时设置Gateway的协议，例如下面设置Gateway的通讯协议为websocket

```php
use \GatewayWorker\Gateway;
require_once './Workerman/Autoloader.php';

// 指定websocket协议
$gateway = new Gateway("websocket://0.0.0.0:8585");

...
```

2、name

和Worker一样，可以设置Gateway进程的名称，方便status命令中查看统计

3、count

和Worker一样，可以设置Gateway进程的数量，一般一台服务器设置1-2个足够，设置多了对性能有一定影响。

4、lanIp

lanIp是Gateway所在服务器的内网IP，默认填写127.0.0.1即可。[多服务器分布式部署](how-distributed.md)的时候需要填写真实的内网ip，不能填写127.0.0.1。注意：lanIp只能填写真实ip，不能填写域名或者其它字符串，无论如何都不能写0.0.0.0 .

5、startPort

Gateway进程启动后会监听一个本机端口，用来给BusinessWorker提供链接服务，然后Gateway与BusinessWorker之间就通过这个连接通讯。这里设置的是Gateway监听本机端口的起始端口。比如启动了4个Gateway进程，startPort为2000，则每个Gateway进程分别启动的本地端口**一般**为2000、2001、2002、2003。

当本机有多个Gateway/BusinessWorker项目时，需要把每个项目的startPort设置成不同的段

6、registerAddress，注册服务地址，格式类似于 '127.0.0.1:1236'。如果是部署了多个register服务则格式是数组，类似['192.168.0.1:1236','192.168.0.2:1236']

7、心跳设置，具体说明见心跳一节

8、onWorkerStart

和Worker一样，可以设置Gateway进程启动后的回调函数，一般在这个回调里面初始化一些全局数据

9、onWorkerStop

和Worker一样，可以设置Gateway进程关闭的回调函数，一般在这个回调里面做数据清理或者保存数据工作

10、onConnect（比较少用到，开发者一般不用关注）

和Worker一样，可以设置onConnect回调，当有客户端连接上来时触发。与Events::onConnect的区别是Events::onConnect运行在BusinessWorker进程上。Gateway::onConnect是运行在Gateway进程上，无法使用\GatewayWorker\Lib\Gateway类提供的接口

11、onClose（比较少用到，开发者一般不用关注）

和Worker一样，可以设置onClose回调，当有客户端连接关闭时触发。同样与Events::onClose的区别是Gateway::onClose是运行在Gateway进程上，无法使用\GatewayWorker\Lib\Gateway类提供的接口
