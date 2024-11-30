# Gateway::closeClient

## 说明:
```php
void Gateway::closeClient(string $client_id);
```

断开与client_id对应的客户端的连接


## 参数

* ```$client_id```

全局唯一标识客户端连接的id

### 返回值
无返回值

## 范例
```php
use \GatewayWorker\Lib\Gateway;

class Events
{
    ...

    public static function onMessage($client_id, $message)
    {
        // 如果传递的消息不ok就踢掉对应客户端
        $is_ok = your_check_fun($message);
        if(!$is_ok)
        {
            Gateway::closeClient($client_id);
        }
    }

    ...
}
```

