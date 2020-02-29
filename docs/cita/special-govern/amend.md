---
id: amend
title: 数据订正
---

> **注意：此操作仅供对区块链存储有深刻理解的专业人士使用，慎用！**

## 简述

数据订正功能指的是超级管理员通过发送特定的交易到链上，修改链上数据。

- Amend 类型交易的发送者必须是超级管理员，否则会提示没有权限执行
- Amend 类型交易指定目的地址：`0xffffffffffffffffffffffffffffffffff010002`

## 订正说明

`Amend` 功能目前可以操作四种数据，分别是：

- ABI：表示账户二进制接口信息
- Code：表示合约账户的代码
- Balance：表示账户 Balance 的数值
- Key-Value：表示账户底层 KV 数据库 Key-Value 信息

超级管理员可以通过 cita-cli 使用该功能。

## 操作示例

### Amend ABI

示例：

修改 `0xa4691ea78dbc3c1fa5fcc78c67ffbffe8c6bdeb7` 账户的 ABI

```bash
./cita-cli amend abi --content "[{"constant":false,"inputs":[],"name":"setGoStraight","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"getChoice","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"getDefaultChoice","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"}]" --address 0xa4691ea78dbc3c1fa5fcc78c67ffbffe8c6bdeb7 --admin-private-key 0x5f0258a4778057a8a7d97809bd209055b2fbafa654ce7d31ec7191066b9225e6 --url http://127.0.0.1:1337
```

查询修改后对应账户的 ABI 信息

```bash
./cita-cli rpc getAbi --address 0xa4691ea78dbc3c1fa5fcc78c67ffbffe8c6bdeb7 --url http://127.0.0.1:1337
```

### Amend Code

示例：

修改 `0xa4691ea78dbc3c1fa5fcc78c67ffbffe8c6bdeb7` 账户的 Code

```bash
./cita-cli amend code --content 0x608060405234801561001057600080fd5b50610152806100206000396000f300608060405260043610610057576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806346aadaa51461005c57806367cb61b614610073578063843f7258146100ac575b600080fd5b34801561006857600080fd5b506100716100d7565b005b34801561007f57600080fd5b506100886100fc565b6040518082600381111561009857fe5b60ff16815260200191505060405180910390f35b3480156100b857600080fd5b506100c1610112565b6040518082815260200191505060405180910390f35b60026000806101000a81548160ff021916908360038111156100f557fe5b0217905550565b60008060009054906101000a900460ff16905090565b60006002600381111561012157fe5b9050905600a165627a7a723058207a9f4ef112e089314a40d0efbfe8e88e3c04add43fcee5cbae6cd9f55d9d0ef30029 --address 0xa4691ea78dbc3c1fa5fcc78c67ffbffe8c6bdeb7 --admin-private-key 0x5f0258a4778057a8a7d97809bd209055b2fbafa654ce7d31ec7191066b9225e6 --url http://127.0.0.1:1337
```

查询修改后对应账户的 Code 信息

```bash
./cita-cli rpc getCode --address 0xa4691ea78dbc3c1fa5fcc78c67ffbffe8c6bdeb7 --url http://127.0.0.1:1337
```

### Amend Balance

示例：

修改 `0xa4691ea78dbc3c1fa5fcc78c67ffbffe8c6bdeb7` 账户的 Balance

```bash
./cita-cli amend balance --balance 0x88888 --address 0xa4691ea78dbc3c1fa5fcc78c67ffbffe8c6bdeb7 --admin-private-key 0x5f0258a4778057a8a7d97809bd209055b2fbafa654ce7d31ec7191066b9225e6 --url http://127.0.0.1:1337
```

查看新的 Balance 数值

```bash
./cita-cli rpc getBalance --address 0xa4691ea78dbc3c1fa5fcc78c67ffbffe8c6bdeb7 --url http://127.0.0.1:1337
```

### Amend Key->Value

命令参数如下：

- kv-h256：数据库的 KV 信息，命令中的 kv 参数值为一系列的 Key-Value 对， 前面的 H256 信息 Key，后面的 H256 信息为 Value，交替存放。

示例：

修改 `0xffffffffffffffffffffffffffffffffff020000` 账户的 `key: 0x000000000000000000000000000000000000000000000000000000000000002b` 对应的 `value`
值为 `0x0000000000000000000000000000000000000000000000010000000000000bb8`

```bash
./cita-cli amend kv-h256 --address 0xffffffffffffffffffffffffffffffffff020000 --admin-private-key 0x5f0258a4778057a8a7d97809bd209055b2fbafa654ce7d31ec7191066b9225e6 --kv 0x000000000000000000000000000000000000000000000000000000000000002b 0x0000000000000000000000000000000000000000000000010000000000000bb8 --url http://127.0.0.1:1337
```
