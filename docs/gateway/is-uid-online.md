# Gateway::isUidOnline

## 说明:
```php
int Gateway::isUidOnline(mixed $uid);
```
 ``` (需要Gateway版本>=2.0.4) ``` [如何查看Gateway版本](get-gateway-version.md)

判断```$uid```是否在线，此方法需要配合```Gateway::bindUid($client_uid, $uid)```使用。

如果某uid没有通过```Gateway::bindUid($client_uid, $uid)```进行任何绑定，那么对该uid调用```Gateway::isUidOnline($uid)```将返回0。

如果某uid绑定的client_id都已经下线，那么对该uid调用```Gateway::isUidOnline($uid)```将返回0。

如果某uid绑定的client_id有至少有一个在线，那么对该uid调用   ```Gateway::isUidOnline($uid)```将返回1。


## 参数

* ```$uid```

uid，可以是数字或者字符串

## 返回值
uid在线返回1，不在线返回0

注意：如果是客户端断网断电等极端情况掉线，客户端的onClose回调可能无法及时触发，参见[onClose](on-close.md)说明。也就是说对应客户端出现断网断电等极端掉线情况返回值可能是1，而并非期待的0。这种情况需要[心跳来检测](heartbeat.md)已经掉线的客户端。


## 范例
```php
use \GatewayWorker\Lib\Gateway;
class Events
{
    ...

    public static function onMessage($client_id, $message)
    {
        // $message = '{"type":"say_to_one","to_uid":100,"content":"hello"}'
        $req_data = json_decode($message, true);
        $uid = $req_data['to_uid'];
        // 如果是向某个客户端发送消息
        if($req_data['type'] == 'say_to_one'))
        {
            // 如果不在线就先存起来
            if(!Gateway::isUidOnline($uid))
            {
                // 假设有个your_store_fun函数用来保存未读消息(这个函数要自己实现)
                your_store_fun($message);
            }
            else
            {
                // 在线就转发消息给对应的uid
                Gateway::sendToUid($uid, $req_data['content']);
            }
        }
    }

    ...
}

```


