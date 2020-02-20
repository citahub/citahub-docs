---
id: version-1.0.0-install
title: 部署指南
original_id: install
---

CITA 是一个开源的区块链内核，任何人都可以基于 CITA 来搭建属于自己的一条区块链，在本文档中将为你详解 CITA 的各种部署方案，用户可根据自身业务需要选择合适的部署方案。

> * 如果你想一键搭建属于你自己的链，你可以选择租用 CITA 的云服务。只需根据您的需求，在云服务平台选择适合自己的方案直接租用，帮你省去准备服务器以及部署 CITA 的一系列操作。具体请参考下文中的云部署手册。
> * 如果你想在 CITA 上直接开发应用，我们建议你使用已经搭好的 [CITA 测试链](../toolchain/testnet/testchain)。

## 环境要求

* 操作系统: 参见 [适用操作系统声明](../cita/getting-started/setup#适用操作系统声明)
* 软件依赖: 参见 [软件依赖声明](../cita/getting-started/setup#软件依赖声明)
* 客户端工具: 参见 [安装 CITA 客户端工具](../cita/getting-started/setup#安装-cita-客户端工具)

## 部署 CITA

<!--DOCUSAURUS_CODE_TABS-->

<!--发布件部署-->

### CITA 发布件部署

参见 [下载 CITA 发布件](../cita/getting-started/setup#下载-cita)

<!--源码部署-->

### CITA 源码编译部署

1. 下载 CITA 源码
    
    从 Github 仓库下载 CITA 的源代码，然后切换到 CITA 的源代码目录

   ```shell
   $ git clone https://github.com/cryptape/cita.git
   $ cd cita
   $ git submodule init
   $ git submodule update
   ```

2. 编译源码
    
    可以按照自己的需求自行选择相应的编译方式（Debug-调试模式 或 Release-发行模式）

   ```shell
   $ ./env.sh make debug
   ```

或者

   ```shell
   $ ./env.sh make release
   ```

3. 进入 CITA 运行目录

   ```shell
   $ cd target/install
   ```

> 可选择替换 Rust Crates 的官方源，详细教程可以参考：
> 
> - [USTC Mirror Help for Rust Crates]((http://mirrors.ustc.edu.cn/help/crates.io-index.html))
> - [Source Replacement for Rust Crates]((https://doc.rust-lang.org/cargo/reference/source-replacement.html))
> - [How to map a configuration file into docker]((https://docs.docker.com/storage/volumes/))
> 
> **Docker env 使用说明**
> 
> * 在源码根目录下，我们提供了 `env.sh` 脚本，封装了 Docker 相关的操作。 运行此脚本，以实际要运行的命令作为参数，即表示在 Docker 环境中运行相关命令。 例如下面的命令即表示在 Docker 环境中运行 `make debug`。
>     
>     ```shell
>     $ ./env.sh make debug
>     ```
> 
> * 不带任何参数运行 `./env.sh`，将直接获取一个 Docker 环境的 shell。
> * 如果 Docker 容器是被 root 用户创建的，后续非 root 用户使用 `./env.sh` 会出现如下错误，因此要保证操作使用的始终是同一个系统用户。
>     
>     ```shell
>     $ ./env.sh
>     error: failed switching to "user": unable to find user user: no matching entries in passwd file
>     ```
> 
> * 如果出现 Docker 相关的报错，可以执行如下命令并重试：
>     
>     ```shell
>     docker kill $(docker ps -a -q)
>     ```

<!--分布式部署-->

### CITA 分布式部署

案例：4 台服务器 IP 地址为 192.168.100~103

1. 使用真实 IP 初始化链

   ```shell
   $ bin/cita create —super_admin "0x141d051b1b1922bf686f5df8aad45cefbcb0b696" —nodes "192.168.1.100:4000,192.168.1.101:4000,192.168.1.102:4000,192.168.1.103:4000"
   ```

2. 在 4 台服务器上创建目录

   ```shell
   $ mkdir -p /data/cita/
   ```

3. 将生成的节点拷贝到所有主机 

   ```shell
   $ scp -r cita_secp256k1_sha3 192.168.1.100:/data/cita/
   $ scp -r cita_secp256k1_sha3 192.168.1.101:/data/cita/
   $ scp -r cita_secp256k1_sha3 192.168.1.102:/data/cita/
   $ scp -r cita_secp256k1_sha3 192.168.1.103:/data/cita/
   ```

4. 启动节点，需要登录到各节点服务器启动对应节点
    
    节点对应关系：

* node0-192.168.1.100
* node1-192.168.1.101
* node3-192.168.1.103
* node2-192.168.1.102
    
    启动节点 0
    
    ```shell
    $ ssh root@192.168.1.100
    $ cd /data/cita/
    $ ./bin/cita setup test-chain/0
    $ ./bin/cita start test-chain/0
    ```
    
    启动节点 1
    
    ```shell
    $ ssh root@192.168.1.101
    $ cd /data/cita/
    $ ./bin/cita setup test-chain/1
    $ ./bin/cita start test-chain/1
    ```
    
    启动节点 2
    
    ```shell
    $ ssh root@192.168.1.102
    $ cd /data/cita/
    $ ./bin/cita setup test-chain/2
    $ ./bin/cita start test-chain/2
    ```
    
    启动节点 3
    
    ```shell
    $ ssh root@192.168.1.103
    $ cd /data/cita/
    $ ./bin/cita setup test-chain/3
    $ ./bin/cita start test-chain/3
    ```

5. 验证操作与单机部署相同，区别在与返回的结果只会显示当前节点进程数信息

   ```
   7
   cita      6180 32335  0 10:54 ?        00:00:00 cita-forever
   cita      6188  6180  0 10:54 ?        00:00:00 cita-auth -c auth.toml
   cita      6191  6180  0 10:54 ?        00:00:00 cita-network -c network.toml
   cita      6193  6180  0 10:54 ?        00:00:00 cita-jsonrpc -c jsonrpc.toml
   cita      6194  6180  0 10:54 ?        00:00:00 cita-executor -c executor.toml
   cita      6195  6180  0 10:54 ?        00:00:00 cita-chain -c chain.toml
   cita      6202  6180  0 10:54 ?        00:00:00 cita-bft -c consensus.toml -p privkey
   ```

<!--Docker Compose-->

### Docker Compose 部署

将所有节点放在同一个容器中，并且没有对容器没有做网络隔离的情况下，对于复杂的应用场景，会造成一些不便。为了解决这样的问题，我们提供了 `docker-compose`的方式让每个节点单独一个容器，网络也是隔离的。

#### 安装 Docker-compose

```shell
$ sudo curl -L "https://github.com/docker/compose/releases/download/1.23.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
$ sudo chmod +x /usr/local/bin/docker-compose
$ docker-compose --version
```

#### 准备发布件

```shell
$ latest_release_tag=$(curl --silent "https://api.github.com/repos/cryptape/cita/releases/latest" | grep '"tag_name":' | sed -E 's/.*"([^"]+)".*/\1/')
echo "latest release tag: $latest_release_tag"

$ wget https://github.com/cryptape/cita/releases/download/$latest_release_tag/cita_secp256k1_sha3.tar.gz
$ tar zxvf cita_secp256k1_sha3.tar.gz
$ cp -r cita_secp256k1_sha3 cita_secp256k1_sha3_node0
$ cp -r cita_secp256k1_sha3 cita_secp256k1_sha3_node1
$ cp -r cita_secp256k1_sha3 cita_secp256k1_sha3_node2
$ cp -r cita_secp256k1_sha3 cita_secp256k1_sha3_node3

$ wget https://raw.githubusercontent.com/cryptape/cita/$latest_release_tag/tests/integrate_test/docker-compose.yaml
```

#### 启动

```shell
$ USER_ID=`id -u $USER` docker-compose up
```

#### 后台启动

```shell
$ USER_ID=`id -u $USER` docker-compose up -d
```

##### 停止

```shell
$ docker-compose down
```

##### 进入容器内执行命令

```shell
$ docker-compose exec node0 /usr/bin/gosu user /bin/bash
```

##### 日志

容器默认输出的是 `chain` 微服务的日志

```shell
$ docker-compose logs -f
```

也可以直接到挂载目录下查看所有微服务的日志

```shell
$ tail -100f cita_secp256k1_sha3_node0/test-chain/0/logs/cita-jsonrpc.log
```

#### 验证

* 查询节点个数
    
    Request:
    
    ```shell
    $ curl -X POST --data '{"jsonrpc":"2.0","method":"peerCount","params":[],"id":74}' 127.0.0.1:1337|jq
    ```
    
    Result:
    
    ```json
    {
      "jsonrpc": "2.0",
      "id": 74,
      "result": "0x3"
    }
    ```

* 查询当前块高度。
    
    Request:
    
    ```shell
    $ curl -X POST --data '{"jsonrpc":"2.0","method":"blockNumber","params":[],"id":83}' 127.0.0.1:1337| jq
    ```
    
    Result:
    
    ```json
    {
    "jsonrpc": "2.0",
    "id": 83,
    "result": "0x8"
    }
    ```
    
    返回块高度，表示节点已经开始正常出块。

更多 API（如合约调用、交易查询）请参见 [RPC 调用](../cita/rpc-guide/rpc)。

<!--END_DOCUSAURUS_CODE_TABS-->

* * *

## 配置 CITA

参见 [配置 CITA](../cita/getting-started/run-cita#配置-cita)

## 启动 CITA

参见 [启动 CITA](../cita/getting-started/run-cita#启动-cita)

## 验证 CITA 是否运行正常

参见 [验证 CITA 是否运行正常](../cita/getting-started/run-cita#验证-cita-是否运行正常)