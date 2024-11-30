# Events::onClose

## 说明:
```php
void Events::onClose(string $client_id);
```

客户端与Gateway进程的连接断开时触发。不管是客户端主动断开还是服务端主动断开，都会触发这个回调。一般在这里做一些数据清理工作。

注意：onClose回调里无法使用```Gateway::getSession()```来获得当前用户的session数据，但是仍然可以使用```$_SESSION```变量获得。

注意：onClose回调里无法使用```Gateway::getUidByClientId()```接口来获得uid，解决办法是在```Gateway::bindUid()```时记录一个```$_SESSION['uid']```，onClose的时候用```$_SESSION['uid']```来获得uid。

注意：断网断电等极端情况可能无法及时触发```onClose```回调，因为这种情况客户端来不及给服务端发送断开连接的包(fin包)，服务端就无法得知连接已经断开。检测这种极端情况需要[心跳检测](heartbeat.md)，并且必须设置```$gateway->pingNotResponseLimit>0```。这种断网断电的极端情况onClose将被延迟触发，延迟时间为小于```$gateway->pingInterval*$gateway->pingNotResponseLimit```秒，如果```$gateway->pingInterval``` 和 ```$gateway->pingNotResponseLimit``` 中任何一个为0，则可能会无限延迟。

## 参数
 ``` $client_id ```

全局唯一的client_id

## 返回值
无返回值，任何返回值都会被视为无效的

## 范例

```php
use \GatewayWorker\Lib\Gateway;

class Events
{
    ...

    /**
     * 当用户断开连接时触发的方法
     * @param integer $client_id 断开连接的客户端client_id
     * @return void
     */
    public static function onClose($client_id)
    {
       // 广播 xxx logout
       GateWay::sendToAll("client[$client_id] logout\n");
    }

    ...
}
```
