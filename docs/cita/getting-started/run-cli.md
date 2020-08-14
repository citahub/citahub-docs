---
id: run-cli
title: 运行 cita-cli
---

## 下载 cita-cli

下载最新版本 cita-cli：https://github.com/citahub/cita-cli/releases
使用说明详见：https://github.com/citahub/cita-cli

## 进入 cita-cli 
${version} 为 cita-cli release 对应的版本号，建议使用最新 cita-cli release 版本号

```shell
$ wget https://github.com/citahub/cita-cli/releases/download/${version}/cita-cli-x86_64-musl-tls-${version}.tar.gz
$ tar -zxf cita-cli-x86_64-musl-tls-${version}.tar.gz
$ ./cita-cli
```

## 查看当前所在的链和加密算法

```shell
cita> info
```

输出结果：
> * url : 当前所在的链
> * encryption : 加密算法

```
[       url        ]: http://127.0.0.1:1337
[       pwd        ]: /Users/yanli/soft/CITA/toolcita
[      color       ]: true
[      debug       ]: true
[       json       ]: true
[    encryption    ]: secp256k1
[ completion_style ]: List
[    edit_style    ]: Vi
[   save_private   ]: true
```

## 切换链

```shell
cita> switch --url https://testnet.citahub.com
```

## 切换加密算法

```shell
cita> switch --algorithm --help
```

输出结果：

```shell
>> switch 
Switch environment variables, such as url/algorithm

USAGE:
    switch [FLAGS] [OPTIONS]

FLAGS:
        --color               Switching color for rpc interface
        --debug               Switching debug mode
        --json                Switching json format
        --completion_style    Switching completion style
        --edit_style          Switching edit style
        --save_private        Switching whether save private key
    -h, --help                Prints help information

OPTIONS:
        --url <url>                Switch url
        --algorithm <algorithm>    Select the encryption algorithm you want, the default is secp256k1 [possible values:
                                   secp256k1, ed25519, sm2]
```

如：切换至 sm2 加密算法

```shell
cita> switch --algorithm sm2
```

## 创建超级管理员账户地址、私钥、公钥

执行命令：

```shell
cita> key create
```

命令返回：

```json
{
  "address": "0x37d1c7449bfe76fe9c445e626da06265e9377601",
  "private": "0x3ef2627393529fed043c7dbfd9358a4ae47a88a59949b07e7631722fd6959002",
  "public": "0x9dc6fc7856f5271e6e8c45e5c5fe22d2ff699ac3b24497599be77803d3c25fb4e2fe7da616c65a291910c947c89923009f354634421bddd0a25cd0a509bcf6a9"
}
```

> 注：此处为示例公私钥对，不要在生产环境复制使用，其中：
>
> * "address"： 账户地址
> * "private"：账户私钥
> * "public"：账户公钥

