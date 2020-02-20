---
id: version-0.25.0-commands
title: 命令说明
original_id: commands
---

## 概述

本小节将发布包中可执行文件 `cita` 命令进行详细说明。

通过 `bin/cita help` 可获取 `cita` 命令的帮助。

## 节点创建及环境准备命令

### create

* 说明
    
    根据给定的 [配置信息](configuration-guide/chain-config)，生成区块链初始化配置文件，其中包括区世块与节点信息配置。

* 使用场景
    
    创建一条新的区块链。

* 示例
    
    生成一条包含 4 个节点的区块链 `test`，节点间连接端口分别为 4000 , 4001 , 4002 , 4003。
    
    > 特别说明：所有在 `create` 命令中指定的节点，均为共识节点。
    
    ```shell
    $ bin/cita create --super_admin "0x4b5ae4567ad5d9fb92bc9afd6a657e6fa13a2523" --nodes "127.0.0.1:4000,127.0.0.1:4001,127.0.0.1:4002,127.0.0.1:4003" --chain_name test
    ```
    
    命令执行完成后，会在当前目录下创建名为 `test` 的文件夹，里面包括 4 个节点的配置文件以及一个 **模板** 文件夹。
    
    ```shell
    $ ls test
    0  1  2  3  template
    ```

### append

* 说明
    
    新添加一个区块链节点配置。
    
    可以通过 `bin/cita append --help` 获得 `append` 命令帮助信息，其中：
    
    `--chain_name`： 指定所添加新节点的链名称。
    
    `--node`： 指定所添加新节点的 IP:PORT 。
    
    `--address`： 指定所添加新节点的地址。
    
    注意，当指定 `--address` 时，需要 **手工** 将 `address` 对应的 `privkey` 添加到生成后的节点目录下。

* 使用场景
    
    区块链配置已经生成，需要新加入一个节点。

* 示例
    
    在区块链 `test` 中添加一个节点配置。
    
    > 特别说明：使用 `append` 添加的节点，初始化为 **只读** 节点。
    
    ```shell
    $ bin/cita append --chain_name test --node 127.0.0.1:4004
    ```
    
    命令执行成功后，会在链目录 `test` 下，多一个节点 `4` 的文件夹。
    
    ```shell
    $ ls test
    0  1  2  3  4  template
    ```

### port

* 说明
    
    使用 `cita` 命令运行 CITA 时，会默认启动 `docker` 容器； `port` 命令可以将容器内的端口映射到宿主机。
    
    方便用户在宿主机上使用 CITA 提供的 JSON-RPC 服务。
    
    > 特别说明：
    > 
    > 1. 在 Linux 下，`docker` 使用 `host` 选项将所有容器内的端口映射到宿主机；
    > 2. 在 macOS 下，需要用户自行决定所映射到宿主机的端口号，默认只映射 `1337` 端口。

* 使用场景
    
    * 在 macOS 下启动时，发现默认的 `1337` 有冲突，需要更换其它的端口；
    * 在 macOS 下启动，需要映射其它更多端口到宿主机。

* 示例
    
    映射 `1337, 1338, 1339, 1340` 4 个端口到宿主机。
    
    ```shell
    $ bin/cita port 1337:1337 1338:1338 1339:1339 1340:1340
    ```
    
    命令执行成功后，使用命令 `docker ps` 查看到容器的端口映射情况。
    
    ```shell
    $ docker ps
    CONTAINER ID        IMAGE                                 COMMAND                  CREATED             STATUS              PORTS                              NAMES
    6d2d0701f332        cita/cita-run:ubuntu-18.04-20190419   "/usr/bin/entrypoint…"   13 seconds ago      Up 11 seconds       0.0.0.0:1337-1340->1337-1340/tcp   cita_run_container
    ```

## 节点服务控制命令

### setup

* 说明
    
    建立 CITA 运行时所依赖的执行环境，其中包括 `RabbitMQ` 服务。

* 使用场景
    
    执行 `start` 前，必须先执行 `setup`。

* 示例
    
    建立节点 0 执行环境。
    
    ```shell
    $ bin/cita setup test/0
    ```

### start

* 说明
    
    启动一个 CITA 节点。

* 使用场景
    
    启动一个 CITA 节点。

* 示例
    
    启动节点 0。
    
    ```shell
    $ bin/cita start test/0
    ```

### stop

* 说明
    
    停止一个 CITA 节点。

* 使用场景
    
    停止一个 CITA 节点。

* 示例
    
    停止节点 0。
    
    ```shell
    $ bin/cita stop test/0
    stop...ok
    ```

### restart

* 说明
    
    重启一个 CITA 节点。

* 使用场景
    
    重启一个 CITA 节点。

* 示例
    
    重启节点 0。
    
    ```shell
    $ bin/cita restart test/0
    ```

## 节点诊断命令

### ping

