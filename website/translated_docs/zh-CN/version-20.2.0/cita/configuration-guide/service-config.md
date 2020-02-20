---
id: version-20.2.0-service-config
title: 微服务配置
original_id: service-config
---

CITA 最大的特色就是将区块链节点的必要功能解耦为六个微服务：RPC，Auth，Consensus，Chain，Executor，Network， 它们分工合作，共同完成去中心化的任务。先了解一下都有哪些配置文件， toml 配置文件的位置在 `test-chain/*/` ( `test-chain` 是默认链名称)。

```bash
$ bin/cita create --super_admin "0x4b5ae4567ad5d9fb92bc9afd6a657e6fa13a2523" --nodes "127.0.0.1:4000,127.0.0.1:4001,127.0.0.1:4002,127.0.0.1:4003"
$ ls test—chain/
  0  1  2  3  template
$ ls 0
   address auth.toml executor.toml jsonrpc.toml chain.toml forever.toml logs
  consensus.toml network.toml genesis.json privkey
```

了解一下各个关键微服务的配置吧！

## 授权合约接口

### 启动参数

* '-c, --config=[FILE]' : 自定义配置文件
* '-s, --stdout' : 日志输出到控制台

auth.toml 是 Auth 微服务的配置文件，如下：

```toml
count_per_batch = 30
buffer_duration = 30
tx_verify_thread_num = 4
tx_verify_cache_size = 100000
tx_pool_limit = 0
wal_enable = false
prof_start = 0
prof_duration = 0
```

* `count_per_batch` : 表示批量处理阈值
* `buffer_duration` : 表示超时时间(当达到批量数量或是超时时间到了，就开始交易处理流程)
* `tx_verify_thread_num` : 交易验证线程数
* `tx_verify_cache_size` : 交易验证缓存结果大小，缓存交易验证结果，减少重复计算
* `tx_pool_limit` : 交易池数量上限，默认是0，表示无上限
* `wal_enable` : 交易持久化开关，开启后，交易池交易进行持久化，节点重启后池内交易不丢失
* `prof_start` : 性能采样分析参数，表示进行启动多久之后进行性能采样，单位是秒。
* `prof_duration` : 性能采样分析参数，表示采样持续时间，单位是秒，为 0，表示不采样。

## 共识

### 启动参数

* '-c, --config=[FILE]' : 自定义配置文件
* '-p, --private=[FILE]' : 设置私钥文件
* '--prof-start=[0]' : 指定分析的开始时间，0表示没有
* '--prof-duration=[0]' : 指定分析的持续时间，0表示没有
* '-s, --stdout' : 日志输出到控制台


consensus.toml 是 Consensus 微服务的配置文件，如下：

```toml
[ntp_config]
enabled = true
threshold = 1000
address = "0.pool.ntp.org:123"
```

* `enabled` : 为 true 表示开启 ntp
* `threshold` : 表示时间偏移的阈值
* `address` : 表示 ntp 服务器的地址

## Chain

### 启动参数

* '-c, --config=[FILE]' : 自定义配置文件
* '-s, --stdout' : 日志输出到控制台

chain.toml 是 Chain 微服务的配置文件，如下：

```toml
prooftype = 2
```

* `prooftype` : 表示当前的共识算法，目前只支持 CITA-BFT 算法。

## Executor

### 启动参数

* '-c, --config=[FILE]' : 自定义配置文件
* '-s, --stdout' : 日志输出到控制台

executor.toml 是 Executor 微服务的配置文件，如下：

```toml
journaldb_type = "archive"
prooftype = 2
genesis_path = "./genesis.json"
statedb_cache_size = 5242880
eth_compatibility = false
```

* `journaldb_type` : 表示当前使用的 JournalDB 算法，有 "archive" "light" "fast" "basic" 等4种类型，默认是 archive。
* `prooftype` : 表示当前使用的共识算法，目前只支持 CITA-BFT 算法。
* `genesis_path` : 创世块文件路径
* `statedb_cache_size`: 表示 StateDB 中 global cache 的大小，用于缓存账户和 code， 默认是 5242880，即 5M。
* `eth_compatibility` : 是否与以太坊兼容的开关(CITA默认与以太坊在块的时间戳精度上不兼容，CITA为毫秒，以太坊为秒)。

