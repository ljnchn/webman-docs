# SendBufferToWorker fail. The connections between Gateway and BusinessWorker are not ready.

### 原因一

BusinessWorker和Gateway之间的socket链接没有建立，Gateway向BusinessWorker发送消息失败。  
出现这个问题的原因一般是start\_gateway.php和start\_businessworker.php中的`registerAddress`设置错误或者设置的不一致。  

Gateway和BusinessWorker启动后会根据`registerAddress`设置的地址(Register服务地址)注册自己，  
当start\_gateway.php和start\_businessworker.php中的`registerAddress`设置错误或者不一致时，  
会导致Gateway和BusinessWorker无法通讯。

start\_gateway.php和start\_businessworker.php中的`registerAddress`地址格式为`Register的IP:端口号`，  
其中端口号为start\_register.php中的监听端口(假设是1238)，  
单机部署时，Register服务为本机ip 127.0.0.1，则start\_gateway.php和start\_businessworker.php中的`registerAddress`统一为`'127.0.0.1:1238'`。  
分布式(集群)部署时，IP为实际Register服务部署的IP(分布式部署时只需要部署一台Register服务即可，假设是192.168.1.100)，  
则start\_gateway.php和start\_businessworker.php中的`registerAddress`统一为`'192.168.1.100:1238'`。

### 原因二

业务设置了business\_worker->onWorkerStart 或者 Events::onWorkerStart 回调，并且回调里有死循环或者长时间阻塞的代码，致使框架无法执行businessWorker与gateway建立连接逻辑，导致报错。

将死循环或者长时间阻塞的代码去掉即可恢复。

### 原因三
没有启动BusinessWorker进程或者Register进程。

### 原因四
服务器启动了多个GatewayWorker，并且多个GatewayWorker使用了相同的端口导致冲突。利用命令 `ps auxf` 查看进程启动情况。
