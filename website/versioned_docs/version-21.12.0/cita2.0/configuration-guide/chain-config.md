---
id: version-21.12.0-chain-config
title: 链级配置
original_id: chain-config
---
区块链是一个分布式对等网络，但是其配置需要集中生成。在CITA2.0中每个节点都要包含其他节点的信息，因此需要将所有节点的信息集中到一起，生成适用于各个节点的配置文件，然后再下发给各个节点分别运行。

CITA2.0的配置生成工具为[cloud-config](https://github.com/cita-cloud/cloud-config)。

> **注意**
>
> 当你计划使用 CITA2.0设计产品时，[环境准备] 好之后，不要着急启动节点，请仔细阅读本节内容，并选择最适合你产品需求的配置。

本文档会详细介绍链的各个可配置项。
链级配置指的是链自身的一些属性，系统初始配置、创世块、节点网络地址等配置，用户需在`起链前`初始化链级配置，以下是生成链级配置的相关命令。

## `init-chain`命令

根据指定的`config-dir`和`chan-name`,初始化一个链的文件目录结构。

参数：

```
--chain-name <CHAIN_NAME>
	set chain name [default: test-chain]
--config-dir <CONFIG_DIR>
	set config file directory, default means current directory [default: .]
```

## `init-chain-config`命令
初始化除admin(管理员账户)，validators(共识节点地址列表)，node_network_address_list（节点网络地址列表）之外的链级配置。因为前述三个操作需要一些额外的准备工作，且需要先对除此之外的链接配置信息在所有参与方之间达成共识。因此对于去中心化场景来说，这一步其实是一个公示的过程。执行之后会生成$(config-dir)/$(chain-name)/chain_config.toml。该命令有以下参数：

###  `--block_interval`

设置出块时间间隔，默认值为3。

###  `--block_limit`

设置内存中存储区块的上限，默认值为100，即内存中存储最近100个区块。

### `--chain_name`

设置链的名字。

* 链的名字会作为文件夹的名称。以`test-chain`为例，按节点序号分别创建`test-chain-0，test-chain-1，test-chain-2`等节点文件夹，分别存放每个节点的配置文件。
* 如果没有传递 `chain_name` 参数，则默认链的名字为 `test-chain`。

###  `--chain_id`

设置链id，默认为空字符串。检测到为默认值时，自动替换为hex(sm3($(chain_name)))。

###  `--config-dir`

设置配置文件目录，默认为当前目录。

### `--timestamp`

设置起链的时间戳，默认参数为0。检测到为默认值时，自动替换为当前时间对应的时间戳。

* 具体数值是指自 `1970-1-1` 以来的毫秒数，默认是取当前的时间。

### `--prevhash`

设置创世块的父哈希值，默认为0x0000000000000000000000000000000000000000000000000000000000000000

### `--version`

设置配置版本信息。

### 微服务选择相关参数

使用`init-chain-config`命令设置微服务的相关参数如下

```
--consensus_image <CONSENSUS_IMAGE>
	set consensus micro service image name (consensus_bft/consensus_raft) [default:consensus_raft]

--consensus_tag <CONSENSUS_TAG>
	set consensus micro service image tag [default: latest]

--controller_image <CONTROLLER_IMAGE>
	set controller micro service image name (controller)[default:controller]

--controller_tag <CONTROLLER_TAG>
	set controller micro service image tag [default: latest]

--executor_image <EXECUTOR_IMAGE>
	set executor micro service image name (executor_evm) [default: executor_evm]

--executor_tag <EXECUTOR_TAG>
	set executor micro service image tag [default: latest]

--kms_image <KMS_IMAGE>
	set kms micro service image name (kms_eth/kms_sm) [default: kms_sm]

--kms_tag <KMS_TAG>
	set kms micro service image tag [default: latest]

--network_image <NETWORK_IMAGE>
	set network micro service image name (network_tls/network_p2p) [default: network_p2p]

--network_tag <NETWORK_TAG>
	set network micro service image tag [default: latest]

--storage_image <STORAGE_IMAGE>
	set storage micro service image name (storage_rocksdb) [default: storage_rocksdb]

--storage_tag <STORAGE_TAG>
	set storage micro service image tag [default: latest]
```

## `set-admin`命令

设置管理员账户。账户需要事先通过`new-account`子命令（见`辅助命令`一节）创建。如果网络微服务选择了`network_tls`，则还需要通过`create-ca`创建链的根证书。

参数：

```
--admin <ADMIN>
	set admin
--chain-name <CHAIN_NAME>
	set chain name [default: test-chain]
--config-dir <CONFIG_DIR>
	set config file directory,default means currentdirectory[default:.]
```

* `admin`为必选参数。值为之前用`new-account`创建的地址。

## `set-validators`命令

设置共识节点账户列表。账户同样需要事先通过`new-account`子命令（见`辅助命令`一节），由各个共识节点分别创建，然后将账户地址集中到一起进行设置。

参数：

```
--chain-name <CHAIN_NAME>
	set chain name [default: test-chain]
--config-dir <CONFIG_DIR>
	set config file directory,default means current directory[default:.]
--validators <VALIDATORS>
	validators account splited by ','
```

* `validators`为必选参数。值为多个之前用`new-account`创建的地址,用逗号分隔。

## `set-nodelist`命令

设置节点网络地址列表。各个节点参与方需要根据自己的网络环境，预先保留节点的`ip`，`port`和`domain`。然后将相关信息集中到一起进行设置。至此，链级配置信息设置完成，可以下发配置文件`chain_config.toml`到各个节点。如果网络微服务选择了`network_tls`，则需要通过`create-csr`根据节点的`domain`为各个节点创建证书和签名请求。然后请求`CA`通过`sign-crs`处理签名请求，并下发生成的`cert.pem`到各个节点。

参数：

```
--chain-name <CHAIN_NAME>
	set chain name [default: test-chain]
--config-dir <CONFIG_DIR>
	set config file directory,default means current directory[default:.]
--nodelist <NODE_LIST>
	node list looks like localhost:40000:node0,localhost:40001:node1
```

* `nodelist`为必选参数。值为多个节点的网络地址,用逗号分隔。每个节点的网络地址包含`ip`,`port`和`domain`，之间用冒号分隔。
* `domain`为任意字符串，只需要确保节点之间不重复即可。
