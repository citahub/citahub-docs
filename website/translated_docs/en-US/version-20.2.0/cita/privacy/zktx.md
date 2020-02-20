---
id: version-20.2.0-zktx
title: 零知识证明
original_id: zktx
---

## 用零知识证明实现隐私交易示例

> Warning：当前代码仅为原型验证系统，请勿用于生产环境。

示例中使用的环境如下：

* [Rust](https://www.rust-lang.org/): `rustc 1.34.1 (fc50f328b 2019-04-24)`
* [CITA](https://github.com/citahub/cita): develop commit 为 `87e11818081a9d2a883341bebf2aeb95c59c15fd`
* [zktx](https://github.com/citahub/zktx): master commit 为 `03fcc4b02432f42e53563deccdaaa767fd7a0ad6`
* [zktx_example](https://github.com/citahub/zktx_example): master commit 为 `b37ec8fe88fb2d8a48a4651419ed0c536d047c73`

### 准备工作

* `clone` [zktx_example](https://github.com/citahub/zktx_example) 代码
* `clone` [CITA](https://github.com/citahub/cita) 代码

### 生成参数

使用 [zktx_example](https://github.com/citahub/zktx_example) 生成隐私交易需要的参数文件，命令如下：

```shell
cd zktx_example && cargo run --release --bin gen_params
```

生成 `PARAMS` 的文件夹。

### 运行 `CITA` 链

#### `CITA` 开启隐私交易功能

详细信息可查看 [zk_privacy](https://github.com/citahub/cita/blob/develop/cita-executor/core/src/contracts/native/zk_privacy.md) 文档，如下操作：

> 修改 cita-executor/Cargo.toml。 在 [features] 下面 default 列表中增加 privatetx 。

#### 编译 `CITA`

详细信息可查看 [编译 CITA](../install#cita-源码编译部署) 文档，如下操作：

```shell
./env.sh make
```

#### 生成 `CITA` 配置

本实例运行一个节点，更多信息查看[配置](../configuration-guide/chain-config)。

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

详细信息查看[运行 CITA](../getting-started/run-cita)

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
