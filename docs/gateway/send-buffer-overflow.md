# sendbuffertoworker fail. may be the send buffer are overflow

### 说明

出现这个错误说明服务端处理请求的速度低于客户端发送请求的速度。 例如服务端处理一个请求需要10毫秒，那么单个进程每秒最多处理100个请求，如果客户端每秒发来200个请求，  
那么就有100个请求排队等待处理。如果是一直处于这种状态，则会有越来越多的请求积压在请求队列，导致请求被延迟处理，  
最终导致积压数据大小超过队列缓冲区上限(上限受$Gateway->sendToWorkerBufferSize控制)，然后报出这个错误。  
可以调大businessWoreker进程数缓解问题，但是想根本解决问题需要从以下途径解决：  

运行 php start.php status 命令检查是否有busy的进程。  
出现busy进程则可能是以下原因：

  
1、业务代码有死循环。表现为对应进程占用cpu率很高，对应进程一直是busy状态  
2、业务代码可能阻塞在某个外部资源请求上。表现为对应进程占用cpu使用率很低，对应进程一直是busy状态  
3、业务执行比较慢，表现为busy的进程过一会儿恢复成idle状态  
4、有大量的请求需要进程处理，表现为对应进程cpu很高  

如果busy进程对应的cpu占用很高，需要review代码看看哪里有while(1) foreach for类似的代码。 

 
如果cpu不高，需要用 strace -ttp $pid 命令跟踪下进程系统调用，  
是否有read(fd=x、 poll(fd=x类似的代码，如果有说明进程在等待某个fd的数据返回，  
这时用lsof -p $pid | grep $fd 查看进程在等待哪个外部资源的返回，从而定位是哪里问题。  

如果是业务比较慢，则需要打日志定位下业务哪个部分比较耗时，然后做响应优化。  

如果是有大量的请求需要处理，可以考虑降低请求量或者增加businessWorker进程数量或者增加服务器[分布式部署](https://doc2.workerman.net/gateway-worker-separation.html)。

