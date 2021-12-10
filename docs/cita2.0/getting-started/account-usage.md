---
id: account-usag
title: 账户操作
---

## 创建账户

```
$ cldi account create test
user: `test`
account_addr: 0x415f568207900b6940477396fcd2c201efe49beb
```

## 查看账户信息

创建账户后通过命令查看该账户的账户地址、私钥以及公钥：

```
$ cldi account export test
{
  "account_addr": "0x415f568207900b6940477396fcd2c201efe49beb",
  "private_key": "0x4f894fc00e6c71c7d0dde511eef64824b64fce87fd6f43492808cb99e9f22a57",
  "public_key": "0x6dd968546f2af3053be1d31aed723b58bf5380884ec5f2d41e8156dcc17c1317456c2cc9fb28290d7da0e606267ec1b00bfe54bb214ba5d6c2831c8211e9f343"
}
```

## 登录账户

登录刚刚创建的`test`账户

```
$ cldi account login test
OK, now the default user is `test`, account addr is 0x415f568207900b6940477396fcd2c201efe49beb
```

登录账户之后，可以以该账户的身份发送交易。
