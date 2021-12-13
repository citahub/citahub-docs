---
id: version-21.12.0-node-config
title: 节点配置
original_id: node-config
---

节点配置指与链级配置无关的单个节点内部的配置。

## `init-node`命令

设置节点配置信息。这步操作由各个节点的参与方独立设置，节点之间可以不同。执行之后会生成$(config-dir)/$(chain-name)-$(domain)/node_config.toml。有以下参数：

### `--account`

account为必选参数，表示该节点要使用的账户地址。值为之前用new-account创建的地址。

### `--chain-name`

设置链的名字，默认为`test-chain`，若生成链级配置时没有采用默认值这里也要对应。

### `--config-dir`

设置配置文件目录，默认为当前文件夹，若生成链级配置时没有采用默认值这里也要对应。

### `--key-id`

密钥库中的账户密钥id，默认为1。

### `--kms-password`

密钥库密码，默认为"123456"。

### `--log-level`

生成日志的等级，默认为info。

### `--package-limit`

单个区块中包含交易量的上限，默认为30000。

### `--network-listen-port`

本节点供区块链网络中其他节点连接的端口，默认为40000。

### 微服务grpc端口参数

通过以下参数设置节点内部各个微服务之间通信使用的`grpc`端口。

```
--network-port <NETWORK_PORT>
	grpc network_port of node [default: 50000]
--consensus-port <CONSENSUS_PORT>
	grpc consensus_port of node [default: 50001]
	--executor-port <EXECUTOR_PORT>
	grpc executor_port of node [default: 50002]
	--storage-port <STORAGE_PORT>
	grpc storage_port of node [default: 50003]
--controller-port <CONTROLLER_PORT>
	grpc controller_port of node [default: 50004]
--kms-port <KMS_PORT>
	grpc kms_port of node [default: 50005]
```

## `update-node`命令

根据之前设置的链级配置和节点配置，生成每个节点所需的微服务配置文件。

### `--chain-name`

设置链的名字，默认为`test-chain`，若生成链级配置时没有采用默认值这里也要对应。

### `--config-dir`

设置配置文件目录，默认为当前文件夹，若生成链级配置时没有采用默认值这里也要对应。

### `--config-name`

设置节点配置信息源，默认为`config.toml`，即保存`init-node`命令中生成的配置信息的文件。

### `--domain`

`domain`为必选参数，作为节点的标识，表示要操作的节点。
