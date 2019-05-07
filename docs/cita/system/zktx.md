---
id: zktx
title: 隐私交易示例
---

## 隐私交易示例

> Warning：当前代码仅为原型验证系统，请勿用于生产环境。

示例中使用的环境如下：

* [Rust]: `rustc 1.36.0-nightly (d628c2e64 2019-05-05)`
* [CITA]: develop commit 为 `6f8fcdf3dc5bc36fb72f0c183ae9fecfe791dacc`
* [zktx]: master commit 为 `df9371c58296885a780bdf44c270703ffa7ac5e9`
* [zktx_example]: master commit 为 `1b2f149245184ab84261f137509af8d865276fad`

### 准备工作

* `clone` [zktx_example] 代码
* `clone` [CITA] 代码

### 生成参数

使用 [zktx_example] 生成隐私交易需要的参数文件，命令如下：

```shell
cd zktx_example && cargo run --release --bin gen_params
```

生成 `PARAMS` 的文件夹。

### 运行 `CITA` 链

#### `CITA` 开启隐私交易功能

详细信息可查看 [zk_privacy] 文档，如下操作：

> 修改 cita-executor/Cargo.toml。 在 [features] 下面 default 列表中增加 privatetx 。

#### 编译 `CITA`

使用 `make debug` 或者 `make release`

#### 生成 `CITA` 配置

本实例运行一个节点，更多信息查看[配置]。

1. 进入 `target/install`
2. 拷贝 `PARAMS` 到 `resource`

```shell
cp ../../../zktx_example/PARAMS resource -r
```

3. 生成配置信息

```shell
bin/cita create --super_admin "0x4b5ae4567ad5d9fb92bc9afd6a657e6fa13a2523" --nodes "127.0.0.1:4000" --resource_dir resource
```

#### 运行 `CITA`

详细信息查看[快速入门]

1. 初始化

```shell
bin/cita setup test-chain/0
```

2. 启动

```shell
bin/cita start test-chain/0
```

### 运行 `zktx_example` 的测试

```
cd ../../zktx_example && cargo run --release --bin client
```

[CITA]: (https://github.com/cryptape/cita)
[Rust]: (https://www.rust-lang.org/)
[zk_privacy]: (https://github.com/cryptape/cita/blob/develop/cita-executor/core/src/contracts/native/zk_privacy.md)
[zktx]: (https://github.com/cryptape/zktx)
[zktx_example]: (https://github.com/cryptape/zktx_example)
[快速入门]: (https://docs.citahub.com/zh-CN/cita/getting-started)
[配置]: (https://docs.citahub.com/zh-CN/cita/configuration/config-overview)
