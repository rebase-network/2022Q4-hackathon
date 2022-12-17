import React from 'react'
import { Modal, Table } from '@arco-design/web-react'

const LogList = ({
  visible,
  setVisible,
}) => {
  return (
    <Modal
        title="执行记录"
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        autoFocus={false}
        focusLock={true}
        style={{width: 800}}
        footer={null}
        afterOpen={
          () => {
            const tdArray = document.querySelectorAll('.arco-modal-content .arco-table-tr')[1].querySelectorAll('td');
            for(let i = 0; i < tdArray.length; i++) {
              tdArray[i].classList.add('blink')
            }
          }
        }
    >
      <Table
        rowKey="id"
        columns={[
          {
            title: '序号',
            dataIndex: 'id',
            width: 80,
          },
          {
            title: '日期',
            dataIndex: 'date'
          },
          {
            title: '内容',
            dataIndex: 'content'
          },
        ]}
        data={[
          {
            id: 2,
            date: '2022/12/17 18:15',
            content: '以 $6.5 卖出 UNI'
          },
          {
            id: 1,
            date: '2022/12/17 14:30',
            content: '以 $5.8 买入 UNI',
          },
        ]}

      />
    </Modal>
  )
}

export default React.memo(LogList)