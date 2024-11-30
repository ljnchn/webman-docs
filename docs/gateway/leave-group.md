# Gateway::leaveGroup

## 说明:
```php
void Gateway::leaveGroup(string $client_id, mixed $group);
```

将client_id从某个组中删除，不再接收该分组广播(```Gateway::sendToGroup```)发送的数据。

注意：当client_id下线（连接断开）时，client_id会自动从它所属的各个分组中删除，也就是说无需在onClose回调中调用Gateway::leaveGroup


## 参数

* ```$client_id```

客户端的client_id

* ```$group```

只能是数字或者字符串。

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
        // $message = '{"type":"leave","group":"xxxxx"}'
        $req_data = json_decode($message, true);
        Gateway::leaveGroup($client_id, $req_data['group']);
    }

    ...
}

```
