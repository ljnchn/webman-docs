# \GatewayWorker\Lib\Gateway::setSession

## 说明:
```php
void Gateway::setSession(string $client_id, array $session);
```
**``` (要求Gateway版本>=2.0.5) ```** [如何查看Gateway版本](get-gateway-version.md)

设置某个client_id对应的session。如果对应client_id已经下线或者不存在，则会被忽略。

## 注意：
不要```$_SESSION```赋值与Gateway::setSession同时操作同一个```$client_id```，可能会造成session值与预期效果不符。操作当前用户用```$_SESSION['xx']=xxx```方式赋值即可，操作其他用户```session```可以使用```Gateway::setSession```接口。

## 参数

* ```$client_id```

客户端的client_id

* ```$session```

要设置的session数组


## 返回值

无返回

## 范例
```php
use \GatewayWorker\Lib\Gateway;

class Events
{
    ...
    public onMessage($client_id, $message)
    {
        Gateway::setSession($client_id, array('key1'=>'value1', 'key2'=>'value2'));
    }
    ...
}
```
