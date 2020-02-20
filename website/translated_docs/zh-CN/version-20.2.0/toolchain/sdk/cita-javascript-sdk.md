---
title: CITA JavaScript SDK
id: version-20.2.0-javascript-sdk
original_id: javascript-sdk
---

JavaScript SDK 技术栈为 TypeScript 和 Protocol Buffers，是在 Ethereum [Web3.js](https://github.com/ethereum/web3.js/) 的基础上做了封装并且添加 CITA 的 RPC 请求以及CITA的签名模块。 cita-sdk-js 用 lerna 作为包管理，主要包含 3 个模块：Signer 签名模块，RPC 模块和 System Contract 模块。

* SDK 代码：[cita-sdk](https://github.com/citahub/cita-sdk-js/tree/develop/packages/cita-sdk)
* Signer 签名模块代码：[cita-signer](https://github.com/citahub/cita-sdk-js/tree/develop/packages/cita-signer)
* RPC 模块代码：[rpc.ts](https://github.com/citahub/cita-sdk-js/blob/develop/packages/cita-sdk/src/base/rpc.ts)

### 签名模块 Signer

* 交易参数
    * 签名模块用于对交易做签名。CITA 中的交易参数有 from、to、data、nonce、quota、validUntilBlock、value、chainId。其中比较特别的是 quota 字段和 validUntilBlock 字段：

        *  quota 字段等同于 Ethereum 上的 gas，用来限制这笔交易的计算量。
        *  validUntilBlock 字段起到超时机制作用，用于告知如果此交易在 validUntilBlock 高度以后还没处理则此交易视为失败，避免交易长时间 pending。

* 私钥模块
    * 私钥模块 privateKey：此部分与 Web3.js 中私钥模块一致。
* 序列化 protobuf
    * 取得交易和私钥后要进行序列化，CITA 的 protobuf 文件单独抽离出来作为一个项目 [github.com/citahub/cita-proto](http://github.com/citahub/cita-proto) ，以 submodule 形式引入 SDK 项目，如果 CITA 更新了protobuf，那么所有的 SDK 都可以同步更新。
* 签名过程：首先构建交易的 protobuf 实例，填入交易参数后序列化得到交易 msg，通过 privateKey 对 msg 做签名，然后构建 Unverified Transaction protobuf 实例，填入相关信息，比如加密方式，签名后序列化得到 rpc 需要的交易数据，这个交易数据是不可读的数据，在签名模块中含有解签模块，可恢复数据。
* 测试：为了保证多个 SDK 之间的行为一致，也把测试模块单独抽离出来作为一个项目 [github.com/citahub/cita-sdk-tests](http://github.com/citahub/cita-sdk-tests) ，通过 submodule 形式引入，每次升级 CITA 时，SDK 也要对各个版本的数据做一次测试，因此 test 模块会有多个版本的签名的数据结果，需要把所有测试结果都运行一遍。

### RPC模块

目前是通过传统的 RPC 接口协议与链交互，由于 CITA 的 JavaScript 版 SDK 是在 Web3.js 基础上做了修改，因此可兼容Ethereum 和 CITA 且支持自定义的 Web3.js 实例。 RPC 请求构造如下：

```
export const getBlockByNumber = {
  name: 'getBlockByNumber',   //函数名称
  call: 'getBlockByNumber',   //RPC名称
  params: 2,                  //规定参数个数和参数预处理
  inputFormatter: [
    formatters.inputBlockNumberFormatter,
    function(val: any) {
      return !!val
    }
  ],
  outputFormatter: formatters.outputBlockFormatter
}
```

### System Contract

系统合约涉及到管理员合约，quota price 管理，quota 管理。例如如果想调整节点的 quota limit，需要通过系统合约调整，需将系统合约封装到 SDK 中，为保证各个 SDK 统一，会将合约的 ABI 文件，即合约的接口描述文件(通过 ABI 可以知道合约暴露了哪些接口)，存放在 [github.com/citahub/cita-sys-abi](http://github.com/citahub/cita-sys-abi)  并以 submodule 形式引入，之后在 npm script 里添加一条 parse-abi 指令，这条指令会把 cita-sys-abi 转换成 typescript 文件，用于构建 sdk 实例时创建系统合约实例。

## 快速入门

cita-sdk : [https://github.com/citahub/cita-sdk-js/tree/develop/packages/cita-sdk](https://github.com/citahub/cita-sdk-js/blob/develop/docs/zh-CN/cita-sdk.md) cita-signer: [https://github.com/citahub/cita-sdk-js/tree/develop/packages/cita-signer](https://github.com/citahub/cita-sdk-js/blob/develop/docs/zh-CN/cita-signer.md) 同时发布在 npm 平台：https://github.com/citahub/cita-sdk-js/blob/develop/docs/zh-CN/overview.md


## 期待协作：

JavaScript SDK 将根据 CITA 的 release 情况及时跟进适配。 我们正在招募社区开发者，想要获得更多资讯欢迎申请加入 CITAHub：https://www.citahub.com/#joinArea

