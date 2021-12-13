---
id: version-20.2.1-solidity
title: Solidity 合约开发
original_id: solidity
---

CITA 是兼容 EVM 的，所以支持使用 Solidity 编写智能合约。
目前支持的 Solidity 版本为：

```
Version: 0.4.24+commit.e67f0147.Linux.g++
```

## 编写

合约的编写可参考 [Solidity 官方文档]。

## 编译

* 参考 [Solidity 编译器安装]安装 `v0.24.0` 版本。成功后查询版本号：

  ```shell
  $ solc --version
  ```

* CITA 的 build 镜像也集成了 Solidity 编译器，下载 CITA 源码后可查询版本号：

  ```shell
  $ ./env.sh solc --version
  ```

本文档使用[测试合约 SimpleStorage.sol]来演示合约在 CITA 上的部署和调用过程。

## 准备工作

### 起链

查看[快速入门]启动一条链。

### 生成账户

使用 [cita-cli] 生成一个测试账户：

```shell
$ cita-cli key create
```

输出：

```json
{
  "address": "0x37d1c7449bfe76fe9c445e626da06265e9377601",
  "private": "0x3ef2627393529fed043c7dbfd9358a4ae47a88a59949b07e7631722fd6959002",
  "public": "0x9dc6fc7856f5271e6e8c45e5c5fe22d2ff699ac3b24497599be77803d3c25fb4e2fe7da616c65a291910c947c89923009f354634421bddd0a25cd0a509bcf6a9"
}
```

也可使用其他方式生成。

**注意：私钥与链一致，默认是 secp256k1**

### 获得合约的相关信息

使用 `solc` 命令得到一些部署和调用需要的信息：

* 字节码

  部署合约需要字节码信息。

  ```bash
  $ solc SimpleStorage.sol --bin
  ```

  输出：

  ```
  ======= SimpleStorage.sol:SimpleStorage =======
  Binary:
  608060405234801561001057600080fd5b5060df8061001f6000396000f3006080604052600436106049576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806360fe47b114604e5780636d4ce63c146078575b600080fd5b348015605957600080fd5b5060766004803603810190808035906020019092919050505060a0565b005b348015608357600080fd5b50608a60aa565b6040518082815260200191505060405180910390f35b8060008190555050565b600080549050905600a165627a7a723058205aed214856a5c433292a354261c9eb88eed1396c83dabbe105bde142e49838ac0029
  ```

* 函数签名

  调用合约需要函数签名信息。

  ```bash
  $ solc SimpleStorage.sol --hashes
  ```

  输出：

  ```
  ======= SimpleStorage.sol:SimpleStorage =======
  Function signatures:
  6d4ce63c: get()
  60fe47b1: set(uint256)
  ```

## 合约

由测试用户进行操作：

```bash
$ cita-cli rpc sendRawTransaction \
    --code 0x608060405234801561001057600080fd5b5060df8061001f6000396000f3006080604052600436106049576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806360fe47b114604e5780636d4ce63c146078575b600080fd5b348015605957600080fd5b5060766004803603810190808035906020019092919050505060a0565b005b348015608357600080fd5b50608a60aa565b6040518082815260200191505060405180910390f35b8060008190555050565b600080549050905600a165627a7a723058205aed214856a5c433292a354261c9eb88eed1396c83dabbe105bde142e49838ac0029 \
    --private-key 0x3ef2627393529fed043c7dbfd9358a4ae47a88a59949b07e7631722fd6959002 \
    --url http://127.0.0.1:1337
```

输出：

```json
{
  "id": 3,
  "jsonrpc": "2.0",
  "result": {
    "hash": "0x8bca970a8836f291ca86d33beccb147c3d7b04b361589d41bd928db683d731aa",
    "status": "OK"
  }
}
```

获取 receipt 信息：

