# BusinessWorker类的使用
BusinessWorker类其实也是基于基础的Worker开发的。BusinessWorker是运行业务逻辑的进程，BusinessWorker收到Gateway转发来的事件及请求时会默认调用Events.php中的onConnect onMessage onClose方法处理事件及数据，开发者正是通过实现这些回调控制业务及流程。

## BusinessWorker类可以定制的内容

1、name

和Worker一样，可以设置BusinessWorker进程的名称，方便status命令中查看统计

2、count

和Worker一样，可以设置BusinessWorker进程的数量，以便充分利用多cpu资源

3、registerAddress，注册服务地址，格式类似于 '127.0.0.1:1236'。如果是部署了多个register服务则格式是数组，类似['192.168.0.1:1236','192.168.0.2:1236']

4、onWorkerStart

和Worker一样，可以设置BusinessWorker启动后的回调函数，一般在这个回调里面初始化一些全局数据

5、onWorkerStop

和Worker一样，可以设置BusinessWorker关闭的回调函数，一般在这个回调里面做数据清理或者保存数据工作

6、eventHandler
设置使用哪个类来处理业务，默认值是```Events```，即默认使用Events.php中的Events类来处理业务。业务类至少要实现onMessage静态方法，onConnect和onClose静态方法可以不用实现。

## 范例
Applications\项目\start_businessworker.php
```php
use \Workerman\Worker;
use \GatewayWorker\BusinessWorker;

$worker = new BusinessWorker();
$worker->name = 'ChatBusinessWorker';
$worker->count = 4;
$worker->registerAddress = '127.0.0.1:1236';

/*
 * 设置处理业务的类为MyEvent。
 * 如果类带有命名空间，则需要把命名空间加上，
 * 类似$worker->eventHandler='\my\namespace\MyEvent';
 */
$worker->eventHandler = 'MyEvent';

if(!defined('GLOBAL_START'))
{
    Worker::runAll();
}
```

## 业务处理类 Events

Events类为业务处理的入口文件，当有客户端事件发生时会触发相应的回调如下：
``` (注意：Gateway 2.0.4版本以前业务处理类为Event，为了避免和Event扩展冲突，2.0.4版本以后统一改成Events类) ```

1、每个BusinessWorker进程启动时，都会触发```Events::onWorkerStart($businessworker)```回调```（此特性Gateway版本>=2.0.4才支持）```。

2、当客户端连接到Gateway时，会触发```Events::onConnect($client_id)```回调。

3、当客户端发来数据时，会触发```Events::onMessage($client_id, $data)```回调。

4、当客户端关闭时，会触发```Events::onClose($client_id)```回调。

5、每个BusinessWorker进程退出时，都会触发```Events::onWorkerStop($businessworker)```回调```（此特性Gateway版本>=2.0.4才支持）```。注意如果进程是非正常退出，例如被kill可能无法触发```onWorkerStop```。

**Events详细文档参见下一节**




