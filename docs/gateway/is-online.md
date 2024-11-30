# Gateway::isOnline

## 说明:
```php
int Gateway::isOnline(string $client_id);
```

判断$client_id是否还在线

是否在线取决于对应client_id是否触发过onClose回调。

## 参数

* ```$client_id```

客户端的client_id

## 返回值
在线返回1，不在线返回0

如果```$client_id```对应的连接触发过onClose回调，则返回0，否则返回1。

注意：如果是客户端断网断电等极端情况掉线，客户端的onClose回调可能无法及时触发，参见[onClose](on-close.md)说明。也就是说对应客户端出现断网断电等极端掉线情况返回值可能是1，而并非期待的0。这种情况需要[心跳来检测](heartbeat.md)已经掉线的客户端。

## 范例
```php
use \GatewayWorker\Lib\Gateway;
class Events
{
    ...

    public static function onMessage($client_id, $message)
    {
        // $message = '{"type":"say_to_one","to_client_id":100,"content":"hello"}'
        $req_data = json_decode($message, true);
        // 如果是向某个客户端发送消息
        if($req_data['type'] == 'say_to_one'))
        {
            // 如果不在线就先存起来
            if(!Gateway::isOnline($req_data['to_client_id']))
            {
                // 假设your_store_fun是用来保存未读消息的函数(这个函数不存在，需要自己实现)
                your_store_fun($message);
            }
            else
            {
                // 在线就转发消息给对应的客户端
                Gateway::sendToClient($req_data['to_client_id'], $req_data['content']);
            }
        }
    }

    ...
}

```

