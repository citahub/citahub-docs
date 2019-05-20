---
id: version-0.24.0-sys-contracts
title: 系统合约
original_id: sys-contracts
---

CITA 链生成时，通过系统合约来生成创世块，并作为链的最基本配置。管理员可以发送交易修改创世块的部分配置，所以了解系统合约至关重要。 你可以在 `/scripts/contracts/src` 目录下查看所有的系统合约，当然，接下来我们会一一解释。

另外在 `test-chain/template/contracts/docs` 目录（`test-chain` 为默认链名称）提供了所有系统合约函数签名，感兴趣的朋友可以自行查阅。

## 节点管理

按照[快速搭链](../getting-started)的步骤，生成的链默认包含四个节点。 如果需要增加或是删除共识节点的话，管理员可以通过修改节点配置文件并发送交易来完成。

节点管理合约存放在`/scripts/contracts/src/system/node_manager.sol`， 地址是 `0xffffffffffffffffffffffffffffffffff020001`的。

相关描述见[节点管理](./node)。

## 配额管理

配额用来支付 CITA 虚拟机运行交易。 CITA 中关于配额，有两个限制 BQL(BlockQuotaLimit) 和 AQL(AccountQuotaLimit)，分别表示区块的配额上限和用户配额上限。 管理员可以通过发交易给配额管理合约来做自定义修改。

配额管理合约存放在 `/scripts/contracts/src/system/quota_manager.sol`， 地址是 `0xffffffffffffffffffffffffffffffffff020003`。

相关描述见[配额模式](./quota)。

## 配额价格管理

CITA 类似于高速行驶的汽车，那么 `quota` 就是消耗的汽油，当然 `quota` 也是有价格的，我们用 `quotaPrice` 来表示它。 管理员可以通过向配额价格管理系统合约发送交易来自定义修改。

配额管理合约存放在 `/scripts/contracts/src/system/price_management.sol`， 地址是 `0xffffffffffffffffffffffffffffffffff020010`。

相关描述见[配额价格管理](./price)。

## 权限系统

CITA 是一个面向企业级应用的区块链平台，严格的权限管理必不可少。我们提供了完整的权限管理接口，覆盖了企业级应用最常见的权限场景。

权限系统相关合约存放在 `/scripts/contracts/src/permission_management` 文件夹下， 使用地址是 `0xffffffffffffffffffffffffffffffffff020004`。

相关描述见[权限系统](../account-permission/permission)。

## 账户系统

CITA 为了方便对账户的管理，实现了基于组的账户系统，可以选择对组以及对组内用户进行增删改查。

账户系统相关合约存放在 `/scripts/contracts/src/user_management/group_management.sol`， 使用地址是 `0xffffffffffffffffffffffffffffffffff02000a`。

相关描述见[账户系统](../account-permission/account)。

## 批量交易

CITA 支持批量调用合约。

批量交易合约存放在 `/scripts/contracts/src/system/batch_tx.sol`， 地址是 `0xffffffffffffffffffffffffffffffffff02000e`。

相关描述见[批量交易](./batch-tx)。

## 紧急制动

在极端情况下，管理员可以通过向紧急制动系统合约发送交易，开启紧急制动模式，之后链只接受管理员发送的交易，屏蔽掉其他所有交易。

紧急制动合约存放在 `scripts/contracts/src/system/emergency_brake.sol`， 地址是 `0xffffffffffffffffffffffffffffffffff02000f`。

相关描述见[紧急制动](../special-govern/emg-brake)。

## 协议号管理

CITA 依旧在快速迭代，考虑到未来可能存在的兼容性问题，减少对现有客户的影响，我们增加了协议号管理系统合约。

协议号管理系统合约存放在 `scripts/contracts/src/system/version_manager.sol`， 地址是　`0xffffffffffffffffffffffffffffffffff020011`。

相关描述见[协议版本管理](./version)。

## 自动执行

CITA 提供一种仅供管理员使用的交易自动执行的功能。当打开自动执行开关时，管理员就可以注册一个已部署合约，其特定函数在每一个块中都会自动执行。

自动执行系统合约存放在 `scripts/contracts/src/system/auto_exec.sol`， 地址是　`0xffffffffffffffffffffffffffffffffff020013`。

相关描述见[自动执行](./auto-exec)。