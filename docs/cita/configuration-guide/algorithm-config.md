---
id: algorithm-config
title: 算法配置
---

CITA 支持三种算法的组合（分别为加密算法和散列算法）：

1. [secp256k1] 与 [sha3]
2. [ed25519] 与 [blake2b]
3. [sm2] 与 [sm3]

文档演示默认是使用第一种算法， 可在[发布件]页面下载对应二进制包。

[blake2b]: https://en.wikipedia.org/wiki/BLAKE_(hash_function)
[ed25519]: https://ed25519.cr.yp.to/
[secp256k1]: https://en.bitcoin.it/wiki/Secp256k1
[sha3]: https://en.wikipedia.org/wiki/SHA-3
[sm2]: https://zh.wikipedia.org/wiki/SM2
[sm3]: https://zh.wikipedia.org/wiki/SM3
[发布件]: https://github.com/citahub/cita/releases
