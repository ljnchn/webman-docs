# 创建wss服务

**准备工作：**

1、Workerman版本不小于3.3.7

2、PHP安装了openssl扩展

3、已经申请了证书（pem/crt文件及key文件）放在磁盘某个目录(位置任意)


**start_gateway.php中设置以下代码。**

```php
// 证书最好是申请的证书
$context = array(
    // 更多ssl选项请参考手册 https://php.net/manual/zh/context.ssl.php
    'ssl' => array(
        // 请使用绝对路径
        'local_cert'                 => '磁盘路径/server.pem', // 也可以是crt文件
        'local_pk'                   => '磁盘路径/server.key',
        'verify_peer'               => false,
        // 'allow_self_signed' => true, //如果是自签名证书需要开启此选项
    )
);
// websocket协议(端口任意，只要没有被其它程序占用就行)
$gateway = new Gateway("websocket://0.0.0.0:443", $context);
// 开启SSL，websocket+SSL 即wss
$gateway->transport = 'ssl';
```

**注意：**

1、如果无法启动，则一般是443端口被占用，请改成其它端口。如果必须使用443端口请参考[workerman手册创建wss服务](https://doc.workerman.net/faq/secure-websocket-server.html)方法二部分。

2、wss端口只能通过wss协议访问，ws无法访问wss端口。

3、证书一般是与域名绑定的，所以测试的时候请使用**证书对应的域名**去连接，不要使用其它域名或者ip去连。

4、如果出现无法访问的情况，请检查服务器防火墙。

5、此方法要求PHP版本>=5.6，因为微信小程序要求tls1.2，而PHP5.6以下版本不支持tls1.2。

**更多wss相关信息参考[workerman手册创建wss服务](https://doc.workerman.net/faq/secure-websocket-server.html)**
