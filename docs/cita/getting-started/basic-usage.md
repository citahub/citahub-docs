---
id: basic-usage
title: 基本操作
---

## 查看块高度

  执行命令：
  
  ```shell
  $ cita-cli rpc blockNumber
  ```
  
  命令返回：
  
  ```json
  {
    "id": 1,
    "jsonrpc": "2.0",
    "result": "0x283"
  }
  ```
  
  其中 `result` 表示本次查询时的块高度为 `0x283`。
  CITA 默认 3s 出一个块，重复执行查询命令，可以观察到 result 在持续的增长。

## 停止节点

以“0”节点为例，执行以下命令即可停止“0”节点：

```shell
$ bin/cita stop test-chain/0
```

## 其他操作

更多其他操作使用以下命令查看帮助信息：

```shell
$ bin/cita help
```

>**Notice**
>
> * 请不要先进到 bin 目录，再执行以上的部署操作，错误示范：
>
>   ```shell
>   $ cd bin
>   $ cita setup test-chain/0
>   ```
>
> * 请勿在一台服务器上运行多个容器。因为虽然 CITA 在 Docker 中运行，但是容器并没有做网络隔离。
> * 请不要同时在 host 系统里面运行 CITA 以及相关的 RabbitMQ 等软件，以免造成端口冲突。

## 验证

CITA 提供了支持 JSON-RPC 2.0 (https://www.jsonrpc.org/specification)  协议的API，方便客户端进行区块信息的查询，具体文档在[RPC 列表]。

默认启动的 4 个节点的 JSON-RPC 服务端口分别是 1337、1338、1339、1340，下列指令查看第一个节点的相关信息。

* 查看当前节点上连接其他节点的数量（返回结果 +1 即是节点所在网络中的所有节点数量）

  Request:

  ```shell
  curl -X POST --data '{"jsonrpc":"2.0","method":"peerCount","params":[],"id":74}' 127.0.0.1:1337
  ```

  Result:

  ```json
  {
    "jsonrpc": "2.0",
    "id": 74,
    "result": "0x3"
  }
  ```

> Tips：JSON-RPC 协议要求发送 JSON 格式的请求参数，其中 "jsonrpc":"2.0" 是固定的协议版本， 另外包含三个关键元素：
>
> 1. method：表示要调用的方法
> 2. params：表示参数的数组
> 3. id：客户端分配的一个标识符，可以包含字符串，数字或者为空。如果没有 id，就会被当成是广播通知。这个值一般不能为 Null，且为数字时不能有小数。如果请求中含有这个字段，服务器在响应时，必须原样返回该字段，当有多个请求并使用异步队列发送时可以用来区分请求和响应。


[RPC 列表]: ../rpc-guide/rpc
