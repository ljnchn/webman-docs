# Workerman/MySQL

> **注意**
> 此库不再维护，推荐使用[illuminate/database](https://github.com/illuminate/database)或[topthink/think-orm](https://github.com/top-think/think-orm)

## 说明
常驻内存的程序在使用mysql时经常会遇到```mysql gone away```的错误，这个是由于程序与mysql的连接长时间没有通讯，连接被mysql服务端踢掉导致。本数据库类可以解决这个问题，当发生```mysql gone away```错误时，会自动重试一次。

## 依赖的扩展
该mysql类依赖[pdo](https://php.net/manual/zh/book.pdo.php)和[pdo_mysql](https://php.net/manual/zh/ref.pdo-mysql.php)两个扩展，缺少扩展会报```Undefined class constant 'MYSQL_ATTR_INIT_COMMAND' in ....```错误。

命令行运行```php -m```会列出所有php cli已安装的扩展，如果没有pdo 或者 pdo_mysql，请自行安装。
 
**centos系统**

PHP5.x
```
yum install php-pdo
yum install php-mysql
```

PHP7.x
```
yum install php70w-pdo_dblib.x86_64
yum install php70w-mysqlnd.x86_64
```
如果找不到包名，请尝试用```yum search php mysql```查找

**ubuntu/debian系统**

PHP5.x
```
apt-get install php5-mysql
```

PHP7.x
```
apt-get install php7.0-mysql
```

如果找不到包名，请尝试用```apt-cache search php mysql```查找

**以上方法无法安装？**

如果以上方法无法安装，请参考[workerman手册-附录-扩展安装-方法三源码编译安装](../appendices/install-extension.md)。

## 安装 Workerman/MySQL
**方法1：**

可以通过composer安装，命令行运行以下命令(composer源在国外，安装过程可能会非常慢)。

```
composer require workerman/mysql
```

上面命令成功后会生成vendor目录，然后在项目中引入vendor下的autoload.php。
```php
require_once __DIR__ . '/vendor/autoload.php';
```

**方法2：**

[下载源码](https://github.com/walkor/mysql/archive/master.zip)，解压后的目录放到自己项目中(位置任意)，直接require源文件。

```php
require_once '/your/path/of/mysql-master/src/Connection.php';
```


## 注意
强烈建议在onWorkerStart回调中初始化数据库连接，避免在```Worker::runAll();```运行前就初始化连接，在```Worker::runAll();```运行前初始化的连接属于主进程，子进程会继承这个连接，主进程和子进程共用相同的数据库连接会导致错误。

## 示例
```php
use Workerman\Worker;
use Workerman\Connection\TcpConnection;
require_once __DIR__ . '/vendor/autoload.php';

$worker = new Worker('websocket://0.0.0.0:8484');
$worker->onWorkerStart = function($worker)
{
    // 将db实例存储在全局变量中(也可以存储在某类的静态成员中)
    global $db;
    $db = new \Workerman\MySQL\Connection('host', 'port', 'user', 'password', 'db_name');
};
$worker->onMessage = function(TcpConnection $connection, $data)
{
    // 通过全局变量获得db实例
    global $db;
    // 执行SQL
    $all_tables = $db->query('show tables');
    $connection->send(json_encode($all_tables));
};
// 运行worker
Worker::runAll();
```
## 具体MySQL/Connection用法
```php
// 初始化db连接
$db = new \Workerman\MySQL\Connection('host', 'port', 'user', 'password', 'db_name');

// 获取所有数据
$db->select('ID,Sex')->from('Persons')->where('sex= :sex AND ID = :id')->bindValues(array('sex'=>'M', 'id' => 1))->query();
//等价于
$db->select('ID,Sex')->from('Persons')->where("sex= 'M' AND ID = 1")->query();
//等价于
$db->query("SELECT ID,Sex FROM `Persons` WHERE sex='M' AND ID = 1");


// 获取一行数据
$db->select('ID,Sex')->from('Persons')->where('sex= :sex')->bindValues(array('sex'=>'M'))->row();
//等价于
$db->select('ID,Sex')->from('Persons')->where("sex= 'M' ")->row();
//等价于
$db->row("SELECT ID,Sex FROM `Persons` WHERE sex='M'");


// 获取一列数据
$db->select('ID')->from('Persons')->where('sex= :sex')->bindValues(array('sex'=>'M'))->column();
//等价于
$db->select('ID')->from('Persons')->where("sex= 'F' ")->column();
//等价于
$db->column("SELECT `ID` FROM `Persons` WHERE sex='M'");

// 获取单个值
$db->select('ID')->from('Persons')->where('sex= :sex')->bindValues(array('sex'=>'M'))->single();
//等价于
$db->select('ID')->from('Persons')->where("sex= 'F' ")->single();
//等价于
$db->single("SELECT ID FROM `Persons` WHERE sex='M'");

// 复杂查询
$db->select('*')->from('table1')->innerJoin('table2','table1.uid = table2.uid')->where('age > :age')->groupBy(array('aid'))->having('foo="foo"')->orderByASC/*orderByDESC*/(array('did'))
->limit(10)->offset(20)->bindValues(array('age' => 13));
// 等价于
$db->query('SELECT * FROM `table1` INNER JOIN `table2` ON `table1`.`uid` = `table2`.`uid`
WHERE age > 13 GROUP BY aid HAVING foo="foo" ORDER BY did LIMIT 10 OFFSET 20');

// 插入
$insert_id = $db->insert('Persons')->cols(array(
    'Firstname'=>'abc',
    'Lastname'=>'efg',
    'Sex'=>'M',
    'Age'=>13))->query();
等价于
$insert_id = $db->query("INSERT INTO `Persons` ( `Firstname`,`Lastname`,`Sex`,`Age`)
VALUES ( 'abc', 'efg', 'M', 13)");

// 更新
$row_count = $db->update('Persons')->cols(array('sex'))->where('ID=1')
->bindValue('sex', 'F')->query();
// 等价于
$row_count = $db->update('Persons')->cols(array('sex'=>'F'))->where('ID=1')->query();
// 等价于
$row_count = $db->query("UPDATE `Persons` SET `sex` = 'F' WHERE ID=1");

// 删除
$row_count = $db->delete('Persons')->where('ID=9')->query();
// 等价于
$row_count = $db->query("DELETE FROM `Persons` WHERE ID=9");

// 事务
$db->beginTrans();
....
$db->commitTrans(); // or $db->rollBackTrans();

```
