import React, { FC, HTMLAttributes } from 'react'

import { classNames } from '@zoom-studio/zoom-js-ts-utils'

import { useFindEmoji } from './hooks'
import {
  EMOJI_GROUP_NAMES,
  EMOJI_NAMES,
  EMOJI_SUBGROUP_NAMES,
} from './constants'

export namespace EmojiNS {
  export interface Props extends Omit<HTMLAttributes<HTMLImageElement>, 'src'> {
    name: Emojis.Names
  }

  export namespace Emojis {
    export type GroupNames = typeof EMOJI_GROUP_NAMES[number]
    export type SubgroupNames = typeof EMOJI_SUBGROUP_NAMES[number]
    export type Names = typeof EMOJI_NAMES[number]
    export type Data = {
      [name in GroupNames]: {
        [name: string]: {
          [name: string]: string
        }
      }
    }
  }
}

export const Emoji: FC<EmojiNS.Props> = ({ name, className, ...rest }) => {
  const emoji = useFindEmoji(name)
  const classes = classNames('zoomrc-emoji', {
    [className ?? '']: true,
  })

  return <img draggable={false} {...rest} src={emoji} className={classes} />
}
