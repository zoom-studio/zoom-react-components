import React, {
  forwardRef,
  useRef,
  useState,
  type ChangeEvent,
  type FocusEvent,
  type HTMLAttributes,
  type HTMLInputTypeAttribute,
  type InputHTMLAttributes,
  type RefObject,
} from 'react'

import { Button, Icon, LongPress, Spin, Text, type SpinNS, type TypographyNS } from '..'
import { logs } from '../../constants'
import { useComponentSize, useInputDirectionHandler, useZoomComponent } from '../../hooks'
import {
  type BaseComponent,
  type BaseInputComponent,
  type CommonSize,
  type DataEntriesState,
} from '../../types'

import { color } from '../../utils/color'
import { ComboBoxPortal } from './combo-box-portal'
import { useComboBox } from './use-combobox'

export namespace InputNS {
  export type TextSize = Pick<TypographyNS.TextNS.Props, 'small' | 'normal' | 'large'>
  export type Type =
    | Exclude<HTMLInputTypeAttribute, 'button' | 'checkbox' | 'radio' | object>
    | 'numeral-keypad-text'

  export interface ComboBoxPartedItem {
    value: string
    matched: boolean
  }

  export interface Props extends Omit<BaseInputComponent, 'inputRef' | 'value'>, BaseComponent {
    onWrite?: (value: string) => void
    onTogglePasswordVisibility?: (isVisible: boolean) => void
    comboBox?: string[]
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
    changeStyleOnFocus?: boolean
    value?: string
  }
}

export const Input = forwardRef<HTMLDivElement, InputNS.Props>(
  (
    {
      labelRef: providedLabelRef,
      size: providedSize,
      type = 'text',
      passwordToggleButton = true,
      searchClearButton = true,
      numberButtonHandlers = true,
      labelColon = true,
      disabledOnLoading = true,
      autoDirection = true,
      changeStyleOnFocus = true,
      state = ['neutral'],
      comboBox: comboBoxData,
      onWrite,
      onTogglePasswordVisibility,
      containerProps,
      labelTextProps,
      stateMessageProps,
      value = '',
      spinProps,
      label,
      labelContainerProps,
      labelProps,
      className,
      disabled,
      loading,
      required,
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
    const labelRef = providedLabelRef ?? useRef<HTMLLabelElement>(null)
    const { createClassName, sendLog } = useZoomComponent('input')
    const isDisabled = disabledOnLoading ? loading || disabled : disabled
    const inputClasses = createClassName(className)
    const labelClasses = createClassName(labelProps?.className, 'label')

    const [inputValue, setInputValue] = useState<string>(value)

    const isPassword = type === 'password'
    const isNumber = type === 'number'
    const isSearch = type === 'search'
    const isNumeralKeypad = type === 'numeral-keypad-text'
    const isText = type === 'text' || !type
    const isRequired = required || (isSearch && searchClearButton)
    const isComboBox =
      !!comboBoxData && comboBoxData.length > 0 && !isPassword && !isNumber && !isNumeralKeypad

    const setValue = (newValue: string) => {
      onWrite?.(newValue)
      setInputValue(newValue)
    }

    const comboBox = useComboBox({ comboBoxData, setValue, inputValue, isComboBox })

    const handleDirection = useInputDirectionHandler(
      comboBox.refs.reference as RefObject<HTMLInputElement | HTMLTextAreaElement | null>,
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
      const { current: input } = comboBox.refs.reference as RefObject<HTMLInputElement>

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
      const { current: input } = comboBox.refs.reference as RefObject<HTMLInputElement>
      if (!input) {
        sendLog(logs.inputNotFoundInputRef, 'handleClearSearchButtonClick fn')
        return
      }

      if (!isSearch || !searchClearButton) {
        return null
      }
      setValue('')
      input.focus()
    }

    const handleNumberButtonHandlers = (handler: 'increase' | 'decrease') => () => {
      const { current: input } = comboBox.refs.reference as RefObject<HTMLInputElement>
      if (!input) {
        sendLog(logs.inputNotFoundInputRef, 'handleNumberButtonHandlers fn')
        return
      }

      if (!isNumber || !numberButtonHandlers) {
        return null
      }

      const currentValue = parseInt(input.value || '0')
      const newValue = (handler === 'increase' ? currentValue + 1 : currentValue - 1).toString()
      setValue(newValue)
    }

    const handleOnChange = (evt: ChangeEvent<HTMLInputElement>) => {
      const { value } = evt.currentTarget
      setValue(value)
      onChange?.(evt)
      handleDirection(value)
      comboBox.handleComboBoxOnWrite(value)
    }

    const isAutoFocusedRef = useRef(false)

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
        if (isFocused && changeStyleOnFocus) {
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
            {...comboBox.getReferenceProps({
              ...inputProps,
              ...otherInputProps,
              ...getNumeralKeyPadProps(),
              'className': inputClasses,
              'type': getInputType(),
              'required': isRequired,
              'onChange': handleOnChange,
              'onFocus': handleOnToggleFocus,
              'onBlur': handleOnToggleFocus,
              'ref': comboBox.refs.setReference,
              'onKeyDown': comboBox.handleComboBoxOnKeyDown,
              'aria-autocomplete': isComboBox ? 'list' : undefined,
              'value': inputValue,
              disabled,
            })}
          />

          {isComboBox && comboBox.items.length > 0 && (
            <ComboBoxPortal inputValue={inputValue} setValue={setInputValue} comboBox={comboBox} />
          )}

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
