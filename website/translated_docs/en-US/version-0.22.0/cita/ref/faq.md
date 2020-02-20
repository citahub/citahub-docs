---
id: version-0.22.0-faq
title: CITA FAQ
original_id: faq
---

## CITA 介绍、架构、原理

### CITA 介绍及整体架构

#### CITA 是什么？

CITA（ Cryptape Inter-enterprise Trust Automation ）是一个面向企业级应用的支持智能合约的区块链框架， 旨在为企业级区块链应用提供一个稳固、高效、灵活、可适应未来的运行平台。 CITA 将区块链节点的必要功能解耦为六个微服务：RPC，Auth，Consensus，Chain，Executor，Network。各组件之间通过消息总线交换信息相互协作。 通过配置和定制相应的服务，CITA 能够满足企业级用户的全部需要。

#### CITA 是否支持高可用？

CITA 单个节点本身不是高可用，但 CITA 网络整体上是个多节点的集群服务（多服务器互备），可以在 CITA 的 RPC 服务前置一些负载均衡服务（如 Nginx、HAProxy、Keepalived），来做到高可用架构。

#### CITA 是否支持异地多活？

支持。CITA 网络本身是个多节点的集群服务（多服务器互备），满足异地多份存储。

#### CITA 怎么解决实时性的问题？同步时间在高并发的情况下如何保证。

区块链的实时性主要体现在交易上链的速度，也就是出块间隔。CITA 默认出块间隔是 3s，已经远远小于比特币以太坊等区块链系统。而且 CITA 的出块间隔是可以配置的，如果用户的网络情况和机器配置比较好，可以进一步减小出块间隔。 同步确实会对节点的性能产生一定的影响，尤其是高度差比较大。比如其他节点已经运行了很长时间，突然加入一个全新的节点。CITA 提供的方案是快照。可以由其他节点生成一个快照文件，然后直接导入这个新节点，避免了同步操作对网络和其他产点产生影响。

#### CITA 怎么解决区块的容量限制的问题？比特币的区块目前是 1M。

对于比特币因为交易都是 UTXO，交易的处理的只需要验证 UTXO。比特币对块的大小进行限制，其实是在限制在有限时间内，能处理完块内交易，对交易复杂度进行限制，并达成一定程度的全网共识。

对于支持图灵完备的智能合约的联盟链，因为交易可以触发合约调用，并且交易复杂度是任意的，所以需要限制交易的复杂度，而通 过简单的限定区块大小并不能起到作用。因为即使交易很小，也有可能计算很复杂，比如调用合约内循环计算 sha3，即使交易内容很大，可能计算也很快，比较简单的存证处理。且在对于联盟链，由于节点数量相对较少，且联盟链组织会提供更好的网络连接，更快的传输效率，所以区块大小对于共识的影响较小。

针对以上情况，CITA 采用了更为精确的方式来进行对块内计算量的限制，包括计算复杂度，存储大小，系统带宽等等考虑，重新制定了每个交易对链内系统资源的使用规则，使用类似于以太坊的配额管理制度。CITA 采用的是跟以太坊类似的方案。每个块有一个 quota limit，不是以交易笔数或者大小为限制，而是以处理块中所有交易的计算量为限制。这个 limit 也是可配置的，并且可以动态修改。这个 limit 的设置跟出块间隔有关系。出块间隔小，limit 就要设置小一点，否则当前块处理不完，下一个块就会往后拖，导致实时性变差。

#### CITA 适合哪些人使用？

区块链开发者

#### CITA 的微服务架构到底是什么？

https://docs.citahub.com/zh-CN/cita/architecture/architecture

#### CITA 现在有哪些相关的专利？

我们会将 CITA 相关专利的具体信息以邮件的形式发送给现有的企业会员。

#### 为什么选择 Rust？

秘猿科技在 2016 年发起 CITA 开源项目，当时我们想要做面向企业应用的高性能许可链平台 ，因为 Python 开发效率非常高，适合用来做原型，所以，选用了 Python 来做原型。但是我们发现使用 **Python 做原型有几个弊端**：

* **性能差**：脚本语言无法与编译性语言媲美；
* **多核支持差**：有一个大的进程锁，在状态机上无法完全利用多核 CPU。在我们做完第一个原型时，某企业想要尝试，直接提供 4 台 56 核服务器，然而 Python 只能使用一个核是满的，其余 55 个核全都...所以，我们决定不再用 Python；
* **ffi 导致内存问题**。

