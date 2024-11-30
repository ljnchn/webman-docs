# Events::onConnect

## 说明:
```php
void Events::onConnect(string $client_id);
```

当客户端连接上gateway进程时(TCP三次握手完毕时)触发的回调函数。


## 参数

 ``` $client_id ```

client_id固定为20个字符的字符串，用来全局标记一个socket连接，每个客户端连接都会被分配一个全局唯一的client_id。

如果client_id对应的客户端连接断开了，那么这个client_id也就失效了。当这个客户端再次连接到Gateway时，将会获得一个新的client_id。也就是说client_id和客户端的socket连接生命周期是一致的。

client_id一旦被使用过，将不会被再次使用，也就是说client_id是不会重复的，即使分布式部署也不会重复。

只要有client_id，并且对应的客户端在线，就可以调用```Gateway::sendToClient($client_id, $data)```等方法向这个客户端发送数据。


## 返回值
无返回值，任何返回值都会被视为无效的

## 注意

 ``` $client_id ```是服务端自动生成的并且无法自定义。

如果开发者有自己的id系统，可以用过```Gateway::bindUid($client_id, $uid)```把自己系统的id与client_id绑定，绑定后就可以通过```Gateway::sendToUid($uid)```发送数据，通过```Gateway::isUidOnline($uid)```用户是否在线了。

onConnect事件仅仅代表客户端与gateway完成了TCP三次握手，这时客户端还没有发来任何数据，此时除了通过```$_SERVER['REMOTE_ADDR']```获得对方ip，没有其他可以鉴别客户端的数据或者信息，所以在onConnect事件里无法确认对方是谁。要想知道对方是谁，需要客户端发送鉴权数据，例如某个token或者用户名密码之类，在[onMesssge](on-messsge.md)里做鉴权。


## onConnect范例
```php
use \GatewayWorker\Lib\Gateway;

class Events
{

    public static function onConnect($client_id)
    {
       Gateway::sendToCurrentClient("Your client_id is $client_id");
    }

}
```
