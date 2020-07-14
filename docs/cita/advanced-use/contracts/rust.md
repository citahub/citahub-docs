---
id: rust
title: Rust 原生合约开发
---

CITA 支持用 Rust 编写的原生合约。

## 依赖说明

Rust 原生智能合约目前需要与 CITA 源码工程一起编译、部署。
因此，首先获得 [CITA 源码库]，推荐在 CITA 工程（cita-executor/core/src/native）中编写 Rust 原生合约代码。

*需要有 Rust 编程基础*

## 编写智能合约

本文以 Solidity 智能合约为样例，展现如何用 Rust 完成一个同样逻辑的原生合约，并进一步说明为何当前 Rust 语言需要如此实现。

```
pragma solidity ^0.4.19;

contract HelloWorld {
    uint public balance;

    function update(uint amount) public returns (uint) {
        balance += amount;
        return balance;
    }
}
```

上面的代码段定义了一个名 `HelloWorld` 的合约，定义了一个变量 `balance`，然后定义一个对这个变量的 `update` 操作。
接下来我们用 Rust 语言去定义同样合约逻辑的原生合约。

### 定义合约变量

定义了一个 `HelloWorld` 结构体来存储一些必要的数据。

```rust
pub struct HelloWorld {
    balance: Scalar,
    output: Vec<u8>,
}
```

包括：

* 合约变量 balance：与 Solidity 对应
* output 变量：操作 update 操作的返回值，执行结果或者错误信息

### 定义合约

实现 `Rust` 原生合约至少需要实现 `exec` 与 `create` 这两个方法：

* 当创建合约时，`CITA` 会调用 `create `方法
* 而当外部调用合约（如下文的合约调用）时，`CITA` 会调用 `exec `方法

```rust
impl Contract for HelloWorld {
    fn exec(
        &mut self,
        params: &VmExecParams,
        _context: &Context,
        data_provider: &mut DataProvider,
    ) -> Result<InterpreterResult, NativeError> {
        method_tools::extract_to_u32(&params.data[..]).and_then(|signature| match signature {
            0 => self.init(params, data_provider),
            // Register function
            0x832b_4580 => self.balance_get(params, data_provider),
            0xaa91_543e => self.update(params, data_provider),
            _ => Err(NativeError::Internal("out of gas".to_string())),
        })
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

* `update`：对应 Solidity 中函数，更新 balance
* `balance_get`：获取 balance 值

接下来，我们来具体实现这两个函数接口。

### 实现合约接口

*以下对 update 接口进行说明， balance_get 可自行阅读代码*

接口实现代码如下：

```rust
fn update(
    &mut self,
    params: &VmExecParams,
    data_provider: &mut DataProvider,
) -> Result<InterpreterResult, NativeError> {
    self.output.resize(32, 0);

    // Get the params of`update`
    let amount = U256::from(params.data.get(4..36).expect("no enough data"));
    let new_balance = self
        .balance
        .get(data_provider, &params.storage_address)?
        .saturating_add(amount);

    self.balance
        .set(data_provider, &params.storage_address, new_balance)?;

    Ok(InterpreterResult::Normal(self.output.clone(), 100, vec![]))
}

fn balance_get(
    &mut self,
    params: &VmExecParams,
    data_provider: &mut DataProvider,
) -> Result<InterpreterResult, NativeError> {
    self.output.resize(32, 0);
    self.balance
        .get(data_provider, &params.code_address)?
        .to_big_endian(self.output.as_mut_slice());
    Ok(InterpreterResult::Normal(self.output.clone(), 100, vec![]))
}
```

#### 获得参数

update 方法中的参数 `amount` 需要从 `params` 中解析：

* 前 4 字节与上文对应的函数签名
* 4 到 36 字节表示接口参数，即 `amount` 值

```rust
let amount = U256::from(params.data.get(4..36).expect("no enough data"));
```

#### 更新 balance

实现 `balance += amount`，如下：

```rust
let new_balance = self
    .balance
    .get(data_provider, &params.storage_address)?
    .saturating_add(amount);

self.balance
    .set(data_provider, &params.storage_address, new_balance)?;
```

#### 处理返回值

代码如下：

```rust
Ok(InterpreterResult::Normal(self.output.clone(), 100, vec![]))
```

查看[这里](https://github.com/citahub/test-contracts/blob/master/hello.rs)阅读合约的完整代码。

## 注册合约地址

Rust 原生合约当前是随 CITA 直接启动的，并不像 Solidity 合约发送交易来部署合约。
在 `factory.rs`（cita-executor/core/src/contracts/native）的Default实现中加入合约的注册代码便可。

```rust
// here we register contracts with addresses defined in genesis.json.
{
    use super::hello::HelloWorld;
    factory.register(Address::from(0x500), Box::new(HelloWorld::default()));
}
```

同时还需要在同目录下的代码 `mod.rs` 中加入 `hello` 的模块，使得可以编译进 CITA。

```rust
pub mod hello;
```

## 编译合约

将合约代码放到 cita-executor/core/src/native 下，启动编译 CITA 的命令：

```shell
./env.sh make
```

## 调用合约

*使用 [cita-cli] 交互式进行操作*

### 查询 balance

执行：

```shell
rpc call --to 0x0000000000000000000000000000000000000500 --data 0x832b4580
```

关键信息简释：

* `to`：合约地址，与前文注册的地址一致
* `data`：调用的方法签名，与前文函数签名对应

返回：

```json
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": "0x0000000000000000000000000000000000000000000000000000000000000000"
}
```

### 调用 update

```shell
rpc sendRawTransaction --code "0xaa91543e0000000000000000000000000000000000000000000000000000000000000011" --address 0x0000000000000000000000000000000000000500 --private-key 0x5f0258a4778057a8a7d97809bd209055b2fbafa654ce7d31ec7191066b9225e6
```

关键信息简释：

* code：前 4 个 bytes 为函数签名，后 32 bytes 为 update 参数。相当于执行 `HelloWorld.update(11)`
* address：前文注册的合约地址
* private-key：发交易需要的私钥

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
rpc call --to 0x0000000000000000000000000000000000000500 --data 0x832b4580
```

返回：

```json
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": "0x0000000000000000000000000000000000000000000000000000000000000011"
}
```

符合我们编写的智能合约预期。

[CITA 源码库]: https://github.com/citahub/cita
[JSON-RPC]: ../../rpc-guide/rpc
[cita-cli]: https://github.com/citahub/cita-cli