面对性能差和多核支持差两个问题，我们做了很多 Tricky 的工作。我们用 C 代码将关键的地方写出来，用 ffi 方式去调用。但是 Python + C 的组合将会导致很多内存问题。在排除了 Python 之后，CITA 只有四种语言可供选择，即 Rust、Go、C++、Java。当时秘猿科技的早期员工，首先排除了 C++、Java，因为觉得逼格不够高。在区块链行业中，绝大多数的项目使用的是 Go 语言，那么促使我们最终选择 Rust 的原因是：

* **内存安全**：Rust 在编译阶段就会做很多内存检查。只要 Rust 程序编译通过，就不会有野指针、重复释放等问题。企业级用户，对可靠性的要求非常高，而 Rust 的内存安全符合企业级用户和以及我们的内在需求。
* **性能好**：Rust 被普遍认为是更好的 C++，从 C++ 标准演化过程中，你可以发现 C++ 和 Rust 殊途同归，最终的选择都差不多。与 Go 相比，Rust 没有 GC 的，性能确实是好一些。
* **多核支持好**。
* **类型系统**：在编译阶段杜绝很多代码问题，对软件质量非常有帮助。

### CITA 与 Fabric 对比

#### 与 Fabric 相比，CITA 有什么优点？

* **成本较高。** 咨询成本: IBM 咨询费用比较高; 维护成本: 包括升级的时候，链码的 package 必须在每一个背书节点中升级才可以，所以如果一个通道中的不同节点被不同的机构所掌握的话，可能需要联系独家机构才可以完成升级维护; 人员成本: 这样就要求一个开发人员至少具备两点：第一点就是需要对 Fabric 的概念很熟悉，有背书节点，peer 节点，通道的概念。 对于链码的部署，还需要一个背书策略。第二点就是对容器比较熟悉，因为智能合约，在 Fabric 中叫做链码。是单独作为一个容器以沙盒的形式运行在一个节点中，要通过 Fabric 修改升级删除链码需要通过命令行来实现。这样其实要求是一个底层工程师，一般成本要超过 50W 人民币一年。传统程序员很难胜任。
* **操作复杂。** 用证书进行权限控制。进行增加节点的时候过程繁琐，在增加的时候，需要在新增的节点中再次加入链码的 package。
* **性能不高。** 由于 Fabric 中每一个交易流程复杂，所以性能较低，官方宣布一万，但是实测可能较低，只有 200 TPS。 可能只有在 IBM 自己的硬件上面才可以达到很高的标准，因为 IBM 最终还是想要推广自己的硬件。
* **生态位不合理。** IBM 不接小的项目，但是他们本身的团队在有大的项目的时候，会接单提供技术支持。这个时候，如果你也是采用的 IBM 底层技术的话，竞标上面是有很大的劣势的。
* **Fabric 其实不是一个区块链**，准确的表达是**一个加入共识算法的中心化数据库**。这样就引发了两个问题，1. 没有原生代币，不需要挖矿，这样其实不能够提供一个经济激励，导致有一些需要激励的场景是没有办法用 Fabric 的。2. 无法进行跨链，Fabric 中通道就是一条链，跨通道就是跨链。但是通道并不是常规意义上的跨链，因为不可能所有的企业都在一个 Fabric 的网络上，所以他们不能跨通道，或者说跨通道技术非常不成熟。3.权限限制无法从链本身灵活实现，比如某个合约需要限制权限，而另一个不需要，两者又又互相调用关系。

#### Fabric 的合约能直接迁移到 CITA 上面吗？

不能。虽然 CITA 也支持 Go 智能合约，但是跟 Fabric 合约的共同点也只有都是用 Go 语言这一点，编程模式上完全不同。

### CITA 关键设计

#### CITA 是如何防止双花的？

首先简单解释下双花问题。双花简单来讲就是一笔钱进行了两次消费。对于传统的区块链，如果交易者使用同一笔余额，发送两个不同的交易到全网，虽然短暂时间内可能会造成分叉，但是因为区块链的共识的一致性，最终最多只有一笔成功，一笔资金不能同时被使用两次。用户交易在被打包入块后，被确认的交易所在的链存在一定概率被更长的链取代，会导致原来已经被确认的交易被回滚掉。在公网中，使用 POW 的算法时，随着区块被确认的次数增加，交易完全被确认的概率逐渐逼近 100%，但是永远到达不了 100%。以比特币网络为例大约 6 个块，以太坊大约 13 个块，即可在工程上认为交易被完全确认，如果想要更高的确定性，可以等待更多的块确认。

