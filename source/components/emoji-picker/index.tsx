import React, { FC, HTMLAttributes } from 'react'
import { useZoomComponent } from '../../hooks'

export namespace EmojiPickerNs {
  export interface Props {
    containerProps?: HTMLAttributes<HTMLDivElement>
  }
}

export const EmojiPicker: FC<EmojiPickerNs.Props> = ({ containerProps }) => {
  const { createClassName } = useZoomComponent('emoji-picker')

  const containerClasses = createClassName(containerProps?.className)

  return <div className={containerClasses}>emoji picker</div>
}
