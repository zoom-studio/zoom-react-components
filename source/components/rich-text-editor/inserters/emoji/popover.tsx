import React, { type FC } from 'react'

import { type EmojiNS, EmojiPicker } from '../../..'

export namespace EmojiInserterPopoverNS {
  export interface Props {
    onSelect: (emojiName: EmojiNS.Emojis.Names) => void
  }
}

export const EmojiInserterPopover: FC<EmojiInserterPopoverNS.Props> = ({ onSelect }) => {
  const handleOnSelect = (emojiName: EmojiNS.Emojis.Names) => {
    onSelect(emojiName)
  }

  return (
    <div className="emoji-inserter">
      <EmojiPicker onSelect={handleOnSelect} />
    </div>
  )
}
