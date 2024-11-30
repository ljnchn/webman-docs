# Gateway::unbindUid

## 说明:
```php
void Gateway::unbindUid(string $client_id, mixed $uid);
```

将client_id与uid解绑。

注意：当client_id下线（连接断开）时会自动与uid解绑，开发者无需在onClose事件调用Gateway::unbindUid。


## 参数

* ```$client_id```

客户端的client_id

* ```$uid```

数字或者字符串。

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
        // $message = '{"type":"logout","uid":"xxxxx"}'
        $req_data = json_decode($message, true);
        Gateway::unbindUid($client_id, $req_data['uid']);
    }

    ...
}

```
