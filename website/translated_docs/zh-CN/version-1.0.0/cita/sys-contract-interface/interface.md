---
id: version-1.0.0-interface
title: 接口列表
original_id: interface
---

## 超级管理员合约

### admin

查询当前的超级管理员账户地址

* 参数
    
    空

* 返回值
    
    `address` - 管理员地址

### isAdmin

判断账户是否是超级管理员

* 参数
    
    `address` - 待判断的超级管理员地址

* 返回值
    
    `bool` - 是管理员则为真，反之则反

### update

更新超级管理员账户

* 参数
    
    `address` - 待更新的超级管理员地址

* 返回值
    
    `bool` - 更新成功则为真，反之则反

## 所有组合约

### queryGroups

查询当前所有组

* 参数
    
    空

* 返回值
    
    `address[]` - 组地址列表

## 授权管理合约

### queryPermissions

查询账户拥有的权限

* 参数
    
    `address` - 待查询的账户地址

* 返回值
    
    `address[]` - 权限地址列表

### queryAccounts

查询拥有某个权限的所有账户

* 参数
    
    `address` - 待查询的权限地址

* 返回值
    
    `address[]` - 账户地址列表

### queryAllAccounts

查询拥有权限的所有账户

* 参数
    
    `address` - 待查询的权限地址

* 返回值
    
    `address[]` - 账户地址列表

### checkResource

> 废弃

### checkPermission

* 参数
    
    `address` - 待判断的账户地址 `address` - 待判断的权限地址

* 返回值
    
    `bool` - 账户拥有权限则为真，反之则反

## 自动执行合约

### register

注册自动执行合约，只能超级管理员调用，新注册的地址会覆盖旧地址。

* 参数
    
    `address` - 待注册的自动执行合约地址

* 返回值
    
    空

### autoExec

仅供底层调用的接口，不对用户开放。

* 参数
    
    空

* 返回值
    
    空

### contAddr

* 参数
    
    空

* 返回值
    
    `address` - 已注册的自动执行合约地址

## 批量交易合约

### multiTxs

通过一定的数据组装规则，可以在一个交易中多次调用合约

* 参数
    
    `bytes` - 批量交易的数据

* 返回值
    
    空

## 紧急制动合约

### setState

开启紧急制动模式。

* 参数
    
    `bool` - 制动模式状态

* 返回值
    
    空

* 示例

```shell
$ cita-cli scm EmergencyBrake setState \
    --state true \
    --admin-private 0x5f0258a4778057a8a7d97809bd209055b2fbafa654ce7d31ec7191066b9225e6 \
    --url http://127.0.0.1:1337
```

## 组管理合约

### newGroup

创建一个用户组。

* 参数
    
    `address` - The sender's origin group
    
    `bytes32` - The name of group
    
    `address[]` - The accounts of group

* 返回值
    
    `address` - The group address

* 示例

```shell
$ scm GroupManagement newGroup \
      --origin 0xfFFfFFFFFffFFfffFFFFfffffFffffFFfF020009 \
      --name 7770660000000000000000000000000000000000000000000000000000000000 \
      --accounts "[e1c4021742730ded647590a1686d5c4bfcbae0b0,45a50f45cb81c8aedeab917ea0cd3c9178ebdcae]" \
      --private-key 0x5f0258a4778057a8a7d97809bd209055b2fbafa654ce7d31ec7191066b9225e6
```

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

从 log 中可知，新用户组的地址是: 0xce6cd8f8562e31d44b1101986204cec34b1df025

### deleteGroup

删除用户组。

* 参数
    
    `address` - The sender's orgin group
    
    `address` - The target group to be deleted

* 返回值
    
    `bool` - True, if successfully, otherwise false.

* 示例

```shell
$ scm GroupManagement deleteGroup \
        --origin 0xfFFfFFFFFffFFfffFFFFfffffFffffFFfF020009 \
        --target 0xce6cd8f8562e31d44b1101986204cec34b1df025 \
         --private-key 0x5f0258a4778057a8a7d97809bd209055b2fbafa654ce7d31ec7191066b9225e6 \
```

### updateGroupName

更新用户组名称。

* 参数
    
    `address` - The sender's orgin group
    
    `address` - The target group
    
    `bytes32` - The new name to be updated

* 返回值
    
    `bool` - True, if successfully, otherwise false.

* 示例

```shell
$ scm GroupManagement updateGroupName \
        --origin 0xfFFfFFFFFffFFfffFFFFfffffFffffFFfF020009 \ --target 0xce6cd8f8562e31d44b1101986204cec34b1df025 \
        --name 8880660000000000000000000000000000000000000000000000000000000000 \
        --private-key 0x5f0258a4778057a8a7d97809bd209055b2fbafa654ce7d31ec7191066b9225e6 \
```

### addAccounts

添加用户。

* 参数
    
    `address` - The sender's orgin group
    
    `address` - The target group
    
    `address[]` - The accounts to be added

* 返回值
    
    `bool` - True, if successfully, otherwise false.

* 示例e

