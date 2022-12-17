import React, { useState } from 'react'
import { Modal, Select, Input } from '@arco-design/web-react'
import StrategyItem from '../strategy-item'

import s from './style.module.css'

const StrategyModal = ({
  visible,
  setVisible,
  opType,
  strategyName,
  strategy,
  onChange,
  onCreate,
}) => {
  const isReadOnly = opType === 'view'
  const getTitle = () => {
    switch(opType) {
      case 'view':
        return `查看策略: ${strategyName}`
      case 'edit':
        return `编辑策略: ${strategyName}`
      case 'create':
        return `创建策略`
    }
  }
  const [tempStrategyName, setTempStrategyName] = useState('')
  return (
    <Modal
        title={getTitle()}
        visible={visible}
        onOk={() => {
          if(opType === 'create') {
            onCreate(tempStrategyName, strategy)
          }
          setVisible(false)
        }}
        onCancel={() => setVisible(false)}
        autoFocus={false}
        focusLock={true}
        style={{width: 800}}
        okText="保存"
        cancelText="取消"
        footer={(cancelButtonNode, okButtonNode) => {
          if(isReadOnly) {
            return null
          }
          return (
            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
              <div style={{marginRight: 10}}>{cancelButtonNode}</div>
              {okButtonNode}
            </div>
          )
        }}
      >
        {
          opType === 'create' && (
            <StrategyItem
              title='策略名称'
              className={s.item}
            >
               <Input 
                type="text"
                className={s.input}
                style={{width: 150}}
                value={tempStrategyName}
                onChange={(value) => setTempStrategyName(value)}
              />
            </StrategyItem>
          )
        }
        <StrategyItem
          title='监控'
          className={s.item}
        >
          <div style={{display: 'flex'}}>
            <Select
              value={strategy.target}
              className={s.select}
              onChange={value => onChange('target', value)}
              options={[
                {
                  label: 'UniSwap',
                  value: 1
                },
                {
                  label: 'PancakeSwap',
                  value: 2
                },
                {
                  label: 'SushiSwap',
                  value: 3
                },
              ]}
              disabled={isReadOnly}
            />（UNI 当前价格 $5.36)
          </div>
        </StrategyItem>

        <StrategyItem
          title='满足'
          className={s.item}
        >
          <div>
            <Select
              value={strategy.targetTime}
              className={s.select}
              onChange={value => onChange('targetTime', value)}
              options={[
                {
                  label: '24小时内',
                  value: 1
                },
                {
                  label: '1周内',
                  value: 2
                },
              ]}
              disabled={isReadOnly}
            />
            
            <div className={s.row}>
              <Select
                value={strategy.targetSpec}
                className={s.select}
                onChange={value => onChange('targetSpec', value)}
                options={[
                  {
                    label: 'TVL',
                    value: 1
                  },
                  {
                    label: '交易次数',
                    value: 2
                  },
                ]}
                disabled={isReadOnly}
              />
              <Select
                value={strategy.targetCompare}
                className={s.select}
                onChange={value => onChange('targetCompare', value)}
                options={[
                  {
                    label: '增加大于',
                    value: 1
                  },
                  {
                    label: '减少大于',
                    value: 2
                  },
                ]}
                disabled={isReadOnly}
              />
              <Input 
                type="text"
                className={s.input}
                style={{width: 110}}
                value={strategy.targetValue}
                onChange={value => onChange('targetValue', value)}
                addBefore='$'
                addAfter='m'
                disabled={isReadOnly}
              />
            </div>
          </div>
        </StrategyItem>

        <StrategyItem
          title='执行'
          className={s.item}
        >
          <div>
            <div className={s.text}>
              dYdX
            </div>
            <div className={s.row}>
              <div className={s['inner-text']}>以</div>
              <Input 
                type="text"
                className={s.input}
                style={{width: 80}}
                value={strategy.opLeverage}
                onChange={value => onChange('opLeverage', value)}
                addAfter='倍'
                disabled={isReadOnly}
              />
              <div className={s['inner-text']}>杠杆，</div>
              <Input 
                type="text"
                className={s.input}
                style={{width: 80}}
                value={strategy.opValue}
                onChange={value => onChange('opValue', value)}
                addBefore='$'
                disabled={isReadOnly}
              />
              <div className={s['inner-text']}>的价格</div>
              <Select
                value={strategy.opDir}
                className={s.select}
                style={{width: 100}}
                onChange={value => onChange('opDir', value)}
                options={[
                  {
                    label: '做多UNI',
                    value: 1
                  },
                  {
                    label: '做空UNI',
                    value: 2
                  },
                ]}
                disabled={isReadOnly}
              />
            </div>
          </div>
        </StrategyItem>

        <StrategyItem
          title='停止条件'
          className={s.item}
        >
          <div>
            <div className={s.row}>
              <div className={s['inner-text']}>UNI</div>
              <Select
                value={strategy.stopDir}
                className={s.select}
                style={{width: 80}}
                onChange={value => onChange('stopDir', value)}
                options={[
                  {
                    label: '涨幅',
                    value: 1
                  },
                  {
                    label: '跌幅',
                    value: 2
                  },
                ]}
                disabled={isReadOnly}
              />
              <Select
                value={strategy.stopCompare}
                className={s.select}
                style={{width: 80}}
                onChange={value => onChange('stopCompare', value)}
                options={[
                  {
                    label: '大于',
                    value: 1
                  },
                  {
                    label: '小于',
                    value: 2
                  },
                ]}
                disabled={isReadOnly}
              />
              <Input 
                type="text"
                className={s.input}
                style={{width: 80}}
                value={strategy.stopPercent}
                onChange={value => onChange('stopPercent', value)}
                addAfter='%'
                disabled={isReadOnly}
              />
            </div>
          </div>
        </StrategyItem>
      </Modal>
  )
}

export default React.memo(StrategyModal)
