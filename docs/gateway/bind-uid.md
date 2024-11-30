# Gateway::bindUid

## 说明:
```php
void Gateway::bindUid(string $client_id, mixed $uid);
```

将client_id与uid绑定，以便通过```Gateway::sendToUid($uid)```发送数据，通过```Gateway::isUidOnline($uid)```用户是否在线。

uid解释：这里uid泛指用户id或者设备id，用来唯一确定一个客户端用户或者设备。


注意：

1、uid与client_id是一对多的关系，系统允许一个uid下有多个client_id。

2、但是一个client_id只能绑定一个uid，如果绑定多次uid，则只有最后一次绑定有效。

2、如果业务需要一对一的关系，可以通过```Gateway::getClientIdByUid($uid)```获得某uid已经绑定的所有client_id，然后调用```closeClient($client_id)```踢掉之前的client_id。

3、client_id下线（连接断开）时会自动执行解绑，开发者无需调用Gateway::unbindUid解绑。

4、如果某个uid对应的所有client_id都下线了，则调用```Gateway::isUidOnline($uid)```将返回0，即uid不在线。

5、uid和client_id映射关系存储在Gateway进程内存中。

6、调用```Gateway::bindUid($client_id, $uid)```的时机一般是在验证连接合法性的时候。例如客户端连上服务端后，发送的第一个数据包应当包含客户端的鉴权信息(例如用户名密码或者可用于鉴权的token)，服务端通过鉴权信息确定该连接属于哪个uid，然后调用```Gateway::bindUid($client_id, $uid)```绑定。

## 参数

* ```$client_id```

客户端的client_id

* ```$uid```

uid,可以是数字或者字符串。

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
        // $message = '{"type":"login","uid":"xxxxx"}'
        $req_data = json_decode($message, true);
        Gateway::bindUid($client_id, $req_data['uid']);
    }

    ...
}

```
