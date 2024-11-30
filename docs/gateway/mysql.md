## Gateway/Worker模型 数据库使用示例

> **提示**
> 推荐使用[webman的GatewayWorker插件](https://www.workerman.net/doc/gateway-worker/webman.html)，对业务目录、数据库、redis等支持更完善。

## 安装
具体安装使用参见 [Workerman手册 Workerman/MySQL](https://doc.workerman.net/components/workerman-mysql.html)


## 使用示例

项目/Events.php
```php
<?php
use \GatewayWorker\Lib\Gateway;
require_once '/your/path/of/mysql-master/src/Connection.php';

/**
 * 数据库示例，假设有个your_db_name库，里面有个user表
 */
class Events
{
    /**
     * 新建一个类的静态成员，用来保存数据库实例
     */
    public static $db = null;

    /**
     * 进程启动后初始化数据库连接
     */
    public static function onWorkerStart($worker)
    {
        self::$db = new \Workerman\MySQL\Connection('host', 'port', 'user', 'password', 'db_name');
    }

   /**
    * 有消息时触发该方法，根据发来的命令打印2个用户信息
    * @param int $client_id 发消息的client_id
    * @param mixed $message 消息
    * @return void
    */
   public static function onMessage($client_id, $message)
   {
        // 发来的消息
        $commend = trim($message);
        if($commend !== 'get_user_list')
        {
            Gateway::sendToClient($client_id, "unknown commend\n");
            return;
        }
        // 使用数据库实例
        self::$db->select('*')->from('users')->where('uid>3')->offset(5)->limit(2)->query();
        // 打印结果
        return Gateway::sendToClient($client_id, var_export($ret, true));
   }

}
```


