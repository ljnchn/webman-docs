## 提示
GatewayWorker提供的所有接口都是支持分布式调用的，所以业务代码不需要任何更改，直接就可以分布式部署。

# 如何分布式GatewayWorker
GatewayWorker通过Register服务来建立划分集群。同一集群使用相同的一组Register服务，即Gateway 和 businessWorker的注册服务地址(```$gateway->registerAddress``` ```$businessworker->registerAddress```)指向相同的Register服务(可以是单机，也可以是集群)。

Gateway BusinessWorker Register之间如何工作的，请看[原理](principle.md)。

## 分布式部署的关键步骤

 1、Register 设置为监听内网ip。为了安全起见，register端口不要暴露给外网。
 2、将Gateway 和 businessWorker的注册服务地址(registerAddress)设置成统一的Register服务地址，如果是部署了多个register服务，格式类似['192.168.0.1:1236','192.168.0.2:1236']。
 3、设置Gateway启动脚本(一般是start_gateway.php)中的```lanIp```与当前服务器内网ip一致。

## 部署示例
假如需要部署三台服务器(192.168.1.1-3)提供高可用服务。

1、设置三台服务器start_register.php中监听本机内网ip，new Register('text://192.168.1.1:1236'); new Register('text://192.168.1.2:1236'); new Register('text://192.168.1.3:1236');

2、配置三台服务器start_gateway.php start_businessworker.php中的registerAddress为['192.168.1.1:1236','192.168.1.2:1236','192.168.1.3:1236']。

3、分别配置三台服务器start_gateway.php中的```lanIp```为当前服务器的内网ip(192.168.1.1-3)。

4、逐台启动，分布式部署完毕。

**注意事项及说明：**

1、注意多机部署时以下端口不要被服务器安全组阻挡：

①、Register服务监听的端口要可以被其它内网服务器访问（为了安全，register要监听内网ip不能让其被外网访问）；

②、start_gateway.php中如果```$gateway->startPort=2300; $gateway->count=4;```，则2300 2301 2302 2303四个端口需要被设置成能被其它服务器访问，也就是起始端口```$gateway->startPort```到```$gateway->startPort + $gateway->count - 1```这 ```$gateway->count```个端口要设置成能被其它内网服务器访问。

2、如果多机部署服务器不在一个局域网，部署时ip参数可以使用外网ip(需要GatewayWorker版本>=v3.0.22)，对应端口防火墙应该设置成能被外网服务器访问。

> 公网集群需要GatewayWorker版本>=v3.0.22
> 跨公网通讯有安全风险，建议都放在一个内网。

3、三台GatewayWorker机器都运行了Gateway进程和Worker进程，客户端连接上任意一台GatewayWorker的Gateway端口即通讯。

4、为了方便前端接入和扩容，可以在Gateway前加一层DNS、LVS等负载均衡策略（不熟悉DNS LVS的请自行搜索资料学习）。

5、如果服务器不够用可以使用同样的方法增加服务器

6、如果需要下线服务器，直接stop对应服务器即可。由于Gateway进程维护着客户端连接，当服务器下线时，对应服务器的客户端会掉线一次。如何做到下线机器不影响用户参考下一节。

7、因为有多台gateway服务器，所以需要在gateway前增加一个负载均衡。负载均衡方案是通用的，你可以选择用nginx负载，或者云厂商的负载均衡，也可以给DNS设置多个A记录。


