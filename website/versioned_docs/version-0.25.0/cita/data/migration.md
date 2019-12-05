---
id: version-0.25.0-migration
title: 数据迁移
original_id: migration
---

**本地迁移**：磁盘空间不足时需要扩容，将节点迁移到新硬盘。

**异地迁移**：节点地址变更时（如机房搬迁），需将节点迁移到新的服务器。

## 本地 （磁盘空间不足扩容，迁移到新硬盘）

1. 案例新硬盘挂载到 `/data2/`，创建目录

   ```shell
   $ mkdir -p /data2/cita
   ```

2. 停止节点

   ```
   $ ./bin/cita stop test-chain/0
   ```

3. 拷贝到目标目录

   ```
   $ cd /data/cita
   $ cp -rp cita_secp256k1_sha3 /data2/cita
   ```

4. 启动节点

   ```
   $ cd /data2/cita/cita_secp256k1_sha3/
   $ ./bin/cita setup test-chain/0
   $ ./bin/cita start test-chain/0
   ```

5. 验证

   参考快速入门中的[验证 CITA 是否运行正常]

## 异地迁移 (节点地址变更，如机房搬迁）

1. 停止节点

   ```
   $ ./bin/cita stop test-chain/0
   ```

2. 拷贝到目标地址 案例 本地 ：192.168.1.104 远程：192.168.1.105

   ```
   $ scp -r /data/cita/cita_secp256k1_sha3 192.168.1.105:/data/cita/
   ```

3. 修改配置 （所有节点network.toml 配置中节点IP都需要变更）

   ```
   $ cd /data/cita/cita_secp256k1_sha3
   $ sed -i “s/192.168.1.104/192.168.1.105/g”  test-chain/0/network.toml
   ```

4. 启动节点

   ```
   $ ./bin/cita setup test-chain/0
   $ ./bin/cita start test-chain/0
   ```

5. 验证

   参考快速入门中的[验证 CITA 是否运行正常]

 [验证 CITA 是否运行正常]: ../getting-started/run-cita#验证-cita-是否运行正常
