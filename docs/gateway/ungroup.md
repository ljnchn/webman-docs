# Gateway::ungroup

## 说明:
```php
void Gateway::ungroup(mixed $group);
```
``` (要求Gateway版本>=3.0.9) ``` [如何查看Gateway版本](get-gateway-version.md)

取消分组，或者说解散分组。
取消分组后所有属于这个分组的用户的连接将被移出分组，此分组将不再存在，除非再次调用```Gateway::joinGroup($client_id, $group)```将连接加入分组。

注意：
1、调用```Gateway::ungroup($group)``` 相当于以下代码，
```php
$client_id_list = Gateway::getClientIdListByGroup($group);
foreach($client_id_list as $client_id) {
    Gateway::leaveGroup($client_id, $group);
}
```
区别是```Gateway::ungroup($group)```性能要好很多。

2、调用```Gateway::ungroup($group)```后，仍然可以调用```Gateway::joinGroup($client_id, $group)```将某个连接加入这个分组。


## 参数

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
        // $message = '{"type":"ungroup","group":"xxxxx"}'
        $req_data = json_decode($message, true);
        Gateway::ungroup($req_data['group']);
    }

    ...
}

```
