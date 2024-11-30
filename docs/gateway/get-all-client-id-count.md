# Gateway::getAllClientIdCount

## 说明:
```php
int Gateway::getAllClientIdCount(void);
```
 ``` (要求Gateway版本>=3.0.8) ``` [如何查看Gateway版本](get-gateway-version.md)

获取当前在线连接总数（多少client_id在线）。

## 注意
该方法的别名为```Gateway::getAllClientCount(void);```


## 参数

无参数

## 返回值

返回一个数字

注意：如果是客户端断网断电等极端情况掉线，客户端的onClose回调可能无法及时触发，参见[onClose](on-close.md)说明。也就是说对应客户端出现断网断电等极端掉线情况返回值可能并不准确。这种情况需要[心跳来检测](heartbeat.md)已经掉线的客户端。

## 范例
```php
use \GatewayWorker\Lib\Gateway;

class Events
{
    ...
    public onConnect($client_id)
    {
        var_export(Gateway::getAllClientIdCount());
    }
    ...
}
```


打印出的数据类似如下：
```php
32
```
