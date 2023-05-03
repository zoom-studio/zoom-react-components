import React, { forwardRef } from 'react'

import { useComponentSize, useZoomComponent } from '../../hooks'
import { BaseComponent, CommonSize } from '../../types'

export namespace FileNS {
  export interface Props extends Omit<BaseComponent, 'children'> {
    size?: CommonSize
  }
}

export const File = forwardRef<HTMLDivElement, FileNS.Props>(
  ({ size: providedSize, className, containerProps }, reference) => {
    const { createClassName } = useZoomComponent('file')
    const size = useComponentSize(providedSize)

    const classes = createClassName(className, '', {
      [size]: true,
    })

    return <div {...containerProps} className={classes} ref={reference}></div>
  },
)
