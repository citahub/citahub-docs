---
id: version-20.2.1-quotalimit
title: 设置 Quota Limit
original_id: quotalimit
---

## 概述

无论是 Quota 模式还是 Charge 模式，系统都需要对区块内交易总体消耗的资源进行限制。当链进行初始化配置时 `checkQuota = True` 时，还可以对账户的单次交易消耗的资源消耗进行限制。设计目的是防止区块链网络发生蓄意攻击或资源滥用。

CITA 是通过配额管理合约实现对区块以及账户单笔交易 Quota 消耗上限的管理：

* 参数设置：
  * `BQL(BlockQuotaLimit)`：表示单个区块内全部交易可消耗的 quota 的上限，
  默认值为：0x40000000 (十进制表示为：1073741824)；
  最小可设置值为：0x10000000 (十进制表示为：268435456，即 2 的 28 次方)；
  最大可设置值为：0x7fffffffffffffff (十进制表示为：9223372036854775807，即 2 的 63 次方减 1)。
  * `AQL(AccountQuotaLimit)`：表示账户单笔交易可消耗的 quota 的上限，默认 268435456。此限制默认是关掉的，如需开启，需要在对链进行初始化配置时设置 `checkQuota = True`

* 操作：
  * 设置区块限额：BQL
  * 设置账户单笔交易限额：AQL
    * 默认的账户配额
    * 设置指定账号配额

## 操作示例

> 接下来的操作我们用 CITA-CLI 来演示

### 设置 BQL

确保你的链正常运行，查询默认块配额，进入 CITA-CLI 交互式模式，输入命令：

```shell
$ scm QuotaManager getBQL
```

输出：

```json
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": "0x0000000000000000000000000000000000000000000000000000000040000000"
}
```

超级管理员修改块配额，输入命令：

```shell
scm QuotaManager setBQL --quota-limit 0x0000000000000000000000000000000000000000000000000000000020000000 --admin-private 0x5f0258a4778057a8a7d97809bd209055b2fbafa654ce7d31ec7191066b9225e6
```

查询修改后的块配额：

```shell
$ scm QuotaManager getBQL
```

输出：

```json
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": "0x0000000000000000000000000000000000000000000000000000000020000000"
}
```

我们可以看到默认块 Quota 消耗上限已更新。

### 设置 AQL

确保你的链正常运行，查询默认账户配额，进入 cita-cli 交互式模式，输入命令：

```shell
$ scm QuotaManager getDefaultAQL
```

输出：

```json
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": "0x0000000000000000000000000000000000000000000000000000000010000000"
}
```

超级管理员修改账户配额， 输入命令：

```shell
$ scm QuotaManager setDefaultAQL --quota-limit 0x0000000000000000000000000000000000000000000000000000000020000000 --admin-private 0x5f0258a4778057a8a7d97809bd209055b2fbafa654ce7d31ec7191066b9225e6
```

查询修改后的账户配额：

```shell
$ scm QuotaManager getDefaultAQL
```

输出：

```json
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": "0x0000000000000000000000000000000000000000000000000000000020000000"
}
```

默认账户配额已更新。
