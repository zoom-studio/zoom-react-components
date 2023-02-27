import React, { FC, useMemo } from 'react'

import { InputNS, Text } from '..'
import { useZoomComponent } from '../../hooks'
import { getSelectedOptions } from './utils'
import { SelectNS } from '.'
import { SelectOptionNS } from './option'

export namespace SelectValueNS {
  export interface Props
    extends Pick<
      SelectNS.Props<SelectOptionNS.Value>,
      'placeholder' | 'size' | 'multiSelect' | 'onChange'
    > {
    options: SelectNS.GroupedOptions
  }
}

export const SelectValue: FC<SelectValueNS.Props> = ({
  placeholder,
  options,
  size,
  multiSelect,
  onChange,
}) => {
  const { createClassName } = useZoomComponent('select')

  const selectedOptions = useMemo<string[]>(() => {
    const selectedOptions = getSelectedOptions(options)
    onChange?.(selectedOptions)
    return selectedOptions.map(option => option.label)
  }, [options])

  const classes = createClassName('', selectedOptions.length > 0 ? 'value' : 'placeholder')

  const textSizeProps: InputNS.TextSize = {
    small: size === 'small',
    normal: size === 'normal',
    large: size === 'large',
  }

  return (
    <Text common normal className={classes} {...textSizeProps}>
      {selectedOptions.length > 0
        ? multiSelect
          ? selectedOptions.map((option, index) => (
              <span className="label" key={index}>
                {option}
              </span>
            ))
          : selectedOptions[0]
        : placeholder}
    </Text>
  )
}
