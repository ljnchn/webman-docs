# 关于client_id

* client_id固定为20个字符的字符串，用来全局标记一个socket连接，每个客户端连接都会被分配一个全局唯一的client_id。

* client_id不能自定义，由GatewayWorker自动生成。

* 如果client_id对应的客户端连接断开了，那么这个client_id也就失效了。当这个客户端再次连接到Gateway时，将会获得一个新的client_id。也就是说client_id和客户端的socket连接生命周期是一致的。

* 除非gateway进程退出重启，否则client_id一旦被使用过，将不会被再次使用。也就是说client_id在整个gateway进程生命周期内是不会重复的，即使分布式部署也不会重复。

* 业务不应该存储client_id到数据库或redis存储上，因为它是临时id，重启GatewayWorker后client_id会重新计数，导致业务问题。

* 推荐使用Gateway::bindUid($client_id, $uid) Gateway::joinGrop($client_id, $group_id) 等接口将client_id绑定到uid或者gid上，通过Gateway::sendToUid($uid, $data) 或 Gateway::sendToGroup($gid, $data)来发送数据。


