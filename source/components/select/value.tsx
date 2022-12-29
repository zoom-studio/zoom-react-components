import React, { FC, useMemo } from 'react'

import { InputNS, Text } from '..'
import { useZoomComponent } from '../../hooks'
import { getSelectedOptions } from './utils'
import { SelectNS } from '.'

export namespace SelectValueNS {
  export interface Props extends Pick<SelectNS.Props, 'placeholder' | 'size' | 'multiSelect'> {
    options: SelectNS.GroupedOptions
  }
}

export const SelectValue: FC<SelectValueNS.Props> = ({
  placeholder,
  options,
  size,
  multiSelect,
}) => {
  const { createClassName } = useZoomComponent('select')
  const selectedOptions = useMemo(() => getSelectedOptions(options), [options])

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
