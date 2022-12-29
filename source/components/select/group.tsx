import React, { FC } from 'react'

import { Button, Text } from '..'
import { useZoomComponent } from '../../hooks'
import { SelectOption, SelectOptionNS } from './option'
import { filterLabel } from './utils'

export namespace SelectGroupNS {
  export interface Props {
    options?: SelectOptionNS.Props[]
    label: string
    disabled?: boolean
    selected?: boolean
    value: SelectOptionNS.Value
  }

  export interface GroupedProps extends Omit<Props, 'options'> {
    options?: SelectOptionNS.GroupedOptions
  }

  export interface GroupedSelectedOptions {
    [parentValue: SelectOptionNS.Value]: SelectOptionNS.Value[]
  }

  export interface InnerProps {
    onSelect: (option: GroupedSelectedOptions) => void
    onSelectAll: (options: GroupedSelectedOptions) => void
    multiSelect: boolean
    selectAllText: string
    deselectAllText: string
    searchQuery: string
  }
}

export const SelectGroup: FC<SelectGroupNS.GroupedProps & SelectGroupNS.InnerProps> = ({
  options = [],
  label,
  disabled,
  onSelect,
  onSelectAll,
  selected,
  multiSelect,
  selectAllText,
  deselectAllText,
  searchQuery,
  value,
}) => {
  const { createClassName } = useZoomComponent('select-group')

  const selectButtonText = Object.values(options).some(option => option.selected)
    ? deselectAllText
    : selectAllText

  const classes = createClassName('', '', {
    disabled: !!disabled,
    selected: !!selected,
  })

  const filteredOptions = Object.values(options).filter(option =>
    filterLabel(option.label, searchQuery),
  )

  const handleOnSelectAll = () => {
    onSelectAll({
      [value]: filteredOptions.map(option => option.value),
    })
  }

  const handleOnSelect = (selectedValue: SelectOptionNS.Value) => () => {
    onSelect({
      [value]: [selectedValue],
    })
  }

  return filteredOptions.length > 0 ? (
    <div className={classes}>
      <div className="group-info">
        <Text light large className="label">
          {label}
        </Text>

        {multiSelect && (
          <Button size="small" type="link" className="select-all" onClick={handleOnSelectAll}>
            {selectButtonText}
          </Button>
        )}
      </div>

      <div className="options">
        {filteredOptions.map((option, index) => (
          <SelectOption
            {...option}
            onSelect={handleOnSelect(option.value)}
            searchQuery={searchQuery}
            isGroupOption
            key={index}
          />
        ))}
      </div>
    </div>
  ) : (
    <></>
  )
}
