import React, { FC } from 'react'

import { useZoomComponent } from '../../hooks'
import { Icon, Text } from '..'

export namespace SelectOptionNS {
  export type Value = string | number

  export interface Props {
    label: string
    value: Value
    disabled?: boolean
    selected?: boolean
  }

  export interface InnerProps {
    onSelect: (option: Props) => void
  }
}

export const SelectOption: FC<
  SelectOptionNS.Props & SelectOptionNS.InnerProps
> = ({ label, value, disabled, onSelect, selected }) => {
  const { createClassName } = useZoomComponent('select-option')

  const classes = createClassName('', '', {
    disabled: !!disabled,
    selected: !!selected,
  })

  const handleOnSelect = () => {
    onSelect({ label, value })
  }

  return (
    <div className={classes} onClick={handleOnSelect}>
      <Text common large className="label">
        {label}
      </Text>

      {selected && <Icon name="check" className="selected-icon" />}
    </div>
  )
}
