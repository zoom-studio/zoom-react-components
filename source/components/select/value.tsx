import React from 'react'

import { Text, type InputNS, type SelectNS } from '..'

import { type useMacOSSelect } from './use-mac-os-select'

export namespace SelectValueNS {
  export interface Props<
    MultiSelect extends boolean = false,
    Value extends SelectNS.PossibleValues = number,
    Data = unknown,
  > extends Pick<SelectNS.Props<MultiSelect, Value, Data>, 'placeholder' | 'options'>,
      Required<Pick<SelectNS.Props<MultiSelect, Value, Data>, 'renderSelectedOption'>> {
    textSizeProps: InputNS.TextSize
    multiSelect: boolean
    select: ReturnType<typeof useMacOSSelect>
  }
}

export const SelectValue = <
  MultiSelect extends boolean = false,
  Value extends SelectNS.PossibleValues = number,
  Data = unknown,
>({
  textSizeProps,
  multiSelect,
  placeholder,
  select,
  renderSelectedOption,
  options,
}: SelectValueNS.Props<MultiSelect, Value, Data>) => {
  const { selectedIndexes, valuesContainerRef } = select

  return (
    <Text
      ref={valuesContainerRef}
      common
      normal
      className={`select-${selectedIndexes.length > 0 ? 'value' : 'placeholder'}`}
      {...textSizeProps}
    >
      <span className="options-calibrator" />

      {selectedIndexes.length > 0
        ? multiSelect
          ? selectedIndexes.map((option, index) => (
              <span className="label" key={index}>
                {option}
              </span>
            ))
          : renderSelectedOption(options[selectedIndexes[0]])
        : placeholder}
    </Text>
  )
}
