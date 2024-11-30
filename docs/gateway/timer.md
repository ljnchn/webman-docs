# 定时器
GatewayWorker是基于Workerman开发的，Workerman定时器在GatewayWorker中也同样支持，用法与Wokerman的定时器用法相同。参见[Workerman手册定时器](https://doc.workerman.net/timer/add.html)

## 示例

```php
use Workerman\Timer;
class Events
{
    // 进程启动时设置个定时器。Events中支持onWorkerStart需要Gateway版本>=2.0.4
    public static function onWorkerStart()
    {
        Timer::add(10, function(){
            echo "timer\n";
        });
    }

    // 定时关闭未认证的连接
    public static function onConnect($client_id)
    {
        // 连接到来后，定时30秒关闭这个链接，需要30秒内发认证并删除定时器阻止关闭连接的执行
        $_SESSION['auth_timer_id'] = Timer::add(30, function($client_id){
            Gateway::closeClient($client_id);
        }, array($client_id), false);
    }

    // 认证的连接将定时器删除
    public static function onMessage($client_id, $msg)
    {
        $msg = json_decode($msg, true);
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
