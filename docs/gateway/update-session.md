# \GatewayWorker\Lib\Gateway::updateSession
## 说明:
```php
void Gateway::updateSession(string $client_id, array $session);
```
**``` (要求Gateway版本>=2.0.4) ```** [如何查看Gateway版本](get-gateway-version.md)

更新某个client_id对应的session。如果对应client_id已经下线或者不存在，则会被忽略。

此函数与```Gateway::setSession($client_id, $new_session)```的区别是:

1、```Gateway::setSession($client_id, $new_session)```是整体赋值。

2、```Gateway::updateSession($client_id, $update_session)```部分更新。

## 注意：
不要```$_SESSION```赋值与Gateway::updateSession同时操作同一个```$client_id```，可能会造成session值与预期效果不符。操作当前用户用```$_SESSION['xx']=xxx```方式赋值即可，操作其他用户```session```可以使用```Gateway::updateSession```接口。


## 参数

* ```$client_id```

客户端的client_id

* ```$session```

要设置的session数组


## 返回值

无返回

### Gateway::setSession与Gateway::updateSession区别


**Gateway::setSession** 示例

假设目前```$client_id```的session是
```php
array(
    'name' => '张三',
    'age'  => 16,
)
```
调用```Gateway::setSession($client_id, array('name'=>'李四', 'sex'=>1));```后session为
```php
array(
    'name'=>'李四',
    'sex' => 1
)
```


**Gateway::updateSession示例**

假设目前```$client_id```的session是
```php
array(
    'name' => '张三',
    'age'  => 16,
)
```
调用```Gateway::updateSession($client_id, array('name'=>'李四', 'sex'=>1));```后session为
```php
array(
    'name' => '李四',
    'age'  => 16,
    'sex'  => 1
)
```