```shell
 $ scm GroupManagement addAccounts \
         --origin 0xfFFfFFFFFffFFfffFFFFfffffFffffFFfF020009 \ --target 0xce6cd8f8562e31d44b1101986204cec34b1df025 \
         --accounts '[887d3378018c45ec72bed1947d34ac59a4402ddb,f7636f910e2fff0014d693498fe43d2e539b8742]' \
          --private-key 0x5f0258a4778057a8a7d97809bd209055b2fbafa654ce7d31ec7191066b9225e6 \
```

### deleteAccounts

删除用户。

* 参数
    
    `address` - The sender's orgin group
    
    `address` - The target group
    
    `address[]` - The accounts to be deleted

* 返回值
    
    `bool` - True, if successfully, otherwise false.

* 示例

```shell
$ scm GroupManagement deleteAccounts \
        --origin 0xfFFfFFFFFffFFfffFFFFfffffFffffFFfF020009 \
        --target 0xce6cd8f8562e31d44b1101986204cec34b1df025 \
        --accounts '[887d3378018c45ec72bed1947d34ac59a4402ddb,f7636f910e2fff0014d693498fe43d2e539b8742]' \
        --private-key 0x5f0258a4778057a8a7d97809bd209055b2fbafa654ce7d31ec7191066b9225e6 \
```

### checkScope

* 参数
    
    `address` - The sender's orgin group
    
    `address` - The target group

* 返回值
    
    `bool` - True, if successfully, otherwise false.

* 示例

```shell
$ scm GroupManagement checkScope \
        --origin 0xfFFfFFFFFffFFfffFFFFfffffFffffFFfF020009 \
        --target 0xce6cd8f8562e31d44b1101986204cec34b1df025 \
```

### queryGroups

查询所有组。

* 参数
    
    空

* 返回值
    
    `address[]` - All groups address

* 示例

```shell
$ scm GroupManagement queryGroups
```

## 组合约

### queryInfo

查询组信息。

* 参数
    
    `address` - The group address

* 返回值
    
    `bytes32` - The name of group
    
    `address[]` - The accounts of group

* 示例

```shell
$ scm Group queryInfo --address 0xce6cd8f8562e31d44b1101986204cec34b1df025
```

### queryName

查询组名字。

* 参数
    
    `address` - The group address

* 返回值
    
    `bytes32` - The name of group

* 示例

```shell
$ scm Group queryName --address 0xce6cd8f8562e31d44b1101986204cec34b1df025
```

### queryAccounts

查询组内所有用户。

* 参数
    
    `address` - The group address

* 返回值
    
    `address[]` - All accounts address

* 示例

```shell
$ scm Group queryAccounts --address 0xce6cd8f8562e31d44b1101986204cec34b1df025
```

### queryChild

查询子组。

* 参数
    
    `address` - The group address

* 返回值
    
    `address` - The children of group

* 示例

```shell
$ scm Group queryChild --address 0xfFFfFFFFFffFFfffFFFFfffffFffffFFfF020009
```

### queryChildLength

查询子组个数。

* 参数
    
    `address` - The group address

* 返回值
    
    `uint` - The number of the children group

* 示例

```shell
$ scm Group queryChildLength --address 0xfFFfFFFFFffFFfffFFFFfffffFffffFFfF020009
```

### queryParent

查询父组。

* 参数
    
    `address` - The group address

* 返回值
    
    `address` - The parent of the group

* 示例

```shell
$ scm Group queryParent --address 0xce6cd8f8562e31d44b1101986204cec34b1df025
```

### inGroup

查询账户是否在组内。

* 参数
    
    `address` - 待查询账户

* 返回值
    
    `bool` - 如果在组内则返回真，反之则反

* 示例

```shell
$ scm Group inGroup \
        --account 0xce6cd8f8562e31d44b1101986204cec34b1df025 \
        --address 0xffffffffffffffffffffffffffffffffff020009
```

## 共识节点

### approveNode

确认共识节点。

* 参数
    
    `address` - The new node address

* 返回值
    
    `bool` - True, if successfully, otherwise false

* 示例

```shell
$ scm NodeManager approveNode \
        --address 0x59a316df602568957f47973332f1f85ae1e2e75e \
        --admin-private 0x5f0258a4778057a8a7d97809bd209055b2fbafa654ce7d31ec7191066b9225e6
```

### deleteNode

删除共识节点。

* 参数
    
    `address` - The node address

* 返回值
    
    `bool` - True, if successfully, otherwise false

* 示例

```shell
$ scm NodeManager deleteNode \
        --address 0x59a316df602568957f47973332f1f85ae1e2e75e \
        --admin-private 0x5f0258a4778057a8a7d97809bd209055b2fbafa654ce7d31ec7191066b9225e6
```

### listNode

共识节点列表。

* 参数
    
    空

* 返回值
    
    `address[]` - The consensus nodes

* 示例

```shell
$ scm NodeManager listNode
```

### setStake

设置共识节点 stake 。

* 参数
    
    `address` - The node address to be setted.
    
    `uint64` - The stake to be setted.

