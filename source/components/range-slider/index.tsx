import React, { forwardRef, ReactNode, useEffect, useState } from 'react'

import Slider from 'react-rangeslider'
import { useVariable } from '@zoom-studio/zoom-js-ts-utils'

import { Emoji, EmojiNS, Icon, IconNS, InputNS, Spin, Text, TypographyNS } from '..'
import { useComponentSize, useZoomComponent } from '../../hooks'
import { BaseComponent, CommonSize, DataEntriesState } from '../../types'

export namespace RangeSliderNS {
  export type ThumbContent = { icon: IconNS.Names } | { emoji: EmojiNS.Emojis.Names } | JSX.Element

  export interface Props extends Omit<BaseComponent, 'children'> {
    min?: number
    max?: number
    value?: number
    step?: number
    disabled?: boolean
    masks?: { [value: number]: ReactNode } | undefined
    onWrite?: (value: number) => void
    renderPopover?: ((value: number) => ReactNode) | false
    thumbContent?: ThumbContent
    size?: CommonSize
    state?: DataEntriesState
    label?: string
    disabledOnLoading?: boolean
    loading?: boolean
    labelColon?: boolean
    stateMessageProps?: TypographyNS.TextNS.Props
  }
}

export const RangeSlider = forwardRef<HTMLDivElement, RangeSliderNS.Props>(
  (
    {
      size: providedSize,
      value: providedValue,
      renderPopover = value => value,
      min = 0,
      max = 100,
      step = 1,
      labelColon = true,
      state = ['neutral'],
      disabledOnLoading = true,
      masks,
      className,
      containerProps,
      thumbContent,
      stateMessageProps,
      disabled,
      onWrite,
      label,
      loading,
      ...rest
    },
    reference,
  ) => {
    const size = useComponentSize(providedSize)
    const [value, setValue] = useState(providedValue || (max + min) / 2)
    const { createClassName } = useZoomComponent('range-slider')
    const isDisabled = disabledOnLoading ? loading || disabled : disabled

    const handleOnChange = (value: number) => {
      if (isDisabled) {
        return
      }

      onWrite?.(value)
      setValue(value)
    }

    const handleRenderPopover = (value: number): ReactNode => {
      if (renderPopover) {
        return renderPopover(value)
      }
      return value
    }

    const renderThumbContent = useVariable<ReactNode>(() => {
      if (loading) {
        return <Spin size="small" color={state[0] === 'warning' ? 'black' : 'white'} />
      } else if (!thumbContent) {
        return undefined
      } else if ('icon' in thumbContent) {
        return <Icon name={thumbContent.icon} />
      } else if ('emoji' in thumbContent) {
        return <Emoji name={thumbContent.emoji} />
      } else {
        return thumbContent
      }
    })

    const stateMessageClasses = createClassName(stateMessageProps?.className, 'state-message')

    const classes = createClassName(className, '', {
      [createClassName('', 'with-thumb-content')]: !!renderThumbContent,
      [createClassName('', 'with-masks')]: !!masks,
      [createClassName('', 'disabled')]: !!isDisabled,
      [createClassName('', 'loading')]: !!loading,
      [createClassName('', size)]: true,
      [createClassName('', state[0])]: true,
    })

    const textSizeProps: InputNS.TextSize = {
      small: size === 'small',
      normal: size === 'normal',
      large: size === 'large',
    }

    useEffect(() => {
      if (providedValue) {
        setValue(providedValue)
      }
    }, [providedValue])

    return (
      <div {...rest} {...containerProps} ref={reference} className={classes}>
        <div className="slider-container">
          {label && (
            <Text bold {...textSizeProps} className="label">
              {`${label}${labelColon ? ':' : ''}`}
            </Text>
          )}

          <Slider
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={handleOnChange}
            tooltip={!!renderPopover}
            labels={masks}
            format={handleRenderPopover}
            handleLabel={renderThumbContent}
          />
        </div>

        {state[1] && (
          <Text {...textSizeProps} {...stateMessageProps} className={stateMessageClasses}>
            {state[1]}
          </Text>
        )}
      </div>
    )
  },
)
