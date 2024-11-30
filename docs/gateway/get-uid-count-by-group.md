# Gateway::getUidCountByGroup

## 说明:
```php
int Gateway::getUidCountByGroup(mixed $group);
```
 ``` (要求Gateway版本>=3.0.8) ``` [如何查看Gateway版本](get-gateway-version.md)
 
获取某个分组下的在线uid数量。


## 返回值

数字

注意：如果是客户端断网断电等极端情况掉线，客户端的onClose回调可能无法及时触发，参见[onClose](on-close.md)说明。也就是说对应客户端出现断网断电等极端掉线情况返回值可能并不十分准确。这种情况需要[心跳来检测](heartbeat.md)已经掉线的客户端。

## 范例
```php
use \GatewayWorker\Lib\Gateway;

class Events
{
    ...
    public onMessage($client_id, $message)
    {
        $group = 'room-1';
        Gateway::joinGroup($client_id, $group);
        Gateway::bindUid($client_id, 123);
        var_export(Gateway::getUidCountByGroup($group));
    }
    ...
}
```


打印出的数据类似如下：
```php
1
```
