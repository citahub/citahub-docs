---
id: version-0.24.0-getting-started
title: 快速入门
original_id: getting-started
---

CITA 是一个开源的区块链内核，任何人都可以基于 CITA 来搭建属于自己的一条区块链，在本文档中我们将带你搭建一条简单的链并运行其中的节点。

> * 如果你想一键搭建属于你自己的链，你可以选择租用 CITA 的云服务。只需根据您的需求，在云服务平台选择适合自己的方案直接租用，帮你省去准备服务器以及部署 CITA 的一系列操作。具体请参考[云服务支持](./huawei)。
> * 如果你想在 CITA 上直接开发您的应用，我们建议你使用我们已经搭好的 [CITA 测试链](../toolchain/testnet/testchain)。

## 适用操作系统声明

系统支持以及版本建议：Centos（7.2+）、Ubuntu（16.04、18.04）、Redhat (7.4)

如果你使用的是 macOS, 可以直接参考 [这里](https://github.com/cryptape/homebrew-cita) 来安装试用 CITA。

## 硬件配置建议

配置取决于自身业务，请根据实际情况搭配，以下是建议最低配置：

体验配置：CPU：2核心、内存：4GB、硬盘：30G

生产配置：CPU：4核心、内存：8GB、硬盘：200G

## 软件依赖声明

* 依赖 Docker，安装 Docker 参见 [在线资料](https://yeasy.gitbooks.io/docker_practice/content/install/)。
* CITA 的 Docker 镜像托管在 [DockerHub](https://hub.docker.com/r/cita/cita-build/) 。 因为 CITA 是基于 Ubuntu 18.04 稳定版开发的，因此该镜像中封装了 Ubuntu 18.04 还有其他一些 CITA 运行所需要的配置和文件。

## 安装 CITA 客户端工具

1. 创建目录

   ```shell
   $ mkdir -p /data/cita
   ```

2. 切换目录

   ```shell
   $ cd /data/cita/
   ```

3. 下载 CITA-CLI 安装包

   ```shell
   $ wget https://github.com/cryptape/cita-cli/releases/download/0.19.6/cita-cli-x86_64-musl-tls-0.19.6.tar.gz
   ```

4. 解压程序

   ```shell
   $ tar zxvf cita-cli-x86_64-musl-tls-0.19.6.tar.gz
   ```

5. 复制 CITA-CLI 到 系统可执行文件目录下

   ```shell
   $ cp -rp cita-cli /bin/
   ```

6. 创建管理员账户地址、私钥、公钥

   ```shell
   $ cita-cli key create
   ```

返回以下内容，

   ```json
   {
     "address": "0x141d051b1b1922bf686f5df8aad45cefbcb0b696",
     "private": "0xa2c4ce22f3ee18d4ca6e560d4a5a6b54823773348b95cd95afb3ee2843ff7768",
     "public": "0x37aa832ae77a580c2c305dfee234af424a90274b236b8925d7c452e1834f3fa34cd87178c2116d34dc816d0b06c869b01409a328d7a28fcfcfca994f6095d166"
   }
   ```

> 注：此处为示例公私钥对，不要在生产环境复制使用。"address": "0x141d051b1b1922bf686f5df8aad45cefbcb0b696" 为超级管理员帐号地址，下面的节点管理操作中会频繁使用。

## 下载 CITA

1. 切换目录

   ```shell
   $ cd /data/cita/
   ```

2. 下载 CITA 安装包

   ```shell
   $ wget https://github.com/cryptape/cita/releases/download/v0.24.0/cita_secp256k1_sha3.tar.gz
   ```

3. 解压 CITA 程序

   ```shell
   $ tar zxvf cita_secp256k1_sha3.tar.gz
   ```

4. 进入 CITA 目录

   ```shell
   $ cd cita_secp256k1_sha3
   ```

## 配置 CITA

初始化链 （super_admin 地址是超级管理员账号即 CITA-CLI 生成，--nodes 是要部署的节点地址（IP:PORT），RPC 端口从 1337 开始 递增；4个节点（1337、1338、1339、1340））

```shell
$ bin/cita create --super_admin "0x141d051b1b1922bf686f5df8aad45cefbcb0b696" --nodes "127.0.0.1:4000,127.0.0.1:4001,127.0.0.1:4002,127.0.0.1:4003"
```

> * 注1：以上是简单的配置，系统会默认一些参数，更多自定义参数请见 [链级配置](./operation/chain-config)
> * 注2：以上操作是在一台服务器上部署 4 个 CITA 节点，如要将节点部署到多台服务器，初始化链时 --nodes 需要填写服务器真实 IP。

## 启动 CITA

1. 启动节点 0

   ```shell
   $ ./bin/cita setup test-chain/0
   $ ./bin/cita start test-chain/0
   ```

2. 启动节点 1

   ```shell
   $ ./bin/cita setup test-chain/1
   $ ./bin/cita start test-chain/1
   ```

3. 启动节点 2

   ```shell
   $ ./bin/cita setup test-chain/2
   $ ./bin/cita start test-chain/2
   ```

4. 启动节点 3

   ```shell
   $ ./bin/cita setup test-chain/3
   $ ./bin/cita start test-chain/3
   ```

## 验证 CITA 是否运行正常

1. 查看进程是否启动成功

   ```shell
   $ ps -ef | grep cita- |grep -v grep |wc -l && ps -ef | grep cita- |grep -v grep
   ```

返回结果可以看到启动了 28 个进程（每个节点有 7 个服务 * 4 个节点）

   ```
   28
   cita      6180 32335  0 10:54 ?        00:00:00 cita-forever
   cita      6188  6180  0 10:54 ?        00:00:00 cita-auth -c auth.toml
   cita      6191  6180  0 10:54 ?        00:00:00 cita-network -c network.toml
   cita      6193  6180  0 10:54 ?        00:00:00 cita-jsonrpc -c jsonrpc.toml
   cita      6194  6180  0 10:54 ?        00:00:00 cita-executor -c executor.toml
   cita      6195  6180  0 10:54 ?        00:00:00 cita-chain -c chain.toml
   cita      6202  6180  0 10:54 ?        00:00:00 cita-bft -c consensus.toml -p privkey
   cita      6394 32335  0 10:54 ?        00:00:00 cita-forever
   cita      6402  6394  0 10:54 ?        00:00:00 cita-chain -c chain.toml
   cita      6405  6394  0 10:54 ?        00:00:00 cita-executor -c executor.toml
   cita      6407  6394  0 10:54 ?        00:00:00 cita-network -c network.toml
   cita      6408  6394  0 10:54 ?        00:00:00 cita-bft -c consensus.toml -p privkey
   cita      6409  6394  0 10:54 ?        00:00:00 cita-auth -c auth.toml
   cita      6413  6394  0 10:54 ?        00:00:00 cita-jsonrpc -c jsonrpc.toml
   cita      6613 32335  0 10:54 ?        00:00:00 cita-forever
   cita      6622  6613  0 10:54 ?        00:00:00 cita-bft -c consensus.toml -p privkey
   cita      6625  6613  0 10:54 ?        00:00:00 cita-executor -c executor.toml
   cita      6626  6613  0 10:54 ?        00:00:00 cita-jsonrpc -c jsonrpc.toml
   cita      6627  6613  0 10:54 ?        00:00:00 cita-chain -c chain.toml
   cita      6628  6613  0 10:54 ?        00:00:00 cita-network -c network.toml
   cita      6635  6613  0 10:54 ?        00:00:00 cita-auth -c auth.toml
   cita      6831 32335  0 10:54 ?        00:00:00 cita-forever
   cita      6839  6831  0 10:54 ?        00:00:00 cita-executor -c executor.toml
   cita      6841  6831  0 10:54 ?        00:00:00 cita-jsonrpc -c jsonrpc.toml
   cita      6843  6831  0 10:54 ?        00:00:00 cita-bft -c consensus.toml -p privkey
   cita      6845  6831  0 10:54 ?        00:00:00 cita-chain -c chain.toml
   cita      6846  6831  0 10:54 ?        00:00:00 cita-network -c network.toml
   cita      6857  6831  0 10:54 ?        00:00:00 cita-auth -c auth.toml
   ```

2. 调用 RPC 接口查看高度是否持续增长，默认 3s 出一个块，重复执行查询命令，观察返回值 result 是否发生变化

   ```shell
   $ curl -X POST --data '{"jsonrpc":"2.0","method":"blockNumber","params":[],"id":83}' 127.0.0.1:1337
   ```

返回结果：

   ```json
   {"jsonrpc":"2.0","id":83,"result":"0x7d"}
   ```

其中 `0x7d` 表示返回块高度，具体数据以所查询的链实际块高为准。 只要能连续查询到块高度，并且块高度在增长，则表示节点已经开始正常出块

更多信息请查看[验证](#验证)。

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

> **Notice**
> 
> * 请不要先进到 bin 目录，再执行以上的部署操作，错误示范：
>     
>     ```shell
>     $ cd bin
>     $ cita setup test-chain/0
>     ```
> 
> * 请勿在一台服务器上运行多个容器。因为虽然 CITA 在 Docker 中运行，但是容器并没有做网络隔离。
> 
> * 请不要同时在 host 系统里面运行 CITA 以及相关的 RabbitMQ 等软件，以免造成端口冲突。

## 验证

CITA 提供了支持 JSON-RPC 2.0 (https://www.jsonrpc.org/specification) 协议的API，方便客户端进行区块信息的查询，具体文档在[RPC 列表](./rpc-guide/rpc)。

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