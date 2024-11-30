# pidFile
## 说明:
```php
static string Worker::$pidFile
```

如果无特殊需要，建议不要设置此属性

此属性为全局静态属性，用来设置Workerman进程的pid文件路径。

此项设置在监控中比较有用，例如将Workerman的pid文件放入固定的目录中，可以方便一些监控软件读取pid文件，从而监控Workerman进程状态。

如果不设置，Workerman默认会在与Workerman目录平行的位置（注意workerman3.2.3之前版本默认在```sys_get_temp_dir()```下）自动生成一个pid文件，并且为了避免启动多个Workerman实例导致pid冲突，Workerman生成pid文件包含了当前Workerman的路径

注意：此属性必须在```Worker::runAll();```运行前设置才有效。windows系统不支持此特性。


## 范例

```php
use Workerman\Worker;
require_once __DIR__ . '/vendor/autoload.php';

Worker::$pidFile = '/var/run/workerman.pid';

$worker = new Worker('text://0.0.0.0:8484');
$worker->onWorkerStart = function($worker)
{
    echo "Worker start";
};
// 运行worker
Worker::runAll();
```
