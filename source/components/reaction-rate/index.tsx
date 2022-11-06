import React, { FC, HTMLAttributes, MouseEvent } from 'react'

import { Button, Emoji, EmojiNS } from '..'
import { usezoomlangComponent } from '../../hooks/use-molang-component'
import { Range } from '../../types/enumerable'

export namespace ReactionRateNS {
  export type EmojiName = EmojiNS.Emojis.Names
  export type SelectedRange = Range<1, 6>
  export type Sizes = 'small' | 'normal' | 'large'

  export interface Props
    extends Omit<HTMLAttributes<HTMLDivElement>, 'onSelect'> {
    type?: 'quintuple' | 'couple'
    selectedReaction?: SelectedRange
    loading?: boolean
    disabled?: boolean
    size?: Sizes
    onSelect?: (
      rate: SelectedRange,
      evt?: MouseEvent<HTMLButtonElement>,
    ) => void
    emojis?:
      | [EmojiName, EmojiName]
      | [EmojiName, EmojiName, EmojiName, EmojiName, EmojiName]
  }
}

export const ReactionRate: FC<ReactionRateNS.Props> = ({
  type = 'quintuple',
  size = 'normal',
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
  ...rest
}) => {
  const { createClassName } = usezoomlangComponent('reaction-rate')

  const classes = createClassName(className, type, {
    [`${createClassName(undefined, size)}`]: true,
  })

  const reactions = type === 'quintuple' ? emojis : [emojis[0], emojis[1]]

  const isSelected = (index: number): boolean | undefined =>
    index + 1 === selectedReaction

  const isLoading = (index: number): boolean | undefined =>
    isSelected(index) && loading

  return (
    <div className={classes} {...rest}>
      {reactions.map((reaction, index) => (
        <Button
          key={index}
          size="small"
          type="secondary"
          active={isSelected(index)}
          loading={isLoading(index)}
          disabled={disabled || isSelected(index) || loading}
          onClick={evt =>
            onSelect?.((index + 1) as ReactionRateNS.SelectedRange, evt)
          }
        >
          {!isLoading(index) && <Emoji name={reaction} />}
        </Button>
      ))}
    </div>
  )
}
