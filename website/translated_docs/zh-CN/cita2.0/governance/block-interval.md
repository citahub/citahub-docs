---
id: block-interval
title: 出块时间间隔
---

超级管理员可以设置新的出块间隔。

操作示例：

*  查看当前的出块间隔。

  ```
  $ cldi system-config
  {
    "admin": "0x9817ac046e0b6a2903352d05497564147ddc0a6f",
    "block_interval": 6,  //出块间隔为6秒
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

*  修改出块间隔为3秒。

  ```
  $ cldi  cldi set-block-interval 3
  tx_hash: 0xa0cad608b1e0245f988d193380a56aea1056bca217f2a73dadb8dcec02e20cb9
  ```

*  等待几秒，待交易上链之后，查看系统配置确认`blockInterval`变成了新的值。
  ```
  $ cldi system-config
  {
    "admin": "0x9817ac046e0b6a2903352d05497564147ddc0a6f",
    "block_interval": 3,
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
