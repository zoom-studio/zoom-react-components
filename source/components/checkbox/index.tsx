import React, { ChangeEvent, FormEvent, forwardRef, HTMLAttributes, useEffect, useRef } from 'react'

import { useComponentSize, useZoomComponent } from '../../hooks'

import { Icon, InputNS, Spin, Text, TypographyNS } from '..'
import { BaseComponent, BaseInputComponent, CommonSize, DataEntriesState } from '../../types'

export namespace CheckboxNS {
  export interface Props extends BaseInputComponent, BaseComponent {
    stateMessageProps?: TypographyNS.TextNS.Props
    size?: CommonSize
    disabled?: boolean
    loading?: boolean
    disabledOnLoading?: boolean
    label?: string
    labelProps?: HTMLAttributes<HTMLLabelElement>
    state?: DataEntriesState
    indeterminate?: boolean
    onWrite?: (isChecked: boolean) => void
  }
}

export const Checkbox = forwardRef<HTMLDivElement, CheckboxNS.Props>(
  (
    {
      inputRef: providedInputRef,
      size: providedSize,
      state = ['neutral'],
      disabledOnLoading = true,
      onWrite,
      onChange,
      onInput,
      containerProps,
      stateMessageProps,
      className,
      disabled,
      loading,
      label,
      labelProps,
      id,
      onClick,
      style,
      inputProps,
      indeterminate,
      ...otherInputProps
    },
    reference,
  ) => {
    const inputRef = providedInputRef ?? useRef<HTMLInputElement | null>(null)

    const { createClassName } = useZoomComponent('checkbox')
    const size = useComponentSize(providedSize)

    const isDisabled = disabledOnLoading ? loading || disabled : disabled

    const labelClasses = createClassName(labelProps?.className, 'label')

    const containerClasses = createClassName(className, '', {
      [createClassName('', 'indeterminate')]: !!indeterminate,
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

    useEffect(() => {
      if (typeof indeterminate === 'boolean' && inputRef.current) {
        inputRef.current.indeterminate = !otherInputProps.checked && indeterminate
      }
    }, [inputRef, indeterminate])

    return (
      <div
        {...containerProps}
        ref={reference}
        onClick={onClick}
        id={id}
        style={style}
        className={containerClasses}
      >
        <label {...labelProps} className={labelClasses}>
          <input
            {...inputProps}
            {...otherInputProps}
            type="checkbox"
            className="native-checkbox"
            disabled={isDisabled}
            onInput={handleOnInput}
            onChange={handleOnChange}
            ref={inputRef}
          />

          <span className="custom-checkbox">
            {loading ? (
              <Spin size="small" />
            ) : indeterminate ? (
              <Icon name="minimize" className="indeterminate-icon" />
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
          <Text {...textSizeProps} {...stateMessageProps} className={stateMessageClasses}>
            {state[1]}
          </Text>
        )}
      </div>
    )
  },
)
