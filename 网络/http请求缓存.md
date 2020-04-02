# Http 请求缓存

参考文章：
1 <https://www.zhoulujun.cn/html/theory/network/2018_0306_8078.html>

使浏览器采用不同的缓存策略主要是通过修改请求或响应头的字段来操作，所以以下多种缓存策略，都是通过不同的请求或响应头字段来反映，在 nginx 中我们可以通过`add_header key value`，即 add_header 指令来修改响应头的字段

## 主要缓存相关的头字段

- Pragma：http 协议 1.0 中用于控制是否进行缓存的字段，值通常为 no-cache(不缓存)或者 pragma（缓存）
- Cache-Control: http 协议 1.1 后用来控制缓存的头字段
- Expires

## 缓存策略

### 无缓存

- Cache-Control: no-store 可用于请求头和响应头，强制不使用缓存

### 强缓存

- Expires：用来指定资源到期的时间，客户端将当前系统时间与该服务器上的绝对时间（Wed, 09 Oct 2019 03:43:10 GMT）进行对比，若大于该绝对时间则不命中缓存。这也造成一个问题，一旦客户端修改过系统时间，则会造成错误

```[]
      使用：
      Expires Wed, 09 Oct 2019 03:43:10 GMT
```

- Cache-Control： 赋予一个相对的时间值，客户端将该请求该资源时间与上一次请求该资源时间之差与该相对时间进行比较，判断是否命中

```[]
      使用：
      Cache-Control: 3600
      Cache-Control: "max-age=3600"
      Cache-Control: "max-age=0" // 设置为0即每次都需要访问服务器
```

- 注意：

1. Cache-Control 也可用在请求头字段中，如果它被使用在请求头中，且值为 no-cache，那么此时无论响应头中的 Cache-Control 字段被设置为什么，下一次的请求都一定会访问服务器，若其在请求头中被设置为 max-age=0，则在重新获取资源之前，先检验 ETag/Last-Modified
2. 在 Expires 和 Cache-Control 同时被使用时，Cache-Control 的优先级大于 Expries

### 协商缓存

- Last-Modified/If-Modified-Since：当第一次请求一个资源时，响应头会最新一次修改该资源的时间携带在响应头中的 Last-Modified 字段返回，而浏览器则会将该 Last-Modified 字段的值保存，在下一次请求该资源的时候，则将上一次保存的值，携带在请求头中的 If-Modified-Since 字段发送到服务器中。而服务器则通过该值对比资源最新修改时间，若相同，则命中缓存，返回 304，浏览器直接从内存或硬盘中读取资源，若不命中，则重新返回新的资源

- Etag/If-None-Match：当第一次请求一个资源时，服务器会根据资源内容生成一个 Etag 值，并携带在响应头中的 Etag 字段返回，而浏览器会将 Etag 的值保存，在下一次请求该资源时，将其携带在请求头中的 If-None-Match 的字段，发送到服务器，而服务器则通过对比最新资源生成的 Etag 与请求中所带的值，判断是否命中

- 注意：

1. 当 Etag 与 Last-Modified 同时被使用时，服务器会先对比 Etag 的值，再对比 Last-Modified 的值，根据不同情况进行处理