在 CITA 中，共识默认采用了 CITA-BFT 共识，一种经过了区块链适应性改造和调优的BFT算法。CITA-BFT 使用 Rust 实现，是一种确定性的共识算法，一旦当前块共识处理成功，就表示这个块被完全确认，不需要像比特币或者以太坊那样去担心因为更长的链出现而导致交易回滚。所以当能从链上查询到交易被成功处理，即表示交易被确认，无需再等待。所以如果用户广播两个有冲突的交易，交易经过共识后按照一定顺序来处理，最终在前面交易成功处理后，后面的交易因为条件不满足，肯定会处理失败。

在任何系统中，确定性都是基于概率的。对于 POW，存在 51% 攻击。但是实际情况中，假设一个矿工有 25% 的算力，在 6 个块被确认后，这个矿工通过构造一条超过主链长度的链来进行攻击，需要的概率为 (0.25/0.75)^6，约等于 0.00137，所以可以认为足够安全。但是实际上的确定性并没有这么高，因为存在以下几种考虑：1）不能认为其他矿工是诚实的，2）由于网络原因，其余矿工并不是完全在挖主链，存在挖陈腐块，以及算力在分叉链的情况，3）矿工对其他其他矿池进行攻击，结盟，运行零费用矿池等等手段，可以以非常低的成本来构造51%攻击。所以对于基于POW的公链来讲，确定性并不能满足所有的商业场景，并且确定时间也比较长。

而对于 CITA，由于采用 BFT 风格的算法，被确认的区块中至少要包含 2N/3 + 1 个共识节点的签名，伪造 ECDSA 签名的难度要远远高于挖矿算力计算难度 nonce 的。在 2011 年，比特币网络算力最高时，每秒大约可以进行 15 万亿次哈希计算，而对于 256 位的私钥，存在 2^256 种可能，所以使用当时情况所有的算力来暴力破解私钥，需要 pow(2,128) / (15 * pow(2,40)) / 3600 / 24 / 365.25 / 1e9 / 1e9， 大约需要 0.6537992112229596 万兆年的时间。并且破解需要大于等于 2N/3 + 1 的节点的签名才可以。所以可以认为交易一旦共识入块之后，即可认为是确定的，链被回滚的概率可以忽略不计，实际上造成双花的可能性几乎为零。CITA 较公链的 POW 有更好的确定性，更短的确定时间。

#### CITA 的 nonce 是什么作用？

比特币是基于 UTXO 的账号，交易是由 UTXO 来做组成，因为 UTXO 被消费后即失效，所以交易可以认为是唯一的。对于基于状态机的账号模型，用户发送的交易，存在被其他用户获取并重新发送到链上的可能，由此造成交易的多次执行，这种攻击行为称为重放攻击。为了避免重放攻击，需要采取一定的策略。例如以太坊中，用户发送的每一笔交易都必须包含一个自增的 nonce 值，交易一旦被确认，该用户的合法 nonce 值会自增，含有同样 nonce 的交易被认为是非法交易，这样来防止重放。但是对于以太坊的这种设计有一个很大的缺陷，后一笔交易必须等待前一笔交易进交易池才可以，交易只能顺序处理，限制了交易的并行性。例如，对于账户A向同一节点发送某一笔交易 T0 之后，只能等待 T0 打包入块并处理完成后，才可以发送后续的交易，即便后续交易对 T0 没有任何依赖关系，否则可能存在 T0 交易打包入块失败，而导致后续交易成功打包但是验证 nonce 失败。另外，在现实世界中存在同一账户被多人使用，或者向多个节点发送交易的情况，由于交易的 nonce 自增的特性，导致这种情况下，账户向多个节点同时发送交易会比较困难。

