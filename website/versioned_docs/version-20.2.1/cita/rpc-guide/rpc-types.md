---
id: version-20.2.1-rpc-types
title: JSON-RPC 类型
original_id: rpc-types
---

## JSON-RPC support

|                |   CITA   |
| -------------- |:--------:|
| JSON-RPC 1.0   | &#x2713; |
| JSON-RPC 2.0   | &#x2713; |
| Batch requests | &#x2713; |
| HTTP           | &#x2713; |
| IPC            |          |
| WS             | &#x2713; |

## 基本类型

### `Quantity`

大整数类型。

* 作为参数传入时：

    * `0x` 开头的十六进制的字符串（仅包含 `0-9` 和 `a-f` 字符）
    * 必须为字符串格式，即左右有双引号
    * 不可以为空字符串
    * 不可以 `0x`，`0` 必须写做 `0x0`
    * （不建议）目前兼容使用大写 `0X` 开头
    * （不建议）目前兼容使用大写 `A-F` 字符
    * （不建议）目前兼容十进制字符串（不用 `0x` 开头且仅含有字符 `0-9`）
    * （不建议）目前兼容数据高位填充 `0`

    * 示例：

        * (Good)  `"0xab5801a7"`
        * (Bad)   `"0Xab5801a7"`
        * (Bad)   `"0xAB5801A7"`
        * (Bad)   `"2874671527"`
        * (Bad)   `"0x0000ab5801a7"`
        * (Wrong) `0xab5801a7`
        * (Wrong) `"0x"`
        * (Wrong) `"ab5801a7"`

* 作为返回值时：

    带 `0x` 前缀紧凑型的十六进制小写字符串

### `Integer`

一般整数类型。

* 作为参数传入时：

    * 十进制数值

    * 示例：

        * (Good)  `2874671527`
        * (Wrong) `"2874671527"`
        * (Wrong) `"0xab5801a7"`
        * (Wrong) `0xab5801a7`

* 作为返回值时：

    * 十进制数值

### `Data`

不定长二进制数据类型。

* 作为参数传入时：

    * `0x` 开头的十六进制的字符串（仅包含 `0-9` 和 `a-f` 字符）
    * 必须为偶数个字符
    * 使用 `0x` 表示空数据
    * （不建议）目前兼容使用大写 `0X` 开头
    * （不建议）目前兼容使用大写 `A-F` 字符

    * 示例：

        * (Good)    `"0x"`
        * (Bad)     `"0Xab5801a7"`
        * (Bad)     `"0xAB5801A7"`
        * (Wrong)   `0xab5801a7`
        * (Wrong)   `"0xab5801a"`
        * (Wrong)   `""`
        * (Wrong)   `"ab5801a7"`

* 作为返回值时：

    * `0x` 开头的十六进制的字符串（仅包含 `0-9` 和 `a-f` 字符）

### `Data20` / `Data32`

定长二进制数据。 `Data20` 为 20 字节， `Data32` 为 32 字节。

* 作为参数传入时：

    * `0x` 开头的十六进制的定长字符串（仅包含 `0-9` 和 `a-f` 字符）
    * 需要补 `0` 填充完整
        * `Data20` 有 40 个字符（不包括前缀）
        * `Data32` 有 64 个字符（不包括前缀）
    * （不建议）目前兼容使用大写 `0X` 开头
    * （不建议）目前兼容使用大写 `A-F` 字符

    * 示例：

        * (Good) `"0x00000000000000000000000000000000ab5801a7"`
        * (Bad) `"0X00000000000000000000000000000000ab5801a7"`
        * (Bad) `"0x00000000000000000000000000000000AB5801A7"`
        * (Wrong) `"0xab5801a7"`
        * (Wrong) `0x00000000000000000000000000000000ab5801a7`

* 作为返回值时：

    * `0x` 开头的十六进制的定长字符串（仅包含 `0-9` 和 `a-f` 字符）

### `Boolean`

布尔类型，`true` 或者 `false`。

### `String`

字符串类型。

### `Tag`

标签类型，由特定字符串或数字组成的枚举类型。

* `BlockTag(String)`

    * `"earliest"`：代表链的第一个块, 即创世块
    * `"latest"`：代表 `pending` 块的上一个块，表示当前块的交易列表以及交易执行结果都经过了共识
    * `"pending"`：代表最新出的块，表示当前块的交易列表经过了共识，而交易执行结果尚未经过共识

* `EconomicalModel(Integer)`

    * `0`：Quota 经济模型
    * `1`：Charge 经济模型

## 复合类型

### `BlockNumber`

* `Quantity | BlockTag`：通常可以为空，为空时默认值为 `"latest"`

### `CallRequest`

* `from`：`Data20` - **可选** 交易发送者地址
* `to`：`Data20` 交易接收者地址
* `data`：`Data` - **可选** 调用函数签名哈希值和参数内容, 详细内容请查看 [Ethereum Contract ABI]

### `Filter`

* `fromBlock`：`BlockNumber` - **可选** 起始块高度
* `toBlock`：`BlockNumber` - **可选** 终止块高度，当 `toBlock` 大于当前链的最大高度时，则终止块高度为当前链的最大高度，即 `pending` 块高
* `address`：`Data20 | [Data20]` - **可选** 合约地址或者产生日志合约地址的集合
* `topics`：`[Data32 | [Data32]]` - **可选** 由日志索引(topic)或者多个索引组成的数组集合

`Topics` 索引数组是顺序相关的, 过滤器通过设置索引数组来过滤交易日志内容, 示例如下：

* `[]`：不设置任何索引
* `[A]`：`topics`第一个索引是 `A`, 其余索引无限制
* `[null, B]`：`topics` 第一个索引没有限制, 第二个索引是 `B`, 其余索引无限制
* `[A, B]`：`topics` 第一个索引是 `A`, 第二个索引是 `B`, 其余索引无限制
* `[[A, B], [A, B]]`：`topics` 第一个索引是 `A` 或者 `B`, 第二个索引是 `A` 或者 `B`, 其余索引无限制

### `Block`

* `version`：块的版本号(默认为0)
* `hash`：块哈希值
* `header`：块头部
    * `timestamp`：块内时间戳
    * `prevHash`：前一个块的哈希值
    * `number`：块高(十六进制)
    * `stateRoot`：状态树根
    * `transactionsRoot`：交易树根
    * `receiptsRoot`：回执树根
    * `quotaUsed`：块内消耗的 `quota` 数量
    * `proof`
        * `BFT`
            * `proposal`：提议内容哈希值
            * `height`：块高(十进制)
            * `round`：投票轮数
            * `commits`：投票人地址和投票内容签名
    * `proposer`：提议者
* `body`：块体
    * `transactions`：交易列表

[Ethereum Contract ABI]: (https://github.com/ethereum/wiki/wiki/Ethereum-Contract-ABI)
