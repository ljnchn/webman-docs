# Events::onWebSocketConnect

## 说明:
```php
void Events::onWebSocketConnect(string $client_id, array $data);
```
 
 ``` (要求Gateway版本>=3.0.8) ``` [如何查看Gateway版本](get-gateway-version.md)
 
当客户端连接上gateway完成websocket握手时触发的回调函数。

注意：此回调只有gateway为websocket协议并且gateway没有设置onWebSocketConnect时才有效。

## 参数

 ``` $client_id ```

client_id固定为20个字符的字符串，用来全局标记一个socket连接，每个客户端连接都会被分配一个全局唯一的client_id。

 ``` $data ```

websocket握手时的http头数据，包含get、server等变量


## 返回值
无返回值，任何返回值都会被视为无效的


## 范例
```php
use \GatewayWorker\Lib\Gateway;

class Events
{

    public static function onWebSocketConnect($client_id, $data)
    {
        var_export($data);
        if (!isset($data['get']['token'])) {
             Gateway::closeClient($client_id);
        }
    }
}
```

客户端连接代码类似:
```javascript
var ws = new WebSocket('ws://127.0.0.1:7272/?token=kjxdvjkasfh');
```

服务端终端打印类似：
```
array (
  'get' => 
  array (
    'token' => 'kjxdvjkasfh',
  ),
  'server' => 
  array (
    'REQUEST_METHOD' => 'GET',
    'REQUEST_URI' => '/?token=kjxdvjkasfh',
    'SERVER_PROTOCOL' => 'HTTP/1.1',
    'HTTP_HOST' => '127.0.0.1:7272',
    'SERVER_NAME' => '127.0.0.1',
    'SERVER_PORT' => '7272',
    'HTTP_CONNECTION' => 'Upgrade',
    'HTTP_PRAGMA' => 'no-cache',
    'HTTP_CACHE_CONTROL' => 'no-cache',
    'HTTP_UPGRADE' => 'websocket',
    'HTTP_ORIGIN' => 'http://127.0.0.1:55151',
    'HTTP_SEC_WEBSOCKET_VERSION' => '13',
    'HTTP_USER_AGENT' => 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.139 Safari/537.36',
    'HTTP_ACCEPT_ENCODING' => 'gzip, deflate, br',
    'HTTP_ACCEPT_LANGUAGE' => 'zh-CN,zh;q=0.9,en;q=0.8',
    'HTTP_COOKIE' => 'lvt_7b1919221=1237y75',
    'HTTP_SEC_WEBSOCKET_KEY' => 'MWXGA2FauwGJ2beehaqZsQ==',
    'HTTP_SEC_WEBSOCKET_EXTENSIONS' => 'permessage-deflate; client_max_window_bits',
    'QUERY_STRING' => 'token=kjxdvjkasfh',
  ),
  'cookie' => 
  array (
    'lvt_7b1919221' => '1237y75'
  ),
)
```
