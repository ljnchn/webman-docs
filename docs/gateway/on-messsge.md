# Events::onMessage

## 说明:
```php
void Events::onMessage(string $client_id, mixed $recv_data);
```

当客户端发来数据(Gateway进程收到数据)后触发的回调函数

## 参数
 ``` $client_id ```

全局唯一的客户端socket连接标识


 ``` $recv_data ```

完整的客户端请求数据，数据类型取决于Gateway所使用协议的decode方法返的回值类型

## 返回值
无返回值，任何返回值都会被视为无效的

## 范例

```php
use \GatewayWorker\Lib\Gateway;

class Events
{

    /**
     * 有消息时触发该方法
     * @param int $client_id 发消息的client_id
     * @param mixed $message 消息
     * @return void
     */
    public static function onMessage($client_id, $message)
    {
        // 群聊，转发请求给其它所有的客户端
        return GateWay::sendToAll($message);
    }

}
```
