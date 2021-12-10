---
id: rpc
title: RPC列表
---

### GetPeerCount

当前节点连接数。

* 参数:

  无。

* 返回值

  `uint64` - 本节点连接节点个数。

* 示例

```
$ cldi peer-count
peer_count: 2
```

### GetBlockNumber

返回当前块高度。

* 参数

  `bool` - `true`表示获取`Pending`状态的块高；`false`表示获取`latest`状态的块高。

* 返回值

  `uint64` - 当前块高度。

* 示例

```
$ cldi block-number -p
block_number: 58014
```

`cloud-cli`的`-p`参数表示获取`Pending`状态的块高；不加该参数表示获取`latest`状态的块高。


### GetTransaction

根据交易哈希查询交易。

* 参数

  `bytes` - 交易哈希值。

* 返回值

  `RawTransaction` - 交易结构体。

* 示例

```
$ cldi get-tx 0x22ce8fe4e68e791825edad6cd7a944e77eba3e8d41fe582bcbf7d3b06fb17623
tx: {
  "transaction": {
    "transaction": {
      "chain_id": "0x22ae4cd3acabd1f259e255dba07a2e463cea57cf7d2802ebc399330f0bb18b02",
      "data": "0x4f2be91f",
      "nonce": "727992510686994504",
      "quota": 3000000,
      "to": "0x253479ef7f0209ad761960e9f41bb18d1113b2bb",
      "valid_until_block": 22629,
      "value": "0x0000000000000000000000000000000000000000000000000000000000000000",
      "version": 0
    },
    "transaction_hash": "0x22ce8fe4e68e791825edad6cd7a944e77eba3e8d41fe582bcbf7d3b06fb17623",
    "witness": {
      "sender": "0x415f568207900b6940477396fcd2c201efe49beb",
      "signature": "0x947ce32efb441bb9a8240f256700df69fb8ea71af94f5a93bf31a0171fbd72b07999d30d0b076c2ecaa19d0327673cae4ac75e7526ba83f2bbb6d5f5657877e66dd968546f2af3053be1d31aed723b58bf5380884ec5f2d41e8156dcc17c1317456c2cc9fb28290d7da0e606267ec1b00bfe54bb214ba5d6c2831c8211e9f343"
    }
  },
  "type": "Normal"
}
```

### GetSystemConfig

查询链上系统配置数据。

* 参数

  无。

* 返回值

  `SystemConfig` - 系统配置结构体。

* 示例

```
$ cldi system-config
{
  "admin": "0x642741f75dad495e75c20ab6fd4e84b3f5469b23",
  "block_interval": 3,
  "chain_id": "0x22ae4cd3acabd1f259e255dba07a2e463cea57cf7d2802ebc399330f0bb18b02",
  "validators": [
    "0x3fbef0cc8aac891279520d148188ebdb156bf70e",
    "0x0e952599fcb4c9235ddd8ba36d96bfdd878d79bf",
    "0x106013370a48bc1988a1d5733d5ecf9a85d3f721"
  ],
  "version": 0
}
```

### GetVersion

获取当前软件的版本号。

* 参数

  无。

* 返回值

  `String` - 软件版本号。

* 示例

```
$ ./grpcurl -emit-defaults -plaintext -d '' \
    -proto ~/cita_cloud_proto/protos/controller.proto \
    -import-path ~/cita_cloud_proto/protos \
    `minikube ip`:30004 controller.RPCService/GetVersion
{
  "version": "6.1.0"
}
```

### GetBlockHash

获取指定块高的块哈希值。

* 参数

  `uint64` - 块高度。

* 返回值

  `bytes` - 块哈希值。

* 示例

```
$ cldi block-hash 22629
hash: 0x5a8747d1b1f4c8ba53ca7b01b33f4e2044974a26b4a239bf3ab8df6dadef0f89
```

### GetTransactionBlockNumber

获取指定交易所在的块高度。

* 参数

  `bytes` - 交易哈希值。

* 返回值

  `uint64` - 块高度。

* 示例

```
$ ./grpcurl -emit-defaults -plaintext -d '{"hash": "fJkDwCaMi7mOnHTVQ/IcGNr83aoUxnj5kAkDDhRkya0="}' \
   -proto ~/cita_cloud_proto-master/protos/controller.proto \
   -import-path ~/cita_cloud_proto-master/protos \
   `minikube ip`:30004 controller.RPCService/GetTransactionBlockNumber
{
  "blockNumber": "22"
}
```

### GetTransactionIndex

获取指定交易在块中的序号。

* 参数

  `bytes` - 交易哈希值。

* 返回值

  `uint64` - 序号。

* 示例

```
$ ./grpcurl -emit-defaults -plaintext -d '{"hash": "fJkDwCaMi7mOnHTVQ/IcGNr83aoUxnj5kAkDDhRkya0="}' \
    -proto ~/cita_cloud_proto-master/protos/controller.proto \
    -import-path ~/cita_cloud_proto-master/protos \
    `minikube ip`:30004 controller.RPCService/GetTransactionIndex
{
  "txIndex": "2"
}
```

### GetTransactionCount

获取账户发出的交易数量

* 参数

  `bytes`-用户地址

