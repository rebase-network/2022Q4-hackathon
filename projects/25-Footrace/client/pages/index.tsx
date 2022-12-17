import {
  Avatar,
  Card,
  Form,
  Input,
  Select,
  Space,
  Table,
  Tabs,
  Typography,
} from 'antd'
import { useQueries } from 'react-query'

export default function Home() {
  const [cex, token] = useQueries([
    {
      queryKey: 'cex',
      queryFn: async () => {
        const res = await (await fetch('/api/cex')).json()
        return res.data
      },
    },
    {
      queryKey: 'topic',
      queryFn: async () => {
        const res = await (await fetch('/api/topic')).json()
        return res.data
      },
    },
  ])

  const formatAmount = (value: number) => {
    return `$${Math.floor(Number(value)).toLocaleString()}`
  }

  const CEXList = (
    <Table
      loading={cex.isLoading}
      rowKey="entity_slug"
      dataSource={cex.data?.list}
      columns={[
        {
          title: '#',
          render: (value, record, index) => index + 1,
        },
        {
          title: 'Exchange',
          render: (value, record) => {
            return (
              <Space>
                <Avatar src={record.logo} />
                <span>{record.exchange}</span>
              </Space>
            )
          },
        },
        {
          title: 'Wallets',
          align: 'right',
          dataIndex: 'number_of_address',
        },
        {
          title: 'Chains',
          align: 'right',
          dataIndex: 'number_of_chain',
        },
        {
          title: 'Balance Value',
          align: 'right',
          render: (record) => formatAmount(record.value),
        },
        {
          title: '24H Change',
          align: 'right',
          render: (record) => {
            return (
              <Typography.Text
                type={record.value_change_24h < 0 ? 'danger' : 'success'}
              >
                {formatAmount(record.value_change_24h)}
              </Typography.Text>
            )
          },
        },
      ]}
      pagination={false}
    />
  )

  const Topics = (
    <Table
      loading={token.isLoading}
      rowKey="hashtag"
      dataSource={token.data?.records}
      columns={[
        {
          title: '#',
          render: (value, record, index) => index + 1,
        },
        {
          title: 'Namely',
          render: (record) => {
            return (
              <Space>
                <Avatar.Group>
                  {record.namely.map((item: any) => (
                    <Avatar key={item.username} src={item.head_ico} />
                  ))}
                </Avatar.Group>
                <span key={record.namely[0].username}>
                  {record.namely[0].name}
                </span>
              </Space>
            )
          },
        },
        {
          title: 'Topic',
          dataIndex: 'hashtag',
        },
        {
          title: 'Engagement Tweets',
          align: 'right',
          dataIndex: 'engagement_tweets',
        },
        {
          title: 'Engagement Users',
          align: 'right',
          dataIndex: 'engagement_users',
        },
        {
          title: 'Super KOL',
          align: 'right',
          dataIndex: 'super_kol',
        },
      ]}
      pagination={false}
    />
  )

  const Alert = (
    <Card>
      <Form layout="inline">
        <Form.Item>If</Form.Item>
        <Form.Item>
          <Select value="Engagement Users" />
        </Form.Item>
        <Form.Item>of</Form.Item>
        <Form.Item>
          <Select value="NFT" />
        </Form.Item>
        <Form.Item>is</Form.Item>
        <Form.Item>
          <Input
            addonBefore={<Select value="greater than" />}
            value="350"
            style={{ width: 200 }}
          />
        </Form.Item>
        <Form.Item>alert me by</Form.Item>
        <Form.Item>
          <Input
            addonBefore={<Select value="Discord" />}
            value="https://discord.com/api/webhooks/1053290832922431530/XCdKUdCS4TJkWy7lbfUJmPCjMIkIB9PZWcrm9dlZaGqtpVK7cSqBzXVjxd6-iTWRN-sW"
            style={{ width: 300 }}
          />
        </Form.Item>
      </Form>
    </Card>
  )

  return (
    <Tabs
      items={[
        {
          label: 'Top CEXs',
          key: '1',
          children: CEXList,
        },
        {
          label: 'Trending Topics',
          key: '2',
          children: Topics,
        },
        {
          label: 'Create Smart Alert',
          key: '3',
          children: Alert,
        },
      ]}
    />
  )
}
