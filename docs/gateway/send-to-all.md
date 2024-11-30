# Gateway::sendToAll

## 说明:
```php
void Gateway::sendToAll(string $send_data [, array $client_id_array = null [, array $exclude_client_id = null [, bool $raw = false]]]);
```

向所有客户端或者client_id_array指定的客户端发送```$send_data```数据。如果指定的$client_id_array中的client_id不存在则自动丢弃


## 参数

* ```$send_data```

要发送的数据（字符串类型），此数据会被Gateway所使用协议的encode方法打包后发送给客户端


* ```$client_id_array```

指定向哪些client_id发送，如果不传递该参数，则是向所有在线客户端发送 ```$send_data``` 数据

* ```$exclude_client_id```

client_id组成的数组。```$exclude_client_id```数组中指定的client_id将被排除在外，不会收到本次发的消息

* ```$raw```

是否发送原始数据，也就是绕过gateway协议打包过程，gateway对数据不再做任何处理，直接发给客户端。

如果```$raw```为```true```，要求```$message```为用协议打包好的数据(调用了gateway指定协议的encode方法生成的数据)，否则客户端可能无法解析。

此参数一般用于某些特殊情况，例如合并多个数据包为一段buffer，一次性发给客户端，而不是逐条发给客户端，这将有助于降低系统负载。

绝大多数情况此参数用不到，开发者可以忽略。

### 返回值
因为数据发送是异步进行的，所以没有返回值。一般来说只要客户端在线就可以发送成功。

## 更新日志
| 版本 | 说明 |
| -- | -- |
| 2.0.7 | 增加了```$exclude_client_id```和```$raw```参数 |



## 范例
```php
use \GatewayWorker\Lib\Gateway;

class Events
{
    ...

    public static function onMessage($client_id, $message)
    {
        // $message = '{"type":"say_to_all","content":"hello"}'
        $req_data = json_decode($message, true);
        // 如果是向所有客户端发送消息
        if($req_data['type'] == 'say_to_all')
        {
            Gateway::sendToAll($req_data['content']);
        }
    }
    ...
}

```