* 返回值
    
    `bool` - True, if successfully, otherwise false.

* 示例

```shell
$ scm NodeManager setStake \
        --address 0xae0f69a2d95146d104365e0502a0d521717ced7f \
        --stake 0000000000000000000000000000000000000000000000000000000000000002 \
        --admin-private 0x5f0258a4778057a8a7d97809bd209055b2fbafa654ce7d31ec7191066b9225e6
```

### getStatus

获取共识节点状态。

* 参数
    
    `address` - The node address

* 返回值
    
    `uint8` - 0: closed, 1: started

* 示例

```shell
$ scm NodeManager getStatus --address 0xae0f69a2d95146d104365e0502a0d521717ced7f
```

### listStake

共识节点 stake 列表。

* 参数
    
    空

* 返回值
    
    `uint64[]` - The node stakes list

* 示例

```shell
$ scm NodeManager listStake
```

### stakePermillage

共识节点出块权重千分比。（目前只对 Charge 模型开放）

* 参数
    
    `address` - The node address

* 返回值
    
    `uint64` - The node stake permillage

* 示例

```shell
$ scm NodeManager stakePermillage --address 0xae0f69a2d95146d104365e0502a0d521717ced7f
```

## 权限系统合约

### newPermission

创建新权限。

* 参数
    
    `bytes32` - The permission name
    
    `address[]`- The contracts of resource
    
    `bytes4[]` - The function signature of the resource

* 返回值
    
    `address` - New permission's address.

* 示例

```shell
$ scm PermissionManagement newPermission \
        --name 0000000000000000000000000000000000000000000000000000000060fe47b1 \
        --contracts '[5839153e0efe76efe0c974b728c4f49ca7ed75cc]' \
        --function-hashes '[60fe47b1]' \
        --private-key 0x5f0258a4778057a8a7d97809bd209055b2fbafa654ce7d31ec7191066b9225e6\
```

获取回执：

```shell
$ rpc getTransactionReceipt --hash 0x2bf039eeeefbfb0724fcdebdcbc74de0f3b61e0212279981b548c9884f018b8f
```

输出：

```json
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": {
    "blockHash": "0xd2e2d34783d9d30505ed23d90dca7c11ce42eda99306a153ad9e72095832ba26",
    "blockNumber": "0x583d",
    "contractAddress": null,
    "cumulativeQuotaUsed": "0x1b25fd",
    "errorMessage": null,
    "quotaUsed": "0x1b25fd",
    "logs": [
      {
        "address": "0xca645d2b0d2e4c451a2dd546dbd7ab8c29c3dcee",
        "blockHash": "0xd2e2d34783d9d30505ed23d90dca7c11ce42eda99306a153ad9e72095832ba26",
        "blockNumber": "0x583d",
        "data": "0x0000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000010000000000000000000000005839153e0efe76efe0c974b728c4f49ca7ed75cc000000000000000000000000000000000000000000000000000000000000000160fe47b100000000000000000000000000000000000000000000000000000000",
        "logIndex": "0x0",
        "topics": [
          "0xb533e8b79dc7485ba7e4435e3395df911c1a3c767225941003d88a7812d216f7"
        ],
        "transactionHash": "0x2bf039eeeefbfb0724fcdebdcbc74de0f3b61e0212279981b548c9884f018b8f",
        "transactionIndex": "0x0",
        "transactionLogIndex": "0x0"
      },
      {
        "address": "0xffffffffffffffffffffffffffffffffff020005",
        "blockHash": "0xd2e2d34783d9d30505ed23d90dca7c11ce42eda99306a153ad9e72095832ba26",
        "blockNumber": "0x583d",
        "data": "0x0000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000010000000000000000000000005839153e0efe76efe0c974b728c4f49ca7ed75cc000000000000000000000000000000000000000000000000000000000000000160fe47b100000000000000000000000000000000000000000000000000000000",
        "logIndex": "0x1",
        "topics": [
          "0x792f7322d94960c6e90863b5aef39075ca54620cfa13a822081d733f79c48f91",
          "0x000000000000000000000000ca645d2b0d2e4c451a2dd546dbd7ab8c29c3dcee",
          "0x0000000000000000000000000000000000000000000000000000000060fe47b1"
        ],
        "transactionHash": "0x2bf039eeeefbfb0724fcdebdcbc74de0f3b61e0212279981b548c9884f018b8f",
        "transactionIndex": "0x0",
        "transactionLogIndex": "0x1"
      }
    ],
    "logsBloom": "0x00000000000000020000000000000000000000000000008000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000080000000000000000040000000000000000040000000000000000001000000000000000000000000000000000000000000000000008000000800000000004000000000000000000000000000000000000000000000000000000000000000000000000000000000080000000000200000000000000000000000000000000000000000000000000000000000000000000100000000000000000000100000000000000000000000000000800000002000000000000100000000100000",
    "root": null,
    "transactionHash": "0x2bf039eeeefbfb0724fcdebdcbc74de0f3b61e0212279981b548c9884f018b8f",
    "transactionIndex": "0x0"
  }
}
```

