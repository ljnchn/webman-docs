# Gateway::getClientIdListByGroup

## 说明:
```php
array Gateway::getClientIdListByGroup(mixed $group);
```
 ``` (要求Gateway版本>=3.0.8) ``` [如何查看Gateway版本](get-gateway-version.md)
 
获取某个分组所有在线client_id列表。


## 返回值

返回client_id为key同时client_id也为值的数组。
类似下面的格式
```php
array(
    '7f00000108fc00000008' => '7f00000108fc00000008',
    '7f00000108fc00000009' => '7f00000108fc00000009'
)
```

注意：如果是客户端断网断电等极端情况掉线，客户端的onClose回调可能无法及时触发，参见[onClose](on-close.md)说明。也就是说对应客户端出现断网断电等极端掉线情况返回值中可能包含了异常掉线的client_id数据。这种情况需要[心跳来检测](heartbeat.md)已经掉线的客户端。

## 范例
```php
use \GatewayWorker\Lib\Gateway;

class Events
{
    ...
    public onMessage($client_id, $message)
    {
        $group = 'room-1';
        $_SESSION['name'] = $message['name'];
        $_SESSION['sex'] = $message['sex'];
        Gateway::joinGroup($client_id, $group);
        var_export(Gateway::getClientIdListByGroup($group));
    }
    ...
}
```


打印出的数据类似如下：
```php
array(
    '7f00000108fc00000008' => '7f00000108fc00000008',
    '7f00000108fc00000009' => '7f00000108fc00000009'
)
```
