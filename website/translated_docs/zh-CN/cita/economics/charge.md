---
id: charge
title: Charge 模式
---

Charge 模式，链上是存在原生代币的，运营方不仅可以对原生代币自身的一些属性如名字，标识等，请参考[链级配置](../configuration-guide/chain-config)进行配置，也可以对代币总量，代币的分发方式，代币的流转模型进行个性化定制。

概括的来说，系统会将用户发送交易（转账，部署合约，调用合约）需要消耗的 Quota 换算成原生代币，并收取该数量的原生代币作为交易手续费，这部分交易手续费可以给到负责出块的共识节点（矿工），也可以给到一个特定的地址（由超级管理员设置）。除了用交易手续费来奖励负责出块的共识节点（矿工）之外，还可以设置一定的出块奖励给矿工，这一部分奖励可以通过上层合约实现，以便更好地根据实际业务场景进行设计和调整。下面我们将展开更多细节。

## 代币总量设置

在生成链配置的时候可以通过 `--init_token` 选项来指定代币发行总量，这部分代币将会在链启动后，存到 `superadmin` 账户，代币将由 `superadmin` 统一再分配。

若没有指定 `init_token` ，系统会默认将代币总量设置为 `0xffffffffffffffffffffffffff` 。

### 设置代币总量操作示例：

设置链的代币总量为 10_000_000_000 (0x2540BE400):

```shell
$ bin/cita create --init_token 0x2540BE400 --contract_arguments SysConfig.economicalModel=1 --super_admin "0x4b5ae4567ad5d9fb92bc9afd6a657e6fa13a2523" --nodes "127.0.0.1:4000,127.0.0.1:4001,127.0.0.1:4002,127.0.0.1:4003"
```

## 代币分发方式

CITA 提供灵活的分发方式，以适配多样的业务需求:

