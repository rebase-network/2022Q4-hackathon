const statusList = [
  {
    label: '全部策略',
    value: ''
  },
  {
    label: '进行中',
    value: 'doing'
  },
  {
    label: '已完成',
    value: 'done'
  },
  {
    label: '已禁用',
    value: 'disabled'
  }
]

export const getStatusName = (status: string) => {
  return statusList.find(item => item.value === status).label
}

export default statusList
