---
id: version-0.24.0-rpc-error-code
title: JSON RPC Error Code
original_id: rpc-error-code
---

## JSON RPC标准错误码

| 错误码    | 错误消息     | 描述             |
| ------ |:-------- |:-------------- |
| -32700 | 解析错误     | 非 JSON 格式数据    |
| -32600 | 请求错误     | 含有错误的请求值       |
| -32601 | 请求服务方法错误 | 调用方法不存在或错误     |
| -32602 | 非法参数     | 调用方法参数错误       |
| -32603 | 内部错误     | 内部错误(NotReady) |
| -32003 | 查询类错误    | 见示例            |
| -32006 | 交易认证类错误  | 见示例            |
| -32099 | 请求超时     | 见示例            |

## 错误示例

### 交易认证类错误

* 交易 `valid_until_block` 过时

```json
{
    "jsonrpc": "2.0",
    "id": 1,
    "error": {
        "code": -32006,
        "message": "InvalidUntilBlock"
    }
}
```

* 重复交易

```json
{
    "jsonrpc": "2.0",
    "id": 1,
    "error": {
        "code": -32006,
        "message": "Dup"
    }
}
```

* 非法 nonce

```json
{
    "jsonrpc": "2.0",
    "id": 1,
    "error": {
        "code": -32006,
        "message": "InvalidNonce"
    }
}
```

* 处理交易繁忙

```json
{
    "jsonrpc": "2.0",
    "id": 1,
    "error": {
        "code": -32006,
        "message": "Busy"
    }
}
```

* 签名错误

```json
{
    "jsonrpc": "2.0",
    "id": 1,
    "error": {
        "code": -32006,
        "message": "BadSig"
    }
}
```

* 内部错误

```json
{
    "jsonrpc": "2.0",
    "id": 1,
    "error": {
        "code": -32603,
        "message": "NotReady"
    }
}
```

### 请求超时

```json
{
    "jsonrpc": "2.0",
    "id": 1,
    "error": {
        "code": -32099,
        "message": "System time out, please resend"
    }
}
```

### 请求错误

发送 `POST` 请求，而不是 `GET` ：

```shell
curl -X GET -d '{"jsonrpc":"2.0","method":"blockNumber","params":[],"id":"1"}' 127.0.0.1:1337 | jq
```

结果如下：

```json
{
    "jsonrpc": "2.0",
    "id": "1",
    "error": {
        "code": -32600,
        "message": "Invalid request"
    }
}
```

### 调用方法错误

应使用 `peerCount` 方法，而不是 `perCount`：

```shell
curl -X POST --data '{"jsonrpc":"2.0","method":"perCount","params":[],"id":74}' 127.0.0.1:1337 | jq
```

结果如下：

```json
{
    "jsonrpc": "2.0",
    "id": "74",
    "error": {
        "code": -32601,
        "message": "Method not found"
    }
}
```

### 非法参数

参数个数不正确：

```shell
curl -X POST -d '{"jsonrpc":"2.0","method":"getTransaction","params":["0x0063187e6a84ae731cf9",true],"id":2}' 127.0.0.1:1337 | jq
```

结果如下：

```json
{
    "jsonrpc": "2.0",
    "id": 2,
    "error": {
        "code": -32602,
        "message": "Invalid JSON-RPC params length"
    }
}
```

### 其他错误信息

交易个数为 0 或者地址不正确：

```shell
curl -X POST --data '{"jsonrpc":"2.0","method":"getTransactionCount","params":["0x5b073e9233944b5e729e46d618f0d8edf3d9c342","0x2"],"id":1}' 127.0.0.1:1337 | jq
```

```json
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": "0x0"
}
```

地址没有部署合约：

```shell
curl -X POST --data '{"jsonrpc":"2.0","method":"getCode","params":["0xea4f6bc98b456ef085da5c424db710489848cab9","0x35"],"id":1}' 127.0.0.1:1337 | jq
```

```json
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": null
}
```

高度未达到：

```shell
curl -X POST -d '{"jsonrpc":"2.0","method":"getBlockByNumber","params":["0x99999",true],"id":2}' 127.0.0.1:1337 | jq
```

结果如下：

```json
{
    "jsonrpc": "2.0",
    "id": 2,
    "result": null
}
```

参考文档:

1. [JSON RPC specification](http://www.jsonrpc.org/specification)
2. [Ethereum wiki/JSON RPC Error Codes Improvement Proposal](https://github.com/ethereum/wiki/wiki/JSON-RPC-Error-Codes-Improvement-Proposal)