---
id: version-0.25.0-compile-cita
title: 编译 CITA
original_id: compile-cita
---

## 环境准备

编译 CITA 前需要准备好编译的环境，其操作步骤同快速入门的 [环境准备](../getting-started/setup)。

## 源代码准备

从 Github 仓库下载 CITA 的源代码，然后切换到 CITA 的源代码目录:

```shell
$ git clone https://github.com/citahub/cita.git
$ cd cita
$ git submodule init
$ git submodule update
```

## 编译源代码

可以按照自己的需求自行选择相应的编译方式, 其中

* Debug: 调试模式，
* Release: 发行模式。

使用命令：

```shell
$ ./env.sh make debug
```

编译 Debug 模式，或者使用命令：

```shell
$ ./env.sh make release
```

编译 Release 模式。

> 可选择替换 Rust Crates 的官方源，详细教程可以参考：
> 
> * [USTC Mirror Help for Rust Crates](http://mirrors.ustc.edu.cn/help/crates.io-index.html)
> * [Source Replacement for Rust Crates](https://doc.rust-lang.org/cargo/reference/source-replacement.html)
> * [How to map a configuration file into docker](https://docs.docker.com/storage/volumes/)

编译生成的文件在发布件目录 `target/install` 下，生产环境下只需要这个目录即可。

> **Docker env 使用说明**
> 
> * 在源码根目录下，我们提供了 `env.sh` 脚本，封装了 Docker 相关的操作。 运行此脚本，以实际要运行的命令作为参数，即表示在 Docker 环境中运行相关命令。 例如：
>     
>     ```shell
>     $ ./env.sh make debug
>     ```
>     
>     即表示在 Docker 环境中运行 `make debug`。
> 
> * 不带任何参数运行 `./env.sh`，将直接获取一个 Docker 环境的 shell。
> 
> **Notice**
> 
> * 如果 Docker 容器是被 root 用户创建的，后续非 root 用户使用 `./env.sh` 会出现如下错误：
>     
>     ```shell
>     $ ./env.sh
>     error: failed switching to "user": unable to find user user: no matching entries in passwd file
>     ```
>     
>     因此要保证操作使用的始终是同一个系统用户。
> 
> * 如果出现 Docker 相关的报错，可以执行如下命令并重试： ```shell docker kill $(docker ps -a -q)