## RPC

### 启动参数

* '-c, --config=[FILE]' : 自定义配置文件
* '-s, --stdout' : 日志输出到控制台

jsonrpc.toml 是 RPC 微服务的配置文件， CITA 支持 JsonRpc 和 Websocket 两种通信协议，该文件主要是协议配置相关。如下:

```toml
backlog_capacity = 1000

[profile_config]
flag_prof_start = 0
enable = false
flag_prof_duration = 0

[http_config]
allow_origin = "*"
timeout = 3
enable = true
listen_port = "1337"
listen_ip = "0.0.0.0"

[ws_config]
panic_on_internal = true
fragments_grow = true
panic_on_protocol = false
enable = true
in_buffer_capacity = 2048
panic_on_queue = false
fragment_size = 65535
panic_on_timeout = false
method_strict = false
thread_number = 2
panic_on_capacity = false
masking_strict = false
key_strict = false
max_connections = 800
listen_ip = "0.0.0.0"
listen_port = "4337"
queue_size = 200
fragments_capacity = 100
tcp_nodelay = false
shutdown_on_interrupt = true
out_buffer_grow = true
panic_on_io = false
panic_on_new_connection = false
out_buffer_capacity = 2048
encrypt_server = false
in_buffer_grow = true
panic_on_shutdown = false
panic_on_encoding = false

[new_tx_flow_config]
buffer_duration = 30000000
count_per_batch = 30
```

* `backlog_capacity`: 连接容量大小
* `profile_config`: 性能采样分析
    - `flag_prof_start`: 进程启动多久后开始性能采样
    - `enable`: 开关
    - `flag_prof_duration`: 性能采样分析持续时间
* `http_config`:
    - `allow_origin`:响应头。`*`表示可以被任意外域访问
    - `timeout`: 超时时间
    - `enable`: 默认开启
    - `listen_port`: 监听端口
    - `listen_ip`: 监听 IP 地址
* `ws_config`:
    - `panic_on_internal`: 出现内部错误的时候，是否退出，默认 true
    - `fragments_grow`: 当 fragments_capacity 达到时，是否重新分配，默认为 true
    - `panic_on_protocol`: 出现协议错误时，是否退出，默认 false
    - `enable`: 默认开启
    - `in_buffer_capacity`: 不动态增加情况下，输入缓存大小， 默认 2048
    - `panic_on_queue`: 出现队列错误时，是否退出，默认 false
    - `fragment_size`: 最长帧片段，超过后截取成片段，默认 65535
    - `panic_on_timeout`: 出现超时时，是否退出，默认 false
    - `method_strict`:  是否检查握手请求，默认 false
    - `thread_number`: 线程数，默认 2
    - `panic_on_capacity`: 达到容量时，是否退出，默认 false
    - `masking_strict`: 帧安全检查， 默认 false
    - `key_strict`:  客户端是否检查服务端返回的 key 值，默认 false
    - `max_connections`: websocket 最大链接数，默认是 800
    - `listen_ip`: 监听地址， 默认 0.0.0.0
    - `listen_port`: 监听端口， 默认 4337
    - `queue_size`: 单个链接的事件队列大小，默认 200
    - `fragments_capacity`: 不动态增加情况下，连接能处理的最大片段数， 默认 100
    - `tcp_nodelay`: tcp socket 会积攒报文包到一定数量，一块发送，默认 false
    - `shutdown_on_interrupt`: 当中断出现时，是否关闭事件监听，默认 true
    - `out_buffer_grow`: 当输出缓冲达到 out_buffer_capacity 是否重新动态增加，默认 true
    - `panic_on_io`: 出现 IO 错误时，是否退出，默认 false
    - `panic_on_new_connection`: TCP 连接失败后，是否退出，默认 false
    - `out_buffer_capacity`: 不动态增加情况下，输出缓存大小， 默认 2048
    - `encrypt_server`: 服务端是否采用 SSL 加密接受链接，默认 false
    - `in_buffer_grow`: 当输入缓冲达到 in_buffer_capacity， 是否重新动态增加，默认 true
    - `panic_on_shutdown`: 收到关闭 WebSocket 请求时，是否退出， 默认 false
    - `panic_on_encoding`: 编码问题出现时，是否退出，默认 false
