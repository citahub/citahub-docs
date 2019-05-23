---
id: version
title: 版本升级
---

1. 创建新目录
   
   ```
   $ mkdir -p /data/cita-tmp
   ```
   
2. 下载新版本
   
   ```
   $ wget -P /data/cita-tmp/ [https://github.com/cryptape/cita/releases/download/v0.20.3/cita_secp256k1_sha3.tar.gz](https://github.com/cryptape/cita/releases/download/v0.22.3/cita_secp256k1_sha3.tar.gz)`
   $ tar zxvf /data/cita-tmp/cita_secp256k1_sha3.tar.gz
   ```
   
3. 切换目录
   
   ```
   $ cd /data/cita/cita_secp256k1_sha3
   ```
   
4. 停止节点
   
   ```
   $ ./bin/cita stop test-chain/0
   ```
   
5. 覆盖应用程序
   
   ```
   $ cp -rp /data/cita-tmp/cita_secp256k1_sha3/bin/* ./bin/
   ```
   
6. 启动节点
   
   ```
   $ ./bin/cita start test-chain/0
   ```
   
7. 查看运行程序版本
   
   ```
   $ ./bin/cita-jsonrpc --version |head -2
   ```
   
8. 返回结果
   
   ```
   JsonRpc v0.20.3
   ```
