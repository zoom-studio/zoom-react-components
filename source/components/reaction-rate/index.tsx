import React, { forwardRef, type MouseEvent } from 'react'

import { type Range } from '@zoom-studio/js-ts-utils'

import { Button, Emoji, type EmojiNS } from '..'
import { useComponentSize, useZoomComponent } from '../../hooks'
import { type BaseComponent, type CommonSize } from '../../types'

export namespace ReactionRateNS {
  export type EmojiName = EmojiNS.Emojis.Names
  export type SelectedRange = Range<1, 6>

  export interface Props extends BaseComponent {
    type?: 'quintuple' | 'couple'
    selectedReaction?: SelectedRange
    loading?: boolean
    disabled?: boolean
    size?: CommonSize
    onSelect?: (rate: SelectedRange, evt?: MouseEvent<HTMLButtonElement>) => void
    emojis?: [EmojiName, EmojiName] | [EmojiName, EmojiName, EmojiName, EmojiName, EmojiName]
  }
}

export const ReactionRate = forwardRef<HTMLDivElement, ReactionRateNS.Props>(
  (
    {
      size: providedSize,
      type = 'quintuple',
      emojis = [
        'frowning face',
        'slightly frowning face',
        'face without mouth',
        'smiling face with smiling eyes',
        'smiling face with heart-eyes',
      ],
      className,
      selectedReaction,
      onSelect,
      loading,
      disabled,
      containerProps,
      ...rest
    },
    reference,
  ) => {
    const size = useComponentSize(providedSize)
    const { createClassName } = useZoomComponent('reaction-rate')

    const classes = createClassName(className, type, {
      [`${createClassName(undefined, size)}`]: true,
      [createClassName()]: true,
    })

    const reactions = type === 'quintuple' ? emojis : [emojis[0], emojis[1]]

    const isSelected = (index: number): boolean | undefined => index + 1 === selectedReaction

    const isLoading = (index: number): boolean | undefined => isSelected(index) && loading

    return (
      <div {...containerProps} {...rest} className={classes} ref={reference}>
        {reactions.map((reaction, index) => (
          <Button
            key={index}
            size={size}
            type="secondary"
            active={isSelected(index)}
            loading={isLoading(index)}
            disabled={disabled || isSelected(index) || loading}
            onClick={evt => onSelect?.((index + 1) as ReactionRateNS.SelectedRange, evt)}
          >
            {!isLoading(index) && <Emoji name={reaction} />}
          </Button>
        ))}
      </div>
    )
  },
)
