---
id: version-20.2.0-permission
title: 权限系统
original_id: permission
---

CITA 的权限系统对用户的操作进行控制，并支持基于角色的权限管理。

账户相关信息查看[账户概述]。

## 权限系统概述

在权限系统中由合约地址来标识权限，控制的范围可细粒度到合约的函数级别。
一个权限的属性包含：

* 可阅读的权限名称
* 目标合约地址
* 对应目标合约的函数签名

由此可表示三种类别的权限：

* 发交易： 由系统内置的的合约地址标识，权限属性为空
* 创建合约： 由系统内置的的合约地址标识，权限属性为空
* 调用合约： 分为两类：
    - 内置的权限： 由系统内置的合约地址标识，权限属性包含系统合约的地址和函数签名
    - 用户自定义的权限：由用户创建权限时生成的合约地址标识，权限属性包含参数所表示的地址和函数签名

## 权限系统操作

使用权限系统可进行的一些操作如下：

* 创建权限： 生成权限的标识，属性包含参数所表示的合约地址、函数签名及名称
* 更新权限： 修改权限的属性
* 删除权限： 删除权限
* 授予权限： 授予账户权限
* 取消授权： 撤销对目标账户某种权限

具体接口定义可查看[权限系统接口]。

## 权限系统配置

CITA 在起链的时候可以对权限系统进行配置，默认是关闭的（即没有权限检查）。有三个配置项：

* `checkCallPermission`: 表示对合约调用的权限进行检查
* `checkSendTxPermission`: 表示对发送交易的权限进行检查
* `checkCreateContractPermission`: 表示对创建合约的权限进行检查

**注意：**

这里的 `checkCallPermission` 与 JSON-RPC 中的 Call 并不同， JSON-RPC 中的 Call 是指对链上数据的查询，是读数据而非写数据。而这里的`checkCallPermission` 是指通过发送交易的方式调用合约接口，是指写数据的操作。

更多信息查看[链级配置]。

## 系统内置权限

用户可自定义权限，其中系统内置了几种权限(禁止对其进行删除操作)，如下所示：

| name                | permission
| ------------------- | -----------
| `sendTx`            | 表示发交易权限
| `createContract`    | 表示创建合约权限
| `newPermission`     | 表示创建一个新的权限权限
| `deletePermission`  | 表示删除一个权限权限
| `updatePermission`  | 表示更新一个权限权限
| `setAuth`           | 表示对账号进行授权权限
| `cancelAuth`        | 表示对帐号取消授权权限
| `newRole`           | 表示创建一个新的角色权限
| `deleteRole`        | 表示删除一个角色权限
| `updateRole`        | 表示更新一个角色权限
| `setRole`           | 表示对账号授予角色权限
| `cancelRole`        | 表示对帐号取消授予角色权限
| `newGroup`          | 表示创建一个新组权限
| `deleteGroup`       | 表示删除一个组权限
| `updateGroup`       | 表示更新一个组权限
| `newNode`           | 表示增加普通节点权限
| `deleteNode`        | 表示删除节点权限
| `updateNode`        | 表示更新节点权限
| `accountQuota`      | 表示账户配额设置权限
| `blockQuota`        | 表示块配额设置权限
| `batchTx`           | 表示批量交易权限
| `ermergencyBrake`   | 表示紧急制动权限
| `quotaPrice`        | 表示设置 quotaPrice 权限
| `version`           | 表示设置版本权限

对应地址信息可查看[已使用地址列表]。

## 操作示例

### 修改系统配置

通过以下命令生成配置文件(打开所有权限系统配置)：

```bash
$ bin/cita create \
    --super_admin "0x4b5ae4567ad5d9fb92bc9afd6a657e6fa13a2523" \
    --nodes "127.0.0.1:4000,127.0.0.1:4001,127.0.0.1:4002,127.0.0.1:4003" \
	--contract_arguments SysConfig.checkCallPermission=true SysConfig.checkSendTxPermission=true SysConfig.checkCreateContractPermission=true
```

