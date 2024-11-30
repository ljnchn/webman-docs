# connections
## 说明:
```php
array Worker::$connections
```

格式为
```php
array(id=>connection, id=>connection, ...)
```

此属性中存储了**当前进程**的所有的客户端连接对象，其中id为connection的id编号，详情见手册[TcpConnection的id属性](../tcp-connection/id.md)。

 ```$connections``` 在广播时或者根据连接id获得连接对象非常有用。

如果得知connection的编号为```$id```，可以很方便的通过```$worker->connections[$id]```获得对应的connection对象，从而操作对应的socket连接，例如通过```$worker->connections[$id]->send('...')``` 发送数据。

注意：如果连接关闭(触发onClose)，对应的```connection```会从```$connections```数组里删除。

注意：开发者不要对这个属性做修改操作，否则可能造成不可预知的情况。


## 范例

```php
use Workerman\Worker;
use Workerman\Timer;
require_once __DIR__ . '/vendor/autoload.php';

$worker = new Worker('text://0.0.0.0:2020');
// 进程启动时设置一个定时器，定时向所有客户端连接发送数据
$worker->onWorkerStart = function($worker)
{
    // 定时，每10秒一次
    Timer::add(10, function()use($worker)
    {
        // 遍历当前进程所有的客户端连接，发送当前服务器的时间
        foreach($worker->connections as $connection)
        {
            $connection->send(time());
        }
    });
};
// 运行worker
Worker::runAll();
```
