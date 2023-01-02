import React, { FC, HTMLAttributes, InputHTMLAttributes } from 'react'

import { InputNS, Spin, Text, TypographyNS } from '..'
import { useZoomComponent } from '../../hooks'

export namespace SwitchNS {
  export type Size = 'small' | 'normal' | 'large'

  export interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
    containerProps?: HTMLAttributes<HTMLDivElement>
    stateMessageProps?: TypographyNS.TextNS.Props
    size?: Size
    disabled?: boolean
    loading?: boolean
    disabledOnLoading?: boolean
    label?: string
    labelProps?: HTMLAttributes<HTMLLabelElement>
    state?: InputNS.State
  }
}

export const Switch: FC<SwitchNS.Props> = ({
  size = 'normal',
  state = ['neutral'],
  disabledOnLoading = true,
  containerProps,
  stateMessageProps,
  className,
  disabled,
  loading,
  label,
  labelProps,
  ...rest
}) => {
  const { createClassName } = useZoomComponent('switch')
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

  return (
    <div {...containerProps} className={containerClasses}>
      <label {...labelProps} className={labelClasses}>
        <input {...rest} type="checkbox" className="native-switch" disabled={isDisabled} />

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
}