从 logs[0] 中获得新权限的地址为 `0xca645d2b0d2e4c451a2dd546dbd7ab8c29c3dcee`

### deletePermission

删除权限。

* 参数
    
    `address` - The permission address

* 返回值
    
    `bool` - True, if successfully, otherwise false.

* 示例

### updatePermissionName

更新权限名称。

* 参数
    
    `address` - The permission address
    
    `bytes32` - The permission name

* 返回值
    
    `bool` - True, if successfully, otherwise false.

* 示例

```shell
 $ scm PermissionManagement updatePermissionName \
        --permission 0xca645d2b0d2e4c451a2dd546dbd7ab8c29c3dcee \
        --name 0000000000000000000000000000000000000000000000000000000060fe47b2 \
        --private-key 0x5f0258a4778057a8a7d97809bd209055b2fbafa654ce7d31ec7191066b9225e6
```

### addResources

添加资源。

* 参数
    
    `address` - The permission address
    
    `address[]` - The contracts of resource
    
    `bytes4[]` - The function signature of resource

* 返回值
    
    `bool` - True, if successfully, otherwise false.

* 示例

```shell
$ scm PermissionManagement addResources \
        --permission 0xca645d2b0d2e4c451a2dd546dbd7ab8c29c3dcee \
        --contracts '[1e041ec9a18590924d84a1f011eb0749c03fc41a]' \
        --function-hashes '[60fe47b1]' \
        --private-key 0x5f0258a4778057a8a7d97809bd209055b2fbafa654ce7d31ec7191066b9225e6
```

### deleteResources

删除资源。

* 参数
    
    `address` - The permission address
    
    `address[]` - The contracts of resource
    
    `bytes4[]` - The function signature of resource

* 返回值
    
    `bool` - True, if successfully, otherwise false.

* 示例

```shell
$ scm PermissionManagement deleteResources \
        --permission 0xca645d2b0d2e4c451a2dd546dbd7ab8c29c3dcee \
        --contracts '[1e041ec9a18590924d84a1f011eb0749c03fc41a]' \
        --function-hashes '[60fe47b1]' \
        --private-key 0x5f0258a4778057a8a7d97809bd209055b2fbafa654ce7d31ec7191066b9225e6
```

### setAuthorizations

多次授权。

* 参数
    
    `address` - The account to be setted
    
    `address[]` - The permissions to be setted

* 返回值
    
    `bool` - True, if successfully, otherwise false.

* 示例

```shell
$ scm PermissionManagement setAuthorizations \
    --permissions '[ffffffffffffffffffffffffffffffffff021000,ffffffffffffffffffffffffffffffffff021001]' \
    --account 0x37d1c7449bfe76fe9c445e626da06265e9377601 \
    --private-key 0x5f0258a4778057a8a7d97809bd209055b2fbafa654ce7d31ec7191066b9225e6
```

### setAuthorization

授权。

* 参数
    
    `address` - The account to be setted
    
    `address` - The permission to be setted

* 返回值
    
    `bool` - True, if successfully, otherwise false.

* 示例

```shell
$ scm PermissionManagement setAuthorization \
        --permission 0xca645d2b0d2e4c451a2dd546dbd7ab8c29c3dcee \
        --account 0x37d1c7449bfe76fe9c445e626da06265e9377601 \
        --private-key 0x5f0258a4778057a8a7d97809bd209055b2fbafa654ce7d31ec7191066b9225e6
```

### cancelAuthorizations

取消多次授权。

* 参数
    
    `address` - The account address
    
    `address[]` - The permissions to be canceled

* 返回值
    
    `bool` - True, if successfully, otherwise false.

* 示例

```shell
$ scm PermissionManagement cancelAuthorizations \
    --permissions '[ffffffffffffffffffffffffffffffffff021000,ffffffffffffffffffffffffffffffffff021001]' \
    --account 0x37d1c7449bfe76fe9c445e626da06265e9377601 \
    --private-key 0x5f0258a4778057a8a7d97809bd209055b2fbafa654ce7d31ec7191066b9225e6
```

### cancelAuthorization

取消授权

* 参数
    
    `address` - The account address
    
    `address` - The permission to be canceled

* 返回值
    
    `bool` - True, if successfully, otherwise false.

* 示例

```shell
$ scm PermissionManagement cancelAuthorization \
        --permission 0xca645d2b0d2e4c451a2dd546dbd7ab8c29c3dcee \
        --account 0x37d1c7449bfe76fe9c445e626da06265e9377601 \
        --private-key 0x5f0258a4778057a8a7d97809bd209055b2fbafa654ce7d31ec7191066b9225e6
```

### clearAuthorization

取消账户的所有授权。

* 参数
    
    `address` - The account's address

* 返回值
    
    `bool` - True, if successfully, otherwise false.

## 权限合约

### inPermission

检查资源是否在权限中

* 参数
    
    `address` - 资源的合约地址
    
    `bytes4` - 资源的函数签名

