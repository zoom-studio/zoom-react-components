import React, { ChangeEvent, FC, FormEvent, HTMLAttributes, InputHTMLAttributes } from 'react'

import { useZoomComponent } from '../../hooks'

import { InputNS, Spin, Text, TypographyNS } from '..'
import { CommonSize, DataEntriesState } from '../../types'

export namespace RadioButtonNS {
  export type Value = number | string

  export interface Props
    extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size' | 'name' | 'value'> {
    name: string
    containerProps?: HTMLAttributes<HTMLDivElement>
    stateMessageProps?: TypographyNS.TextNS.Props
    size?: CommonSize
    disabled?: boolean
    loading?: boolean
    disabledOnLoading?: boolean
    label?: string
    labelProps?: HTMLAttributes<HTMLLabelElement>
    state?: DataEntriesState
    value: Value
    onWrite?: (value: Value) => void
  }
}

export const RadioButton: FC<RadioButtonNS.Props> = ({
  size = 'normal',
  state = ['neutral'],
  disabledOnLoading = true,
  onWrite,
  containerProps,
  stateMessageProps,
  className,
  disabled,
  loading,
  label,
  labelProps,
  onChange,
  onInput,
  ...rest
}) => {
  const { createClassName } = useZoomComponent('radio')
  const isDisabled = disabledOnLoading ? loading || disabled : disabled

  const labelClasses = createClassName(labelProps?.className, 'label')

  const containerClasses = createClassName(containerProps?.className, '', {
    [createClassName('', size)]: true,
    [createClassName('', state[0])]: true,
    [createClassName('', loading ? 'loading' : '')]: !!loading,
    [createClassName('', isDisabled ? 'disabled' : '')]: !!isDisabled,
  })

  const stateMessageClasses = createClassName(stateMessageProps?.className, 'state-message')

  const textSizeProps: InputNS.TextSize = {
    small: size === 'small',
    normal: size === 'normal',
    large: size === 'large',
  }

  const handleOnChange = (evt: ChangeEvent<HTMLInputElement>) => {
    onWrite?.(evt.currentTarget.value)
    onChange?.(evt)
  }

  const handleOnInput = (evt: FormEvent<HTMLInputElement>) => {
    onWrite?.(evt.currentTarget.value)
    onInput?.(evt)
  }

  return (
    <div {...containerProps} className={containerClasses}>
      <label {...labelProps} className={labelClasses}>
        <input
          {...rest}
          type="radio"
          className="native-radio"
          disabled={isDisabled}
          onInput={handleOnInput}
          onChange={handleOnChange}
        />

        <span className="custom-radio">
          {loading ? <Spin size="small" /> : <span className="checked-icon" />}
        </span>

        {label && (
          <Text {...textSizeProps} className="label-text">
            {label}
          </Text>
        )}
      </label>

      {state[1] && (
        <Text {...textSizeProps} {...stateMessageProps} className={stateMessageClasses}>
          {state[1]}
        </Text>
      )}
    </div>
  )
}
