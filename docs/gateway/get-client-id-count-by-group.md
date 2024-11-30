# Gateway::getClientIdCountByGroup

## 说明:
```php
int Gateway::getClientIdCountByGroup(mixed $group);
```
 ``` (要求Gateway版本>=3.0.8) ```
 
获取某分组当前在线成连接数（多少client_id在线）。

## 注意
该方法有个别名```Gateway::getClientCountByGroup(mixed $group);```。


## 参数

* ```$group```

分组名字

## 返回值

返回一个数字

注意：如果是客户端断网断电等极端情况掉线，客户端的onClose回调可能无法及时触发，参见[onClose](on-close.md)说明。也就是说有客户端出现断网断电等极端掉线情况返回值可能并不十分准确。这种情况需要[心跳来检测](heartbeat.md)已经掉线的客户端。

## 范例
```php
use \GatewayWorker\Lib\Gateway;

class Events
{
    ...
    public onConnect($client_id)
    {
        $group = 'romm-1';
        Gateway::joinGroup($client_id, $group);
        var_export(Gateway::getClientIdCountByGroup($group));
    }
    ...
}
```


打印出的数据类似如下：
```php
16
```