* 超级管理员可以通过发交易的方式进行分配；
* 也可以使用我们提供的[水龙头工具](https://github.com/citahub/testnet-faucet-mri)，让用户自己领取代币；
* 也可以采用类似挖矿奖励的方式分发。CITA 采用了[系统自动执行合约](https://docs.citahub.com/zh-CN/cita/system/auto-exec)的机制，可以实现每区块自动执行一个代币分发合约，向相关节点分发奖励。运营方可以在创世块创建足够多的系统代币，锁定到一个激励合约，并在激励合约中编写按照选举合约结果分发出块奖励的命令。

注意：Charge 模型下，矿工默认是只有交易手续费作为激励，若需要出块激励，则需要在上层用合约实现第 3 种分发方式设置出块奖励。

## 交易手续费管理

### 手续费模型

在 CITA 中，`手续费 = quotaUsed * quotaPrice`

* 手续费：用户以原生代币进行支付。
* quotaUsed：虚拟机中的每个命令都被设置了相应的 quota 消耗值。quotaUsed 是所有被执行的指令的 Quota 消耗值总和。
* quotaPrice ：单位 quota 需要消耗的原生代币数量。quotaPrice 默认为1000000，而且为了更好的满足运营方的需求，我们提供了设置 `quotaPrice` 的接口，拥有权限的超级管理员在起链后可以通过发送交易动态的来设置 quotaPrice的值。具体操作示例可参考下面的修改 quotaPrice 操作示例。

系统规定 1 native-token（原生代币） = 10^18 quota，运营方可以通过调节 Quota Price 高低来调整原生代币的使用价值。

交易手续费默认是返还给打包该块的共识节点，但运营方也可以通过设置 `checkFeeBackPlatform` 和 `chainOwner`，将出块奖励返还给一个特定的地址。具体操作示例参考下面的设置交易手续费返还的地址操作示例。

### 修改 quotaPrice 操作示例

默认的 `quotaPrice` 默认为 1000000， 接下来演示超级管理员如何修改 quotaPrice。

> * 0.20 版本之前的默认 `quotaPrice` 是 1。
> * 接下来的测试，用 [cita-cli](https://github.com/citahub/cita-cli) 命令行模式进行演示。

首先查询当前的 `quotaPrice`：

```shell
$ cita-cli scm PriceManager getQuotaPrice
```

输出：

```json
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": "0x00000000000000000000000000000000000000000000000000000000000f4240"
}
```

得到 `quotaPrice` 是十六进制的默认值。 修改 `quotaPrice`， 我们把 `quotaPrice` 由 1000000 改为 2000000：

```shell
$ cita-cli scm PriceManager setQuotaPrice \
              --admin-private 0x5f0258a4778057a8a7d97809bd209055b2fbafa654ce7d31ec7191066b9225e6 \
              --price 0x00000000000000000000000000000000000000000000000000000000001e8480
```

再次查询， 发现 `quotaPrice` 已更新：

```shell
$ cita-cli scm PriceManager getQuotaPrice
```

输出：

```json
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": "0x00000000000000000000000000000000000000000000000000000000001e8480"
}
```

**特殊情况** 现在 CITA 支持在创建链的时候将 quotaPrice 设置成 0。

> 初始化设置 quotaPrice 为 0，之后还是可以设置为大于 0 的。不建议反向操作。

1. 用以下命令对链进行初始化

   ```shell
   $ ./bin/cita create --super_admin "0x4b5ae4567ad5d9fb92bc9afd6a657e6fa13a2523" --nodes "127.0.0.1:4000,127.0.0.1:4001,127.0.0.1:4002,127.0.0.1:4003" --contract_arguments SysConfig.economicalModel=1 PriceManager.quotaPrice=0
   ```

2. 链启动后，进行验证

   ```shell
   cita-cli scm PriceManager getQuotaPrice
   ```

得到

   ```json
   {
     "id": 1,
     "jsonrpc": "2.0",
     "result": "0x0000000000000000000000000000000000000000000000000000000000000000"
   }
   ```

### 设置交易手续费返还的地址操作示例

首先配置链的时候要注意三点：

* 配置经济模型
* 设置奖励返回开关
* 设置交易手续费返还地址

```shell
$ ./bin/cita create \
        --super_admin "0x4b5ae4567ad5d9fb92bc9afd6a657e6fa13a2523" \
        --nodes "127.0.0.1:4000,127.0.0.1:4001,127.0.0.1:4002,127.0.0.1:4003" \
        --contract_arguments "SysConfig.checkFeeBackPlatform=true" \
        --contract_arguments "SysConfig.chainOwner=0x36a60d575b0dee0423abb6a57dbc6ca60bf47545" \
        --contract_arguments "SysConfig.economicalModel=1"
```

> *接下来的测试，用* *[cita-cli](https://github.com/citahub/cita-cli)* *交互模式进行演示*。

1. 查询超级管理员的当前余额

   ```shell
   $ rpc getBalance --address "0x4b5ae4567ad5d9fb92bc9afd6a657e6fa13a2523"
   ```

得到输出：

   ```json
   {
     "id": 1,
     "jsonrpc": "2.0",
     "result": "0xffffffffffffffffffffffffff"
   }
   ```

2. 查询返还地址的当前余额

   ```shell
   $ rpc getBalance --address "0x36a60d575b0dee0423abb6a57dbc6ca60bf47545"
   ```

返还地址的余额输出：

   ```json
   {
     "id": 1,
     "jsonrpc": "2.0",
     "result": "0x0"
   }
   ```

3. 让我们来发一个部署合约的交易并获取回执，来看看余额的变化吧。

   ```shell
   $ rpc sendRawTransaction \
     --code "0x606060405260008055341561001357600080fd5b60f2806100216000396000f3006060604052600436106053576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680634f2be91f1460585780636d4ce63c14606a578063d826f88f146090575b600080fd5b3415606257600080fd5b606860a2565b005b3415607457600080fd5b607a60b4565b6040518082815260200191505060405180910390f35b3415609a57600080fd5b60a060bd565b005b60016000808282540192505081905550565b60008054905090565b600080819055505600a165627a7a72305820906dc3fa7444ee6bea2e59c94fe33064e84166909760c82401f65dfecbd307d50029" \
     --private-key "0x5f0258a4778057a8a7d97809bd209055b2fbafa654ce7d31ec7191066b9225e6" \
   $ rpc getTransactionReceipt --hash "0x39c4cd332892fb5db11c250275b9a130bf3c087ebdf47b6504d65347ec349406"
   ```

回执输出：

   ```json
   {
     "id": 1,
     "jsonrpc": "2.0",
     "result": {
       "blockHash": "0x72d1eb886dda61bc5b58f024d5edcf920b15f2e5978ab55f034941b18beb56a8",
       "blockNumber": "0x1b",
       "contractAddress": "0x27ec3678e4d61534ab8a87cf8feb8ac110ddeda5",
       "cumulativeQuotaUsed": "0x1a004",
       "errorMessage": null,
       "logs": [
       ],
       "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
       "quotaUsed": "0x1a004",
       "root": null,
       "transactionHash": "0x59df5370e52c4a6af60c869c35222ae7e32b6259e901e94e89be4810dfe7e711",
       "transactionIndex": "0x0"
     }
   }
   ```

4. 再来查一下超级管理员余额：

   ```shell
   $ rpc getBalance --address "0x4b5ae4567ad5d9fb92bc9afd6a657e6fa13a2523"
   ```

超级管理员余额输出：

   ```json
   {
     "id": 1,
     "jsonrpc": "2.0",
     "result": "0xffffffffffffffffe7341af6ff"
   }
   ```

5. 让我们再查一下返还地址的余额

   ```shell
   $ rpc getBalance --address "0x36a60d575b0dee0423abb6a57dbc6ca60bf47545"
   ```

余额输出：

   ```json
   {
     "id": 1,
     "jsonrpc": "2.0",
     "result": "0x18cbe50900"
   }
   ```

可以看到余额发生了变化，返还地址的余额从 0 变成了 `0x18cbe50900` (十进制 106500000000 )， 查看交易回执中的 quotaUsed 为 0x1a004（十进制 106500 )。