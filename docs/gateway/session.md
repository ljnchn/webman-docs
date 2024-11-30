# 超全局数组```$_SESSION```
### ```$_SESSION```是什么
GatewayWorker中的超全局数组```$_SESSION```和PHP自身的```$_SESSION```功能基本相同。每个client_id对应一个```$_SESSION```数组，```$_SESSION```数组中可以保存对应客户端的会话数据，对应的client_id的后续请求可以直接使用这个数组中的数据，而不用去反复读取存储。

### ```$_SESSION```使用场景

例如客户端链接GatewayWorker后，需要发送验证数据让服务端验证是否合法，一般要传递一次用户名和密码数据，然后在```Gateway::onMessage($client_id, $message)```中通过查询数据库验证```$message```中的用户名密码是否正确，如果正确就可以将用户的uid写入到```$_SESSION```中如```$_SESSION['uid']=$uid;```，那么当这个client_id再次发来数据时，要判断这个客户端是否是被验证过的，就可以用```$_SESSION['uid']```是否被设置来判断。

### ```$_SESSION```使用注意事项
* 使用```$_SESSION```时无需调用session_start等函数，可直接使用
* ```$_SESSION```中无法保存资源类型的数据
* ```$_SESSION```数据保存在Gateway进程内存中，无磁盘IO，性能非常好
* ```$_SESSION```的生命周期与client_id对应socket连接的生命周期相同，当客户端连接断开后，对应的客户端```$_SESSION```将会清除
* GatewayWorker中的```$_SESSION```与WebServer(PHP-FPM/Apache等)中的```$_SESSION```无法互通
* 定时器中不要直接使用```$_SESSION```变量，因为定时器运行那一刻无法确定```$_SESSION```变量里存储的值属于哪个client_id。如果定时器里面需要获得session，可以使用```Gateway::getSession($client_id)```获取

### ```$_SESSION```实现原理

Gateway/Worker中，每个客户端的```$_SESSION```数据是存储在Gateway进程内存中的，每次Gateway进程转发消息给BusinessWorker进程时，都会顺便携带上对应客户端的```$_SESSION```数据给BusinessWorker进程，这时BusinessWorker进程就能使用```$_SESSION```了。而当```$_SESSION```数据有更改时，BusinessWorker会将新的```$_SESSION```数据传递给Gateway进程进行保存。

## 示例
```php
class Events
{
    public static function onMessage($client_id, $data)
    {
        // data={"type":"login", "uid":"666"}
        $data = json_decode($data, true);
        // 如果没有$_SESSION['uid']说明客户端没有登录
        if(!isset($_SESSION['uid']))
        {
            // 消息类型不是登录视为非法请求，关闭连接
            if($data['type'] !== 'login')
            {
                return Gateway::closeClient($client_id);
            }
            // 设置session，标记该客户端已经登录
            $_SESSION['uid'] = $data['uid'];
        }
    }

}
```