* `new_tx_flow_config`:
    - `buffer_duration`: 超时时间
    - `count_per_batch`: 批量处理阈值

## Network

### 启动参数

* '-c, --config=[FILE]' : 自定义配置文件
* '-a, --address=[FILE]' : 配置地址文件
* '-s, --stdout' : 日志输出到控制台

network.toml 是 Network 微服务的配置文件。

```toml
# Current node ip is 127.0.0.1
enable_tls = true
max_connects = 100
enable_discovery = true
port = 4000

[[peers]]
ip = "127.0.0.1"
port = 4001

[[peers]]
ip = "127.0.0.1"
port = 4002

[[peers]]
ip = "127.0.0.1"
port = 4003
```

* `enable_tls` : 使能通信加密开关。如果不设置，该配置项默认为 `false`；当配置为 `true` 时，表示打开通信加密，当前 CITA 仅支持 `secp256k1` 的加密方式。
* `max_connects` : 配置本节点的最大连接数。本节点到达最大连接数时，将拒绝连接其它节点。如果不设置，该配置项默认为 `666`。
* `enable_discovery` : 使能节点自动发现开关，如果不设置，该配置项默认为 `true`，即开启节点自动发现功能。
* `peers` : 配置对端节点信息。在网络服务启动时会首先连接 `peers` 中的节点。
    - 当 `enable_discovery = true` 时， 本节点会自动通过所配置的 `peers` 发现网络中的其它节点并尝试连接。
    - 当 `enable_discovery = false` 时，本节点仅连接 `peers` 中所配置的节点。在该配置下，`peers` 配置项支持热更新，修改 `peers` 配置项后不需要重启本节点。

## Forever

### 启动参数

* '-c, --config=[FILE]' : 自定义配置文件
* '-s, --stdout' : 日志输出到控制台

### 子命令

* 'start' : 后台启动所有进程
* 'stop' : 停止所有进程
* 'logrotate' : 转移日志

forever.toml 是守护进程的配置文件，每个进程对应一个微服务，`respawn` 表示唤醒次数。

```toml
name="cita-forever"
command = "cita-forever"
pidfile = ".cita-forever.pid"

[[process]]
name = "cita-auth"
command = "cita-auth"
args = ["-c","auth.toml"]
pidfile = ".cita-auth.pid"
respawn = 3

[[process]]
name = "cita-network"
command = "cita-network"
args = ["-c","network.toml"]
pidfile = ".cita-network.pid"
respawn = 3

[[process]]
name = "cita-bft"
command = "cita-bft"
args = ["-c","consensus.toml","-p","privkey"]
pidfile = ".cita-bft.pid"
respawn = 3

[[process]]
name = "cita-jsonrpc"
command = "cita-jsonrpc"
args = ["-c","jsonrpc.toml"]
pidfile = ".cita-jsonrpc.pid"
respawn = 3


[[process]]
name = "cita-chain"
command = "cita-chain"
args = ["-c","chain.toml"]
pidfile = ".cita-chain.pid"
respawn = 3

[[process]]
name = "cita-executor"
command = "cita-executor"
args = ["-c","executor.toml"]
pidfile = ".cita-executor.pid"
respawn = 3
```

### 提示

日志默认输出到文件中，为达到输出到控制台的目的，可以在 forever.toml 中修改进程的启动参数。例如修改 Chain 进程输出到控制台：

```toml
[[process]]
name = "cita-chain"
command = "cita-chain"
args = ["-c","chain.toml", "-s"]
pidfile = ".cita-chain.pid"
respawn = 3
```
