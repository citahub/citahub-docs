---
id: version-21.12.0-update-admin
title: 更新管理员
original_id: update-admin
---

超级管理员可以指定下一任超级管理员。

操作示例：

*  查看系统配置，确认当前超级管理员账户。
  ```
  $ cldi system-config
  {
    "admin": "0xae069e1925a1dad2a1f4c7034d87258dfd9b6532",
    "block_interval": 6,
    "chain_id": "0x26b0b83e7281be3b117658b6f2636d0368cad3d74f22243428f5401a4b70897e",
    "validators": [
      "0xc35b3b7437a31b4d0a737041a17a8e181ae25ba5",
      "0xa5e75c8ed90c17d2cd0b637943c7ce83248dbf20",
      "0x32872cec919211f5d144f8464b45140f4a146002",
      "0x790f590a1ea9764bcc26154c3de868ccf7bdcad4"
    ],
    "version": 0
  }
  ```
*  指定新的超级管理员
  ```
  $ cldi update-admin 0x9817ac046e0b6a2903352d05497564147ddc0a6f
  tx_hash: 0x1f3b25887bca912b5809e4860cd507574682efe457c01d2d450aa2067c06e826
  ```
*  等待几秒，待交易上链之后，查看系统配置确认`admin`变成了新的账户地址。
  ```
  $ cldi system-config
  {
    "admin": "0x9817ac046e0b6a2903352d05497564147ddc0a6f",
    "block_interval": 6,
    "chain_id": "0x26b0b83e7281be3b117658b6f2636d0368cad3d74f22243428f5401a4b70897e",
    "validators": [
      "0xc35b3b7437a31b4d0a737041a17a8e181ae25ba5",
      "0xa5e75c8ed90c17d2cd0b637943c7ce83248dbf20",
      "0x32872cec919211f5d144f8464b45140f4a146002",
      "0x790f590a1ea9764bcc26154c3de868ccf7bdcad4"
    ],
    "version": 0
  }
  ```
