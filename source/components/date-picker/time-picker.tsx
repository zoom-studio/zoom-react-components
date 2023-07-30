import React, { type FC } from 'react'

import { Select, Text, type SelectNS } from '..'

export namespace TimePickerNS {
  export interface Props {
    options: SelectNS.Option<number>[]
    value: number
    title: string
    onWrite: (value: number) => void
    colon?: boolean
    onWillOpen?: () => void
  }
}

export const TimePicker: FC<TimePickerNS.Props> = ({
  colon = true,
  options,
  value,
  title,
  onWrite,
  onWillOpen,
}) => {
  return (
    <>
      {colon && <span className="time-picker-colon">:</span>}

      <div className="time-picker">
        <Text small className="title">
          {title}
        </Text>

        <Select
          options={options}
          defaultValue={value}
          showSearch={false}
          onWillOpen={onWillOpen}
          key={value}
          optionsWidth="50px"
          onWrite={onWrite}
          renderSelectedOption={option => option.value.toString().padStart(2, '0')}
        >
          {({ value }) => <Text normal>{value.toString().padStart(2, '0')}</Text>}
        </Select>
      </div>
    </>
  )
}