* 返回值
    
    `bool` - 成功返回为真，反之则反

* 示例

```shell
$ scm Permission inPermission \
        --contract 0x1e041ec9a18590924d84a1f011eb0749c03fc41a \
        --function-hash 0x60fe47b1 \
        --permission 0xca645d2b0d2e4c451a2dd546dbd7ab8c29c3dcee \
```

输出：

```json
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": "0x0000000000000000000000000000000000000000000000000000000000000001"
}
```

### queryInfo

查询权限信息，包括权限名称及包含的资源列表

* 参数
    
    空

* 返回值
    
    `bytes32` - 权限名称
    
    `address[]` - 所包含资源的合约地址列表
    
    `bytes4[]` - 所包含资源的函数签名列表

* 示例

```shell
$ scm Permission queryInfo --permission 0xca645d2b0d2e4c451a2dd546dbd7ab8c29c3dcee
```

输出：

```json
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": "0x0000000000000000000000000000000000000000000000000000000060fe47b2000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000c000000000000000000000000000000000000000000000000000000000000000020000000000000000000000005839153e0efe76efe0c974b728c4f49ca7ed75cc0000000000000000000000001e041ec9a18590924d84a1f011eb0749c03fc41a000000000000000000000000000000000000000000000000000000000000000260fe47b10000000000000000000000000000000000000000000000000000000060fe47b100000000000000000000000000000000000000000000000000000000"
}
```

### queryName

查询权限的名称

* 参数
    
    空

* 返回值
    
    `bytes32` - 权限名称

* 示例

```shell
$ scm Permission queryName --permission 0xca645d2b0d2e4c451a2dd546dbd7ab8c29c3dcee
```

输出：

```json
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": "0x0000000000000000000000000000000000000000000000000000000060fe47b2"
}
```

### queryResource

查询权限的资源

* 参数
    
    空

* 返回值
    
    `bool` - True, if successfully, otherwise false.
    
    `address[]` - 所包含资源的合约地址列表
    
    `bytes4[]` - 所包含资源的函数签名列表

* 示例

```shell
$ scm Permission queryResource --permission 0xca645d2b0d2e4c451a2dd546dbd7ab8c29c3dcee
```

输出：

```json
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": "0x000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000020000000000000000000000005839153e0efe76efe0c974b728c4f49ca7ed75cc0000000000000000000000001e041ec9a18590924d84a1f011eb0749c03fc41a000000000000000000000000000000000000000000000000000000000000000260fe47b10000000000000000000000000000000000000000000000000000000060fe47b100000000000000000000000000000000000000000000000000000000"
}

```

## 配额管理

### setBQL

设置区块配额上限。

* 参数
    
    `uint` - The value to be setted

* 返回值
    
    `bool` - True, if successfully, otherwise false.

* 示例

```shell
$ scm QuotaManager setBQL \
        --quota-limit 0x0000000000000000000000000000000000000000000000000000000020000000 \
        --admin-private 0x5f0258a4778057a8a7d97809bd209055b2fbafa654ce7d31ec7191066b9225e6 \
```

### setDefaultAQL

设置默认账号配额上限

* 参数
    
    空

* 返回值
    
    `uint` - The value

* 示例

```shell
$ scm QuotaManager setDefaultAQL \
    --quota-limit 0x0000000000000000000000000000000000000000000000000000000020000000 \
    --admin-private 0x5f0258a4778057a8a7d97809bd209055b2fbafa654ce7d31ec7191066b9225e6 \
```

### setAQL

设置指定账号配额上限。

* 参数
    
    `uint` - The value to be setted

* 返回值
    
    `bool` - True, if successfully, otherwise false.

* 示例

```shell
$ scm QuotaManager setAQL \
    --quota-limit 0x0000000000000000000000000000000000000000000000000000000020000000 \
    --admin-private 0x5f0258a4778057a8a7d97809bd209055b2fbafa654ce7d31ec7191066b9225e6 \
```

### getAccounts

查询所有指定账号。

* 参数
    
    空

* 返回值
    
    `address[]` - The accounts that have AQL

* 示例

```shell
$ scm QuotaManager getAccounts
```

### getQuotas

查询所有指定账号的配额上限。

* 参数
    
    空

* 返回值
    
    `uint[]` - The accounts' quotas

* 示例

```shell
$ scm QuotaManager getQuotas
```

### getBQL

查询默认块配额。

* 参数
    
    空

* 返回值
    
    `uint` - The value

* 示例

```shell
$ scm QuotaManager getBQL
```

```json
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": "0x0000000000000000000000000000000000000000000000000000000040000000"
}
```

### getDefaultAQL

查询默认账户配额。

* 参数
    
    空

* 返回值
    
    `uint` - The value

* 示例

```shell
$ scm QuotaManager getDefaultAQL
```

```json
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": "0x0000000000000000000000000000000000000000000000000000000010000000"
}
```

### getAQL

查询某一账户配额。

* 参数
    
    `address` - The account address

* 返回值
    
    `uint` - The account quota value

* 示例