在 CITA 中 nonce 使用的是一个随机的字符串（有一定的长度限制），来使交易生成不同的 hash，使用 hash 来作为交易的唯一性验证。但是仅仅用 nonce 来保证哈希的唯一性，还是远远不够的，因为同一个用户发送交易足够多，nonce 还是有很大概率重复，且在工程上去保证全局 nonce 的唯一也会严重影响性能。在 CITA 的交易中 nonce 和 valid_until_block 配合使用，由此只要保证在max_valid_until_block 范围交易的 hash 没有重复，就可以保证交易永远不会重复。并且 max_valid_until_block 的值可以保证验证 nonce 的缓存池不会过大。在兼顾性能和并行处理的同时，非常完美的解决了交易的唯一性问题，防止了重放攻击。

#### valid_until_block 是什么作用？

在公网上，用户发送交易到节点处理时，首先链会返回一个交易的哈希作为交易的 ID。实际交易处理的时间，会因为节点的处理能力，以及节点选择交易的算法而受影响，可能出现长时间不能被打包入块（入块指打包成 Block 并共识成功）的情况。此时，用户不能确认交易依然是在某个节点交易池中排队，还是交易已经被完全丢弃，用户没有办法针对这种情况作出正确的判断。

CITA 采用的是先共识后处理的方式对交易进行处理。交易发送成功后，会返回交易哈希给用户。此时只是表明交易格式，签名等验证正确，并成功进入交易池，至于何时打包入块，同样取决于链的处理能力以及交易的选择算法。在交易中的 valid_until_block 表示交易最终的超时时间。举例来讲，用户在高度100时发送交易，且 valid_until_block 填写的 200，则在 201 块之前交易如果能成功打包入块都可以。如果到了出 201 块时，交易依然未打包入块，此时无论交易是否在交易池中，在出块阶段都会把此交易当作非法交易。由此，valid_until_block起到一个超时的作用。在一定时间交易未打包，用户就可以完全确定交易不会再打包。在 CITA 中默认的 valid_until_block 最大只能比当前高度大 100，这个参数用户可以根据实际情况来调整，最大值的配置也可以根据实际情况来调整。

#### 节点与节点之间的同步是怎么同步的？全量同步还是增量同步？使用的是什么技术，如何保障一致性。

节点间是以块为单位，按块高度增量同步的。节点块高度变化之后会广播自己的高度。其他节点收到之后跟自己的高度比较。如果自己的高度低，就会主动发起同步请求。收到同步过来的块会进行详细的 hash 和签名的验证，发现有问题就直接丢弃。

#### CITA 的跨链原理是？

跨链部分我们采用侧链方案，这种方案要求两条链能够相互读取对方的事件和状态，一般还要有 SPV 的能力。 链A先锁定一个资产，链 B 通过读取链 A 的信息，确认这个锁定交易已经得到确认，就在链 B 上解锁等价的资产，完成资产跨链。 采用这种方案的项目非常多。有名的 BTC Relay，比特币的侧链 RootStock，BlockStream 的元素链，还有较早的 PolkaDot 和 Cosmos，以及新近的 Wanchain 和 EOS。

#### CITA 的隐私方案是？

CITA目前采用局部共识的隐私方案： 支持一种特殊的隐私交易，这个隐私交易只有 hash 会被保存到区块链上，即 hash 会被共识，排序，保存到区块链上，交易包里的数据只会在交易的相关方之间传播并处理，不会向全网广播。好处：交易数据永远不会上链，也不会被非相关方看到，所以交易的数据永远都没有泄露的可能。

