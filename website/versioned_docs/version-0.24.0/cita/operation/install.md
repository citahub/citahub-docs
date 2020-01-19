---
id: version-0.24.0-install
title: 部署 CITA
original_id: install
---

CITA 是一个开源的区块链内核，任何人都可以基于 CITA 来搭建属于自己的一条区块链，在本文档中将为你详解 CITA 的各种部署方案，用户可根据自身业务需要选择合适的部署方案。

> * 如果你想一键搭建属于你自己的链，你可以选择租用 CITA 的云服务。只需根据您的需求，在云服务平台选择适合自己的方案直接租用，帮你省去准备服务器以及部署 CITA 的一系列操作。具体请参考[云服务支持](./huawei)。
> * 如果你想在 CITA 上直接开发您的应用，我们建议你使用我们已经搭好的 [CITA 测试链](../../toolchain/testnet/testchain)。

## 适用操作系统声明

参见[适用操作系统声明](../getting-started#适用操作系统声明)

## 硬件配置建议

参见[硬件配置建议](../getting-started#硬件配置建议)

## 软件依赖声明

参见[软件依赖声明](../getting-started#软件依赖声明)

## 安装 CITA 客户端工具

参见[安装 CITA 客户端工具](../getting-started#安装-cita-客户端工具)

## 部署 CITA

<!--DOCUSAURUS_CODE_TABS-->
<!--发布件部署-->

### 从发布件部署 CITA

参见[下载 CITA 发布件](../getting-started#下载-cita)

<!--源码部署-->

### 从源码编译部署 CITA

1. 下载 CITA 源码

   从 Github 仓库下载 CITA 的源代码，然后切换到 CITA 的源代码目录

   ```shell
   $ git clone https://github.com/citahub/cita.git
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

<!--END_DOCUSAURUS_CODE_TABS-->

## 配置 CITA

参见[配置 CITA](../getting-started#配置-cita)

## 启动 CITA

参见[启动 CITA](../getting-started#启动-cita)

## 验证 CITA 是否运行正常

参见[验证 CITA 是否运行正常](../getting-started#验证-cita-是否运行正常)
