---
id: testchain
title: 测试链
---

测试链的水龙头的地址为：https://faucet.citahub.com/faucet，可以在这里领取 Testnet 的代币。

该测试链由 4 个节点组成，域名访问如下：

```
https://testnet.citahub.com
```
### 查询测试链的信息
* 返回值

    * `chainId`, `Integer` - `version < 1` 时的 `chain_id`, 用来防止重放攻击
    * `chainIdV1`, `Quantity` - `version > 1` 时的 `chain_id`
    * `chainName`, `String` - 链名称
    * `operator`, `String` - 链的运营者
    * `genesisTimestamp`, `Integer` - 创世块时间戳
    * `validators`, `[Data20]` - 验证者地址集合
    * `blockInterval` `Integer` - 出块间隔
    * `tokenName`, `String` - Token 名称
    * `tokenSymbol`, `String` - Token 标识
    * `tokenAvatar`, `String` - Token 标志
    * `version`, `Integer` - 链版本
    * `economicalModel`, `EconomicalModel` - 链经济模型

Request:

```shell
curl -sS -X POST --data '{"jsonrpc":"2.0","method":"getMetaData","params":["latest"],"id":1}' https://testnet.citahub.com | jq
```
Result:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "chainId": 0,
    "chainIdV1": "0x1",
    "chainName": "test-chain",
    "operator": "test-operator",
    "website": "https://www.example.com",
    "genesisTimestamp": 1541058686340,
    "validators": [
      "0xc489d5cb6f497e4708cc8c3805473b9528f83c7a",
      "0x497c68f02bbe335cc879356af120371ebf6cbc29",
      "0x6fbb4c8bb76ace631d634545fe39cbee979dd08e",
      "0x3c0f681e13f18b51d5350823eae45cb502231cf4"
    ],
    "blockInterval": 3000,
    "tokenName": "CITA Test Token",
    "tokenSymbol": "CTT",
    "tokenAvatar": "https://cdn.citahub.com/icon_cita.png",
    "version": 2,
    "economicalModel": 1
  }
}
```
### 查看测试链创世块信息
Request:

```shell
curl -sS -X POST --data '{"jsonrpc":"2.0","method":"getBlockByNumber","params":["0",true],"id":1}' https://testnet.citahub.com | jq
```
Result:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "version": 0,
    "hash": "0x577da8e94c9f256adef23ce144bec5aa95d34375ab5c36610b6975cbb54d4196",
    "header": {
      "timestamp": 1541058686340,
      "prevHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
      "number": "0x0",
      "stateRoot": "0x522a291019849d5d3b58dec1d2df7f4808cc9a0b7ab4a987290f43b1104eb4f1",
      "transactionsRoot": "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
      "receiptsRoot": "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
      "quotaUsed": "0x0",
      "proof": null,
      "proposer": "0x0000000000000000000000000000000000000000"
    },
    "body": {
      "transactions": []
    }
  }
}
```

### 查看测试链当前块高
* 返回值：十六进行表示的块高。

Request:

```shell
curl -sS -X POST --data '{"jsonrpc":"2.0","method":"blockNumber","params":[],"id":1}' https://testnet.citahub.com | jq
```

Result:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": "0xd8c2dd"
}
```

### 查看测试链使用的 CITA 版本号
Request:

```shell
curl -sS -X POST --data '{"jsonrpc":"2.0","method":"getVersion","params":[],"id":1}' https://testnet.citahub.com | jq
```
Result:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "softwareVersion": "v20.2.0"
  }
}
```
如需查看更新测试链信息，请参考[CITA JSON-RPC API]。

[CITA JSON-RPC API]: ../../cita/rpc-guide/rpc
