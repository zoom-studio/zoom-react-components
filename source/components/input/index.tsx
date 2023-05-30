import React, {
  type ChangeEvent,
  type FocusEvent,
  type FormEvent,
  forwardRef,
  type HTMLAttributes,
  type HTMLInputTypeAttribute,
  type InputHTMLAttributes,
  type RefObject,
  useRef,
} from 'react'

import { Button, Icon, LongPress, Spin, type SpinNS, Text, type TypographyNS } from '..'
import { logs } from '../../constants'
import { useComponentSize, useInputDirectionHandler, useZoomComponent } from '../../hooks'
import {
  type BaseComponent,
  type BaseInputComponent,
  type CommonSize,
  type DataEntriesState,
} from '../../types'

import { color } from '../../utils/color'

export namespace InputNS {
  export type TextSize = Pick<TypographyNS.TextNS.Props, 'small' | 'normal' | 'large'>
  export type Type =
    | Exclude<HTMLInputTypeAttribute, 'button' | 'checkbox' | 'radio' | object>
    | 'numeral-keypad-text'

  export interface Props extends BaseInputComponent, BaseComponent {
    onWrite?: (value: string) => void
    onTogglePasswordVisibility?: (isVisible: boolean) => void
    labelProps?: HTMLAttributes<HTMLSpanElement>
    labelContainerProps?: HTMLAttributes<HTMLLabelElement>
    labelTextProps?: TypographyNS.TextNS.Props
    stateMessageProps?: TypographyNS.TextNS.Props
    spinProps?: SpinNS.Props
    label?: string
    size?: CommonSize
    state?: DataEntriesState
    labelRef?: RefObject<HTMLLabelElement>
    disabled?: boolean
    loading?: boolean
    labelColon?: boolean
    disabledOnLoading?: boolean
    type?: Type
    passwordToggleButton?: boolean
    searchClearButton?: boolean
    numberButtonHandlers?: boolean
    autoDirection?: boolean
  }
}

export const Input = forwardRef<HTMLDivElement, InputNS.Props>(
  (
    {
      inputRef: providedInputRef,
      labelRef: providedLabelRef,
      size: providedSize,
      type = 'text',
      passwordToggleButton = true,
      searchClearButton = true,
      numberButtonHandlers = true,
      labelColon = true,
      disabledOnLoading = true,
      autoDirection = true,
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
      onBlur,
      onFocus,
      id,
      onClick,
      style,
      inputProps,
      ...otherInputProps
    },
    reference,
  ) => {
    const size = useComponentSize(providedSize)
    const inputRef = providedInputRef ?? useRef<HTMLInputElement>(null)
    const labelRef = providedLabelRef ?? useRef<HTMLLabelElement>(null)
    const { createClassName, sendLog } = useZoomComponent('input')
    const isDisabled = disabledOnLoading ? loading || disabled : disabled
    const inputClasses = createClassName(className)
    const labelClasses = createClassName(labelProps?.className, 'label')

    const isPassword = type === 'password'
    const isNumber = type === 'number'
    const isSearch = type === 'search'
    const isNumeralKeypad = type === 'numeral-keypad-text'
    const isText = type === 'text' || !type
    const isRequired = required || (isSearch && searchClearButton)

    const handleDirection = useInputDirectionHandler(
      inputRef,
      () => {
        sendLog(logs.inputNotFoundInputRef, 'useInputDirectionHandler hook')
      },
      (isText || isSearch) && autoDirection,
    )

    const stateMessageClasses = createClassName(stateMessageProps?.className, 'state-message')

    const spinColor = state[0] === 'neutral' ? undefined : color({ source: state[0] })

    const labelContainerClasses = createClassName(labelContainerProps?.className, 'label-container')

    const containerClasses = createClassName(className, 'container', {
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
      if (!input) {
        sendLog(logs.inputNotFoundInputRef, 'handleOnPasswordButtonClick fn')
        return
      }

      if (!isPassword || !passwordToggleButton) {
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
      if (!input) {
        sendLog(logs.inputNotFoundInputRef, 'handleClearSearchButtonClick fn')
        return
      }

      if (!isSearch || !searchClearButton) {
        return null
      }
      input.value = ''
      onWrite?.('')
      input.focus()
    }

    const handleNumberButtonHandlers = (handler: 'increase' | 'decrease') => () => {
      const { current: input } = inputRef
      if (!input) {
        sendLog(logs.inputNotFoundInputRef, 'handleNumberButtonHandlers fn')
        return
      }

      if (!isNumber || !numberButtonHandlers) {
        return null
      }

      const currentValue = parseInt(input.value || '0')
      const newValue = (handler === 'increase' ? currentValue + 1 : currentValue - 1).toString()
      input.value = newValue
      onWrite?.(newValue)
    }

    const handleOnChange = (evt: ChangeEvent<HTMLInputElement>) => {
      const { value } = evt.currentTarget
      onWrite?.(value)
      onChange?.(evt)
      handleDirection(value)
    }

    const handleOnInput = (evt: FormEvent<HTMLInputElement>) => {
      const { value } = evt.currentTarget
      onWrite?.(value)
      onInput?.(evt)
      handleDirection(value)
    }

    const isAutoFocusedRef = useRef(false)

    const isAutoFocused = (): boolean => {
      if (!otherInputProps.autoFocus && !isAutoFocusedRef.current) {
        return false
      }

      isAutoFocusedRef.current = true
      return true
    }

    const handleOnToggleFocus = (evt: FocusEvent<HTMLInputElement>) => {
      const focus = 'focus'
      const { type } = evt
      const { current: label } = labelRef
      const isFocused = type === focus

      if (label) {
        if (isFocused) {
          label.classList.add(focus)
        } else {
          label.classList.remove(focus)
        }
      } else {
        if (!isAutoFocused()) {
          sendLog(logs.inputNotFoundLabelRef, 'handleOnToggleFocus fn')
        }
      }

      if (isFocused) {
        onFocus?.(evt)
      } else {
        onBlur?.(evt)
      }
    }

    const getNumeralKeyPadProps = (): InputHTMLAttributes<HTMLInputElement> => {
      if (!isNumeralKeypad) {
        return {}
      }
      return {
        pattern: '[0-9]*',
        inputMode: 'numeric',
      }
    }

    const getInputType = (): HTMLInputTypeAttribute => {
      switch (type) {
        case 'numeral-keypad-text':
        case undefined:
          return 'text'
        default:
          return type
      }
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
        <label {...labelContainerProps} className={labelContainerClasses} ref={labelRef}>
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
            {...inputProps}
            {...otherInputProps}
            {...getNumeralKeyPadProps()}
            className={inputClasses}
            ref={inputRef}
            type={getInputType()}
            required={isRequired}
            onChange={handleOnChange}
            onInput={handleOnInput}
            onBlur={handleOnToggleFocus}
            disabled={disabled}
            onFocus={handleOnToggleFocus}
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
  },
)