* 返回值

  `nonce`-用户发出交易的数量

* 示例

```
$ ./grpcurl -emit-defaults -plaintext -d '{"address": "AQEBAQEBAQEBAQEBAQEBAQEBAQEB"}' \
    -proto ~/cita_cloud_proto/protos/vm/evm.proto \
    -import-path ~/cita_cloud_proto/protos \
    localhost:50002 evm.RPCService/GetTransactionCount
{
  "nonce": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA="
}
```

### GetBlockByHash

根据块哈希值查询块。

* 参数

  `bytes` - 块哈希值。

* 返回值

  `CompactBlock` - 块结构体。

* 示例

```
$ cldi get-block -h 0x5a8747d1b1f4c8ba53ca7b01b33f4e2044974a26b4a239bf3ab8df6dadef0f89
{
  "height": 22629,
  "prev_hash": "0xc44215f6537d36330b30815fcf9603824ed861ac1f13ba38670239bd3fbaff9b",
  "proposer": "0x0e952599fcb4c9235ddd8ba36d96bfdd878d79bf",
  "timestamp": "2021-07-27 20:26:53.297 -07:00",
  "transaction_root": "0x1ab21d8355cfa17f8e61194831e81a8f22bec8c728fefb747ed035eb5082aa2b",
  "tx_count": 0,
  "tx_hashes": [],
  "version": 0
}
```

### GetBlockByNumber

根据块高度查询块。

* 参数

  `uint64` - 块高度。

* 返回值

  `CompactBlock` - 块结构体。

* 示例

```
$ cldi get-block -n 22629
{
  "height": 22629,
  "prev_hash": "0xc44215f6537d36330b30815fcf9603824ed861ac1f13ba38670239bd3fbaff9b",
  "proposer": "0x0e952599fcb4c9235ddd8ba36d96bfdd878d79bf",
  "timestamp": "2021-07-27 20:26:53.297 -07:00",
  "transaction_root": "0x1ab21d8355cfa17f8e61194831e81a8f22bec8c728fefb747ed035eb5082aa2b",
  "tx_count": 0,
  "tx_hashes": [],
  "version": 0
}
```

### SendRawTransaction

发送交易。

* 参数

  `RawTransaction` - 交易结构体。

* 返回值

  `bytes` - 交易哈希值。

* 示例

  `cli`工具会根据用户传递的参数组装RawTransaction结构。

```
$ cldi send -t 0x253479ef7f0209ad761960e9f41bb18d1113b2bb 0x4f2be91f
tx_hash: 0x9684414367bd24f06dc129c097186e4a1668c0888354d32ce58e9aeb199397e3
```

### GetTransactionReceipt

获取交易回执。

* 参数

  `bytes`交易哈希值。

* 返回值

  `Receipt`-交易回执。

* 示例

```
$ cldi receipt 0xf62b9116c0a62a592a2fee55e714e1501fb84075770c2fbff0b484c75f61e405
{
  "block_number": 22419,
  "contract_addr": "0x253479ef7f0209ad761960e9f41bb18d1113b2bb",
  "cumulative_quota_used": "0x0000000000000000000000000000000000000000000000000000000000018ed3",
  "error_msg": "",
  "legacy_cita_block_hash": "0xdc7457b2c12dc0105aa7d0355d889911e6e10c2124958219b46b72ec6e9a5e28",
  "logs": [],
  "logs_bloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
  "quota_used": "0x0000000000000000000000000000000000000000000000000000000000018ed3",
  "state_root": "0xf777eab35bc620de67c0ecab6c460f12047f7f7f828b1fb336959045ffa1972c",
  "tx_hash": "0xf62b9116c0a62a592a2fee55e714e1501fb84075770c2fbff0b484c75f61e405",
  "tx_index": 0
}
```

### GetCode

* 参数

  `bytes`-合约地址

* 返回值

  `bytes`-二进制代码

* 示例

```
$ cldi get-code 0x253479ef7f0209ad761960e9f41bb18d1113b2bb
code: 0x6080604052600436106053576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306661abd1460585780634f2be91f146080578063d826f88f146094575b600080fd5b348015606357600080fd5b50606a60a8565b6040518082815260200191505060405180910390f35b348015608b57600080fd5b50609260ae565b005b348015609f57600080fd5b5060a660c0565b005b60005481565b60016000808282540192505081905550565b600080819055505600a165627a7a72305820faa1d1f51d7b5ca2b200e0f6cdef4f2d7e44ee686209e300beb1146f40d32dee0029
```

### GetBalance

获取账户余额。

* 参数

  `bytes`-账户地址

* 返回值

  `Balance`-账户余额

* 示例

```
$ cldi get-balance 0x415f568207900b6940477396fcd2c201efe49beb
balance: 0x0000000000000000000000000000000000000000000000000000000000000000
```

### GetAbi

获取合约的Abi

* 参数

  `bytes`-合约地址

* 返回值

  `ByteAbi`-Abi

* 示例

```
$ cldi get-abi 0x253479ef7f0209ad761960e9f41bb18d1113b2bb
ABI:
[
	{
		"constant": true,
		"inputs": [],
		"name": "count",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "add",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "reset",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	}
]
```
