# Lib\Gateway类提供的接口

文件位置：GatewayWorker/Lib/Gateway.php

Lib\Gateway类是Gateway/BusinessWorker模型中给客户端发送数据的类。

提供了单发、群发以及关闭客户端连接的接口。

## 提示
GatewayWorker提供的所有接口都是支持分布式调用的，所以业务代码不需要任何更改，直接就可以分布式部署。


