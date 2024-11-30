# Events::onWorkerStart

## 说明:
```php
void Event::onWorkerStart(BusinessWorker $businessWorker);
```

 ``` (要求Gateway版本>=2.0.4) ```

当businessWorker进程启动时触发。每个进程生命周期内都只会触发一次。

可以在这里为每一个businessWorker进程做一些全局初始化工作，例如设置定时器，初始化redis等连接等。

注意：```$businessworker->onWorkerStart```和```Event::onWorkerStart```不会互相覆盖，如果两个回调都设置则都会运行。

不要在onWorkerStart内执行长时间阻塞或者耗时的操作，这样会导致BusinessWorker无法及时与Gateway建立连接，造成应用异常(```SendBufferToWorker fail. The connections between Gateway and BusinessWorker are not ready```错误)。


## 参数

 ``` $businessWorker ```

businessWorker进程实例


## 返回值
无返回值，任何返回值都会被视为无效的


## onWorkerStart范例
```php
use \GatewayWorker\Lib\Gateway;

class Events
{

    public static function onWorkerStart($businessWorker)
    {
       echo "WorkerStart\n";
    }

}
```
