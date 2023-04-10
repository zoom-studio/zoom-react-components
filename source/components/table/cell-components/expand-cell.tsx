import React, { FC } from 'react'

import { Button } from '../..'

export namespace ExpandButtonNS {
  export interface Props {
    isExpanded: boolean
    onClick: () => void
    disabled: boolean
  }
}

export const ExpandButton: FC<ExpandButtonNS.Props> = ({ isExpanded, onClick, disabled }) => {
  return (
    <div className="table-cell-expander">
      <Button
        onClick={onClick}
        prefixMaterialIcon={isExpanded ? 'remove' : 'add'}
        shape="square"
        type="secondary"
        disabled={disabled}
      />
    </div>
  )
}
