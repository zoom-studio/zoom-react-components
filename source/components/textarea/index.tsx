import React, {
  ChangeEvent,
  FC,
  FocusEvent,
  FormEvent,
  HTMLAttributes,
  RefObject,
  TextareaHTMLAttributes,
  useRef,
} from 'react'

import { Spin, SpinNS, Text, TypographyNS } from '..'
import { logs } from '../../constants'
import { useZoomComponent } from '../../hooks'
import { CommonSize, DataEntriesState } from '../../types'

import { color } from '../../utils/color'

export namespace TextareaNS {
  export type TextSize = Pick<TypographyNS.TextNS.Props, 'small' | 'normal' | 'large'>

  export interface Props extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
    onWrite?: (value: string) => void
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
    textareaRef?: RefObject<HTMLTextAreaElement>
    labelRef?: RefObject<HTMLLabelElement>
    autoHeight?: boolean
    minHeight?: number | string
    maxHeight?: number | string
  }
}

export const Textarea: FC<TextareaNS.Props> = ({
  textareaRef: providedTextareaRef,
  labelRef: providedLabelRef,
  labelColon = true,
  disabledOnLoading = true,
  size = 'normal',
  state = ['neutral'],
  minHeight = '40px',
  maxHeight = 'unset',
  autoHeight,
  onWrite,
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
  onInput,
  onChange,
  onBlur,
  onFocus,
  ...rest
}) => {
  const textareaRef = providedTextareaRef ?? useRef<HTMLTextAreaElement>(null)
  const labelRef = providedLabelRef ?? useRef<HTMLLabelElement>(null)
  const { createClassName, sendLog } = useZoomComponent('textarea')
  const isDisabled = disabledOnLoading ? loading || disabled : disabled
  const textareaClasses = createClassName(className)
  const labelClasses = createClassName(labelProps?.className, 'label')

  const stateMessageClasses = createClassName(stateMessageProps?.className, 'state-message')

  const spinColor =
    state[0] === 'neutral' ? color({ source: 'accent' }) : color({ source: state[0] })

  const labelContainerClasses = createClassName(labelContainerProps?.className, 'label-container')

  const containerClasses = createClassName(containerProps?.className, 'container', {
    [createClassName('', size)]: true,
    [createClassName('', state[0])]: true,
    [createClassName('', loading ? 'loading' : '')]: !!loading,
    [createClassName('', isDisabled ? 'disabled' : '')]: !!isDisabled,
  })

  const textSizeProps: TextareaNS.TextSize = {
    small: size === 'small',
    normal: size === 'normal',
    large: size === 'large',
  }

  const handleAutoHeight = () => {
    const { current: textarea } = textareaRef
    if (!textarea) {
      return sendLog(logs.textareaNotFoundTextareaRef, 'handleAutoHeight function')
    }
    textarea.style.height = '5px'
    textarea.style.height = `${textarea.scrollHeight}px`
  }

  const handleOnChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    onWrite?.(evt.currentTarget.value)
    onChange?.(evt)
  }

  const handleOnInput = (evt: FormEvent<HTMLTextAreaElement>) => {
    onWrite?.(evt.currentTarget.value)
    onInput?.(evt)

    if (autoHeight) {
      handleAutoHeight()
    }
  }

  const handleOnToggleFocus = (evt: FocusEvent<HTMLTextAreaElement>) => {
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
      sendLog(logs.textareaNotFoundLabelRef, 'handleOnToggleFocus function')
    }

    if (isFocused) {
      onFocus?.(evt)
    } else {
      onBlur?.(evt)
    }
  }

  return (
    <div {...containerProps} className={containerClasses}>
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

        <textarea
          {...rest}
          className={textareaClasses}
          ref={textareaRef}
          onChange={handleOnChange}
          onInput={handleOnInput}
          onBlur={handleOnToggleFocus}
          onFocus={handleOnToggleFocus}
          style={{ minHeight, maxHeight }}
          disabled={isDisabled}
        />
      </label>

      {state[1] && (
        <Text {...textSizeProps} {...stateMessageProps} className={stateMessageClasses}>
          {state[1]}
        </Text>
      )}
    </div>
  )
}
