import React from 'react'

import s from './style.module.css'

const StrategyItem = ({
  title,
  className,
  children
}) => {
  return (
    <div className={[s.item, className].join(' ')}>
      <div className={s.title}>{title}:</div>
      <div className={s.content}>
        {children}
      </div>
    </div>
  )
}

export default React.memo(StrategyItem)
