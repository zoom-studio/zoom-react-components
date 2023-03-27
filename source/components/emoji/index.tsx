import React, { forwardRef, useCallback, useMemo } from 'react'

import { classNames } from '@zoom-studio/zoom-js-ts-utils'

import { BaseComponent } from '../../types'
import { EMOJIS, EMOJI_GROUP_NAMES, EMOJI_NAMES, EMOJI_SUBGROUP_NAMES } from './constants'

export namespace EmojiNS {
  export const EmojiData = {
    collections: EMOJI_GROUP_NAMES,
    groups: EMOJI_SUBGROUP_NAMES,
    names: EMOJI_NAMES,
    emojis: EMOJIS as Emojis.Emoji[],
  }

  export interface Props extends BaseComponent<HTMLImageElement> {
    name: Emojis.Names
    asSpan?: boolean
  }

  export namespace Emojis {
    export type GroupNames = typeof EMOJI_GROUP_NAMES[number]
    export type SubgroupNames = typeof EMOJI_SUBGROUP_NAMES[number]
    export type Names = typeof EMOJI_NAMES[number]
    export interface Emoji {
      collection: GroupNames
      group: SubgroupNames
      data: string
      name: Names
    }
  }
}

export const Emoji = forwardRef<HTMLImageElement, EmojiNS.Props>(
  ({ name, className, containerProps, asSpan, style, ...rest }, reference) => {
    const classes = classNames('zoomrc-emoji', {
      [className ?? '']: true,
      'as-span': !!asSpan,
    })

    const findEmoji = useCallback(
      (name: EmojiNS.Emojis.Names) => EMOJIS.find(emoji => emoji.name === name),
      [],
    )

    const emoji = useMemo<string>(() => findEmoji(name)?.data ?? '', [name])

    return asSpan ? (
      <span
        {...rest}
        {...containerProps}
        draggable={false}
        ref={reference}
        className={classes}
        style={{ ...style, backgroundImage: `url(${emoji})` }}
      />
    ) : (
      <img
        {...rest}
        {...containerProps}
        draggable={false}
        ref={reference}
        src={emoji}
        className={classes}
        style={style}
      />
    )
  },
)
