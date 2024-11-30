# Gateway::getClientSessionsByGroup

## 说明:
```php
array Gateway::getClientSessionsByGroup(mixed $group);
```

获取某个分组所有在线client_id信息。


## 返回值

返回值为client_id为key，client_id对应的$_SESSION为值的数组。
类似下面的格式
```php
array(
    '7f00000108fc00000008' => array(...),
    '7f00000108fc00000009' => array(...),
)
```

注意：如果是客户端断网断电等极端情况掉线，客户端的onClose回调可能无法及时触发，参见[onClose](on-close.md)说明。也就是说对应客户端出现断网断电等极端掉线情况返回值中可能包含了异常掉线的client_id数据。这种情况需要[心跳来检测](heartbeat.md)已经掉线的客户端。

## 更新日志
| 版本 | 说明 |
| -- | -- |
| 2.0.6 | 接口名为getClientInfoByGroup |
| 2.0.7 | 接口getClientInfoByGroup更名为getClientSessionsByGroup |


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
        var_export(Gateway::getClientSessionsByGroup($group));
    }
    ...
}
```


打印出的数据类似如下：
```php
array(
    '7f00000108fc00000008' => array('name'=>'Tom', 'sex'=>1),
    '7f00000108fc00000009' => array('name'=>'Joan', 'sex'=>0),
)
```
