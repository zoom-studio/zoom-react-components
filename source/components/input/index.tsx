import React, {
  ChangeEvent,
  FC,
  FormEvent,
  HTMLAttributes,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  RefObject,
  useRef,
} from 'react'

import { Button, Icon, LongPress, Spin, SpinNS, Text, TypographyNS } from '..'
import { useZoomComponent } from '../../hooks'
import { CommonSize, DataEntriesState } from '../../types'

import { color } from '../../utils/color'

export namespace InputNS {
  export type TextSize = Pick<TypographyNS.TextNS.Props, 'small' | 'normal' | 'large'>
  export type Type = Exclude<HTMLInputTypeAttribute, 'button' | 'checkbox' | 'radio' | object>

  export interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
    onWrite?: (value: string) => void
    onTogglePasswordVisibility?: (isVisible: boolean) => void
    containerProps?: HTMLAttributes<HTMLDivElement>
    labelProps?: HTMLAttributes<HTMLSpanElement>
    labelContainerProps?: HTMLAttributes<HTMLLabelElement>
    labelTextProps?: TypographyNS.TextNS.Props
    stateMessageProps?: TypographyNS.TextNS.Props
    spinProps?: SpinNS.Props
    label?: string
    size?: CommonSize
    state?: DataEntriesState
    disabled?: boolean
    loading?: boolean
    labelColon?: boolean
    disabledOnLoading?: boolean
    inputRef?: RefObject<HTMLInputElement>
    type?: Type
    passwordToggleButton?: boolean
    searchClearButton?: boolean
    numberButtonHandlers?: boolean
  }
}

export const Input: FC<InputNS.Props> = ({
  inputRef: providedInputRef,
  type = 'text',
  passwordToggleButton = true,
  searchClearButton = true,
  numberButtonHandlers = true,
  labelColon = true,
  disabledOnLoading = true,
  size = 'normal',
  state = ['neutral'],
  onWrite,
  onTogglePasswordVisibility,
  containerProps,
  labelTextProps,
  stateMessageProps,
  spinProps,
  label,
  labelContainerProps,
  labelProps,
  className,
  disabled,
  loading,
  required,
  onInput,
  onChange,
  ...rest
}) => {
  const inputRef = providedInputRef ?? useRef<HTMLInputElement>(null)
  const { createClassName } = useZoomComponent('input')
  const isDisabled = disabledOnLoading ? loading || disabled : disabled
  const inputClasses = createClassName(className)
  const labelClasses = createClassName(labelProps?.className, 'label')

  const isPassword = type === 'password'
  const isNumber = type === 'number'
  const isSearch = type === 'search'
  const isRequired = required || (isSearch && searchClearButton)

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

  const handleOnPasswordButtonClick = () => {
    const { current: input } = inputRef
    if (!input || !isPassword || !passwordToggleButton) {
      return null
    }

    const currentType: InputNS.Type = input.type as InputNS.Type
    const newType: InputNS.Type = currentType === 'password' ? 'text' : 'password'

    input.type = newType
    onTogglePasswordVisibility?.(newType === 'text')
    input.focus()
  }

  const handleClearSearchButtonClick = () => {
    const { current: input } = inputRef
    if (!input || !isSearch || !searchClearButton) {
      return null
    }
    input.value = ''
    onWrite?.('')
    input.focus()
  }

  const handleNumberButtonHandlers = (handler: 'increase' | 'decrease') => () => {
    const { current: input } = inputRef
    if (!input || !isNumber || !numberButtonHandlers) {
      return null
    }

    const currentValue = parseInt(input.value || '0')
    const newValue = (handler === 'increase' ? currentValue + 1 : currentValue - 1).toString()
    input.value = newValue
    onWrite?.(newValue)
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

        <input
          {...rest}
          className={inputClasses}
          ref={inputRef}
          type={type}
          required={isRequired}
          onChange={handleOnChange}
          onInput={handleOnInput}
        />

        {isPassword && passwordToggleButton && (
          <Button
            onClick={handleOnPasswordButtonClick}
            type="text"
            className="type-switch-button"
            htmlType="button"
          >
            <Icon name="visibility" className="visible" />
            <Icon name="visibility_off" className="hidden" />
          </Button>
        )}

        {isSearch && searchClearButton && (
          <Button
            onClick={handleClearSearchButtonClick}
            type="text"
            className="search-clear-button"
            htmlType="button"
          >
            <Icon name="close" className="clear" />
          </Button>
        )}

        {isNumber && numberButtonHandlers && (
          <div className="number-handlers">
            <Button type="text" className="number-handler" htmlType="button">
              <LongPress callback={handleNumberButtonHandlers('increase')}>
                <Icon name="expand_less" />
              </LongPress>
            </Button>

            <Button type="text" className="number-handler" htmlType="button">
              <LongPress callback={handleNumberButtonHandlers('decrease')}>
                <Icon name="expand_more" />
              </LongPress>
            </Button>
          </div>
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
