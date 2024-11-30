# Events::onWorkerStop

## 说明:
```php
void Event::onWorkerStop(BusinessWorker $businessWorker);
```

 ``` (要求Gateway版本>=2.0.4) ```

当businessWorker进程退出时触发。每个进程生命周期内都只会触发一次。

可以在这里为每一个businessWorker进程做一些清理工作，例如保存一些重要数据等。

注意：某些情况将不会触发onWorkerStop，例如业务出现致命错误FatalError，或者进程被强行杀死等情况。

## 参数

 ``` $businessWorker ```

businessWorker进程实例


## 返回值
无返回值，任何返回值都会被视为无效的


## onWorkerStop范例
```php
use \GatewayWorker\Lib\Gateway;

class Events
{

    public static function onWorkerStop($businessWorker)
    {
       echo "WorkerStop\n";
    }

}
```