```shell
$ scm QuotaManager getAQL --address 0x4b5ae4567ad5d9fb92bc9afd6a657e6fa13a2523
```

```json
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": "0x0000000000000000000000000000000000000000000000000000000040000000"
}
```

### getAutoExecQL

查询自动执行配额限制。

* 参数
    
    None

* 返回值
    
    `uint` - The autoExec quota limit value

## 配额价格管理合约

### setQuotaPrice

设置 `quota price`，默认为 1。

* 参数
    
    `uint` - The setting quota price

* 返回值
    
    `bool` - True if success,other false.

* 示例

```shell
$ cita-cli scm PriceManager setQuotaPrice \
              --admin-private 0x5f0258a4778057a8a7d97809bd209055b2fbafa654ce7d31ec7191066b9225e6 \
              --price 0x0000000000000000000000000000000000000000000000000000000000000002
```

### getQuotaPrice

查询当前链 quota price。

* 参数
    
    空

* 返回值
    
    `uint` - The quota price

* 示例

```shell
$ cita-cli scm PriceManager getQuotaPrice
```

输出：

```json
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": "0x0000000000000000000000000000000000000000000000000000000000000002"
}

```

## 角色授权合约

### queryRoles

查询某一账户的所有角色。

* 参数
    
    `address` - 待查询的账户地址

* 返回值
    
    `address[]` - 拥有的角色列表

* 示例

```shell
$ scm RoleManagement queryRoles --account 0x101e99e1a654a99308175042aff4833a6528be74
```

输出：

```json
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": "0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000002000000000000000000000000558c280233cee856fb53931eb18747a40e688a430000000000000000000000001be912bdfe6ae5d28f7e9d2f1a5329788e5a4fe6"
}
```

### queryAccounts

查询某一角色下的所有账户。

* 参数
    
    `address` - 角色地址

* 返回值
    
    `address[]` - 拥有此角色的所有账户

* 示例

```shell
$ scm RoleManagement queryAccounts --address 0x558c280233cee856fb53931eb18747a40e688a43
```

输出：

```json
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": "0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000001000000000000000000000000101e99e1a654a99308175042aff4833a6528be74"
}
```

## 角色管理合约

### newRole

新建角色。

* 参数
    
    `bytes32` - The role name
    
    `address[]` - The permissions

* 返回值
    
    `address` - The role address

* 示例

```shell
$ scm RoleManagement newRole \
        --name 73747564656e7400000000000000000000000000000000000000000000000000 \
        --permissions '[ca645d2b0d2e4c451a2dd546dbd7ab8c29c3dcee, 1acec7eaba22b46ba5d2a7c0bfc94a7741dfd32b]' \
        --private-key 0x5f0258a4778057a8a7d97809bd209055b2fbafa654ce7d31ec7191066b9225e6
```

回执输出：

```json
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": {
    "blockHash": "0x156f87e4bf3563df3ea500ba3334bd873c1d3bbc749da5b899c14bd7ae00d3a6",
    "blockNumber": "0x21096",
    "contractAddress": null,
    "cumulativeQuotaUsed": "0x172c46",
    "errorMessage": null,
    "logs": [
      {
        "address": "0x558c280233cee856fb53931eb18747a40e688a43",
        "blockHash": "0x156f87e4bf3563df3ea500ba3334bd873c1d3bbc749da5b899c14bd7ae00d3a6",
        "blockNumber": "0x21096",
        "data": "0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000002000000000000000000000000ca645d2b0d2e4c451a2dd546dbd7ab8c29c3dcee0000000000000000000000001acec7eaba22b46ba5d2a7c0bfc94a7741dfd32b",
        "logIndex": "0x0",
        "topics": [
          "0x5f961877a57fd34379ca2259585e1bf0392c0fa570593a4109a903898a993ec4",
          "0x73747564656e7400000000000000000000000000000000000000000000000000"
        ],
        "transactionHash": "0x61bc2da013ffea0e45f03d72103c1ec75dedeb74452b2fc465c478d58f43a420",
        "transactionIndex": "0x0",
        "transactionLogIndex": "0x0"
      },
      {
        "address": "0xffffffffffffffffffffffffffffffffff020008",
        "blockHash": "0x156f87e4bf3563df3ea500ba3334bd873c1d3bbc749da5b899c14bd7ae00d3a6",
        "blockNumber": "0x21096",
        "data": "0x",
        "logIndex": "0x1",
        "topics": [
          "0x8b0dfb31766ab53d2fb03166733d946b844f4b2da0ebce4b2b9323b8c5342e6c",
          "0x000000000000000000000000558c280233cee856fb53931eb18747a40e688a43",
          "0x73747564656e7400000000000000000000000000000000000000000000000000",
          "0x974d92309b0f7ddca104ffdda1ab73bb341d7aeded49a4a0f61f294e8b8bea6a"
        ],
        "transactionHash": "0x61bc2da013ffea0e45f03d72103c1ec75dedeb74452b2fc465c478d58f43a420",
        "transactionIndex": "0x0",
        "transactionLogIndex": "0x1"
      }
    ],
    "logsBloom": "0x00000000008000000000000000000000020000000000000000000000000000000000000000000008000000000000004000000000000000000004000000000000000000000000000000000000000000000000010000000000080000000000000000000000080000000000000000000000000000800000000008000000000000000000000800000000000000000000000000000001080000000000000000000102000080000000000000000000000000000000000000000000000000000000000000000000000000000000800000000000000000000000002002010000000000000000000800000000000000000000000000000000000000000000000000000000",
    "quotaUsed": "0x172c46",
    "root": null,
    "transactionHash": "0x61bc2da013ffea0e45f03d72103c1ec75dedeb74452b2fc465c478d58f43a420",
    "transactionIndex": "0x0"
  }
}
```

