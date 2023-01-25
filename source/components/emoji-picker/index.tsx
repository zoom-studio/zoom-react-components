import React, { FC, HTMLAttributes } from 'react'

import { useZoomComponent } from '../../hooks'

export namespace EmojiPickerNS {
  export interface Props {
    containerProps?: HTMLAttributes<HTMLDivElement>
  }
}

export const EmojiPicker: FC<EmojiPickerNS.Props> = ({ containerProps }) => {
  const { createClassName } = useZoomComponent('emoji-picker')

  const classes = createClassName(containerProps?.className)

  return <div className={classes}>the emoji picker</div>
}