启动链的接下来的步骤见 [运行 CITA] 部分。接下来的测试，用 [cita-cli](https://github.com/citahub/cita-cli) 命令行模式（与交互式模式的命令是一致的）进行演示。

### 生成普通账户

参考[生成账户]。

### 部署合约

#### 授予发交易和部署合约权限

由于设置了权限的检查开关，所有用户默认是没有发交易及创建合约的权限的。首先需要通过 superAdmin 对其授 sendTx 发送交易及 createContract 创建合约权限。

发送交易权限地址为 `0xffffffffffffffffffffffffffffffffff021000`，创建合约权限地址为 `0xffffffffffffffffffffffffffffffffff021001`

由超级管理员进行操作。调用 `setAuthorizations`接口。

```bash
$ cita-cli scm PermissionManagement setAuthorizations \
    --permissions '[ffffffffffffffffffffffffffffffffff021000,ffffffffffffffffffffffffffffffffff021001]' \
    --account 0x37d1c7449bfe76fe9c445e626da06265e9377601 \
    --private-key 0x5f0258a4778057a8a7d97809bd209055b2fbafa654ce7d31ec7191066b9225e6 \
    --url http://127.0.0.1:1337
```

输出：

```json
{
  "id": 3,
  "jsonrpc": "2.0",
  "result": {
    "hash": "0x8addbd232737efb41e2aa45b481fe578b93f4bfb8dd6a971aad5e7593c3c47d2",
    "status": "OK"
  }
}
```

查看 receipt 信息：

```bash
$ cita-cli rpc getTransactionReceipt \
    --hash 0x8addbd232737efb41e2aa45b481fe578b93f4bfb8dd6a971aad5e7593c3c47d2 \
    --url http://127.0.0.1:1337
```

输出：

```json
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": {
    "blockHash": "0x5956727ccb1de4876be148ef6fa54c764544cfd78cdc48b083603b40fbb71b8b",
    "blockNumber": "0x14",
    "contractAddress": null,
    "cumulativeQuotaUsed": "0x27a38",
    "errorMessage": null,
    "quotaUsed": "0x27a38",
    "logs": [
      {
        "address": "0xffffffffffffffffffffffffffffffffff020006",
        "blockHash": "0x5956727ccb1de4876be148ef6fa54c764544cfd78cdc48b083603b40fbb71b8b",
        "blockNumber": "0x14",
        "data": "0x",
        "logIndex": "0x0",
        "topics": [
          "0xef79a70821e438468db437d5f7401aecaf406a2cba3c7e7fd4339ef895dbb97e",
          "0x00000000000000000000000037d1c7449bfe76fe9c445e626da06265e9377601",
          "0x000000000000000000000000ffffffffffffffffffffffffffffffffff021000"
        ],
        "transactionHash": "0x8addbd232737efb41e2aa45b481fe578b93f4bfb8dd6a971aad5e7593c3c47d2",
        "transactionIndex": "0x0",
        "transactionLogIndex": "0x0"
      },
      {
        "address": "0xffffffffffffffffffffffffffffffffff020006",
        "blockHash": "0x5956727ccb1de4876be148ef6fa54c764544cfd78cdc48b083603b40fbb71b8b",
        "blockNumber": "0x14",
        "data": "0x",
        "logIndex": "0x1",
        "topics": [
          "0xef79a70821e438468db437d5f7401aecaf406a2cba3c7e7fd4339ef895dbb97e",
          "0x00000000000000000000000037d1c7449bfe76fe9c445e626da06265e9377601",
          "0x000000000000000000000000ffffffffffffffffffffffffffffffffff021001"
        ],
        "transactionHash": "0x8addbd232737efb41e2aa45b481fe578b93f4bfb8dd6a971aad5e7593c3c47d2",
        "transactionIndex": "0x0",
        "transactionLogIndex": "0x1"
      }
    ],
    "logsBloom": "0x00000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000000000000000000000000400001000000200000000000000000000020000000000000400000000000000000000000000000000000000000000000000000000000000000000000000000000001000000010000000000000100000000000000000000000000000000000000008800080000000000000000000000002000000000000000000000000000000000000",
    "root": null,
    "transactionHash": "0x8addbd232737efb41e2aa45b481fe578b93f4bfb8dd6a971aad5e7593c3c47d2",
    "transactionIndex": "0x0"
  }
}
```

授予权限成功。

#### 部署合约

参考[部署合约]。

如果用户想要调用测试合约的接口，需要根据接口生成一个新的权限，然后由 admin 把权限赋予用户。

### 生成新的权限

由超级管理员进行操作

```bash
$ cita-cli scm PermissionManagement newPermission \
    --name 0000000000000000000000000000000000000000000000000000000060fe47b1 \
    --contracts '[5839153e0efe76efe0c974b728c4f49ca7ed75cc]' \
    --function-hashes '[60fe47b1]' \
    --private-key 0x5f0258a4778057a8a7d97809bd209055b2fbafa654ce7d31ec7191066b9225e6 \
    --url http://127.0.0.1:1337
```

输出：

```json
{
  "id": 3,
  "jsonrpc": "2.0",
  "result": {
    "hash": "0x239fb9c6121d6c512e4b8e3422da378e6d329c4d5073fd7b83ee67d28cc89565",
    "status": "OK"
  }
}
```

获取 receipt 信息：

```bash
$ cita-cli rpc getTransactionReceipt \
    --hash 0x239fb9c6121d6c512e4b8e3422da378e6d329c4d5073fd7b83ee67d28cc89565 \
    --url http://127.0.0.1:1337
```

输出：

```json
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": {
    "blockHash": "0xea33ec74f7ce12fae0a6c5df4137d3234e120a8c6cfd2c557052184409729c98",
    "blockNumber": "0x282",
    "contractAddress": null,
    "cumulativeQuotaUsed": "0x2290fe",
    "errorMessage": null,
    "quotaUsed": "0x2290fe",
    "logs": [
      {
        "address": "0xca645d2b0d2e4c451a2dd546dbd7ab8c29c3dcee",
        "blockHash": "0xea33ec74f7ce12fae0a6c5df4137d3234e120a8c6cfd2c557052184409729c98",
        "blockNumber": "0x282",
        "data": "0x0000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000010000000000000000000000005839153e0efe76efe0c974b728c4f49ca7ed75cc000000000000000000000000000000000000000000000000000000000000000160fe47b100000000000000000000000000000000000000000000000000000000",
        "logIndex": "0x0",
        "topics": [
          "0xb533e8b79dc7485ba7e4435e3395df911c1a3c767225941003d88a7812d216f7"
        ],
        "transactionHash": "0x239fb9c6121d6c512e4b8e3422da378e6d329c4d5073fd7b83ee67d28cc89565",
        "transactionIndex": "0x0",
        "transactionLogIndex": "0x0"
      },
      {
        "address": "0xffffffffffffffffffffffffffffffffff020005",
        "blockHash": "0xea33ec74f7ce12fae0a6c5df4137d3234e120a8c6cfd2c557052184409729c98",
        "blockNumber": "0x282",
        "data": "0x0000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000010000000000000000000000005839153e0efe76efe0c974b728c4f49ca7ed75cc000000000000000000000000000000000000000000000000000000000000000160fe47b100000000000000000000000000000000000000000000000000000000",
        "logIndex": "0x1",
        "topics": [
          "0x792f7322d94960c6e90863b5aef39075ca54620cfa13a822081d733f79c48f91",
          "0x000000000000000000000000ca645d2b0d2e4c451a2dd546dbd7ab8c29c3dcee",
          "0x0000000000000000000000000000000000000000000000000000000060fe47b1"
        ],
        "transactionHash": "0x239fb9c6121d6c512e4b8e3422da378e6d329c4d5073fd7b83ee67d28cc89565",
        "transactionIndex": "0x0",
        "transactionLogIndex": "0x1"
      }
    ],
    "logsBloom": "0x00000000000000020000000000000000000000000000008000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000080000000000000000040000000000000000040000000000000000001000000000000000000000000000000000000000000000000008000000800000000004000000000000000000000000000000000000000000000000000000000000000000000000000000000080000000000200000000000000000000000000000000000000000000000000000000000000000000100000000000000000000100000000000000000000000000000800000002000000000000100000000100000",
    "root": null,
    "transactionHash": "0x239fb9c6121d6c512e4b8e3422da378e6d329c4d5073fd7b83ee67d28cc89565",
    "transactionIndex": "0x0"
  }
}
```

从 logs[0] 中获得新权限的地址为 `0xca645d2b0d2e4c451a2dd546dbd7ab8c29c3dcee`

### 使用新权限

#### 把新权限赋予测试用户

由超级管理员进行操作。

```bash
$ cita-cli scm PermissionManagement setAuthorization \
    --permission 0xca645d2b0d2e4c451a2dd546dbd7ab8c29c3dcee \
    --account 0x37d1c7449bfe76fe9c445e626da06265e9377601 \
    --private-key 0x5f0258a4778057a8a7d97809bd209055b2fbafa654ce7d31ec7191066b9225e6 \
    --url http://127.0.0.1:1337
```

输出：

```json
{
  "id": 3,
  "jsonrpc": "2.0",
  "result": {
    "hash": "0xc088f083c8ac7d89bd7056d09629f59c1f67cd6c97120807cee782c8200402e1",
    "status": "OK"
  }
}
```

获取 receipt 信息：

```bash
$ cita-cli rpc getTransactionReceipt \
    --hash 0xc088f083c8ac7d89bd7056d09629f59c1f67cd6c97120807cee782c8200402e1 \
    --url http://127.0.0.1:1337
```

输出：

```json
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": {
    "blockHash": "0xbaf441b79671f0333adf1511361d258dcc606b3ecc6c42ac04d7e31794e1726b",
    "blockNumber": "0x554",
    "contractAddress": null,
    "cumulativeQuotaUsed": "0x13587",
    "errorMessage": null,
    "quotaUsed": "0x13587",
    "logs": [
      {
        "address": "0xffffffffffffffffffffffffffffffffff020006",
        "blockHash": "0xbaf441b79671f0333adf1511361d258dcc606b3ecc6c42ac04d7e31794e1726b",
        "blockNumber": "0x554",
        "data": "0x",
        "logIndex": "0x0",
        "topics": [
          "0xef79a70821e438468db437d5f7401aecaf406a2cba3c7e7fd4339ef895dbb97e",
          "0x00000000000000000000000037d1c7449bfe76fe9c445e626da06265e9377601",
          "0x000000000000000000000000ca645d2b0d2e4c451a2dd546dbd7ab8c29c3dcee"
        ],
        "transactionHash": "0xc088f083c8ac7d89bd7056d09629f59c1f67cd6c97120807cee782c8200402e1",
        "transactionIndex": "0x0",
        "transactionLogIndex": "0x0"
      }
    ],
    "logsBloom": "0x00000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000400001000004200000000000000000000020000000000000400000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000900080000000000000000000000000000000000000000000000000000000000000",
    "root": null,
    "transactionHash": "0xc088f083c8ac7d89bd7056d09629f59c1f67cd6c97120807cee782c8200402e1",
    "transactionIndex": "0x0"
  }
}
```

#### 查询账户权限

查询测试账号的权限：

```bash
$ cita-cli scm Authorization queryPermissions \
    --account 0x37d1c7449bfe76fe9c445e626da06265e9377601 \
    --url http://127.0.0.1:1337
```

输出：

```json
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": "0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000003000000000000000000000000ffffffffffffffffffffffffffffffffff021000000000000000000000000000ffffffffffffffffffffffffffffffffff021001000000000000000000000000ca645d2b0d2e4c451a2dd546dbd7ab8c29c3dcee"
}
```

已经可以看到新添加的权限了。

### 调用测试合约

参考[调用合约]，查看是否调用成功。

可以看出结果已经是 1 了。

[已使用地址列表]: ../addresses#已使用地址列表
[权限系统接口]: ../sys-contract-interface/interface#权限系统合约
[权限系统操作示例]: ./permission-example
[测试合约]: https://github.com/citahub/test-contracts/blob/master/SimpleStorage.sol
[生成账户]: ../advanced-use/contracts/solidity#生成账户
[调用合约]: ../advanced-use/contracts/solidity#调用
[账户概述]: ./account#账户概述
[运行 CITA]: ../getting-started/run-cita
[部署合约]: ../advanced-use/contracts/solidity#部署
[链级配置]: ../configuration-guide/chain-config
