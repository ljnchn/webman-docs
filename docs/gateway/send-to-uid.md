# Gateway::sendToUid

## 说明:
```php
void Gateway::sendToUid(mixed $uid, string $message);
```

向uid绑定的所有**在线**client_id发送数据。

注意：默认uid与client_id是一对多的关系，如果当前uid下绑定了多个client_id，则多个client_id对应的客户端都会收到消息，这类似于PC QQ和手机QQ同时在线接收消息。

## 参数

* ```$uid```

uid可以是字符串、数字、或者包含uid的数组。如果为数组，则是给数组内所有uid发送数据

* ```$message```

要发送的数据（字符串类型），此数据会被Gateway所使用协议的encode方法打包后再发送给客户端

### 返回值
因为数据发送是异步进行的，所以没有返回值。一般来说只要uid在线就可以发送成功。

发送前先可以用Gateway::getClientIdByUid判断下uid是否有在线的client_id。

## 范例
```php
use \GatewayWorker\Lib\Gateway;
class Events
{
    ...

    public static function onMessage($client_id, $message)
    {
        // $message = '{"type":"send_to_uid","uid":"xxxxx", "message":"...."}'
        $req_data = json_decode($message, true);
        Gateway::sendToUid($req_data['uid'], $req_data['message']);
    }

    ...
}

```
