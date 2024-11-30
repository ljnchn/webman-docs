# 在其它项目项目中主动推送消息

## 需求
有时候需要在非GatewayWorker环境中向客户端推送数据。例如在一个普通的Web项目中通过GatewayWorker推送数据（前提是已经部署了GatewayWorker，客户端已经连接GatewayWorker）。目前有三种比较方便方法推送数据。

## 方法一、使用GatewayClient客户端推送，接口与GatewayWorker中的接口一致
**客户端源码：**

https://github.com/walkor/GatewayClient


GatewayWorker1.0请使用[1.0版本的GatewayClient](https://github.com/walkor/GatewayClient/releases/tag/v1.0)

GatewayWorker2.0.1-2.0.4请使用[2.0.4版本的GatewayClient](https://github.com/walkor/GatewayClient/releases/tag/2.0.4)

GatewayWorker2.0.5-2.0.6版本请使用[2.0.6版本的GatewayClient](https://github.com/walkor/GatewayClient/releases/tag/2.0.6)

GatewayWorker2.0.7版本请使用 [2.0.7版本的GatewayClient](https://github.com/walkor/GatewayClient/releases/tag/v2.0.7)

GatewayWorker3.0.0及以上版本请使用 [3.0.0版本的GatewayClient](https://github.com/walkor/GatewayClient/releases/tag/v3.0.0)

GatewayWorker3.0.8及以上版本请使用 [3.0.13及以上版本的GatewayClient](https://github.com/walkor/GatewayClient/releases/tag/v3.0.13)
注意：GatewayClient3.0.0开始支持composer并加了命名空间GatewayClient

查看GatewayWorker版本方法请点击[点击这里](get-gateway-version.md)

**注意：**

- 下载后GatewayClient目录可以放在项目中的任意位置，只要项目能引用到GatewayClient/Gateway.php即可。

- 如果GatewayClient和GatewayWorker不是在同一台服务器上，则需要先将start_gateway.php中的lanIp改成当前服务器的内网ip（如果不在一个内网可改成公网ip，需要GatewayWorker版本>=v3.0.22）。注意，无论何时lanIp都不能写成```0.0.0.0```，否则将无法通讯。

> **注意**
> GatewayClient跨公网通讯需要GatewayWorker版本>=v3.0.22
> 跨公网通讯有风险，建议都放在一个内网。

- 如果GatewayClient和GatewayWorker不是在同一台服务器上，还要设置防火墙(云服务器的话还要设置安全组)让以下端口可以被GatewayClient所在服务器访问：1、start_gateway.php中的$gateway->startPort起始的几个端口(要开放的端口个数和$gateway->count有关)。2、start_register.php中的Register服务端口
反之如果GatewayClient和GatewayWorker在同一台服务器上运行，则不用做任何更改，直接按照示例使用GatewayClient即可。

- 通过GatewayClient发送的数据不会经过Event.php，而是直接经由Gateway进程转发给客户端。

- GatewayClient无法接收客户端发来的数据。

- GatewayClient无法直接用```$_SESSION```变量来操作GatewayWorker的session，但可以用```Gateway::setSession/getSession/updateSession```等接口操作GatewayWorker的session。

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
// 注意除了不支持sendToCurrentClient和closeCurrentClient方法
// 其它方法都支持
Gateway::sendToAll($data);
Gateway::sendToClient($client_id, $data);
Gateway::closeClient($client_id);
Gateway::isOnline($client_id);
Gateway::bindUid($client_id, $uid);
Gateway::isUidOnline($uid);
Gateway::getClientIdByUid($client_id);
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

## 方法二、用一个特殊的账号当做管理客户端，通过这个账号推送数据

 此方法通俗易懂，可以通过现有客户端直接操作，具体代码根据自己的业务实现


## 方法三、开启一个内部Gateway端口，用于推送数据
 方法二虽然简单，但是局限于只能通过客户端界面操作，定时推送等需求不好直接操作客户端，而通过PHP模拟客户端可能会受到复杂协议的限制不好操作，这时我们可以开启一个内部文本协议的Gateway端口，通过PHP代码使用文本协议连接WorkerMan作为客户端向其它客户端推送数据。

### 示例（workerman-chat为例）

服务端：
 新建文件Applications/Chat/start_text_gateway.php，用于增加一个文本协议Gateway端口，内容如下

~~~php
<?php
use \Workerman\Worker;
use \GatewayWorker\Gateway;
use \Workerman\Autoloader;
require_once __DIR__ . '/../../Workerman/Autoloader.php';
Autoloader::setRootPath(__DIR__);

// #### 内部推送端口(假设当前服务器内网ip为192.168.100.100) ####
// #### 端口不能与原来start_gateway.php中一样 ####
$internal_gateway = new Gateway("Text://192.168.100.100:7273");
$internal_gateway->name='internalGateway';
// #### 不要与原来start_gateway.php的一样####
// #### 比原来跨度大一些，比如在原有startPort基础上+1000 ####
$internal_gateway->startPort = 3300;
// #### 这里设置成与原start_gateway.php 一样 ####
$internal_gateway->registerAddress = '127.0.0.1:1236';
// #### 内部推送端口设置完毕 ####

if(!defined('GLOBAL_START'))
{
    Worker::runAll();
}
~~~

 客户端：
 在其它项目中就可以直接用PHP socket 使用文本协议调用，代码类似如下:

~~~php
// 建立连接，@see https://php.net/manual/zh/function.stream-socket-client.php
$client = stream_socket_client('tcp://192.168.100.100:7273');
if(!$client)exit("can not connect");
// 模拟超级用户，以文本协议发送数据，注意Text文本协议末尾有换行符（发送的数据中最好有能识别超级用户的字段），这样在Event.php中的onMessage方法中便能收到这个数据，然后做相应的处理即可
fwrite($client, '{"type":"send","content":"hello all", "user":"admin", "pass":"******"}'."\n");
~~~

## 方法四、在BusinessWorker里开一个内部通讯端口
```
use GatewayWorker\Lib\Gateway;
use Workerman\Connection\TcpConnection;
use Workerman\Protocols\Http\Request;
use Workerman\Worker;

class Events
{

    public static function onWorkerStart()
    {
        $http_worker = new Worker('http://0.0.0.0:8585');
        $http_worker->reusePort = true;
        $http_worker->onMessage = function (TcpConnection $connection, Request $request) {
            $method = $request->get('method');
            $args = $request->get('args');
            if (method_exists(Gateway::class, $method)) {
                call_user_func_array([Gateway::class, $method], $args);
                return $connection->send('ok');
            }
            return $connection->send('fail');
        };
        $http_worker->listen();
    }

    // ... 其它业务逻辑省略 ...
}
```

这样就可以通过http调用BusinessWorker进程，在进程内部可以实现调用任意接口操作客户端包括给客户端推送数据。

例如内部调用`http://127.0.0.1:8585/?method=sendToAll&args[]=hello`时，会给所有客户端发送`hello`字符串 

**注意**
以上代码没有做合法性验证，如果调用方和BusinessWorker进程在同一台服务器，
`$http_worker = new Worker('http://0.0.0.0:8585');` 可改为
`$http_worker = new Worker('http://127.0.0.1:8585');`，
这样只有本机才能调用8585端口，可省略合法性验证。

如果是其它服务器调用8585端口，需要做请求合法性验证。
如果其它服务器无法调用8585端口，请确认服务器防火墙、安全组、包括宝塔(如果有使用的话)开放了8585端口。




