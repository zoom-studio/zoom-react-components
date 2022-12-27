import React, { FC } from 'react'

import { Button, Text } from '..'
import { useZoomComponent } from '../../hooks'
import { SelectOption, SelectOptionNS } from './option'

export namespace SelectGroupNS {
  export interface Props {
    options?: SelectOptionNS.Props[]
    label: string
    disabled?: boolean
    selected?: boolean
    value: SelectOptionNS.Value
  }

  export interface InnerProps {
    onSelect: (option: SelectOptionNS.Props) => () => void
    onSelectAll: (options: SelectOptionNS.Props[]) => () => void
    multiSelect: boolean
    selectAllText: string
    deselectAllText: string
  }
}

export const SelectGroup: FC<SelectGroupNS.Props & SelectGroupNS.InnerProps> =
  ({
    options = [],
    label,
    disabled,
    onSelect,
    onSelectAll,
    selected,
    multiSelect,
    selectAllText,
    deselectAllText,
  }) => {
    const { createClassName } = useZoomComponent('select-group')

    const selectButtonText = options.some(option => option.selected)
      ? deselectAllText
      : selectAllText

    const classes = createClassName('', '', {
      disabled: !!disabled,
      selected: !!selected,
    })

    const handleOnSelectAll = () => onSelectAll(options)()

    return (
      <div className={classes}>
        <div className="group-info">
          <Text light large className="label">
            {label}
          </Text>

          {multiSelect && (
            <Button
              size="small"
              type="link"
              className="select-all"
              onClick={handleOnSelectAll}
            >
              {selectButtonText}
            </Button>
          )}
        </div>

        <div className="options">
          {options.map((option, index) => (
            <SelectOption {...option} onSelect={onSelect(option)} key={index} />
          ))}
        </div>
      </div>
    )
  }
