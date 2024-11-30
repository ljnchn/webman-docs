# 开启多少进程
Gateway进程数不是开得越多越好，Gateway进程增多会导致进程间通讯开销变大。
每个Gateway进程可以轻松处理5000-10000连接的请求转发，业务**同时**在线连接数少于10000时可以只开2个Gateway进程。每增加10000个连接增加一个Gateway进程，依次类推。

BusinessWorker进程中根据业务是否有阻塞式IO设置进程数为CPU核数的1倍-4倍即可。 即```start_businessworker.php```中```$worker->count = cpu```核数的1-4倍;

参见：[Workerman手册-进程数设置](https://doc.workerman.net/faq/processes-count.html)
