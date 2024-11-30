# \GatewayWorker\Lib\Gateway::getSession
## 说明:
```php
mixed Gateway::getSession(string $client_id);
```
**``` (要求Gateway版本>=2.0.4) ```** [如何查看Gateway版本](get-gateway-version.md)

获取某个client_id对应的session。


## 参数

* ```$client_id```


客户端的client_id


## 返回值

1、如果对应的client_id下线或者不存在，则返回null

2、如果对应的client_id在线但是没有设置过session，则返回array()

3、如果对应的client_id在线并设置了session，则正常返回一个数组



## 注意
 ``` Gateway::onClose ```回调里无法使用```Gateway::getSession```来获得当前用户的session数据，但是仍然可以使用```$_SESSION```变量获得。


## 范例
```php
use \GatewayWorker\Lib\Gateway;

class Events
{
    ...
    public onMessage($client_id, $message)
    {
        Gateway::updateSession($client_id, array('key1'=>'value1', 'key2'=>'value2'));
        var_dump(Gateway::getSession($client_id));
    }
    ...
}
```
