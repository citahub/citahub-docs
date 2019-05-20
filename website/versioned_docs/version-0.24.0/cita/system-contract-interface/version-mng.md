---
id: version-0.24.0-version-mng
title: 协议版本管理合约接口
original_id: version-mng
---

## setVersion

设置协议版本

* 参数

    `uint` - 设置的版本号

* 返回值

    `bool` - 设置成功返回真，反之则反

* 示例

```shell
$ cita-cli scm VersionManager setVersion \
              --admin-private 0x5f0258a4778057a8a7d97809bd209055b2fbafa654ce7d31ec7191066b9225e6 \
              --version 0x0000000000000000000000000000000000000000000000000000000000000002 \
              --url http://127.0.0.1:1337
```

## getVersion

查询当前链协议版本

* 参数

    空

* 返回值

    `uint` - 协议版本

* 示例

```shell
$ cita-cli scm VersionManager getVersion --url http://127.0.0.1:1337
```

输出：

```json
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": "0x0000000000000000000000000000000000000000000000000000000000000002"
}
```
