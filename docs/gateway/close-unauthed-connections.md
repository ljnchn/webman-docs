# 关闭未认证连接
**问题：**

如何关闭规定时间内未发送过数据的客户端,
比如30秒内没收到一条数据就自动关闭这个客户端连接,
目的是为了让未认证的连接必须在规定时间内认证

**答案：**

**方法一、利用GatewayWorker的心跳做**

GatewayWorker
GatewayWorker中可以利用心跳来解决这个问题，GatewayWorker有设置客户端多久不回复心跳服务端就关闭连接的属性，可以利用这个机制关闭未及时认证的客户端。

start_gateway.php
```php
// 心跳间隔
$gateway->pingInterval = 30;
// 发给客户端你的心跳数据
$gateway->pingData = '{"type":"ping"}';
// 客户端在30秒内有1次未回复就断开连接
$gateway->pingNotResponseLimit = 1;
```

Event.php
```php
class Event
{
    public static function onMessage($client_id, $msg)
    {
        $msg = json_decode($msg, true);
        switch($msg['type'])
        {
            case 'login':
                略...
                // 记录session，表明认证成功
                $_SESSION['login'] = true;
                break;
            // 30秒后客户端发来心跳回复时，仍然没认证，则关闭连接
            case 'pong':
                if(empty($_SESSION['login']))
                {
                     Gateway::closeClient($client_id);
                }
        }
        ............略
    }
}
```


**方法二，利用定时器Timer做**

如果是GatewayWorker项目

Event.php
```php
use Workerman\Timer;
class Event
{
    public static function onConnect($client_id)
    {
        // 连接到来后，定时30秒关闭这个链接，需要30秒内发认证并删除定时器阻止关闭连接的执行
        $auth_timer_id = Timer::add(30, function($client_id){
            Gateway::closeClient($client_id);
        }, array($client_id), false);
        Gateway::updateSession($client_id, array('auth_timer_id' => $auth_timer_id));
    }
    public static function onMessage($client_id, $msg)
    {
        $_SESSION = Gateway::getSession($client_id);
        $msg = json_decode($msg);
        switch($msg['type'])
        {
            case 'login':
                略...
                // 认证成功，删除 30关闭连接定 的时器
                Timer::del($_SESSION['auth_timer_id']);
                break;
        }
        ............略
    }
}
```
