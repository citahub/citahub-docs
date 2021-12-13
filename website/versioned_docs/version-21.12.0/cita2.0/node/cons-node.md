---
id: version-21.12.0-cons-node
title: 共识节点管理
original_id: cons-node
---

设置新的共识节点列表。

操作示例：

*  查看系统配置，确认当前的验证人列表。
  ```
  $ cldi system-config
  {
    "admin": "0xae069e1925a1dad2a1f4c7034d87258dfd9b6532",
    "block_interval": 3,
    "chain_id": "0x26b0b83e7281be3b117658b6f2636d0368cad3d74f22243428f5401a4b70897e",
    "validators": [
      "0x724f28ac8d069f150d541a07235ebc2363ae9b2a",
      "0x1e0427b2a2ba34dceda5788d98f59aef0eb92f8e",
      "0x868a116bd018c3ed0facb4a761829485f03c2f73"
    ],
    "version": 0
  }
  ```
*  设置新的共识节点列表，新增地址为`0xc35b3b7437a31b4d0a737041a17a8e181ae25ba5`的共识节点。
  ```
  $ cldi update-validators 0x724f28ac8d069f150d541a07235ebc2363ae9b2a 0x1e0427b2a2ba34dceda5788d98f59aef0eb92f8e 0x868a116bd018c3ed0facb4a761829485f03c2f73 0xc35b3b7437a31b4d0a737041a17a8e181ae25ba5
  tx_hash: 0x54f9ebdb3d5e52b80cad92c7551a706a4ae20aecd7cde88c167f8659bec4a4b4
  ```
*  等待几秒，待交易上链之后，查看系统配置确认`validators`变成了新的一组账户地址。
  ```
  $ cldi system-config
  {
    "admin": "0xae069e1925a1dad2a1f4c7034d87258dfd9b6532",
    "block_interval": 3,
    "chain_id": "0x26b0b83e7281be3b117658b6f2636d0368cad3d74f22243428f5401a4b70897e",
    "validators": [
      "0x724f28ac8d069f150d541a07235ebc2363ae9b2a",
      "0x1e0427b2a2ba34dceda5788d98f59aef0eb92f8e",
      "0x868a116bd018c3ed0facb4a761829485f03c2f73",
      "0xc35b3b7437a31b4d0a737041a17a8e181ae25ba5"
    ],
    "version": 0
  }
  ```

共识节点列表变更之后，若有共识节点被剔除，则被剔除共识节点的共识会停止；若有新的共识节点被添加，则链可能会停止出块，直到新加入的共识节点启动并完成同步之后才会继续共识并出块。
