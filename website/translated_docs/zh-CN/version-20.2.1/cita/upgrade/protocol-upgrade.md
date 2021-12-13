---
id: version-20.2.1-protocol-upgrade
title: 协议升级
original_id: protocol-upgrade
---

## 流程说明

1. 待所有节点按照 [软件升级说明] 升级 CITA 版本完成后，链的超级管理员根据下文中的 **协议升级交易说明** 发送交易，实施协议升级。

2. 普通用户需要将使用的工具以及 SDK 升级至支持新版本协议的版本，这些内容也会在相关文档中详细描述。

> **注意**
>
>1. 超级管理员实施协议升级过程中，最好暂停一下业务。老的交易如果在协议升级生效之前进入交易池，协议升级生效之后才打包上链，将会在打包交易阶段报错，此时错误已经无法反馈给用户，
>   会给用户制造一些困扰。可以参考 [紧急制动]。
>2. 如果节点没有及时升级 CITA 版本，超级管理员实施协议升级之后，节点将停止工作，并可能会出现各种异常情况。
>3. 如果链实施完协议升级，但是普通用户没有及时升级工具和 SDK 版本。发送交易将会得到 `InvalidVersion` 错误。
>4. 使用支持新版本协议的 CITA 版本重新创建一条链，除非在生成链配置的时候指定协议版本号，否则默认使用该 CITA 支持的最新版本协议。

## 协议升级交易说明

CITA 中内置了专门的 `version_manager` 合约，存放一个单调递增的协议版本号，超级管理员发送交易变更版本号来， 激活硬分叉， 触发协议升级。

### 操作示例

