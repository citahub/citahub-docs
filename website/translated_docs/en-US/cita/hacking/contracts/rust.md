---
id: rust
title: Rust 原生合约开发
---

CITA 支持用 Rust 编写的原生合约。

## 依赖说明

Rust 原生智能合约目前需要与 CITA 源码工程一起编译、部署。 因此，首先获得 [CITA 源码库](https://github.com/cryptape/cita)，推荐在 CITA 工程（cita-executor/core/src/native）中编写 Rust 原生合约代码。

*需要有 Rust 编程基础*

## 编写智能合约

本文以 Solidity 智能合约为样例，展现如何用 Rust 完成一个同样逻辑的原生合约，并进一步说明为何当前 Rust 语言需要如此实现。

    pragma solidity ^0.4.19;
    
    contract HelloWorld {
        uint public balance;
    
        function update(uint amount) public returns (uint) {
            balance += amount;
            return balance;
        }
    }
    

上面的代码段定义了一个名 `HelloWorld` 的合约，定义了一个变量 `balance`，然后定义一个对这个变量的 `update` 操作。 接下来我们用 Rust 语言去定义同样合约逻辑的原生合约。

### 定义合约变量

定义了一个 `HelloWorld` 结构体来存储一些必要的数据。

```rust
pub struct HelloWorld {
    balance: Scalar,
    output: Vec<u8>,
}
```

包括：

* 合约变量 balance ： 与 Solidity 对应
* output 变量： 操作 update 操作的返回值，执行结果或者错误信息

### 定义合约

实现 `Rust` 原生合约至少需要实现 `exec` 与 `create` 这两个方法：

* 当创建合约时，`CITA` 会调用 `create`方法
* 而当外部调用合约（如下文的合约调用）时，`CITA` 会调用 `exec`方法

```rust
impl Contract for HelloWorld {
    fn exec(&mut self, params: &ActionParams, ext: &mut Ext) -> Result<GasLeft, Error> {
        if let Some(ref data) = params.data {
            method_tools::extract_to_u32(&data[..]).and_then(|signature| match signature {
                0 => self.init(params, ext),
                // Register function
                0x832b_4580 => self.balance_get(params, ext),
                0xaa91_543e => self.update(params, ext),
                _ => Err(Error::OutOfGas),
            })
        } else {
            Err(evm::Error::OutOfGas)
        }
    }
    fn create(&self) -> Box<Contract> {
        Box::new(HelloWorld::default())
    }
}
```

一个智能合约里会存在多个方法，所有调用都会从 `exec` 入口进入，`exec` 中需要为每个合约方法进行分类执行：

```rust
0xaa91_543e => self.update(params, ext),
0x832b_4580 => self.balance_get(params, ext),
```

前面的字符串称为方法的签名，可以任意指定，需要保证每个方法签名唯一（建议同 Solidity 函数签名计算方法相同）：

* `update`: 对应 Solidity 中函数，更新 balance
* `balance_get`: 获取 balance 值

接下来，我们来具体实现这两个函数接口。

### 实现合约接口

*对 update 接口进行了说明， balance_get 可自行查看*

接口实现代码如下：

```rust
fn update(&mut self, params: &ActionParams, ext: &mut Ext) -> Result<GasLeft, Error> {
    self.output.resize(32, 0);

    // Get the params of`update`
    let data = params.data.to_owned().expect("invalid data");
    let amount = U256::from(data.get(4..36).expect("no enough data"));
    let _balance = self.balance.get(ext)?.saturating_add(amount);

    self.balance.set(ext, _balance)?;
    info!("====set balance to {:?}", _balance);

    _balance.to_big_endian(self.output.as_mut_slice());

    Ok(GasLeft::NeedsReturn {
        gas_left: U256::from(100),
        data: ReturnData::new(self.output.clone(), 0, self.output.len()),
        apply_state: true,
    })
}
```

#### 获得参数

update 方法中的参数 `amount` 需要从 `params` 中解析：

* 前 4 字节与上文对应的函数签名
* 4 到 36 字节表示接口参数，即 `amount` 值

```rust
let amount = U256::from(data.get(4..36).expect("no enough data"));
```

#### 更新 balance

实现 `balance += amount`，如下：

```rust
let _balance = self.balance.get(ext)?.saturating_add(amount);
self.balance.set(ext, _balance)?;
```

#### 处理返回值

代码如下：

```rust
_balance.to_big_endian(self.output.as_mut_slice());
 Ok(GasLeft::NeedsReturn {
     gas_left: U256::from(100),
     data: ReturnData::new(self.output.clone(), 0, self.output.len()),
     apply_state: true,
 })
```

## 注册合约地址

Rust 原生合约当前是随 CITA 直接启动的，并不像 Solidity 合约发送交易来部署合约。 在 `factory.rs`（cita-executor/core/src/contracts/native）中加入合约的注册代码便可。

```rust
// here we register contracts with addresses defined in genesis.json.
{
    use super::myContract::HelloWorld;
    factory.register(Address::from(0x500), Box::new(HelloWorld::default()));
}
```

同时还需要在同目录下的代码 `mod.rs`中加入 `rust_hello` 的模块，使得可以编译进 CITA。

```rust
pub mod rust_hello;
```

## 编译合约

将合约代码放到 cita-executor/core/src/native 下，启动编译 CITA 的命令：

```shell
./env.sh make
```

## 调用合约

同样通过发交易来调用合约中的 `update` 函数，通过 [JSON-RPC](https://docs.citahub.com/zh-CN/next/cita/rpc-guide/rpc) 的 `call` 方法来验证 `balance` 的值。

### 查询 balance

执行：

```shell
curl -X POST --data '{"jsonrpc":"2.0","method":"call", "params":[{"to":"0x0000000000000000000000000000000000000500", "data":"0x832b4580"}, "latest"],"id":2}' 127.0.0.1:1337
```

关键信息简释：

* `to`: 合约地址，与前文注册的地址一致
* `data`: 调用的方法签名，与前文函数签名对应

返回：

```json
{"jsonrpc":"2.0","id":2,"result":"0x0000000000000000000000000000000000000000000000000000000000000000"}
```

### 调用 update

*使用 [cita-cli](https://github.com/cryptape/cita-cli) 交互式进行操作*

```shell
$ rpc sendRawTransaction \
    --code "0xaa91543e0000000000000000000000000000000000000000000000000000000000000011" \
    --address 0x0000000000000000000000000000000000000500 \
    --private-key 0x5f0258a4778057a8a7d97809bd209055b2fbafa654ce7d31ec7191066b9225e6
```

关键信息简释：

* code: 前 4 个 bytes 为函数签名，后 32 bytes 为 update 参数。相当于执行 `HelloWorld.update(11)`
* address: 前文注册的合约地址
* private-key: 发交易需要的私钥

返回：

```json
{
  "id": 4,
  "jsonrpc": "2.0",
  "result": {
    "hash": "0x9c6bae3216bbaa755f80e61d00cd3502e151a61bafca691b12a9a457695eb12b",
    "status": "OK"
  }
}
```

获取回执：

```shell
rpc getTransactionReceipt --hash 0x9c6bae3216bbaa755f80e61d00cd3502e151a61bafca691b12a9a457695eb12b
```

返回：

```json
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": {
    "blockHash": "0xe06ac0d85cd82c16af8c0d888fc22796d1c743f3e47656732d4d6beb0bc1ea36",
    "blockNumber": "0x34f",
    "contractAddress": null,
    "cumulativeQuotaUsed": "0x98961c",
    "errorMessage": null,
    "logs": [
    ],
    "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
    "quotaUsed": "0x98961c",
    "root": null,
    "transactionHash": "0x9c6bae3216bbaa755f80e61d00cd3502e151a61bafca691b12a9a457695eb12b",
    "transactionIndex": "0x0"
  }
}
```

### 再查询 balance

```shell
$ curl -X POST --data '{"jsonrpc":"2.0","method":"call", "params":[{"to":"0x0000000000000000000000000000000000000500", "data":"0x832b4580"}, "latest"],"id":2}' 127.0.0.1:1337
```

返回：

```json
{"jsonrpc":"2.0","id":2,"result":"0x0000000000000000000000000000000000000000000000000000000000000011"}
```

符合我们编写的智能合约预期。