```bash
$ cita-cli rpc getTransactionReceipt \
    --hash 0x8bca970a8836f291ca86d33beccb147c3d7b04b361589d41bd928db683d731aa \
    --url http://127.0.0.1:1337
```

输出：

```json
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": {
    "blockHash": "0x8cf225903eb7c49b0494f991941dcb4d401b2c51c321defa931914fb8f0aa87b",
    "blockNumber": "0xf2",
    "contractAddress": "0x5839153e0efe76efe0c974b728c4f49ca7ed75cc",
    "cumulativeQuotaUsed": "0xaef9",
    "errorMessage": null,
    "quotaUsed": "0xaef9",
    "logs": [
    ],
    "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
    "root": null,
    "transactionHash": "0x8bca970a8836f291ca86d33beccb147c3d7b04b361589d41bd928db683d731aa",
    "transactionIndex": "0x0"
  }
}
```

得到合约地址为 `0x5839153e0efe76efe0c974b728c4f49ca7ed75cc`

## 调用

### 调用 set 函数
如上操作：[函数签名]
 ```
 60fe47b1: set(uint256)
 ```
 调用测试合约 SimpleStorage.sol set 方法类型为 uint256 转为十六进制形式表示为 64位，传入参数 1：
 传入值结果为：0000000000000000000000000000000000000000000000000000000000000001；
 code 结果为 方法签名 + 传入值，即 0x60fe47b10000000000000000000000000000000000000000000000000000000000000001。

```bash
$ cita-cli rpc sendRawTransaction \
    --code 0x60fe47b10000000000000000000000000000000000000000000000000000000000000001 \
    --private-key 0x3ef2627393529fed043c7dbfd9358a4ae47a88a59949b07e7631722fd6959002 \
    --address 0x5839153e0efe76efe0c974b728c4f49ca7ed75cc \
    --url http://127.0.0.1:1337
```

输出：

```json
{
  "id": 3,
  "jsonrpc": "2.0",
  "result": {
    "hash": "0xa9179ed4226e16c332fc0b70a136f4b7dec59b8dd964c22381e24a35e22d0d2b",
    "status": "OK"
  }
}
```

查看 receipt 信息：

```bash
$ cita-cli rpc getTransactionReceipt \
    --hash 0xa9179ed4226e16c332fc0b70a136f4b7dec59b8dd964c22381e24a35e22d0d2b \
    --url http://127.0.0.1:1337
```

输出：

```json
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": {
    "blockHash": "0x2984cd1ad2beaf267d3bff78e8dcb64bbf75bcc9721007d0f2a7c4a01ac68a1b",
    "blockNumber": "0x152e",
    "contractAddress": null,
    "cumulativeQuotaUsed": "0x4f51",
    "errorMessage": null,
    "quotaUsed": "0x4f51",
    "logs": [
    ],
    "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
    "root": null,
    "transactionHash": "0xa9179ed4226e16c332fc0b70a136f4b7dec59b8dd964c22381e24a35e22d0d2b",
    "transactionIndex": "0x0"
  }
}
```

从 `errorMessage` 中已经可以看出交易成功了。

### 调用 get 方法

查询结果看是否设置成功：

```bash
$ cita-cli rpc call \
    --to 0x5839153e0efe76efe0c974b728c4f49ca7ed75cc \
    --data 0x6d4ce63c \
    --url http://127.0.0.1:1337
```

输出：

```json
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": "0x0000000000000000000000000000000000000000000000000000000000000001"
}
```

查看结果更新为 1。

[Solidity 官方文档]: https://solidity.readthedocs.io/en/v0.4.24/
[Solidity 编译器安装]: https://solidity.readthedocs.io/en/v0.4.24/installing-solidity.html
[cita-cli]: https://github.com/citahub/cita-cli
[快速入门]: ../../getting-started/setup
[测试合约 SimpleStorage.sol]: https://github.com/citahub/test-contracts/blob/master/SimpleStorage.sol
[函数签名]: ./solidity#获得合约的相关信息
