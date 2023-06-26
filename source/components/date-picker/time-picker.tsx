import React, { type FC } from 'react'

import { Button, Text, type ButtonNS, LongPress } from '..'

export namespace TimePickerNS {
  export interface Props {
    value: string | number
    onIncrease: () => void
    onDecrease: () => void
  }
}

export const TimePicker: FC<TimePickerNS.Props> = ({ value, onDecrease, onIncrease }) => {
  const buttonProps: ButtonNS.Props = {
    shape: 'circle',
    type: 'link',
    className: 'time-picker-button',
  }

  return (
    <div className="time-picker">
      <LongPress callback={onIncrease}>
        <Button {...buttonProps} prefixMaterialIcon="expand_less" />
      </LongPress>

      <Text className="time-picker-value">{value}</Text>

      <LongPress callback={onDecrease}>
        <Button {...buttonProps} prefixMaterialIcon="expand_more" onClick={onDecrease} />
      </LongPress>
    </div>
  )
}