这一点对金融行业的客户很重要，他们担心现在把交易加密放到链上，目前可能不会被解密，但未来技术发展下有可能会解密，因为数据一旦上链会被同步到每个节点，不仅是相关方也有无关方，数据会被保存多久无法预测，局部共识的优点就是避免这种情况发生。 同时我们也在探索更多的可能性，比如基于可信硬件的隐私方案(Intel 的 SGX）；还有基于密码学的方案，去年在国家级项目中做过了，当时用的是同态加密和环签名方案，实现了交易发起方，接收方，还有交易金额的隐私。目前正在尝试零知识证明的方案(Zcash 的技术)。

#### 交易中的 quota 的作用？

CITA 当前支持以太坊的 EVM，由于 EVM 支持图灵完备的语言，所以就存在停机问题。在公链上，以太坊的 gas 是为了解决停机问题，以及因为计算需要消耗资源，配合 gasPrice 来解决交易的市场化问题。CITA 是面向企业的区块链管理平台，同样有支持智能合约的虚拟机，所以 quota 也是起到类似解决停机问题，另外因为联盟链内部一般不需要购买代币。所以这里的 quota 是系统定时分配，这样可以在一定程度上可以杜绝用户对计算资源的滥用。

## CITA 权限管理系统

### 关于 superAdmin

#### 链已经运行时，price 还能变更吗？superAdmin 可以随意定 price 吗？会不会不符合区块链精神？

superAdmin 可以把权利转移给一个治理合约。“可定制的治理机制" 已实现原型。目前已经有框架，但业务规则由业务方来定。实现过程为业务方提供协议章程，技术人员将实现为智能合约即可。

#### CITA 初始化时设置的运营方和管理员有什么区别？

**运营方**是商业模式中对负责对链进行运营的一方的称呼。 **管理员**是区块链网络中的的一个账户，这个账户被赋予了一些特定的操作权限。

在 CITA 中，管理员的公私钥和地址一般由运营方来创建和管理。除此之外，运营方还可以在 chainOwner 参数这里设置运营方的地址作为标识，在 quota 模式下还可以设置出块奖励的返还地址等等。

## 智能合约

### 语言

#### CITA 支持哪些编程语言来编写智能合约？

Solidity，Rust，Go

#### CITA 支持用 Go 来写智能合约吗？

CITA 支持 Go 合约，但是现在 Go 合约不能够和 solidity 的合约互相调用。在使用的时候，需要单独为每一个节点启动关于 Go 合约的服务，操作比较繁琐。除此之外，在 Go 合约中使用随机数会导致链的分叉，因为 Go 合约是每一个节点单独作为一个服务运行的。

### 版本

#### CITA 0.17 和 0.18 的solc 版本分别最高支持多少？

0.4.19 和 0.4.24

### Reserved System Addresses

#### 对于 0xffffffffffffffffffffffffffffffffff010000 存证指令的这个地址，是怎么使用的呀？现在我向这个地址存了数据，该用什么方法去读取呢？

就是普通的发交易,读取的话就是根据交易哈希查询 getReceipt，然后取出来。

## RPC/SDK

#### chainid 是写在配置文件中的，如何获取？

chainId可以通过getMetaData这个jsonRPC方法来获取。 示例命令：`curl -X POST —data '{"jsonrpc":"2.0","method":"getMetaData","params":["latest"],"id":1}' ipAddr:port`。

#### sdk 中新出现的参数 value（智能合约反向生成的 java 类，在 deploy 中出现的 value）具体代表什么含义，需要给应用层暴露么？

是暴露在应用层的。value 是指原生 token，之前 CITA 是没有币这个概念的，0.17 加入的，所以多了 value 这个概念。 这个 value 在部署的方法里现在是没有用到的，只是在转账的时候用到，部署的时候填入空字符串即可.

#### quota 和 value 有什么差别，应用如何对应输入参数？

quota 是你发送一个交易（包括调用合约，部署合约和转账）所需要付出的矿工费，如果不足则该交易无法入链，value 是你要在该交易中发送的币的数量，比如你要给A转账1个币，那么value就是1(注意这里的单位是ether)，quota 是 100000 quota. (quota 的最小单位就叫quota, 类似以太坊的 wei, 但是注意我们不要用 ethereum 的单位体系)。如果交易失败了你的 quota 仍然会损失，但是 value 是不会损失的。

#### eventlog的查询有示例代码么？

有的，在 github 上有一个 develop 分支，里面有个 project 叫 tests，里面都是例子，其中叫 TokenFilterTest 的是关于 event 的实例

#### 交易如果需要转币，必须要有转账的来源、去处、额度，但是有的交易不需要转币，这个相关参数如何处理？

交易如果需要转币，不需要提供来源，只需要提供去处，因为签名信息已经代表了来源，如果不需要转币，相关参数传空字符串就可以。

## 运维

### 部署

#### 部署维护一个节点所需配置及成本？

实际成本视运行节点的服务器配置而定（eg. CPU：4 核心 、内存：8G、硬盘：100G 带宽：5MB ，658元/月） 最低配置：阿里云上 CPU：2 核心、内存：4G、硬盘：100G，377元/月

#### 对 docker 的支持到什么程度？

编译环境：目前有个封装了 Ubuntu 18.04 和依赖的运行环境的 docker image 叫 [cita-build](https://hub.docker.com/r/cita/cita-build)，用于编译 CITA 二进制文件； 运行环境：目前有个封装了 Ubuntu 18.04 和依赖的运行环境的 docker image 叫 [cita-run](https://hub.docker.com/r/cita/cita-run)，需要把编译好的 CITA 二进制文件和数据存储目录 mount 进去才能执行，不是很“正统”的 docker 化服务支持（如不能直接使用 docker run cita:vx.y.z）

#### CITA 是否有完整的 Docker 镜像？

目前没有

### 配置

#### CITA 对于机器配置是内存关键还是 CPU 关键？

CPU 关键

#### 微服务架构如何搭建扩容，例如：Network 如何扩容，在不同的服务器上如何协同。

CITA 目前由 6 个微服务组成。因为微服务之间通过消息总线通信，所以 RabbitMQ 以及这 6 个微服务可以部署在不同的服务器上，形成集群。但是进一步的扩容，比如每个微服务运行多个实例，这个目前还在我们的开发计划中。

#### 想要在已经运行的一条链（如标准分平台）上增加对国密的支持，现在一条链上不支持多种加密算法，有什么建议？

目前不支持。

### 节点操作

#### 如何获取节点的地址？

https://docs.citahub.com/zh-CN/cita/configuration/chain-config#%E5%88%9D%E5%A7%8B%E5%8C%96%E9%85%8D%E7%BD%AE%E5%90%8E%E7%94%9F%E6%88%90%E7%9A%84%E7%9B%AE%E5%BD%95%E7%BB%93%E6%9E%84

#### 请问现在 CITA 的节点数量有上限吗？

CITA 的初始化的时候共识节点的最大数量是 256，在链运行之后可以增加和删除，这个没有限制。我们推荐共识节点不超过 100 个。

#### 节点与节点之间的同步是怎么同步的？全量同步还是增量同步？使用的是什么技术，如何保障一致性。

节点间是以块为单位，按块高度增量同步的。节点块高度变化之后会广播自己的高度。其他节点收到之后跟自己的高度比较。如果自己的高度低，就会主动发起同步请求。收到同步过来的块会进行详细的hash和签名的验证，发现有问题就直接丢弃。

### 监控

#### CITA 采用消息总线？如何保证它的稳定性，如何监控。有没有消息监控平台。

CITA 采用的微服务架构，微服务之间通过消息总线通信。消息总线采用的是成熟的消息中间件产品 RabbitMQ。RabbitMQ 自身就有监控系统。CITA 本身也有监控系统，但是目前还在开发过程中。就稳定性来说，RabbitMQ是得到广泛验证的稳定性很高的成熟产品，而 CITA 其实并不完全依赖消息总线的可靠性，本身也有很多可靠性上的保证，所以是双重保险。

#### 如何监控节点1337端口是否处于监听（服务）状态？

如果只是做 1337 端口检查，这个很简单，写个脚本定期发送一个请求查块高度就行了。工具的话最简单的直接用 curl 就可以了。

#### 监控节点是否同步到最新区块，这一点我们现在有什么方案或者建议吗？

这个最粗糙的做法就是获取所有节点的高度，跟自己的对比，所有节点都查，比较一下高度是否有差异。高度差在 5 以上的话就告警。

#### 应用连接的节点可能存在区块高度与最新区块差异较大的不健康情况，应用应该怎么处理会更好？

一个方案是客户端记录所有节点的 ip，自己去用 RPC 接口获取所有节点的链接网络速度、节点高度等关键信息，自己去做最优选择策略。问题就跟下载软件选择镜像网站一样，可以配置多个，根据响应时间等情况选择最优的。这个切换是无状态的，因为所有节点都是一样的。

### 版本升级

#### 一条链对于多版本节点是否支持？

“版本”要明确是软件版本，还是协议版本。软件版本可以不同，但协议版本要一致。但不建议长期不一致，新版本发布就是为了修复旧版存在的问题，因此只建议在做不停机升级时使用多软件版本并存的过渡方案。 案例：3 个共识 0.20.2， 一个共识 0.19，一个老版本节点不能参加共识，但是可以同步数据，而且可以参与投票。

#### cita链有指令可以查询版本号吗？

CITA 查询版本，不是通过 RPC 返回值查看。通过 binary 运行 ./bin/cita-auth —version 查看当前 CITA 版本。

#### 升级后 chain-id 会变化吗？

不变。

#### 关于更新节点时是否需要停节点。比如咱们以后有 4 个 CITA 的共识节点 + 2 个只读节点，更新版本的时候需要 6 个节点都是停了更新完 bin，再启动服务；还是在不停止其他服务的情况下，可以单独地更新一个个的节点？

对于 0.17 升级 0.18 这种兼容的升级，两个版本的 bin 其实是可以同时存在的，最好是一个节点一个节点更新，这样可以不中断服务。

### 协议升级

#### 升级过程要多久？

当有协议变更时 https://docs.citahub.com/zh-CN/cita/protocol-upgrade/v1 升级协议需要开启紧急制动，就是链要暂停。需要些时间(看数据量)。协议变更，Transaction 结构中增加 to_v1 字段，类型为 bytes。在链的协议版本为 v1 时，原来 to 字段不再使用。Transaction 结构中增加 chain_id_v1 字段，类型为 bytes(u256)。在链的协议版本为 v1 时，原来 chain_id 字段不再使用。Transaction 结构中的version字段必须填 1。协议升级会增加字段。

### 数据备份、迁移

#### 目前 CITA 底层区块数据不断增长，占用空间很大，需要有办法压缩区块及日志数据，目前CITA有支持吗？

做快照是可以减少目录大小，但老的数据会丢失。 日志可以清理掉或者备份到其他服务器上，参考 CITA 文档：https://docs.citahub.com/en-US/next/cita/system/log

### 日志

#### CITA运行的日志文件存放在哪里？

node1/logs下。

## 故障诊断

### 安装部署报错

#### Mac安装部署报错：thread 'main' panicked at 'called `Result::unwrap()` on an `Err` value: "Failed to run `\"pkg-config\" \"—libs\" \"—cflags\" \"libsodium\"`: No such file or directory (os error 2)"', libcore/result.rs:945:5

解决办法： `brew install pkg-config`

#### Mac安装部署报错：thread 'main' panicked at 'called `Result::unwrap()` on an `Err` value: "`\"pkg-config\" \"—libs\" \"—cflags\" \"libsodium\"` did not exit successfully: exit code: 1\n\--- stderr\nPackage libsodium was not found in the pkg-config search path.\nPerhaps you should add the directory containing `libsodium.pc\'\nto the PKG_CONFIG_PATH environment variable\nNo package \'libsodium\' found\n"', libcore/result.rs:945:5

解决办法：`brew install libsodium`

#### Mac安装部署报错：= note: ld: library not found for -lprofiler clang: error: linker command failed with exit code 1 (use -v to see invocation)

解决办法： `brew install gperftools`

#### Mac安装部署报错：error[E0460]: found possibly newer version of crate num_traits which num_traits depends on → /Users/rain/.cargo/registry/src/github.com-1ecc6299db9ec823/bincode-0.8.0/src/[lib.rs:40:1](http://lib.rs:40:1)

解决办法：`cargo check`

### 运行报错、微服务异常

#### Mac 运行 CITA 报错：/scripts/create_cita_config.py create —nodes "127.0.0.1:4000,127.0.0.1:4001,127.0.0.1:4002,127.0.0.1:4003" Traceback (most recent call last): File "./scripts/create_cita_config.py", line 12, in <module> import toml ModuleNotFoundError: No module named ‘toml'

解决办法 `pip3 install toml`

#### Mac 运行 CITA 报错：git clone https://github.com/ethereum/pyethereum.git python3 setup.py install 会卡死。

解决办法：`pip3 install -r requirements.txt` 或者 `pip3 install ethereum`

#### Mac运行 CITA 报错：Failed to import bitcoin. This is not a fatal error but does mean that you will not be able to determine the address from your wallet file.

解决办法：`pip3 install bitcoin`

#### Mac 运行 CITA 报错：Internal compiler error during compilation: /tmp/solidity-20180515-88303-7oxibo/solidity_0.4.23/libsolidity/interface/CompilerStack.cpp(732): Throw in function void dev::solidity::CompilerStack::compileContract(const dev::solidity::ContractDefinition &, map<const dev::solidity::ContractDefinition *, const eth::Assembly *> &) Dynamic exception type: boost::exception_detail::clone_impl<dev::solidity::InternalCompilerError>

解决办法： `brew upgrade solidity`

#### Mac运行 CITA 报错：/Users/leeyr/Documents/cryptape/code/cita/tests/integrate_test/cita_blockNumber.sh: line 17: jq: command not found

解决办法：`brew install jq`

#### Mac 运行 CITA 报错：Error: unable to perform an operation on node 'rabbit@localhost'. Please see diagnostics information and suggestions below

解决办法： `brew services start rabbitmq`

#### Mac 运行 CITA 报错：Initializing chain from provided state sys_config.sol:66:16: Error: Expected identifier, got 'LParen' constructor( ^

解决办法：更新docker `docker pull cita/cita-build:ubuntu-18.04-20180523`

#### Mac 运行 CITA 报错：File "/Users/rain/.pyenv/versions/3.6.4/lib/python3.6/site-packages/ethereum/utils.py", line 13, in <module>

from rlp.utils import decode_hex, encode_hex, ascii_chr, str_to_bytes ImportError: cannot import name 'decode_hex'

解决办法：`pip3 install 'rlp==0.6.0'`

#### 机器没有重启，为什么进程挂了？

在不使用 Docker 镜像的情况而使用自编译环境，终端窗口一关，进程就挂了，加上 nohup 就没问题了。推荐使用 Docker 环境就不会出现这个问题。

#### 性能测出来为什么很低？

可能的原因 1. 机器配置。如 cpu，内存。 2. 可能是块或者账号的配额总的设置额度太低了。

#### 如何处理压力测试时出现交易未上链的情况

前面已经提到，交易未上链是因为交易的超时，确保交易不会出现”意外“上链的情况。CITA 的交易池在 Auth 模块，在 RPC 将交易转发给Auth，Auth 进行交易的签名等信息验证成功后，将交易放入交易池。默认情况下，交易池的最大交易容量是无穷大，所以对于一般的个人用户在进行压力测试时，交易发送过快，由于机器性能限制，交易可能处理不过来，可能会出现交易累积在交易池，导致交易超时。所以普通用户可以根据机器性能选择将 auth.toml 中的 tx_pool_limit 参数由 0（0 表示没有限制）改为一个合适的值。（对于单节点 4c8g 的节点，建议50000）。此时，如果发送交易超出交易池的容纳能力，RPC 会返回 BUSY，提示用户发送交易速度过快。

#### Tread main panicked at AMQP_URL must be set: Not Present, libcore/[result.rs:945](http://result.rs:945/)

原因：由于 node/x 目录没有 rabbitmq 的配置文件，配置文件默认为隐藏文件 .env。

解决方案：在 node/x 节点目录生成配置文件 .env AMQP_URL=amqp://guest:guest@localhost/node/1 DATA_PATH=./data

#### Tread main panicked at failed to open url amqp://guest@localhost/node/0: IoError[ConnectionRefused].

原因：连接 rabbitmq 不成功。可能因为：1. rabbitmq 未成功启动：rabbitmq 端口被占用（冲突）、rabbitmq 服务本身异常等。2. rabbitmq 成功启动可能注册id不可用

解决方案：对于1，请先确认端口是否被占用，系统已启动 rabbitmq，然后在 docker 里再启动 rabbitmq 会导致 docker 里的启动失败。重启 rabbitmq 服务。对于2，删除无效 id：`sudo rabbitmqctl list_vhosts`, 然后 `sudo rabbitmqctl delete_vhost`

#### Tread <unnamed> panicked at save_current_block_poof DB write failed.:"10 error: ./data/nosql/007258.log: Too many open files in system", libcore/[result.rs:945](http://result.rs:945/)

请参考：https://blog.csdn.net/fdipzone/article/details/34588803，可以先改一下相关的配置，然后持续观察一下，看是否有文件句柄泄漏的情况。

### 合约相关报错

#### 有一个工厂合约，new 一个合约后合约地址返回，返回后立即调用合约里面方法会报这个错误 invoke: Can't find the specific contract (edited) - 合约地址返回后立马调用会出现问题， 过一会调用就不会出现问题。

虽然合约地址生成了，写入了区块，但是区块状态是 pending（处于共识中）。 sdk 都是默认请求 last 的区块。pending 和 last 相差一个区块。所以需要等一个块的时间。（这个问题 v0.20出现的，之前没有。因为0.20才加上的状态）。

### 访问报错

#### 用户在通过本地访问获取块高度，出现错误 failed：Connection time out，但是 ping 可以 ping 通。

可能是端口没开