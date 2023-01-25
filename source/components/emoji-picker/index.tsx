import React, { FC, HTMLAttributes } from 'react'
import { useZoomComponent } from '../../hooks'
import { EmojiNS } from '../emoji'

export namespace EmojiPickerNs {
  export interface Props {
    containerProps?: HTMLAttributes<HTMLDivElement>
  }

  export type I18n = {
    collections: {
      [name in EmojiNS.Emojis.GroupNames]: string
    }
    groups: {
      [name in EmojiNS.Emojis.SubgroupNames]: string
    }
    emojis: {
      [name in EmojiNS.Emojis.Names]: string
    }
  }
}

export const EmojiPicker: FC<EmojiPickerNs.Props> = ({ containerProps }) => {
  const { createClassName } = useZoomComponent('emoji-picker')

  const containerClasses = createClassName(containerProps?.className)

  // const getCollectionName = (collection: EmojiNS.Emojis.GroupNames): string => {
  //   return i18n?.emojiPicker?.collections?.[collection] ?? collection
  // }
  // const getGroupName = (group: EmojiNS.Emojis.SubgroupNames): string => {
  //   return i18n?.emojiPicker?.groups?.[group] ?? group
  // }
  // const getEmojiName = (emojiName: EmojiNS.Emojis.Names): string => {
  //   return i18n?.emojiPicker?.emojis?.[emojiName] ?? emojiName
  // }

  return <div className={containerClasses}>emoji picker</div>
}
