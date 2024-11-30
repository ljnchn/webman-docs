# Gateway::joinGroup

## 说明:
```php
void Gateway::joinGroup(string $client_id, mixed $group);
```

将client_id加入某个组，以便通过```Gateway::sendToGroup```发送数据。

可以通过```Gateway::getClientSessionsByGroup($group)```获得该组所有在线成员数据。
可以通过```Gateway::getClientCountByGroup($group)```获得该组所有在线连接数（人数）。

该方法对于分组发送数据例如房间广播非常有用。

**注意：**

1、同一个`client_id`**可以**加入多个分组，以便接收不同组发来的数据。

2、当`client_id`下线（连接断开）后，该`client_id`会自动从该分组中删除，开发者无需调用```Gateway::leaveGroup```。

3、如果对应分组的所有`client_id`都下线，则对应分组会被自动删除。

4、目前没有获得某个`client_id`加入哪些分组的接口，建议`client_id`加入分组的时候可以用`$_SESSION`来记录加入的分组，获取的时候利用`$_SESSION`或者`Gateway::getSession($client_id)`来获取。

5、目前没有获得所有分组id接口，所有分组可以自行存入数据库或者其它存储中。

6、分组数量无上限。

## 参数

* ```$client_id```

客户端的client_id

* ```$group```

只能是数字或者字符串。

注意:group不能为空值。例如```0```,```0.0```,```'0'```,```"0"```,```false```,```null```是非法的group值。


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
        // $message = '{"type":"join","group":"xxxxx"}'
        $req_data = json_decode($message, true);
        Gateway::joinGroup($client_id, $req_data['group']);
    }

    ...
}

```
