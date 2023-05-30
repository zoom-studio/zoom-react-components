import React, { type FC } from 'react'

import { Button, Title } from '..'
import { useZoomComponent } from '../../hooks'
import { SelectOption, type SelectOptionNS } from './option'
import { filterLabel } from './utils'

export namespace SelectGroupNS {
  export interface Props<Values extends SelectOptionNS.Value> {
    options?: SelectOptionNS.Props<Values>[]
    label: string
    disabled?: boolean
    selected?: boolean
    value: SelectOptionNS.Value
  }

  export interface GroupedProps extends Omit<Props<SelectOptionNS.Value>, 'options'> {
    options?: SelectOptionNS.GroupedOptions
  }

  export type GroupedSelectedOptions = Record<SelectOptionNS.Value, SelectOptionNS.Value[]>

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
        <Title h4 className="label">
          {label}
        </Title>

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
