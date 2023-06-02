import React, { type ChangeEvent, type FormEvent, forwardRef, type HTMLAttributes } from 'react'

import { useComponentSize, useZoomComponent } from '../../hooks'

import { type InputNS, Spin, Text, type TypographyNS } from '..'
import {
  type BaseComponent,
  type BaseInputComponent,
  type CommonSize,
  type DataEntriesState,
} from '../../types'

export namespace RadioButtonNS {
  export type Value = number | string

  export interface Props extends BaseInputComponent, BaseComponent {
    name: string
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

export const RadioButton = forwardRef<HTMLDivElement, RadioButtonNS.Props>(
  (
    {
      size: providedSize,
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
      id,
      onClick,
      style,
      inputProps,
      inputRef,
      ...otherInputProps
    },
    reference,
  ) => {
    const size = useComponentSize(providedSize)
    const { createClassName } = useZoomComponent('radio')
    const isDisabled = disabledOnLoading ? loading || disabled : disabled

    const labelClasses = createClassName(labelProps?.className, 'label')

    const containerClasses = createClassName(className, '', {
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
      <div
        {...containerProps}
        ref={reference}
        id={id}
        onClick={onClick}
        style={style}
        className={containerClasses}
      >
        <label {...labelProps} className={labelClasses}>
          <input
            {...otherInputProps}
            {...inputProps}
            type="radio"
            className="native-radio"
            disabled={isDisabled}
            onInput={handleOnInput}
            onChange={handleOnChange}
            ref={inputRef}
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
  },
)
