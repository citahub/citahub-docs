---
id: version-1.0.0-account
title: 账户系统
original_id: account
---

CITA 实现了基于组的账户系统，组之间为树形的关系，可对应企业的组织结构。

## 账户概述

账户(account)： 链上唯一的标识，表现为地址。权限管理的主体对象。

* 外部账户(external owned account)： 拥有公私钥对，可发送交易的用户。
* 合约账户(contract account)： 拥有相关的代码(code)及存储(storage)。

## 账户系统概述

在用户系统中由合约地址来标识组。组的属性包含：

* 可阅读的组名称
* 父组的标识
* 组内包含的账户
* 子组的标识列表

由根组可生成一个组的树形结构。

## 账户系统操作

使用账户系统可进行的一些操作如下：

* 新建组： 生成组的标识，属性包含参数所表述的父组、组内用户及名称
* 更新组： 修改组内属性
* 删除组： 删除叶子组，即不包含子组

具体接口定义可查看[账户系统接口]。

同时对组的操作范围做了约束：

组内的用户可作用于本组及本组所有子组。

## 账户系统配置

在 CITA 启动前可以设置超级管理员，更多相关信息查看[链级配置]。

## 系统内置组

系统内置了 `rootGroup`，作为树形结构的根组。

对应地址信息可查看[已使用地址列表]。

## 使用示例

> 接下来的测试，用 [cita-cli] 命令行模式进行演示，操作类接口调用需要有相应的权限。

### 新建组

超级管理员新建组，输入命令：

```shell
$ scm GroupManagement newGroup \
      --origin 0xfFFfFFFFFffFFfffFFFFfffffFffffFFfF020009 \
      --name 7770660000000000000000000000000000000000000000000000000000000000 \
      --accounts "[e1c4021742730ded647590a1686d5c4bfcbae0b0,45a50f45cb81c8aedeab917ea0cd3c9178ebdcae]" \
      --private-key 0x5f0258a4778057a8a7d97809bd209055b2fbafa654ce7d31ec7191066b9225e6
```

默认 `origin` 是 `0xfFFfFFFFFffFFfffFFFFfffffFffffFFfF020009`，
组名字的十六进制表示 `7770660000000000000000000000000000000000000000000000000000000000`，
添加到本组内的账户有两个，分别是：

* `e1c4021742730ded647590a1686d5c4bfcbae0b0`
* `45a50f45cb81c8aedeab917ea0cd3c9178ebdcae`

回执输出:

```json
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": {
    "blockHash": "0x0771624fa18da8380cf87238bd0dbb1e4114f2d707bdf9be6265c4ed50016960",
    "blockNumber": "0x6922",
    "contractAddress": null,
    "cumulativeQuotaUsed": "0x1b8fcf",
    "errorMessage": null,
    "quotaUsed": "0x1b8fcf",
    "logs": [
      {
        "address": "0xce6cd8f8562e31d44b1101986204cec34b1df025",
        "blockHash": "0x0771624fa18da8380cf87238bd0dbb1e4114f2d707bdf9be6265c4ed50016960",
        "blockNumber": "0x6922",
        "data": "0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000002000000000000000000000000e1c4021742730ded647590a1686d5c4bfcbae0b000000000000000000000000045a50f45cb81c8aedeab917ea0cd3c9178ebdcae",
        "logIndex": "0x0",
        "topics": [
          "0x876145257ed9001029e48f639669c6a3d20c2256585b00a716e557653ccb4813",
          "0x000000000000000000000000ffffffffffffffffffffffffffffffffff020009",
          "0x7770660000000000000000000000000000000000000000000000000000000000"
        ],
        "transactionHash": "0x948de6f242b4ed2638ff4874febfd824facec1e71907154f1532ea19f78f8b21",
        "transactionIndex": "0x0",
        "transactionLogIndex": "0x0"
      },
      {
        "address": "0xffffffffffffffffffffffffffffffffff02000b",
        "blockHash": "0x0771624fa18da8380cf87238bd0dbb1e4114f2d707bdf9be6265c4ed50016960",
        "blockNumber": "0x6922",
        "data": "0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000002000000000000000000000000e1c4021742730ded647590a1686d5c4bfcbae0b000000000000000000000000045a50f45cb81c8aedeab917ea0cd3c9178ebdcae",
        "logIndex": "0x1",
        "topics": [
          "0xe676706adf1adf2871518b989e3e4ae7c1cc5bf8bb6012ecc94652f84edf4adf",
          "0x000000000000000000000000ce6cd8f8562e31d44b1101986204cec34b1df025",
          "0x000000000000000000000000ffffffffffffffffffffffffffffffffff020009",
          "0x7770660000000000000000000000000000000000000000000000000000000000"
        ],
        "transactionHash": "0x948de6f242b4ed2638ff4874febfd824facec1e71907154f1532ea19f78f8b21",
        "transactionIndex": "0x0",
        "transactionLogIndex": "0x1"
      },
      {
        "address": "0xffffffffffffffffffffffffffffffffff020009",
        "blockHash": "0x0771624fa18da8380cf87238bd0dbb1e4114f2d707bdf9be6265c4ed50016960",
        "blockNumber": "0x6922",
        "data": "0x",
        "logIndex": "0x2",
        "topics": [
          "0xa016866023d98d9af30c4dd99810d92915ae7897f25baa30c8c826bf077f486b",
          "0x000000000000000000000000ce6cd8f8562e31d44b1101986204cec34b1df025"
        ],
        "transactionHash": "0x948de6f242b4ed2638ff4874febfd824facec1e71907154f1532ea19f78f8b21",
        "transactionIndex": "0x0",
        "transactionLogIndex": "0x2"
      }
    ],
    "logsBloom": "0x00000002000000100000000000800000000000000000400004020000100000000000000000000002000000000080000000000000000000000000000000000002000000000000000000000000000080000004000000001000000000000004000000000000000000000010000000000000100000000020000000000000000000000000000000000000000000000000000000000000001000000000000040000000000000000000000000000000000000000000000000000000000000000000000400400000800004000000000000000000000000000000020010000000000000000000000000000000000000000000008000000000000001000000000000000000",
    "root": null,
    "transactionHash": "0x948de6f242b4ed2638ff4874febfd824facec1e71907154f1532ea19f78f8b21",
    "transactionIndex": "0x0"
  }
}
```

