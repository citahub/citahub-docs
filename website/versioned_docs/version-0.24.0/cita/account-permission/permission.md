---
id: version-0.24.0-permission
title: 权限系统
original_id: permission
---

CITA 的权限系统对用户的操作进行控制，并支持基于角色的权限管理。

## 账户概述

查看[账户概述]。

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

### 权限系统操作

使用权限系统可进行的一些操作如下：

* 创建权限： 生成权限的标识，属性包含参数所表示的合约地址、函数签名及名称
* 更新权限： 修改权限的属性
* 删除权限： 删除权限
* 授予权限： 授予账户权限
* 取消授权： 撤销对目标账户某种权限

具体接口定义可查看[权限系统接口]。

### 权限系统配置

CITA 在起链的时候可以对权限系统进行配置，默认是关闭的（即没有权限检查）。有三个配置项：

* `checkCallPermission`: 表示对合约调用的权限进行检查
* `checkSendTxPermission`: 表示对发送交易的权限进行检查
* `checkCreateContractPermission` 表示对创建合约的权限进行检查

**注意：**

这里的 `checkCallPermission` 与 JSON-RPC 中的 Call 并不同， JSON-RPC 中的 Call 是指对链上数据的查询，是读数据而非写数据。而这里的`checkCallPermission` 是指通过发送交易的方式调用合约接口，是指写数据的操作。

更多信息查看[链级配置]。

### 系统内置权限

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

具体操作可查看[权限系统操作示例]。

[已使用地址列表]: ../ref/addresses#已使用地址列表
[权限系统接口]: ../system-contract-interface/permission-management
[权限系统操作示例]: ./permission-example
[账户概述]: ./account#账户概述
[链级配置]: ../operation/chain-config
