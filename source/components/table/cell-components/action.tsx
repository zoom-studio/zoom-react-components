import React, { type FC } from 'react'
import { Button } from '../../button'

import { type TableNS } from '../types'

export namespace CellActionsNS {
  export interface Props {
    actions: TableNS.Action<unknown[]>[]
    data: object
  }
}

export const CellActions: FC<CellActionsNS.Props> = ({ actions, data }) => {
  return (
    <div className="table-cell-actions">
      {actions.map(({ onClick, ...buttonProps }, index) => (
        <Button size="small" {...buttonProps} onClick={evt => onClick?.(data, evt)} key={index} />
      ))}
    </div>
  )
}