到这里，我们已经成功新建了一个组。
从 `log` 中可知，新组的地址是: `0xce6cd8f8562e31d44b1101986204cec34b1df025`。

### 查询所有组信息

让我们查询一下所有组信息，看看是否添加成功，命令输入：

```shell
$ scm GroupManagement queryGroups
```

回执输出：

```json
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": "0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000002000000000000000000000000ffffffffffffffffffffffffffffffffff020009000000000000000000000000ce6cd8f8562e31d44b1101986204cec34b1df025"
}
```

可以看到 `0xce6cd8f8562e31d44b1101986204cec34b1df025` 已添加。

### 查询组名字

接着我们根据组地址，来查询组名字，输入命令：

```shell
$ scm Group queryName --address 0xce6cd8f8562e31d44b1101986204cec34b1df025
```

回执输出：

```json
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": "0x7770660000000000000000000000000000000000000000000000000000000000"
}
```

可以看到，结果和我们新建组的输入信息一致，厉害了。看看组内都有那些账户吧，输入命令：

### 查询组内账户

查询组账户

```shell
$ scm Group queryAccounts --address 0xce6cd8f8562e31d44b1101986204cec34b1df025
```

回执输出：

```json
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": "0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000002000000000000000000000000e1c4021742730ded647590a1686d5c4bfcbae0b000000000000000000000000045a50f45cb81c8aedeab917ea0cd3c9178ebdcae"
}
```

在新建组时添加的两个账户已经添加进来了。

### 查询子账户组信息

因为组之间是树型关系，所以我们也可以根据父组地址，查询子账户组的信息，命令如下：

查询子账户组的地址：

```shell
$ scm Group queryChild --address 0xfFFfFFFFFffFFfffFFFFfffffFffffFFfF020009
```

回执输出：

```json
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": "0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000001000000000000000000000000ce6cd8f8562e31d44b1101986204cec34b1df025"
}
```

### 查询子账户组个数

查询子账户组个数:

```shell
$ scm Group queryChildLength --address 0xfFFfFFFFFffFFfffFFFFfffffFffffFFfF020009
```

回执输出：

```json
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": "0x0000000000000000000000000000000000000000000000000000000000000001"
}
```

### 查询父账户组信息

反过来，我们也可以根据子账户组地址，来向上查询父账户组的信息，命令如下：

```shell
$ scm Group queryParent --address 0xce6cd8f8562e31d44b1101986204cec34b1df025
```

回执输出：

```json
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": "0x000000000000000000000000ffffffffffffffffffffffffffffffffff020009"
}
```

[cita-cli]: https://github.com/cryptape/cita-cli
[已使用地址列表]: ../addresses#已使用地址列表
[账户系统接口]: ../sys-contract-interface/interface#newgroup
[链级配置]: ../configuration-guide/chain-config
