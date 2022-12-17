# 作品介绍和演示

## 项目源起，解决的问题

目前大部分数据分析平台例如 Dune、Nansen、Footprint 数据维度非常丰富，但数据监控功能并不完善，时效性、灵活性、通知渠道都有较大提升空间。

Footrace 希望通过数据 Connector 的技术，对接各种 Web3 链上或者 Web2 链下的数据源，利用自身丰富的各种规则设定和通知渠道，实时推送给用户。

## 技术细节

流程图（暂未实现虚线部分）

![image](https://user-images.githubusercontent.com/17266004/208236062-895fe59a-2bc6-453e-8dcc-f444fdee1d78.png)

启动命令

```bash
$ docker run --name elasticsearch -p 9200:9200 -e discovery.type=single-node -e ES_JAVA_OPTS="-Xms1g -Xmx1g" -e xpack.security.enabled=false -it docker.elastic.co/elasticsearch/elasticsearch:8.5.3
```

```bash
$ docker run --name connector aa864451000/connector:demo
```

```bash
$ docker run --name alert aa864451000/alert:demo
```

## 在黑客松期间完成的内容

用户可以查看 CEX 的 token balance 情况（数据来源 Footprint Analytics）

![image](https://user-images.githubusercontent.com/17266004/208235813-f675df0a-08bd-4fe0-b30a-2860227a5313.png)

用户可以查看 Twitter KOL 话题讨论热度（数据来源 TwitterScan）

![image](https://user-images.githubusercontent.com/17266004/208235815-be03a937-3d54-43cb-a39a-3d73961b1b7c.png)

用户可以添加感兴趣的指标阈值监控（暂未实现定制化）

![image](https://user-images.githubusercontent.com/17266004/208235819-1e828c8f-4530-47c4-a6bb-00c6aa38b127.png)

用户可以在 Discord 收到阈值告警

![image](https://user-images.githubusercontent.com/17266004/208239456-567c1c01-a216-414d-8300-8f2f645b6dde.png)

## 未来发展计划

- 支持更多数据类型的 Connector，例如 Dune、Opensea 等
- 支持更多数据指标，例如 NFT、Whale、DeFi 等
- 支持更多的通知渠道，例如 Telegram、Email、Slack 等
- 支持更多的规则条件和触发频率，例如每天 1 次，免打扰时间
- 考虑通过付费来解锁更多指标和监控额度

