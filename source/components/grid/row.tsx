import React, { forwardRef } from 'react'

import { useZoomComponent } from '../../hooks'
import { type BaseComponent } from '../../types'

export namespace RowNS {
  export interface Props extends BaseComponent {
    fixWidth?: boolean
  }
}

export const Row = forwardRef<HTMLDivElement, RowNS.Props>(
  ({ fixWidth = true, className, children, containerProps, ...rest }, reference) => {
    const { createClassName } = useZoomComponent('row')

    const classNames = createClassName(className, '', {
      'with-width-fixer': fixWidth,
    })

    return (
      <div {...rest} {...containerProps} ref={reference} className={classNames}>
        {children}
      </div>
    )
  },
)
