import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
  Card,
  Typography,
  Form,
  Grid,
  Select,
  Button,
  Table,
  Badge,
  Divider,
  Message
} from '@arco-design/web-react';
import { IconSearch, IconPlus } from '@arco-design/web-react/icon';
import statusList, { getStatusName, } from './config/status';
import defaultStrategyList, { strategyTemplate }  from './mock/strategy'
import StrategyModal from './components/strategy-modal';
import Log from './components/log'

import s from './style/index.module.less';

const { Title } = Typography
const { Row, Col } = Grid;
const { useForm } = Form;

function Home() {
  const formRef = useRef()
  const [form] = useForm();
  useEffect(() => {
    (formRef as any).current?.setFieldsValue({
      status: '',
    });
  }, []);

  

  const columns = [
    {
      title: '序号',
      dataIndex: 'id',
      width: 80,
    },
    {
      title: '名称',
      dataIndex: 'name'
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 160,
      render: (status) => (
          <Badge status={status === 'disabled' ? 'error' : 'success'} text={getStatusName(status)}></Badge>
        )
    },
    {
      title: '操作',
      headerCellStyle: { paddingLeft: '15px' },
      width: 380,
      render: (col, row) => (
        <div>
          <Button
            type="text"
            size="small"
            onClick={() => {
              setCurrStrategyId(row.id)
              setOpType('view')
              setVisible(true)
            }}
          >
            查看
          </Button>
          <Button
            type="text"
            size="small"
            onClick={() => {
              setCurrStrategyId(row.id)
              setOpType('edit')
              setVisible(true)
            }}
          >
            编辑
          </Button>
          <Button
            type="text"
            size="small"
            onClick={() => toggleStatus(row.id)}
          >
            {row.status === 'disabled' ? '启用' : '禁用'}
          </Button>
          <Button
            type="text"
            size="small"
            onClick={() => {
              setShowLog(true)
            }}
          >
            执行记录
          </Button>
        </div>
      )
    },
  ]

  const [tempStrategy, setTempStrategy] = useState({...strategyTemplate})
  const [visible, setVisible] = useState(false)
  const [opType, setOpType] = useState('create') // create, view, edit
  const [strategyList, setStrategyList] = useState(defaultStrategyList)
  const [filteredStrategyList, setFilteredStrategyList] = useState(defaultStrategyList)
  const [currStrategyId, setCurrStrategyId] = useState(2)
  const currStrategy = opType === 'create' ? tempStrategy : strategyList.find(item => item.id === currStrategyId)
  const handleStrategyChange = (key, value) => {
    if(opType === 'create') {
      setTempStrategy({
        ...tempStrategy,
        config: {
          ...tempStrategy.config,
          [key]: value
        }
      })
    } else {
      setStrategyList(strategyList.map(item => {
        if(item.id === currStrategyId) {
          return {
            ...item,
            config: {
              ...item.config,
              [key]: value
            }
          }
        }
        return item
      }))
    }
  }

  const handleSearch = useCallback(() => {
    const status = form.getFieldValue('status')
    if(!status) {
      setFilteredStrategyList(strategyList) 
    } else {
      setFilteredStrategyList(strategyList.filter(item => item.status === status)) 
    }
  }, [strategyList, form])

  useEffect(() => {
    handleSearch()
  }, [strategyList, handleSearch])

  const handleCreate = (name: string, config: any) => {
    setStrategyList([...strategyList, {
      id: strategyList.length + 1,
      name,
      status: 'disabled',
      config
    }])
    Message.success('策略创建成功')
  }

  const toggleStatus = (id: number) => {
    const nextList = strategyList.map(item => {
      if(item.id === id) {
        return {
          ...item,
          status: item.status === 'disabled' ? 'doing' : 'disabled'
        }
      }
      return item
    })
    setStrategyList(nextList)
    Message.success('操作成功')
  }

  const [showLog, setShowLog] = useState(false)
0
  // useEffect(() => {
  //   setTimeout(() => {
  //     Message.info('【看多UNI】被触发执行')
  //     setTimeout(() => {
  //       setShowLog(true)
  //     }, 1000)
  //   }, 6000)
  // }, [])

  return (
    <Card style={{ height: '85vh' }}>
      <Typography>
        <Title>策略列表</Title>
      </Typography>
      <Form
        form={form}
        ref={formRef}
        className={s['search-form']}
        labelAlign="left"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 10 }}
      >
        <div className={s['search-form']}>
          <div className={s['search-condition']}>
            <Row gutter={24}>
              <Col span={6}>
                <Form.Item label="状态" field="status">
                  <Select
                    options={statusList}
                    allowClear
                  />
                </Form.Item>
              </Col>
            </Row>
          </div>
          <div className={s.op}>
            <Button type="text" icon={<IconSearch />} onClick={handleSearch}>
              搜索
            </Button>
          </div>
        </div>
      </Form>
      <Divider style={{marginTop: 0}}/>

      <div className={s['op-row']}>
        <Button 
          type="primary" icon={<IconPlus />}
          onClick={() => {
            setTempStrategy({...tempStrategy})
            setOpType('create')
            setVisible(true)
          }}
        >
          创建
        </Button>
      </div>

      <Table
        rowKey="id"
        loading={false}
        columns={columns}
        data={filteredStrategyList}
      />
      <StrategyModal
        visible={visible}
        setVisible={setVisible}
        opType={opType}
        strategyName={currStrategy.name}
        strategy={currStrategy.config}
        onChange={handleStrategyChange}
        onCreate={handleCreate}
      />
      <Log
        visible={showLog}
        setVisible={setShowLog}
      />
    </Card>
  );
}

export default Home;
