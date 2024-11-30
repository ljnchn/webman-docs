~~~
Register auth timeout (*.*.*.*).
~~~

~~~
Bad request for Register service.  Request info(IP:*.*.*.*, Request Buffer:**)
~~~

~~~
Register unknown event:** IP: *.*.*.* Buffer:**
~~~

### 出现以上提示的原因

有其它程序连接了Register端口导致的

**注意：不要将Register端口暴露给外网，否则会有安全风险**

请参考以下方案屏蔽Register外网端口

* 安全组里设置Register端口不能被外网访问

* start_register.php 里 `new Register('text://0.0.0.0:端口号');` 改为 `new Register('text://127.0.0.1:端口号');` 或者 `new Register('text://内网ip:端口号');`
