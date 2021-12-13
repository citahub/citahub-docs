---
id: service-config
title: 微服务配置
---

在生成配置时各个微服务中一些参数可能会采用默认值，这些参数在配置生成后也可以在各节点的`config.toml`文件中手动修改，以下是以各微服务为划分，关于这些参数的说明。

## network_p2p

```
[network_p2p]
grpc_port = 50000
port = 40000

[[network_p2p.peers]]
address = '/dns4/127.0.0.1/tcp/40001'

[[network_p2p.peers]]
address = '/dns4/127.0.0.1/tcp/40002'

[[network_p2p.peers]]
address = '/dns4/127.0.0.1/tcp/40003'
```

说明：

1. `[network_p2p]`中是本节点的网络配置信息，`grpc_port`是本节点网络微服务和其他微服务通信的grpc端口，`port`是本节点供区块链网络中其他节点连接的端口。
2. `[network_p2p.peers]`中是本节点连接的其他网络节点的信息，以multiaddr标准记录，`/dns4`后是host信息，`/tcp`后是port信息。

## network_tls

```
[network_tls]
grpc_port = 50000
listen_port = 40000
reconnect_timeout = 5

[[network_tls.peers]]
domain = 'test-chain-1'
host = '127.0.0.1'
port = 40001

[[network_tls.peers]]
domain = 'test-chain-2'
host = '127.0.0.1'
port = 40002

[[network_tls.peers]]
domain = 'test-chain-3'
host = '127.0.0.1'
port = 40003
```

说明：

1. `[network_tls]`中是本节点的网络配置信息，`grpc_port`是本节点网络微服务和其他微服务通信的grpc端口，`listen_port`是本节点供区块链网络中其他节点连接的端口，`reconnect_timeout`是超时重连时间。
2. `[network_tls.peers]`中是本节点连接的其他网络节点的信息，其中`domain`为任意字符串，只需要确保节点之间不重复即可。。

## consensus_raft

```
[consensus_raft]
controller_port = 50004
grpc_listen_port = 50001
network_port = 50000
node_addr = 'c7e1fe8c89790ef0f4c0548e759c849806475a48'
```

说明：

`grpc_listen_port`是本节点共识微服务和其他微服务通信的grpc端口，`controller_port`是共识微服务的`gRPC`端口，`network_port`是网络微服务的`gRPC`端口，`node_addr`是本节点的地址。

## consensus_bft

```
[consensus_bft]
consensus_port = 50001
controller_port = 50004
kms_port = 50005
network_port = 50000
node_address = '0x30bc783ff00ec6fb347a5b1c7b2480ae65dd007a'
```

说明：

`consensus_port`是本节点共识微服务和其他微服务通信的grpc端口，`controller_port`是共识微服务的`gRPC`端口，`kms_port`是`kms`微服务的`gRPC`端口，`network_port`是网络微服务的`gRPC`端口，`node_addr`是本节点的的地址。

## executor_evm

```
[executor_evm]
executor_port = 50002
```

说明：

`executor_port`是执行器微服务的`gRPC`端口。

## storage_rocksdb

```
[storage_rocksdb]
kms_port = 50005
storage_port = 50003
```

说明：

`kms_port`是`kms`微服务的`gRPC`端口，`storage_port`是存储微服务的`gRPC`端口。

## controller

```
[controller]
consensus_port = 50001
controller_port = 50004
executor_port = 50002
key_id = 1
kms_port = 50005
network_port = 50000
node_address = 'c7e1fe8c89790ef0f4c0548e759c849806475a48'
package_limit = 30000
storage_port = 50003
```

说明：

`consensus_port` 是共识微服务的`gRPC`端口，`controller_port` 是控制器微服务的`gRPC`端口，`executor_port` 是执行器微服务的`gRPC`端口，`kms_port` 是`kms`微服务的`gRPC`端口，`network_port` 是网络微服务的`gRPC`端口，`storage_port` 是存储微服务的`gRPC`端口。

## kms

```
db_key = '123456'
kms_port = 50005
```

说明：

`kms_sm`和`kms_eth`相同，`db_key`是密钥库的密码，`kms_port` 是`kms`微服务的`gRPC`端口。
