# gateway worker 分离部署

## 什么是Gateway Worker分离部署
GatewayWorker有三种进程，Gateway进程负责网络IO，BusinessWorker进程负责业务处理，Register进程负责协调Gateway与BusinessWorker之间建立TCP长连接通讯。我们可以把Gateway BusinessWorker Register分开部署在不同的服务器上，当业务进程BusinessWorker出现瓶颈时，单独增加BusinessWorker服务器提升系统负载能力。同理，如果Gateway进程出现瓶颈，则增加Gateway服务器。Register服务只有在进程启动的时候协调Gateway与BusinessWorker建立TCP连接，集群运行起来后通讯量极低，不会成为系统瓶颈。

# 部署示例

以Applications/Todpole为例，假如需要部署4台服务器(192.168.0.1/4)提供高可用服务，192.168.0.1/2运行gateway服务和register服务，192.168.0.3/4运行BusinessWorker服务。


## gateway worker 分离部署扩容步骤
1. 设置服务器192.168.0.1/2上start_register.php 监听本机内网ip，例如 `new Register('text://192.168.0.1:1236');` (为了服务安全，请不要将1236端口暴露给外网)

2. 删除服务器192.168.0.1/2上的start_businessworker.php。配置start_gateway.php中的```lanIp=192.168.0.x```与本机ip一致。配置registerAddress为```['192.168.0.1:1236','192.168.0.2:1236']```，start_gateway.php文件最终类似下面配置。

文件Applications/Todpole/start_gateway.php
```php
<?php
use \Workerman\Worker;
use \GatewayWorker\Gateway;

// gateway
$gateway = new Gateway("Websocket://0.0.0.0:8282");
$gateway->name = 'TodpoleGateway';
$gateway->count = 4;
// ==== 注意这里配置的是本机内网ip ====
$gateway->lanIp = '192.168.0.1'; // 服务器192.168.0.2 上为 192.168.0.2
// ==== 注意这里配置 ====
$gateway->registerAddress = ['192.168.0.1:1236', '192.168.0.2:1236'];
$gateway->startPort = 2000;
$gateway->pingInterval = 10;
$gateway->pingData = '{"type":"ping"}';

...
```
3. 打开192.168.0.3/4两台服务器，删除start_gateway.php和start_reigster.php。设置start_businessworker.php的registerAddress为 ['192.168.0.1:1236', '192.168.0.2:1236']

4. 逐台启动

*至此，GatewayWorker分布式部署完毕。*

## 一些问题及解答

### 为什么将Gateway与BusinesWorker分别部署在不同的服务器上？
首先说明的是不一定非要将Gateway BusinessWorker分开部署，但是推荐分开部署，原因如下：

1、由于Gateway只负责网络IO，只要服务器带宽够用，绝大多数情况下Gateway服务器不会成为瓶颈，所以在很长时间我们只需要一台或者少数几台Gateway服务器即可。由于我们不想BusinessWorker影响到Gateway，所以将Gateway和BusinessWorker分开部署

2、BusinessWorker主要负责业务逻辑。当请求量增大时，由于可能BusinessWorker业务比较复杂，负载可能会明显升高，这时我们只要单纯增加BusinessWorker服务器即可，Gateway服务器则一般不需要变动，也就是不用通知客户端Gateway的ip列表有所变动

3、当系统BusinessWorker负载较低，需要下线服务器时，我们只需要下线BusinessWorker服务器即可，无需变动GateWay服务器，也就不会导致客户端链接因为服务器下线而断开。


### 当BusinessWorker服务器集群负载较低时，需要下线一些机器怎么实施?
只需要停止BusinessWorker的服务，运行```php start.php  stop```，然后下线即可。Gateway服务器会自动感知有BusinessWorker服务器下线，不会再将请求转发给下线的机器，整个下线过程中不影响服务质量。

### 当Gateway服务器集群负载较低时，需要下线一些机器怎么实施?
*首先还是要说明下Gateway服务器一般情况下不会成为系统瓶颈，所以一般你很长时间内Gateway服务器数量是一个稳定的值，一般一台即可*

下线Gateway服务器，首先停止服务，运行```php start.php stop```，此时会导致该服务器上已有的客户端链接断开，然后下线服务器即可。此时BusinessWorker会感知到有Gateway服务器下线，会自动断开与Gateway进程的联系。

### 如何给Gateway添加负载均衡
负载均衡方案是通用的，你可以用nginx代理、云厂商自带的TCP负载均衡、或者在gateway域名DNS上添加多条A记录。
