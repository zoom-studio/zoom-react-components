import React, { FC } from 'react'

import { Checkbox, CheckboxNS } from '../..'

export namespace CellCheckboxNS {
  export interface Props extends CheckboxNS.Props {
    indeterminate: boolean
    enableDragToSelect?: boolean
  }
}

export const CellCheckbox: FC<CellCheckboxNS.Props> = ({
  checked,
  enableDragToSelect,
  children,
  ...rest
}) => {
  return (
    <div className="table-cell-checkbox">
      <Checkbox checked={checked} size="small" {...rest} />
      {children}
    </div>
  )
}
