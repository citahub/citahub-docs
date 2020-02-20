---
id: version-20.2.0-software-upgrade
title: 软件升级
original_id: software-upgrade
---

软件升级, 指的是升级区块链所有节点的软件版本。

## 流程说明

1. CITA 开发团队完成新版本协议的开发工作，发布支持新版本协议的 CITA 版本，并附带相关的文档。

2. 已有链的运营方讨论之后决定升级到新版本协议。

3. 所有的节点都升级至支持新版本协议的 CITA 版本。升级 CITA 版本，只需要停掉节点，替换发布件中的二进制执行文件（节点文件夹不动），然后再启动节点即可。如果有额外的操作，会在 release notes 中说明, 升级前请仔细阅读发版说明。

> **注意**
>
>升级 CITA 版本之后，使用的依然是老的协议。链的运营者可以预留一个比较长的时间，让各个节点错开时间分别升级 CITA 版本，可以避免中断业务。

## 操作示例

1. 创建临时目录

   ```shell
   $ mkdir -p /data/cita-tmp
   ```

2. 下载新版本

   ```shell
   $ wget -P /data/cita-tmp/ https://github.com/citahub/cita/releases/download/v0.24.0/cita_secp256k1_sha3.tar.gz
   $ tar zxvf /data/cita-tmp/cita_secp256k1_sha3.tar.gz
   ```

3. 切换目录

   ```shell
   $ cd /data/cita/cita_secp256k1_sha3
   ```

4. 停止节点

   ```shell
   $ ./bin/cita stop test-chain/0
   ```

5. 覆盖应用程序

   ```shell
   $ cp -rp /data/cita-tmp/cita_secp256k1_sha3/bin/* ./bin/
   ```

6. 启动节点

   ```shell
   $ ./bin/cita start test-chain/0
   ```

7. 查看运行程序版本

   ```shell
   $ ./bin/cita-env ./bin/cita-jsonrpc --version | head -1
   ```

8. 返回结果

   ```
   JsonRpc v0.24.0
   ```