从 log topic[1] 中找到新的角色合约地址：`0x000000000000000000000000558c280233cee856fb53931eb18747a40e688a43`

### updateRoleName

更新角色名称。

* 参数
    
    `bytes32` - The role name
    
    `address` - The role address

* 返回值
    
    `bool`

* 示例

```shell
$ scm RoleManagement updateRoleName \
        --name 0000000000000000000000000000000000000000000000000000000060fe47b1 \
        --address 0x558c280233cee856fb53931eb18747a40e688a43 \
        --private-key 0x5f0258a4778057a8a7d97809bd209055b2fbafa654ce7d31ec7191066b9225e6
```

### addPermissions

为角色添加权限。

* 参数
    
    `address` - The role address
    
    `address[]` - The role permissions

* 返回值
    
    `bool`

* 示例

```shell
$ scm RoleManagement addPermissions \
        --address 0x558c280233cee856fb53931eb18747a40e688a43 \
        --permissions '[558c280233cee856fb53931eb18747a40e688a43]' \
        --private-key 0x5f0258a4778057a8a7d97809bd209055b2fbafa654ce7d31ec7191066b9225e6
```

### deletePermissions

删除权限。

* 参数
    
    `address` - The role address
    
    `address[]` - The permissions

* 返回值
    
    `bool`

* 示例

```shell
$ scm RoleManagement deletePermissions \
        --address 0x558c280233cee856fb53931eb18747a40e688a43 \
        --permissions '[558c280233cee856fb53931eb18747a40e688a43]' \
        --private-key 0x5f0258a4778057a8a7d97809bd209055b2fbafa654ce7d31ec7191066b9225e66
```

### setRole

为某一个账户设置角色。

* 参数
    
    `address` - The account address
    
    `address` - The role address

* 返回值
    
    `bool`

* 示例

```shell
$ scm RoleManagement setRole \
        --account 0x101e99e1a654a99308175042aff4833a6528be74 \
        --address 0x558c280233cee856fb53931eb18747a40e688a43 \
        --private-key 0x5f0258a4778057a8a7d97809bd209055b2fbafa654ce7d31ec7191066b9225e6
```

### cancelRole

清除某个账户的指定权限

* 参数
    
    `address` - The account address
    
    `address` - The role address

* 返回值
    
    `bool`

* 示例

```shell
$ scm RoleManagement cancelRole \
        --account 0x101e99e1a654a99308175042aff4833a6528be74 \
        --address 0x558c280233cee856fb53931eb18747a40e688a43 \
        --private-key 0x5f0258a4778057a8a7d97809bd209055b2fbafa654ce7d31ec7191066b9225e
```

### clearRole

清除某个账户的所有权限。

* 参数
    
    `address` - The account address

* 返回值
    
    `bool`

* 示例

```shell
$ scm RoleManagement clearRole \
        --account 0x101e99e1a654a99308175042aff4833a6528be74 \
        --private-key 0x5f0258a4778057a8a7d97809bd209055b2fbafa654ce7d31ec7191066b9225e6
```

### deleteRole

删除角色。

* 参数
    
    `address` - The role address

* 返回值
    
    `bool`

* 示例

```shell
$ scm RoleManagement deleteRole \
        --address 0x558c280233cee856fb53931eb18747a40e688a43 \
        --private-key 0x5f0258a4778057a8a7d97809bd209055b2fbafa654ce7d31ec7191066b9225e6
```

## 角色合约

### queryName

查询角色名称。

* 参数
    
    空

* 返回值
    
    `bytes32` - 角色名称

* 示例

```shell
$ scm Role queryName --address 0x558c280233cee856fb53931eb18747a40e688a43
```

输出：

```json
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": "0x0000000000000000000000000000000000000000000000000000000060fe47b1"
}
```

### queryPermissions

查询角色所有权限。

* 参数
    
    空

* 返回值
    
    `address[]` - 角色拥有的权限列表

* 示例

```shell
$ scm Role queryPermissions --address 0x558c280233cee856fb53931eb18747a40e688a43
```

输出：

```json
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": "0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000003000000000000000000000000ca645d2b0d2e4c451a2dd546dbd7ab8c29c3dcee0000000000000000000000001acec7eaba22b46ba5d2a7c0bfc94a7741dfd32b000000000000000000000000558c280233cee856fb53931eb18747a40e688a43"
}
```

