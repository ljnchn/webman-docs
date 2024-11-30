# 与ThinkPHP等框架结合
使用GatewayWorker时开发者最关心的是如何与现有mvc框架(ThinkPHP Yii laravel等)整合，以下是官方推荐的整合方式。见示意图：



![](images/work-with-other-mvc-framework.png)



## 总体原则:

现有mvc框架项目与GatewayWorker**独立**部署互不干扰

**所有**的业务逻辑都由网站页面post/get到mvc框架中完成

GatewayWorker不接受客户端发来的数据，即GatewayWorker不处理任何业务逻辑，GatewayWorker仅仅当做一个**单向**的推送通道

仅当mvc框架需要向浏览器主动推送数据时才在mvc框架中调用Gateway的API [GatewayClient](https://github.com/walkor/GatewayClient)完成推送。

## GatewayClient安装
参考地址 [https://github.com/walkor/GatewayClient](https://github.com/walkor/GatewayClient)


## 具体实现步骤

1、网站页面建立与GatewayWorker的websocket连接


2、GatewayWorker发现有页面发起连接时，将对应连接的client_id发给网站页面


3、网站页面收到client_id后触发一个ajax请求(假设是```bind.php```)将client_id发到mvc后端


4、mvc后端```bind.php```收到client_id后利用GatewayClient调用```Gateway::bindUid($client_id, $uid)```将client_id与当前uid(用户id或者客户端唯一标识)绑定。如果有群组、群发功能，也可以利用```Gateway::joinGroup($client_id, $group_id)```将client_id加入到对应分组

5、页面发起的所有请求都直接post/get到mvc框架统一处理，包括发送消息


6、mvc框架处理业务过程中需要向某个uid或者某个群组发送数据时，直接调用[GatewayClient](https://github.com/walkor/GatewayClient)的接口```Gateway::sendToUid Gateway::sendToGroup``` 等发送即可

## 示例代码

GatewayWorker中Events.php代码（只有个onConnect回调设置）
```php
<?php
use \GatewayWorker\Lib\Gateway;
class Events
{
    // 当有客户端连接时，将client_id返回，让mvc框架判断当前uid并执行绑定
    public static function onConnect($client_id)
    {
        Gateway::sendToClient($client_id, json_encode(array(
            'type'      => 'init',
            'client_id' => $client_id
        )));
    }

    // GatewayWorker建议不做任何业务逻辑，onMessage留空即可
    public static function onMessage($client_id, $message)
    {

    }
}
```

**网站页面js片段**
```javascript
/**
 * 与GatewayWorker建立websocket连接，域名和端口改为你实际的域名端口，
 * 其中端口为Gateway端口，即start_gateway.php指定的端口。
 * start_gateway.php 中需要指定websocket协议，像这样
 * $gateway = new Gateway(websocket://0.0.0.0:7272);
 */
ws = new WebSocket("ws://your_domain.com:7272");
// 服务端主动推送消息时会触发这里的onmessage
ws.onmessage = function(e){
    // json数据转换成js对象
    var data = eval("("+e.data+")");
    var type = data.type || '';
    switch(type){
        // Events.php中返回的init类型的消息，将client_id发给后台进行uid绑定
        case 'init':
            // 利用jquery发起ajax请求，将client_id发给后端进行uid绑定
            $.post('./bind.php', {client_id: data.client_id}, function(data){}, 'json');
            break;
        // 当mvc框架调用GatewayClient发消息时直接alert出来
        default :
            alert(e.data);
    }
};
```

**mvc后端uid绑定代码片段**
bind.php (利用[GatewayClient](https://github.com/walkor/GatewayClient)绑定)
```php
<?php
//加载GatewayClient。关于GatewayClient参见本页面底部介绍
require_once '/your/path/GatewayClient/Gateway.php';
// GatewayClient 3.0.0版本开始要使用命名空间
use GatewayClient\Gateway;
// 设置GatewayWorker服务的Register服务ip和端口，请根据实际情况改成实际值(ip不能是0.0.0.0)
Gateway::$registerAddress = '127.0.0.1:1236';

// 假设用户已经登录，用户uid和群组id在session中
$uid      = $_SESSION['uid'];
$group_id = $_SESSION['group'];
// client_id与uid绑定
Gateway::bindUid($client_id, $uid);
// 加入某个群组（可调用多次加入多个群组）
Gateway::joinGroup($client_id, $group_id);
```

**mvc后端发消息代码片段**
send_message.php (利用[GatewayClient](https://github.com/walkor/GatewayClient)发送)
```php
<?php
//加载GatewayClient。关于GatewayClient参见本页面底部介绍
require_once '/your/path/GatewayClient/Gateway.php';
// GatewayClient 3.0.0版本开始要使用命名空间
use GatewayClient\Gateway;
// 设置GatewayWorker服务的Register服务ip和端口，请根据实际情况改成实际值(ip不能是0.0.0.0)
Gateway::$registerAddress = '127.0.0.1:1236';

// 向任意uid的网站页面发送数据
Gateway::sendToUid($uid, $message);
// 向任意群组的网站页面发送数据
Gateway::sendToGroup($group, $message);
```

## 注意
以上仅是mvc框架与GatewayWorker官方推荐的结合方式，并不是强制使用此方式，开发者可以自由变化选择结合方式以适应自己的业务需求。
当然也可以采用客户端与GatewayWorker直接双向通讯的方式完成业务通讯。

## 关于GatewayClient


**源码：**

https://github.com/walkor/GatewayClient


**注意：**

如果GatewayClient和GatewayWorker不是在同一台服务器上，则需要先将start_gateway.php中的lanIp改成当前服务器的内网ip（如果不在一个内网可改成公网ip）。

如果GatewayClient和GatewayWorker在同一台服务器上运行，则不用做任何更改，直接按照示例使用GatewayClient即可。

通过GatewayClient发送的数据不会经过Event.php，而是直接经由Gateway进程转发给客户端。

GatewayClient无法接收客户端发来的数据。

 **客户端使用示例** 
 

~~~php
require_once '/your/path/GatewayClient/Gateway.php';

/**
 * gatewayClient 3.0.0及以上版本加了命名空间
 * 而3.0.0以下版本不需要use GatewayClient\Gateway;
 **/
use GatewayClient\Gateway;

/**
 *====这个步骤是必须的====
 *这里填写Register服务的ip和Register端口，注意端口不是gateway端口
 *ip不能是0.0.0.0，端口在start_register.php中可以找到
 *这里假设GatewayClient和Register服务都在一台服务器上，ip填写127.0.0.1。
 *如果不在一台服务器则填写真实的Register服务的内网ip(或者外网ip)
 **/
Gateway::$registerAddress = '127.0.0.1:1236';


// 以下是调用示例，接口与GatewayWorker环境的接口一致
// 接口具体使用方法见《Lib\Gateway类提供的接口》一章
// 注意除了不支持sendToCurrentClient和closeCurrentClient方法
// 其它方法都支持
Gateway::sendToAll($data);
Gateway::sendToClient($client_id, $data);
Gateway::closeClient($client_id);
Gateway::isOnline($client_id);
Gateway::bindUid($client_id, $uid);
Gateway::isUidOnline($uid);
Gateway::getClientIdByUid($uid);
Gateway::unbindUid($client_id, $uid);
Gateway::sendToUid($uid, $data);
Gateway::joinGroup($client_id, $group);
Gateway::sendToGroup($group, $data);
Gateway::leaveGroup($client_id, $group);
Gateway::getClientCountByGroup($group);
Gateway::getClientSessionsByGroup($group);
Gateway::getAllClientCount();
Gateway::getAllClientSessions();
Gateway::setSession($client_id, $session);
Gateway::updateSession($client_id, $session);
Gateway::getSession($client_id);
...
 
~~~

