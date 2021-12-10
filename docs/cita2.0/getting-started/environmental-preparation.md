---
id: environmental-preparation
title: 环境准备
---
本章介绍的是使用minikube的快速入门操作方法，CITA2.0提供本地运行版本runner_local，参阅`本地运行`一节

## 硬件配置建议

* CPU：2核或以上
* 内存：4GB或以上
* 硬盘：30G或以上

## 操作系统

常见的`Linux`发行版本均可，例如：`CentOS`，`Debian`，`Ubuntu`等等。

## 软件依赖

* `docker` 安装方法参见[官方文档](https://docs.docker.com/engine/install/)。

* `helm` 安装方法参见[helm文档](https://helm.sh/docs/intro/install/)。Helm是Kubernetes的包管理器。Helm是寻找、共享和使用为Kubernetes构建的软件的最佳方式。

## k8s集群

`k8s`集群的搭建非常复杂，在`快速入门`中，我们推荐使用`minikube`，可以在本地快速搭建一个单节点的`k8s`集群。

* `minikube` 安装方法参见[官方文档](https://minikube.sigs.k8s.io/docs/start/)。

安装完成后用下面的命令启动`minikube`，国内需要在启动`minikube`时设置一些镜像参数，注意不能在根权限下启动`minikube`。

```
minikube start --registry-mirror=https://hub-mirror.c.163.com --image-repository=registry.cn-hangzhou.aliyuncs.com/google_containers --vm-driver=docker --alsologtostderr -v=8 --base-image registry.cn-hangzhou.aliyuncs.com/google_containers/kicbase:v0.0.17
```
耐心等待，看到以下信息代表启动成功。

```
* Done! kubectl is now configured to use "minikube" cluster and "default" namespace by default
```

* `k8s`集群命令行工具`kubectl`安装方法参见[官方文档](https://kubernetes.io/docs/tasks/tools/install-kubectl-linux/)。kubectl是Kubernetes集群的命令行工具,通过kubectl能够对集群本身进行管理,并能够在集群上进行容器化应用的安装部署。

## cloud-cli

该工具为`CITA2.0`链的命令行客户端，可以方便的对链进行常用的操作。

```
$ wget https://github.com/cita-cloud/cloud-cli/releases/download/v0.1.1/cldi
$ chmod +x cldi
$ sudo mv ./cldi /usr/local/bin/
$ cldi -h
cloud-cli 0.1.0
The command line interface to interact with `CITA2.0`.

USAGE:
    cldi [OPTIONS] [SUBCOMMAND]

FLAGS:
    -h, --help       Prints help information
    -V, --version    Prints version information

OPTIONS:
    -e, --executor_addr <executor_addr>    executor address
    -r, --rpc_addr <rpc_addr>              rpc(controller) address
    -u, --user <user>                      the user(account) to send tx

SUBCOMMANDS:
    account               Manage account
    bench                 Send multiple txs with random content
    block-hash            Get block hash by block number(height)
    block-number          Get block number
    call                  Executor call
    completions           Generate completions for current shell
    create                Create contract
    emergency-brake       Send emergency brake cmd to chain
    get-abi               Get specific contract abi
    get-balance           Get balance by account address
    get-block             Get block by number or hash
    get-code              Get code by contract address
    get-tx                Get transaction by hash
    help                  Prints this message or the help of the given subcommand(s)
    peer-count            Get peer count
    receipt               Get receipt by tx_hash
    send                  Send transaction
    set-block-interval    Set block interval
    store-abi             Store abi
    system-config         Get system config
    update-admin          Update admin of the chain
    update-validators     Update validators of the chain
```
