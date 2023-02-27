import React, { FC } from 'react'

import { useZoomComponent } from '../../hooks'
import { Icon, Text } from '..'
import { filterLabel } from './utils'

export namespace SelectOptionNS {
  export type Value = string | number

  export interface Props<Values extends SelectOptionNS.Value> {
    label: string
    value: Values
    disabled?: boolean
    selected?: boolean
  }

  export interface GroupedOptions {
    [value: Value]: Props<SelectOptionNS.Value>
  }

  export interface InnerProps {
    onSelect: (option: Value) => void
    searchQuery: string
    isGroupOption?: boolean
  }
}

export const SelectOption: FC<
  SelectOptionNS.Props<SelectOptionNS.Value> & SelectOptionNS.InnerProps
> = ({ label, value, disabled, onSelect, selected, searchQuery, isGroupOption }) => {
  const { createClassName } = useZoomComponent('select-option')
  const classes = createClassName('', '', {
    'disabled': !!disabled,
    'selected': !!selected,
    'group-option': !!isGroupOption,
  })

  const handleOnSelect = () => {
    onSelect(value)
  }

  return filterLabel(label, searchQuery) ? (
    <div className={classes} onClick={handleOnSelect}>
      <Text common large className="label">
        {label}
      </Text>

      {selected && <Icon name="check" className="selected-icon" />}
    </div>
  ) : (
    <></>
  )
}
