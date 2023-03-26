import React, { ChangeEvent, FormEvent, forwardRef, HTMLAttributes } from 'react'

import { InputNS, Spin, Text, TypographyNS } from '..'
import { useComponentSize, useZoomComponent } from '../../hooks'
import { BaseComponent, BaseInputComponent, CommonSize, DataEntriesState } from '../../types'

export namespace SwitchNS {
  export interface Props extends BaseInputComponent, BaseComponent {
    stateMessageProps?: TypographyNS.TextNS.Props
    size?: CommonSize
    disabled?: boolean
    loading?: boolean
    disabledOnLoading?: boolean
    label?: string
    labelProps?: HTMLAttributes<HTMLLabelElement>
    state?: DataEntriesState
    onWrite?: (isChecked: boolean) => void
  }
}

export const Switch = forwardRef<HTMLDivElement, SwitchNS.Props>(
  (
    {
      size: providedSize,
      state = ['neutral'],
      disabledOnLoading = true,
      containerProps,
      stateMessageProps,
      className,
      disabled,
      loading,
      label,
      labelProps,
      onWrite,
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
    const { createClassName } = useZoomComponent('switch')
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
      onWrite?.(evt.currentTarget.checked)
      onChange?.(evt)
    }

    const handleOnInput = (evt: FormEvent<HTMLInputElement>) => {
      onWrite?.(evt.currentTarget.checked)
      onInput?.(evt)
    }

    return (
      <div
        {...containerProps}
        id={id}
        onClick={onClick}
        style={style}
        ref={reference}
        className={containerClasses}
      >
        <label {...labelProps} className={labelClasses}>
          <input
            {...otherInputProps}
            {...inputProps}
            type="checkbox"
            className="native-switch"
            disabled={isDisabled}
            onInput={handleOnInput}
            onChange={handleOnChange}
            ref={inputRef}
          />

          <div className="custom-switch">
            <span className="inner-circle">
              {loading && <Spin size="large" color="white" className="loading-spin" />}
            </span>
          </div>

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