> 接下来的测试，用 [cita-cli](https://github.com/citahub/cita-cli) 交互模式进行演示。

假设当前的协议版本号为 1，接下来演示超级管理员如何修改协议版本号：

确保你的链正常运行，并且拥有相应的权限，进入 cita-cli 交互式模式，输入命令：

```shell
$ scm VersionManager setVersion --version 2 --admin-private 0x5f0258a4778057a8a7d97809bd209055b2fbafa654ce7d31ec7191066b9225e6
```

查询交易回执无误后，就把协议版本号从 1 更改为 2。

#### 查询

输入命令：

```shell
scm VersionManager getVersion
```

输出：

```json
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": "0x0000000000000000000000000000000000000000000000000000000000000002"
}
```

可以看到，协议版本号成功修改为 2。

## 完整升级示例

1. 假设现在有一条正在运营的四节点 CITA v0.19 的链，当前使用的协议版本为 v0，每个节点对应一名运维人员， 共 4 名运维人员，还有一个超级管理员。
2. CITA v0.20 正式发布后， v0.20 支持 v0/v1 两个版本的协议。
3. 链的超级管理员通知 4 个节点的运维人员，可以开始升级 CITA v0.20 了，限期 10 天。
4. 4 个运维人员在这 10 天里的任何时间对自己维护的节点实施 `软件升级` CITA v0.20 的操作。所以这段时间 4 个共识节点会存在 v0.19 和 v0.20 混用的情况。这种情况没有任何问题，过程中业务也不会中断， 此时使用的依然是 v0 协议。
5. 10 天的期限结束。4 个节点都升级到 CITA v0.20 了。
6. 超级管理员开启紧急制动功能, 链的业务暂停，只有超级管理员可以发交易上链。
7. 超级管理员发交易，升级系统合约。我们提供了脚本 [scripts/amend_sys_cont_to_v0-20.sh](https://github.com/citahub/cita/blob/v0.20/scripts/amend_sys_cont_to_v0-20.sh) 辅助完成这项工作。
8. 超级管理员发送交易，将 `VersionManager` 系统合约中的 `version` 从 0 改为 1 ，完成 `协议升级`。
9. 超级管理员关闭紧急制动功能，链的业务恢复。
10. 至此，只有使用 v1 协议的交易才能发送上链，依然使用 v0 协议的交易，发送时将会返回错误。

## 协议说明

CITA 的每个协议版本都有专门的文档指南，说明支持该协议版本的最小 Release 版本号，该版本协议相对上一个版本的变化，以及实施协议升级的详细操作。

<!--DOCUSAURUS_CODE_TABS-->
<!--v0 协议-->

### v0 协议说明

CITA 从 v0.19 开始提供兼容性保证。除了一些特殊的情况，之前的 CITA 版本之间都不保证兼容性。

v0.19 之前的版本链升级 CITA 最新版本需要重新创建链，无法兼容链上的历史数据。v0 协议即 CITA v0.19 时实际使用的协议。

### 对应 RELEASE 版本

[v0.19] 及以上版本

### 协议变更

参考 [v0.19]

### 注意

交易中的 version 字段必须填 0（默认也是 0）。v0.19 并没有校验 version，填非 0 值也可以正常工作。 v0.20 增加了对 version 的校验。因此，如果用户之前发送过 version 不为 0 的交易，升级 v0.20 版本之后，查询这些交易或者新节点同步过程中可能会出现异常情况。可以通过快照方式解决，不影响协议升级操作。

[v0.19]: https://github.com/citahub/cita/releases/tag/v0.19

<!--v1 协议-->

### v1 协议说明

在 v1 之前的协议存在两个问题：

1. v0 协议 `Transaction` 结构中目标地址 `to` 字段类型为 `String`，即十六进制字符。但是链上存储时是按照 bytes 类型存储的。
因为字符大小写的问题，导致交易具有可变性，无法准确恢复出发送交易的地址。因此，在 v1 协议中，将目标地址的类型由 `String` 改为 `bytes`。

2. v0 协议 `Transaction` 结构中 `chain_id` 字段类型为 `u32`。每条链有唯一的 `chain_id`，但 `u32` 取值空间太小，
必须有中心化机构协调才能保证不会出现两条链的 `chain_id` 重复的情况。因此，在 v1 协议中，将`chain_id`的类型由 `u32` 改为 `bytes(u256)`。
这样链的运营方可以选择使用 uuid 或者随机的哈希值作为 `chain_id`，不需要中心化机构协调，也可以在很大概率上保证 `chain_id` 的唯一。

### 对应 RELEASE 版本

[v0.20] 及以上版本

### 协议变更

- Transaction 结构中增加 `to_v1` 字段，类型 `bytes`。在链的协议版本为 v1 时，原来 `to` 字段不再使用。
- Transaction 结构中增加 `chain_id_v1` 字段，类型 `bytes(u256)`。在链的协议版本为 v1 时，原来 `chain_id` 字段不再使用。
- Transaction 结构中的 `version` 字段必须填 1。

### 实施协议升级

1. 安排所有节点升级 CITA 版本至 v0.20 及以上版本。
2. 升级系统合约。参数是 `Admin`， `private key`， `chain id`， `version`， `url`， 其中 `version` 指当前链协议版本号。

> 注意：这里的参数仅作为演示使用，请实际操作时替换为目标链的相应参数

在 v0.20 及其子版本发布包中使用命令：

```shell
$ ./env.sh scripts/amend_sys_cont_to_v0-20.sh 0x5f0258a4778057a8a7d97809bd209055b2fbafa654ce7d31ec7191066b9225e6 1 0 http://127.0.0.1:1337
```

在 v0.21， v0.22 版本发布包中使用命令：

```shell
$ ./env.sh scripts/amend_system_contracts.sh 0x5f0258a4778057a8a7d97809bd209055b2fbafa654ce7d31ec7191066b9225e6 1 0 http://127.0.0.1:1337
```

在 v0.23 及以上版本发布包中使用命令：

```shell
$ bin/cita-env scripts/amend_system_contracts.sh 0x5f0258a4778057a8a7d97809bd209055b2fbafa654ce7d31ec7191066b9225e6 1 0 http://127.0.0.1:1337
```

> 注意： 如果过程中终端输出了错误信息，需要重新跑一遍脚本。

3. 使用超级管理员账户，执行如下 `协议升级` 命令

> 注意：这里的admin-private私钥仅作为演示使用，请实际操作时替换为目标链的实际私钥。

```shell
$ cita-cli scm VersionManager setVersion --admin-private 0x5f0258a4778057a8a7d97809bd209055b2fbafa654ce7d31ec7191066b9225e6 --version 1
```

4. 用户升级相关工具和 SDK 至明确支持 v1 协议的版本，具体请参见 SDK 和 工具的 RELEASE NOTES。

### 注意

1. 原来的 `to` 字段和 `chain_id` 字段一定不能填，否则会有交易可变性问题，协议升级之后有相关的检查，发现 `to` 字段和 `chain_id` 字段不为空就报错。
2. 因为跨链功能目前还没有正式使用，因此升级后相关工具将不再支持 v0 协议，只支持 v1 协议。

<!--v2 协议-->

### v2 协议说明

v2 之前的版本存在两个问题：

1. 使用自动执行功能时，coinbase 是地址默认值，并非共识节点地址。
2. Charge 模型下，对合约执行 `self-destruct` 操作，合约账户余额无法返还给 `refund account`。

所以我们在协议版本 v2 修复了以上两个问题。

1. 自动执行功能中的 `coinbase` 是该块对应的出块节点地址。
2. 对合约执行 `self-destruct` 操作后，合约账户有余额返还指定的 `refund account`。

### 对应 RELEASE 版本

[v0.24.0] 及其以上版本

### 实施协议升级

1. 安排所有节点升级 CITA 版本至 v0.24.0 及以上版本。
2. 若当前链的协议版本为 v0，**必须** 按照 `v1 协议` 升级说明，将链协议版本升级到 v1，并正常出块后， 才可执行 v2 的升级命令。
3. 使用超级管理员账户，执行如下协议升级命令。

> 注意：这里的 admin-private 私钥仅作为演示使用，请实际操作时替换为目标链的实际私钥。

```shell
$ cita-cli scm VersionManager setVersion --admin-private 0x5f0258a4778057a8a7d97809bd209055b2fbafa654ce7d31ec7191066b9225e6 --version 2
```

3. 用户升级相关工具和 SDK 至明确支持 v2 协议的版本，具体请参见 SDK 和 工具的 RELEASE NOTES。

<!--END_DOCUSAURUS_CODE_TABS-->

[软件升级说明]: ./software-upgrade
[升级文档操作指南]: ../system/version
[紧急制动]: ../special-govern/emg-brake
[v0.24.0]: https://github.com/citahub/cita/releases/tag/v0.24.0
[v0.20]: https://github.com/citahub/cita/releases/tag/v0.20
