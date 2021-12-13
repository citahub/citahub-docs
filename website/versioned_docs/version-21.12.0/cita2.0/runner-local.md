---
id: version-21.12.0-runner-local
title: 本地运行
original_id: runner-local
---

[runner_local](https://github.com/cita-cloud/runner_local)是CITA2.0的本地运行版本，可以方便不熟悉k8s运行环境的用户在本地体验CITA2.0。

## 获取工程及子模块文件

* 首先使用`git clone`命令获取`runner_local`文件，命令如下：

```
$ git clone git@github.com:cita-cloud/runner_local.git
```

* 使用`git checkout`切换到需要使用的版本分支。

* 适用以下命令获取runner_local中的各个子模块

```
$ git submodule update --init --remote
```

## 生成配置

使用[cloud-config](https://github.com/cita-cloud/cloud-config)生成链的配置文件。

* 安装依赖

```
$ curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

$ apt install -y --no-install-recommends make git protobuf-compiler libssl-dev pkg-config clang
```

* 安装`cloud-config`

```
$ cargo install --path config
```

* 使用`cloud-config create-dev`命令生成配置

```
$ cloud-config create-dev --help
cloud-config-create-dev

create config in env dev

USAGE:
    cloud-config create-dev [FLAGS] [OPTIONS]

FLAGS:
    -h, --help       Print help information
        --is-bft     is consensus bft
        --is-tls     is network tls
    -V, --version    Print version information

OPTIONS:
	--chain-name <CHAIN_NAME>      set chain name [default: test-chain]
	--config-dir <CONFIG_DIR>      set config file directory, default means current directory[default: .]
	--log-level <LOG_LEVEL>        log level [default: info]
	--peers-count <PEERS_COUNT>    set initial node number [default: 4]
```

```
$ cloud-config create-dev --is-bft --config-dir tmp
```

* 查看生成的配置

```
$ tree tmp/ -L 1
tmp
├── test-chain
├── test-chain-0
├── test-chain-1
├── test-chain-2
└── test-chain-3

5 directories, 0 files
```

## 编译和使用

编译工程

```
$ make release
```

编译的二进制和配置文件会放到 target/install 目录下，编译完成后切换至该目录。

```
$ cd target/install
```

> **注意**
>
> 在使用前请先参阅`快速入门`-`环境准备`-`cloud-cli`，安装`CITA2.0`命令行工具`cloud-cli`，可以方便地对链进行常用操作。

* 启动链

```
$ ./scripts/env.sh start config/test-chain-0 50000 && ./scripts/env.sh start config/test-chain-1 51000 && ./scripts/env.sh start config/test-chain-2 52000 && ./scripts/env.sh start config/test-chain-3 53000
```

启动成功后就可以使用`cloud-cli`与链进行交互了，链的操作与使用`k8s`运行的`CITA2.0`一样，参阅`快速入门`中`基本操作`、`账户操作`、`发送交易`三节。

* 停止链

```
$ ./scripts/env.sh stop
```

* 删除链文件

```
$ ./scripts/env.sh clean config/test-chain-0 && ./scripts/env.sh clean config/test-chain-1 && ./scripts/env.sh clean config/test-chain-2 && ./scripts/env.sh clean config/test-chain-3
```