### lengthOfPermissions

查询角色拥有权限数。

* 参数
    
    空

* 返回值
    
    `uint` - 角色拥有的权限个数

* 示例

```shell
$ scm Role lengthOfPermissions --address 0x558c280233cee856fb53931eb18747a40e688a43
```

输出：

```json
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": "0x0000000000000000000000000000000000000000000000000000000000000002"
}

```

### inPermissions

判断权限是否存在角色中

* 参数
    
    `address` - 权限地址

* 返回值
    
    `bool` - 在则返回为真，反之则反

* 示例

```shell
$  scm Role inPermissions \
        --address 0x558c280233cee856fb53931eb18747a40e688a43 \
        --permission 0x1acec7eaba22b46ba5d2a7c0bfc94a7741dfd32b \
```

输出：

```json
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": "0x0000000000000000000000000000000000000000000000000000000000000001"
}
```

## 系统配置合约

### setChainName

设置链名称。

* 参数
    
    `String` - 待设置的链的名称

* 返回值
    
    空

* 示例

```shell
$ scm SysConfig setChainName \
        --chain-name "AAA" \
        --admin-private 0x5f0258a4778057a8a7d97809bd209055b2fbafa654ce7d31ec7191066b9225e6 \
```

### setOperator

设置运营方名称。

* 参数
    
    `String` - 链运营方名称

* 返回值
    
    空

* 实例

```shell
 $ scm SysConfig setOperator \
        --operator "CITA" \
        --admin-private 0x5f0258a4778057a8a7d97809bd209055b2fbafa654ce7d31ec7191066b9225e6 \
```

### setWebsite

设置运营方网站。

* 参数
    
    `String` - 运营方网站

* 返回值
    
    空

* 示例

```shell
$ scm SysConfig setWebsite \
        --website "https://github.com/cryptape" \
        --admin-private 0x5f0258a4778057a8a7d97809bd209055b2fbafa654ce7d31ec7191066b9225e6 \
```

### setBlockInterval

动态设置出块时间。

* 参数
    
    `Integer` - 出块时间(毫秒)

* 返回值
    
    空

* 示例

```shell
$ scm SysConfig setBlockInterval \
        --blockInterval 4000 \
        --admin-private 0x5f0258a4778057a8a7d97809bd209055b2fbafa654ce7d31ec7191066b9225e6 \
```

### getPermissionCheck

查询调用合约权限检查是否开启， 默认关闭。

* 参数
    
    空

* 返回值
    
    `bool` - 如果开启返回真，反之则反

* 示例

```shell
$ scm SysConfig getPermissionCheck
```

### getSendTxPermissionCheck

查询发送交易权限检查是否开启, 默认关闭。

* 参数
    
    空

* 返回值
    
    `bool` - 如果开启返回真，反之则反

* 示例

```shell
$ scm SysConfig getSendTxPermissionCheck
```

### getCreateContractPermissionCheck

查询创建合约权限检查是否开启, 默认关闭。

* 参数
    
    空

* 返回值
    
    `bool` - 如果开启返回真，反之则反

* 示例

```shell
$ scm SysConfig getCreateContractPermissionCheck
```

### getQuotaCheck

查询配额检查是否开启， 默认关闭。

* 参数
    
    空

* 返回值
    
    `bool` - 如果开启返回真，反之则反

* 示例

```shell
$ scm SysConfig getQuotaCheck
```

### getFeeBackPlatformCheck

查询出块激励返回开关是否开启， 默认关闭。

* 参数
    
    空

* 返回值
    
    `bool` - 如果开启返回真，反之则反

* 示例

```shell
$ scm SysConfig getFeeBackPlatformCheck
```

### getChainOwner

查询链的持有者地址。

* 参数
    
    空

* 返回值
    
    `address` - 链运营方地址

* 示例

```shell
$ scm SysConfig getChainOwner
```

## 协议版本管理合约

> `setVerison` 和 `getVersion` 即将废弃，从 `v0.24.0` 之后的几个版本依然会保留。 新的接口为 `setProtocolVersion` 及 `getProtocolVersion`

### setVersion

设置协议版本

* 参数
    
    `uint` - 设置的版本号

* 返回值
    
    `bool` - 设置成功返回真，反之则反

* 示例

```shell
$ cita-cli scm VersionManager setVersion \
              --admin-private 0x5f0258a4778057a8a7d97809bd209055b2fbafa654ce7d31ec7191066b9225e6 \
              --version 2 \
              --url http://127.0.0.1:1337
```

### getVersion

查询当前链协议版本，需要在链创建时开启该功能，才能正常使用。详细查看 [链级配置]: ../configuration-guide/chain-config 中的 --enable_version 选项说明。

* 参数
    
    空

* 返回值
    
    `uint` - 协议版本

* 示例

```shell
$ cita-cli scm VersionManager getVersion --url http://127.0.0.1:1337
```

输出：

```json
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": "0x0000000000000000000000000000000000000000000000000000000000000002"
}
```