* 说明
    
    检查一个节点是否正在运行。

* 示例
    
    检查节点 0 是否正在运行。
    
    ```shell
    $ bin/cita ping test/0
    pong
    ```
    
    检查节点 1 是否正在运行。
    
    ```shell
    $ bin/cita ping test/1
    Node 'test/1' not responding to pings.
    ```

### top

* 说明
    
    类似于系统的 `top` 命令，查看服务的进程信息。

* 示例
    
    查看节点 0 的服务进程信息。
    
    ```shell
    $ bin/cita top test/0
    user      2825     0  0 14:39 ?        00:00:00 cita-forever
    user      2837  2825  0 14:39 ?        00:00:03 cita-auth -c auth.toml
    user      2858  2825  0 14:39 ?        00:00:02 cita-bft -c consensus.toml -p privkey
    user      2836  2825  0 14:39 ?        00:00:01 cita-chain -c chain.toml
    user      2838  2825  0 14:39 ?        00:00:05 cita-executor -c executor.toml
    user      2855  2825  0 14:39 ?        00:00:00 cita-jsonrpc -c jsonrpc.toml
    user      2847  2825  0 14:39 ?        00:00:04 cita-network -c network.toml
    ```

### stat

即将弃用，请使用 `top` 命令替代。

### logs

* 说明
    
    获取节点中某个服务的日志，命令效果类似于 `tail -f`。 当前 CITA 运行过程中存在 7 个服务进程，它们分别是： `cita-forever`, `cita-auth`, `cita-bft`, `cita-chain`, `cita-executor`, `cita-jsonrpc`, `cita-network`.

* 示例
    
    获得节点 0 的 `cita-forever` 日志。
    
    ```shell
    $ bin/cita logs test/0 cita-forever
    2019-05-23 - 14:39:54 | cita_forever::proces - 84    | INFO  - process id: 2837
    2019-05-23 - 14:39:54 | cita_forever::proces - 98    | INFO  - cita-auth started
    2019-05-23 - 14:39:55 | cita_forever::proces - 84    | INFO  - process id: 2838
    2019-05-23 - 14:39:55 | cita_forever::proces - 98    | INFO  - cita-executor started
    2019-05-23 - 14:39:55 | cita_forever::proces - 84    | INFO  - process id: 2847
    2019-05-23 - 14:39:55 | cita_forever::proces - 98    | INFO  - cita-network started
    2019-05-23 - 14:39:55 | cita_forever::proces - 84    | INFO  - process id: 2855
    2019-05-23 - 14:39:55 | cita_forever::proces - 98    | INFO  - cita-jsonrpc started
    2019-05-23 - 14:39:56 | cita_forever::proces - 84    | INFO  - process id: 2858
    2019-05-23 - 14:39:56 | cita_forever::proces - 98    | INFO  - cita-bft started
    ```

## 其它命令

### backup

* 说明
    
    备份节点数据与日志。
    
    > 说明：该命令需要在节点停止运行的场景下使用。

* 示例
    
    备份节点 0 数据与日志。
    
    ```shell
    $ bin/cita backup test/0
    cp -r /opt/cita/test/0/data /opt/cita/test/0/backup.2019-05-23T15:13:48+08:00/
    cp -r /opt/cita/test/0/logs /opt/cita/test/0/backup.2019-05-23T15:13:48+08:00/
    ```
    
    命令执行成功后，会在节点 0 的目录下生成一个 `backup.*` 的目录，里面存在数据与日志的备份。

### clean

* 说明
    
    清空节点数据与日志。
    
    > 说明：该命令需要在节点停止运行的场景下使用。

* 示例
    
    清空节点 0 数据与日志。
    
    ```shell
    $ bin/cita clean test/0
    mv /opt/cita/test/0/data /opt/cita/test/0/backup.2019-05-23T15:17:43+08:00/
    mv /opt/cita/test/0/logs /opt/cita/test/0/backup.2019-05-23T15:17:43+08:00/
    ```
    
    命令执行成功后，会在节点 0 的目录下生成一个 `backup.*` 的目录，里面存在所删除的数据与日志。

### logrotate

* 说明
    
    归档节点日志。

* 示例
    
    归档节点 0 日志。
    
    ```shell
    $ bin/cita logrotate test/0
    ./test/0/logs/cita-auth_2019-05-23_15-24-23.log
    ./test/0/logs/cita-bft_2019-05-23_15-24-23.log
    ./test/0/logs/cita-chain_2019-05-23_15-24-23.log
    ./test/0/logs/cita-executor_2019-05-23_15-24-23.log
    ./test/0/logs/cita-jsonrpc_2019-05-23_15-24-23.log
    ./test/0/logs/cita-network_2019-05-23_15-24-23.log
    ```
    
    命令执行成功后，会在节点 0 的 `logs` 目录下生成每个服务的日志归档，原日志文件信息被清空。