# 如何获得客户端ip

可以在Event.php中直接使用```$_SERVER['REMOTE_ADDR']```获得当前客户端ip。

> 如果在gateway前面加了nginx代理，`$_SERVER['REMOTE_ADDR']`获得的ip可能不是你想要的，这种情况请参考 [透过代理获得真实IP](https://doc.workerman.net/faq/get-real-ip-from-proxy.html) 

