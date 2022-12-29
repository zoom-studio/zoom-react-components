import React, { FC, HTMLAttributes, RefObject } from 'react'

import { Spin, SpinNS, Text, TypographyNS } from '..'
import { useZoomComponent } from '../../hooks'

import { color } from '../../utils/color'

export namespace InputNS {
  export type Size = 'small' | 'normal' | 'large'
  export type StateNames = 'error' | 'warning' | 'success' | 'info' | 'neutral'
  export type State = [StateNames, string?]
  export type TextSize = Pick<TypographyNS.TextNS.Props, 'small' | 'normal' | 'large'>

  export interface Props extends HTMLAttributes<HTMLInputElement> {
    containerProps?: HTMLAttributes<HTMLDivElement>
    labelProps?: HTMLAttributes<HTMLSpanElement>
    labelContainerProps?: HTMLAttributes<HTMLLabelElement>
    labelTextProps?: TypographyNS.TextNS.Props
    stateMessageProps?: TypographyNS.TextNS.Props
    spinProps?: SpinNS.Props
    label?: string
    size?: Size
    state?: State
    disabled?: boolean
    loading?: boolean
    labelColon?: boolean
    disabledOnLoading?: boolean
    inputRef?: RefObject<HTMLInputElement>
  }
}

export const Input: FC<InputNS.Props> = ({
  labelColon = true,
  disabledOnLoading = true,
  size = 'normal',
  state = ['neutral'],
  containerProps,
  labelTextProps,
  stateMessageProps,
  spinProps,
  inputRef,
  label,
  labelContainerProps,
  labelProps,
  className,
  disabled,
  loading,
  ...rest
}) => {
  const { createClassName } = useZoomComponent('input')
  const isDisabled = disabledOnLoading ? loading || disabled : disabled
  const inputClasses = createClassName(className)
  const labelClasses = createClassName(labelProps?.className, 'label')

  const stateMessageClasses = createClassName(stateMessageProps?.className, 'state-message')

  const spinColor = state[0] === 'neutral' ? undefined : color({ source: state[0] })

  const labelContainerClasses = createClassName(labelContainerProps?.className, 'label-container')

  const containerClasses = createClassName(containerProps?.className, 'container', {
    [createClassName('', size)]: true,
    [createClassName('', state[0])]: true,
    [createClassName('', loading ? 'loading' : '')]: !!loading,
    [createClassName('', isDisabled ? 'disabled' : '')]: !!isDisabled,
  })

  const textSizeProps: InputNS.TextSize = {
    small: size === 'small',
    normal: size === 'normal',
    large: size === 'large',
  }

  return (
    <div {...containerProps} className={containerClasses}>
      <label {...labelContainerProps} className={labelContainerClasses}>
        {(label || loading) && (
          <span {...labelProps} className={labelClasses}>
            {loading && <Spin size="small" {...spinProps} color={spinColor} />}
            {label && (
              <Text bold {...textSizeProps} {...labelTextProps}>{`${label}${
                labelColon ? ':' : ''
              }`}</Text>
            )}
          </span>
        )}

        <input {...rest} className={inputClasses} ref={inputRef} />
      </label>

      {state[1] && (
        <Text {...textSizeProps} {...stateMessageProps} className={stateMessageClasses}>
          {state[1]}
        </Text>
      )}
    </div>
  )
}
