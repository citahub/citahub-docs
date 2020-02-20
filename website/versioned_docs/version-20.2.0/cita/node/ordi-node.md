---
id: version-20.2.0-ordi-node
title: 普通节点管理
original_id: ordi-node
---

普通节点的管理，是指普通节点的添加与删除。当前 CITA 的节点发现提供两种机制：

* 自动发现机制，本节点会自动通过所配置的 `peers` 发现网络中的其它节点并尝试连接。
* 配置文件发现机制，本节点仅连接 `peers` 中所配置的节点。

CITA 的节点发现机制通过 [network 网络配置] 中的 `enable_discovery` 配置项设置。

下面我们将用具体的示例来阐述 CITA 的普通节点管理。

## 添加普通节点（以下以 4 号节点举例）

1. 假设目前的工作目录在 `cita/target/install/` 下：

   ```shell
   $ ls test-chain/
     0  1  2  3  template
   ```

   template 中保存了当前节点的公钥地址 `template/authorities.list`，以及创世块信息 `template/configs/genesis.json`，目前地址有四个。

2. 生成新 node：

   ```shell
   $ ./bin/cita append --chain_name test-chain --node "127.0.0.1:4004"
   $ ls test-chain/
     0  1  2  3  4  template
   ```

   - append 子命令，在指定链中增加对应 ip 地址的节点。
   - 脚本将自动生成 4 号节点，并在原有节点中 `test-chain/*/network.toml` 中插入新节点的 ip 及端口配置。

3. 启动新节点：

   新节点只需要按照正常流程启动，就可以连接入网络，并开始同步链上的块数据。

   **注意：**

   **a. 此时的新节点为普通节点，不参与共识选举，即只能同步数据和接收 jsonrpc 请求。**

   **b. 当 [network 网络配置] 为 `enable_discovery = false` 时，需要在原来节点的 `network.toml` 文件中 `peers` 域添加新节点信息。**

   ```shell
   $ ./bin/cita setup test-chain/4
   $ ./bin/cita start test-chain/4
   ```

## 删除普通节点

* 当 [network 网络配置] 为 `enable_discovery = false` 时，到对应节点目录下，找到 `network.toml`，删除对应 `peers` 条目即可。

* 当 [network 网络配置] 为 `enable_discovery = true` 时，一个节点主动下线，该节点便在网络中被移除。

[network 网络配置]: ../configuration-guide/service-config#network
