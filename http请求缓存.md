### Http请求缓存

- #### 网络请求缓存是提高前端界面性能非常高效及重要的一种方式，因此在此我也用nginx服务器来亲身实践一下几种缓存策略的不同
  使浏览器采用不同的缓存策略主要是通过修改请求或响应头的字段来操作，所以以下多种缓存策略，都是通过不同的请求或响应头字段来反映，在nginx中我们可以通过```add_header key value```，即add_header指令来修改响应头的字段

- #### 主要缓存相关的头字段
  - ##### Pragma：http协议1.0中用于控制是否进行缓存的字段，值通常为no-cache(不缓存)或者pragma（缓存）
  - ##### Cache-Control: http协议1.1后用来控制缓存的头字段
  - ##### Expires

- #### 缓存策略
  - ##### 无缓存
    - Cache-Control: no-store 可用于请求头和响应头，强制不使用缓存
    
  - ##### 强缓存
    - Expires：用来指定资源到期的时间，客户端将当前系统时间与该服务器上的绝对时间（Wed, 09 Oct 2019 03:43:10 GMT）进行对比，若大于该绝对时间则不命中缓存。这也造成一个问题，一旦客户端修改过系统时间，则会造成错误
    ``` 
      使用：
      Expires Wed, 09 Oct 2019 03:43:10 GMT
    ```
    
    - Cache-Control： 赋予一个相对的时间值，客户端将该请求该资源时间与上一次请求该资源时间之差与该相对时间进行比较，判断是否命中  
       ```
      使用：
      Cache-Control: 3600
      Cache-Control: "max-age=3600"
      Cache-Control: "max-age=0" // 设置为0即每次都需要访问服务器
       ```
       
    - 注意：
      1. Cache-Control也可用在请求头字段中，如果它被使用在请求头中，且值为no-cache，那么此时无论响应头中的Cache-Control字段被设置为什么，下一次的请求都一定会访问服务器，若其在请求头中被设置为max-age=0，则在重新获取资源之前，先检验ETag/Last-Modified
      2. 在Expires和Cache-Control同时被使用时，Cache-Control的优先级大于Expries
   
  - ##### 协商缓存
    - Last-Modified/If-Modified-Since：当第一次请求一个资源时，响应头会最新一次修改该资源的时间携带在响应头中的Last-Modified字段返回，而浏览器则会将该Last-Modified字段的值保存，在下一次请求该资源的时候，则将上一次保存的值，携带在请求头中的If-Modified-Since字段发送到服务器中。而服务器则通过该值对比资源最新修改时间，若相同，则命中缓存，返回304，浏览器直接从内存或硬盘中读取资源，若不命中，则重新返回新的资源
    
    - Etag/If-None-Match：当第一次请求一个资源时，服务器会根据资源内容生成一个Etag值，并携带在响应头中的Etag字段返回，而浏览器会将Etag的值保存，在下一次请求该资源时，将其携带在请求头中的If-None-Match的字段，发送到服务器，而服务器则通过对比最新资源生成的Etag与请求中所带的值，判断是否命中
    
    - 注意：
      1. 当Etag与Last-Modified同时被使用时，服务器会先对比Etag的值，再对比Last-Modified的值，根据不同情况进行处理
 
 参考文章：
 1 https://www.zhoulujun.cn/html/theory/network/2018_0306_8078.html
