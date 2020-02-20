---
id: exception-handle
title: 异常排查
---

1. 不出块排查

* 查看进程是否存活，确保单节点有 7 个进程

```shell
bin/cita top test-chain/0
```

其中 `test-chain/0` 为节点名称。

返回结果：

```shell
7
cita 6180 32335 0 10:54 ? 00:00:00 cita-forever
cita 6188 6180 0 10:54 ? 00:00:00 cita-auth -c auth.toml
cita 6191 6180 0 10:54 ? 00:00:00 cita-network -c network.toml
cita 6193 6180 0 10:54 ? 00:00:00 cita-jsonrpc -c jsonrpc.toml
cita 6194 6180 0 10:54 ? 00:00:00 cita-executor -c executor.toml
cita 6195 6180 0 10:54 ? 00:00:00 cita-chain -c chain.toml
cita 6202 6180 0 10:54 ? 00:00:00 cita-bft -c consensus.toml -p privkey
```

* 查看日志是否有异常输出 （逐个应用排查）

```shell
bin/cita logs test-chain/0 bft
```

其中 `bft` 为服务名称。

* 使用 [peersInfo](../rpc-guide/rpc#peersinfo) 接口查看节点间是否互通

```shell
<br />$ curl -X POST --data '{"jsonrpc":"2.0","method":"peersInfo","params":[],"id":83}' 127.0.0.1:1337 | jq
```

2. 开启详细日志输出（参见[日志管理](./log)）：

```shell
$ ./bin/cita restart test-chain/0 trace
```

3. 使用[运维工具](https://github.com/citahub/cita-op-helper)收集 CITA 运行异常时的错误信息，方便技术人员排查问题