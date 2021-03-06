# HTTP 协议

## 定义

超文本传输 ​​ 协议（HTTP）是一种用于传输超媒体文档（例如 HTML）的应用层协议，它是为 Web 浏览器与 Web 服务器之间的通信而设计的。HTTP 遵循经典的客户端-服务端模型，客户端打开一个连接以发出请求，然后等待它收到服务器端响应。HTTP 是无状态协议，这意味着服务器不会在两个请求之间保留任何数据（状态）。该协议虽然通常基于 TCP/IP 层，但可以在任何可靠的传输层上使用。（mdn 官方介绍）

## 特点

- 可扩展: HTTP 协议可通过在 HTTP headers 中添加字段，同时客户端、服务端对该字段达成语义一致，来扩展更多的功能
- 无状态：HTTP 协议中，两个执行成功的请求之间是独立的。比如客户端登录成功后发起的第二次请求，服务端并无法识别这是一个来自于已登录客户端的请求。HTTP 协议可通过在请求中添加 Web Cookies 来创建一个有状态的会话，Web Cookies 中则保存了相关的状态（如已登录的状态）
- 无连接：一个连接是由传输层来控制的，这从根本上不属于 HTTP 的范围。HTTP 并不需要其底层的传输层协议是面向连接的，只需要它是可靠的，或不丢失消息的（至少返回错误）以上为 mdn 原文，我的理解是，作为应用层的协议，建立一个连接并不是该层协议的功能，而是底下传输层来控制的。同时 HTTP 协议的诞生只是为了浏览某些内容，并不需要持续保持通信，所以只要传输是可靠的，就可进行会话。

## 报文

HTTP 请求报文由以下四部分组成

- 请求行：请求行由请求方法字段、URL 字段和 HTTP 协议版本字段 3 个字段组成，它们之间用空格分隔。
- 请求头：为客户端表达其他信息的可选头部
- 空行：用来告诉服务（客户）端头部信息到此结束
- 请求体：需要发送给服务端的数据

HTTP 响应报文由以下四部分组成

- 响应行：请求行由 HTTP 协议版本号、状态码和状态码信息 3 个字段组成，它们之间用空格分隔。
- 响应头：为客户端表达其他信息的可选头部
- 空行：用来告诉服务（客户）端头部信息到此结束
- 响应体：需要发送给客户端的数据

## HTTP 方法

- GET 获取资源
- POST 传输资源
- PUT 更新资源
- DETETE 删除资源
- HEAD 获取资源的头部信息，这些头部信息与 GET 请求时返回的头部一致
  - 下载大文件前先通过该方法请求获取文件的大小再决定是否要下载, 以此可以节约带宽资源.
- OPTIONS 用于获取服务器所支持的请求方法
  - 在 CORS 中，可以使用 OPTIONS 方法发起一个预检请求，以检测实际请求是否可以被服务器所接受。预检请求报文中的 Access-Control-Request-Method 首部字段告知服务器实际请求所使用的 HTTP 方法。服务器基于从预检请求获得的信息来判断，是否接受接下来的实际请求。

## POST 和 GET 方法区别

- GET 在浏览器回退时是无害的，而 POST 会再次提交请求
- GET 产生的 URL 地址可以被收藏，而 POST 不可以
- GET 请求会主动被浏览器主动缓存，而 POST 不会，除非手动设置
- GET 请求只能进行 url 编码，而 POST 支持多种编码方式
- GET 请求参数会被完整保留在浏览器历史记录里，而 POST 中的参数不会被保留
- GET 请求在 URL 中传送的参数是有长度限制的，而 POST 没有限制
- 对参数的数据类型，GET 只接受 ASCII 字符，而 POST 没有限制
- GET 参数通过 URL 传递，POST 放在 Request Body 中，因此 GET 请求不能用来传递敏感信息

## HTTP1.0 和 HTTP1.1的一些区别
                    
1. 缓存处理：在HTTP1.0中主要使用header里的If-Modified-Since,Expires来做为缓存判断的标准，HTTP1.1则引入了更多的缓存控制策略例如 Entity tag，If-Unmodified-Since, If-Match, If-None-Match等更多可供选择的缓存头来控制缓存策略。
2. 带宽优化及网络连接的使用：HTTP1.0 中，存在一些浪费带宽的现象，例如客户端只是需要某个对象的一部分，而服务器却将整个对象送过来了，并且不支持断点续传功能，HTTP1.1则在请求头引入了range头域，它允许只请求资源的某个部分，即返回码是206（Partial Content），这样就方便了开发者自由的选择以便于充分利用带宽和连接。
3. 错误通知的管理：在HTTP1.1中新增了24个错误状态响应码，如409（Conflict）表示请求的资源与资源的当前状态发生冲突；410（Gone）表示服务器上的某个资源被永久性的删除。
4. Host头处理，在HTTP1.0中认为每台服务器都绑定一个唯一的IP地址，因此，请求消息中的URL并没有传递主机名（hostname）。但随着虚拟主机技术的发展，在一台物理服务器上可以存在多个虚拟主机（Multi-homed Web Servers），并且它们共享一个IP地址。HTTP1.1的请求消息和响应消息都应支持Host头域，且请求消息中如果没有Host头域会报告一个错误（400 Bad Request）。
5. 长连接：HTTP 1.1支持长连接（PersistentConnection）和请求的流水线（Pipelining）处理，在一个TCP连接上可以传送多个HTTP请求和响应，减少了建立和关闭连接的消耗和延迟，在HTTP1.1中默认开启Connection： keep-alive，一定程度上弥补了HTTP1.0每次请求都要创建连接的缺点。

## HTTP2.0

在不改变 HTTP1.1 的各种规范基础上，HTTP2.0 为了改进传输性能，在应用层和传输层之间增加了一个二进制分层。在二进制分层里边将所有传输信息都分割为更小的消息和帧，并将对其都进行二进制的编码，将 HTTP 报文首部封装为 HEADER FRAME，将 HTTP 报文的数据部分封装为 DATA FRAME 里面。

- 首部压缩  
  HTTP2.0 使用 encoder 来减少需要传输的 header 大小，通讯双方各自 cache 一份 header fields 表，既避免了重复 header 的传输，又减小了需要传输的大小。高效的压缩算法可以很大的压缩 header，减少发送包的数量从而降低延迟。
- 服务器推送  
  服务器除了对最初请求的响应外，服务器还可以额外的向客户端推送资源，而无需客户端明确的请求。
