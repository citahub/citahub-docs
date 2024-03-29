---
id: version-20.2.1-transaction-process
title: 交易处理
original_id: transaction-process
---

CITA 采用微服务架构，各个服务之间通过消息通道进行消息的传递，服务间的消息采用 Protobuf 格式进行编码。各个服务在收到消息后，根据实际情况将消息转化为服务内的结构，进行相应处理。

在 CITA 中交易的生命周期内，用户在客户端按照 Protobuf 结构进行交易构造，将 Protobuf 结构序列化为 bytes 结构，将消息以 JSON-RPC 格式发送到 RPC 模块。RPC 模块对消息进行简单验证，验证通过后将消息发送到 Auth 模块。Auth 模块进行签名验证等，将验证结果通过消息通道返回给 RPC 模块，与此同时，如果验证通过，会将消息插入交易池。最终共识模块打包交易，发送给 Chain & Auth 进行处理。

## 交易构造

交易的 Protobuf 结构如下。

```protobuf
enum Crypto {
    DEFAULT = 0;
    RESERVED = 1;
}

message Transaction {
    string to = 1;
    string nonce = 2;
    uint64 quota = 3;
    uint64 valid_until_block = 4;
    bytes data = 5;
    uint64 value = 6;
    uint32 chain_id = 7;
    uint32 version = 8;
}

message UnverifiedTransaction {
    Transaction transaction = 1;
    bytes signature = 2;
    Crypto crypto = 3;
}

message SignedTransaction {
    UnverifiedTransaction transaction_with_sig = 1;
    bytes tx_hash = 2;  // SignedTransaction hash
    bytes signer = 3; //public key
}
```

其中 Transaction 为原始的交易的内容，UnverifiedTransaction 为带签名的交易，SignedTransaction 为验证通过的交易。

用户要发送交易，首先构造 Transaction，然后再构造 UnverifiedTransaction，其中 signature 为 Transaction 结构的 Hash 值进行签名得到的字符串，用来保证 Transaction 未被修改。Crypto 用来表示使用的哪一种签名方法。

## 交易验证

CITA 中交易通过消息总线进行转发，用户通过 RPC 模块和系统进行交互。RPC 请求分为两种：一种是对链上状态进行查询的请求，一种是需要打包到区块中的交易。

首先在 RPC 模块，对用户请求进行验证：

* 是否符合服务规范（目前支持 JSON-RPC 2.0）；
* 服务 API 方法是否合法；
* 参数个数和格式是否合法。

如果验证通过，则根据请求类型发往不同模块。对于查询请求，发送到相关模块，相关模块解析请求，并执行然后返回结果。对于交易，则发送到 Auth 模块，Auth 模块通过验证后，将交易放入交易池。

在 Auth 模块，需要验证

  * 交易签名是否合法；
  * 是否拥有权限；
  * 发送人是否有足够的配额；
  * 交易是否为重复交易。

交易验证通过后，以 SignedTransaction 的结构进行保存，并转发给其他模块。SignedTransaction 主要用来缓存签名和 Hash，这样避免了其他服务再去解签名，以及计算交易Hash的开销。

## 交易打包

最终共识将交易打包成 Block，发送到 Chain 和 Executor 模块，进行相应处理。

Block 的结构如下：

```protobuf
message Block {
    uint32 version = 1;
    BlockHeader header = 2;
    BlockBody body = 3;
}

message BlockBody {
    repeated SignedTransaction transactions = 1;
}

message BlockHeader {
    bytes prevhash = 1;
    uint64 timestamp = 2;
    uint64 height = 3;
    bytes state_root = 4;
    bytes transactions_root = 5;
    bytes receipts_root = 6;
    uint64 quota_used = 7;
    uint64 quota_limit = 8;
    Proof proof = 9;
    bytes proposer = 10;
}
```

共识对 Block 格式的验证包括：

  * PreHash 是否正确；
  * 区块签名是否正确；
  * 签名个数是否满足。

交易验证成功则正常执行，验证失败则将错误信息保存在交易回执中。CITA 中交易处理具有原子性，当交易在执行过程中发生错误，整个交易状态会回滚。

其中 BlockHeader 中的 transactions_root 用来保存 Body 中的交易 Root，在共识模块中构造 Proposal 时进行构造，以及验证 Proposal 时进行验证。在这里构造好 transactions_root，对于本节点共识的块，后续的 Chain/Executor 不需要再对交易格式进行验证，也不需要再计算transactions_root。

## 交易执行

Chain 模块负责存储和保存 Block 相关结构，Executor 模块负责处理交易。交易在处理过程中，采用针对交易的每一步执行进行单步扣费的方式：先检查费用，再进行执行的方式。Chain/Executor 处理完成后，将处理的结果，包括 state_root，receipts_root，quota_used 信息写入 Block，并进行落盘保存。

## 异步交易处理

区块链节点的最主要职责包括点对点网络交互、共识、交易处理以及数据存储四个方面。节点通过共识算法，在系统中形成对交易排序的全局共识，再按照共识
后的顺序对交易进行逐个处理。只要处理过程能保证确定性，所有节点最后都能达到一致的状态，产生相同的本地数据。

在当前的区块链设计中，共识与交易处理耦合程度较高，共识的性能受到交易处理能力的影响。
CITA 将共识与交易处理解耦为独立的微服务，共识服务只负责交易排序，并不关心交易内容，交易处理服务只负责对排好顺序的交易进行处理。
此时共识过程可以先于交易处理完成，交易处理服务可以异步执行。异步交易处理技术不仅使 CITA 具有更好的共识性能，还带来了更有弹性的交易处理能力，
交易负荷可以被更均匀的分摊到一段时间内。

由于交易异步处理，在共识前只能对交易进行有限的检查，例如签名验证。无效的交易有可能通过共识进入交易处理服务，产生一定程度的垃圾数据。
在有必要的情况下，可以通过 CITA 的交易控制或者垃圾清理技术解决该问题。
