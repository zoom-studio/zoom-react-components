import React, { FC, HTMLAttributes, InputHTMLAttributes } from 'react'

import { useZoomComponent } from '../../hooks'

import { Icon, InputNS, Text, TypographyNS, Spin } from '..'

export namespace CheckboxNS {
  export type Size = 'small' | 'normal' | 'large'

  export interface Props
    extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
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

export const Checkbox: FC<CheckboxNS.Props> = ({
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
  const { createClassName } = useZoomComponent('checkbox')
  const isDisabled = disabledOnLoading ? loading || disabled : disabled

  const labelClasses = createClassName(labelProps?.className, 'label')

  const containerClasses = createClassName(containerProps?.className, '', {
    [createClassName('', size)]: true,
    [createClassName('', state[0])]: true,
    [createClassName('', loading ? 'loading' : '')]: !!loading,
    [createClassName('', isDisabled ? 'disabled' : '')]: !!isDisabled,
  })

  const stateMessageClasses = createClassName(
    stateMessageProps?.className,
    'state-message',
  )

  const textSizeProps: InputNS.TextSize = {
    small: size === 'small',
    normal: size === 'normal',
    large: size === 'large',
  }

  return (
    <div {...containerProps} className={containerClasses}>
      <label {...labelProps} className={labelClasses}>
        <input
          {...rest}
          type="checkbox"
          className="native-checkbox"
          disabled={isDisabled}
        />

        <span className="custom-checkbox">
          {loading ? (
            <Spin size="small" />
          ) : (
            <Icon name="done" className="checked-icon" />
          )}
        </span>

        {label && (
          <Text {...textSizeProps} className="label-text">
            {label}
          </Text>
        )}
      </label>

      {state[1] && (
        <Text
          {...textSizeProps}
          {...stateMessageProps}
          className={stateMessageClasses}
        >
          {state[1]}
        </Text>
      )}
    </div>
  )
}
