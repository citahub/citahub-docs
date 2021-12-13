---
id: auxiliary-command
title: 辅助命令
---
## `create-ca`命令

创建链的根证书。会在`$(config-dir)/$(chain-name)/ca_cert/`下生成`cert.pem`和`key.pem`两个文件。

参数：

```
--chain-name <CHAIN_NAME>
	set chain name [default: test-chain]
--config-dir <CONFIG_DIR>
	set config file directory, default means current directory [default: .]
```
`--chain-name`设置链的名称，默认为test-chain。
`--config-dir`设置配置文件目录，默认为当前目录。

## `create-csr`命令

为各个节点创建证书和签名请求。会在`$(config-dir)/$(chain-name)/certs/$(domain)/`下生成`csr.pem`和`key.pem`两个文件。

参数：

```
--chain-name <CHAIN_NAME>
	set chain name [default: test-chain]
--config-dir <CONFIG_DIR>
	set config file directory, default means current directory [default: .]
--domain <DOMAIN>
	domain of node
```
`--chain-name`设置链的名称，默认为test-chain。
`--config-dir`设置配置文件目录，默认为当前目录。
`--domain`为必选参数。值为前面`set-nodelist`或者`append-node`时传递的节点的网络地址中的`domain`。

## `sign-csr`命令

处理节点的签名请求。会在`$(config-dir)/$(chain-name)/certs/$(domain)/`下生成`cert.pem`。

参数：

```
--chain-name <CHAIN_NAME>
	set chain name [default: test-chain]
--config-dir <CONFIG_DIR>
	set config file directory, default means current directory [default: .]
--domain <DOMAIN>
	domain of node
```
`--chain-name`设置链的名称，默认为test-chain。
`--config-dir`设置配置文件目录，默认为当前目录。
`domain`为必选参数。值为前面执行`create-csr`时节点的`domain`。

## `new-account`命令

创建账户。会在`$(config-dir)/$(chain-name)/accounts/`下，创建以账户地址为名的文件夹，里面有`key_id`和`kms.db`两个文件。

参数：

```
--chain-name <CHAIN_NAME>
	set chain name [default: test-chain]
--config-dir <CONFIG_DIR>
	set config file directory, default means current directory [default: .]
--kms-password <KMS_PASSWORD>
	kms db password [default: 123456]
```

`--chain-name`设置链的名称，默认为test-chain。
`--config-dir`设置配置文件目录，默认为当前目录。
`--kms-password`输入密钥库密码，默认为“123456”。
