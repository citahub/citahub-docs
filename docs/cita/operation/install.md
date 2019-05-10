---
id: install
title: 部署 CITA
---

CITA 是一个开源的区块链内核，任何人都可以基于 CITA 来搭建属于自己的一条区块链，在本文档中将为你详解 CITA 的各种部署方案，用户可根据自身业务需要选择合适的部署方案。

> * 如果你想一键搭建属于你自己的链，你可以选择租用 CITA 的云服务。只需根据您的需求，在云服务平台选择适合自己的方案直接租用，帮你省去准备服务器以及部署 CITA 的一系列操作。具体请参考[云服务支持](./huawei)。
> * 如果你想在 CITA 上直接开发您的应用，我们建议你使用我们已经搭好的 [CITA 测试链](https://docs.citahub.com/zh-CN/toolchain/testnet/testchain)。

## 适用操作系统声明

系统支持以及版本建议：Centos（7.2+）、Ubuntu（16.04、18.04）、Redhat (7.4) 

如果你使用的是 macOS, 可以直接参考 [这里](https://github.com/cryptape/homebrew-cita) 来安装试用 CITA。

## 硬件配置建议

配置取决于自身业务，请根据实际情况搭配，以下是建议最低配置：

体验配置：CPU：2核心、内存：4GB、硬盘：30G
生产配置：CPU：4核心、内存：8GB、硬盘：200G 

## 软件依赖声明

* 依赖 docker，安装 docker 参见 [在线资料](https://yeasy.gitbooks.io/docker_practice/content/install/)。
* CITA 的 Docker 镜像托管在 [DockerHub](https://hub.docker.com/r/cita/cita-build/) 。 因为 CITA 是基于 Ubuntu 18.04 稳定版开发的，因此该镜像中封装了 Ubuntu 18.04 还有其他一些 CITA 运行所需要的配置和文件。

## 安装 CITA 命令行工具

1. 创建目录

   ```
   $ mkdir -p /data/cita
   ```

2. 切换目录

   ```
   $ cd /data/cita/
   ```

3. 下载 CITA-CLI 安装包

   ```
   $ wget https://github.com/cryptape/cita-cli/releases/download/0.19.4/cita-cli-x86_64-musl-tls-0.19.4.tar.gz
   ```

4. 解压程序

   ```
   $ tar zxvf cita-cli-x86_64-musl-tls-0.19.4.tar.gz
   ```

5. 复制 CITA-CLI 到 系统可执行文件目录下

   ```
   $ cp -rp cita-cli /bin/
   ```

6. 创建管理员账户地址、私钥、公钥

   ```
   $ cita-cli key create
   ```
    
   返回以下内容，

   ```
   {
   "address": "0x141d051b1b1922bf686f5df8aad45cefbcb0b696",
   "private": "0xa2c4ce22f3ee18d4ca6e560d4a5a6b54823773348b95cd95afb3ee2843ff7768",
   "public": "0x37aa832ae77a580c2c305dfee234af424a90274b236b8925d7c452e1834f3fa34cd87178c2116d34dc816d0b06c869b01409a328d7a28fcfcfca994f6095d166"
   }
   ```

   > 注：此处为示例公私钥对，请不要在生产环境复制使用。"address": "0x141d051b1b1922bf686f5df8aad45cefbcb0b696" 为超级管理员帐号地址，下面的节点管理操作中会频繁使用。

## 部署 CITA

<!--DOCUSAURUS_CODE_TABS-->
<!--发布件部署-->

### 从发布件部署 CITA

1. 下载 CITA安装包

   ```
   $ wget https://github.com/cryptape/cita/releases/download/v0.23.1/cita_secp256k1_sha3.tar.gz
   ```

2. 解压 CITA 程序

   ```
   $ tar zxvf cita_secp256k1_sha3.tar.gz
   ```
     
3. 进入 CITA 目录

   ```
   $ cd cita_secp256k1_sha3
   ```

<!--源码部署-->

### 从源码编译部署 CITA

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

> 可选择替换 Rust Crates 的官方源，详细教程可以参考：
>
> - [USTC Mirror Help for Rust Crates](http://mirrors.ustc.edu.cn/help/crates.io-index.html)
> - [Source Replacement for Rust Crates](https://doc.rust-lang.org/cargo/reference/source-replacement.html)
> - [How to map a configuration file into docker](https://docs.docker.com/storage/volumes/)

> **Docker env 使用说明**
>
> * 在源码根目录下，我们提供了 `env.sh` 脚本，封装了 Docker 相关的操作。
运行此脚本，以实际要运行的命令作为参数，即表示在 Docker 环境中运行相关命令。
例如：
>
>   ```shell
>   $ ./env.sh make debug
>   ```
>
>   即表示在 Docker 环境中运行 `make debug`。
> * 不带任何参数运行 `./env.sh`，将直接获取一个 Docker 环境的 shell。
> * 如果 Docker 容器是被 root 用户创建的，后续非 root 用户使用 `./env.sh` 会出现如下错误：
>
>   ```shell
>   $ ./env.sh
>   error: failed switching to "user": unable to find user user: no matching entries in passwd file
>   ```
>   因此要保证操作使用的始终是同一个系统用户。
> * 如果出现 Docker 相关的报错，可以执行如下命令并重试：
>   ```shell
>   docker kill $(docker ps -a -q)
>   ```

3. 进入 CITA 目录

```shell
$ cd target/install
```

<!--END_DOCUSAURUS_CODE_TABS-->

4. 初始化链 （super_admin 地址是超级管理员账号即 cita-cli 生成，--nodes 是要部署的节点地址（IP:Port），RPC 端口从 1337 开始 递增；4个节点（1337、1338、1339、1340））

   ```
   $ bin/cita create --super_admin "0x141d051b1b1922bf686f5df8aad45cefbcb0b696" --nodes "127.0.0.1:4000,127.0.0.1:4001,127.0.0.1:4002,127.0.0.1:4003"
   ```

   > * 注1：以上是简单的配置，系统会默认一些参数，更多自定义参数请见 [链接配置](./chain-config)
   > * 注2：以上操作是在一台服务器上部署 4 个 CITA 节点，如要将节点部署到多台服务器，初始化链时 --nodes 需要填写服务器真实 IP。

## 启动 CITA

1. 启动节点 0

   ```
   $ ./bin/cita setup test-chain/0
   $ ./bin/cita start test-chain/0
   ```

2. 启动节点 1

   ```
   $ ./bin/cita setup test-chain/1
   $ ./bin/cita start test-chain/1
   ```

3. 启动节点 2

   ```
   $ ./bin/cita setup test-chain/2
   $ ./bin/cita start test-chain/2
   ```

4. 启动节点 3

   ```
   $ ./bin/cita setup test-chain/3
   $ ./bin/cita start test-chain/3
   ```

## 验证 CITA 是否运行正常

1. 查看进程是否启动成功

   ```
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

2. 调用 RPC 接口 查看高度是否持续增长，默认 3s 出一个块，重复执行查询命令，观察返回值 result 是否发生变化

   ```
   $ ./env.sh curl -X POST --data '{"jsonrpc":"2.0","method":"blockNumber","params":[],"id":83}' 127.0.0.1:1337
   ```

   返回结果 

   ```
   {"jsonrpc":"2.0","id":83,"result":"0x7d"}
   ```
