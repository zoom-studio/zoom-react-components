import React, { FC, HTMLAttributes } from 'react'

import { useZoomComponent } from '../../hooks'

export namespace RowNS {
  export interface Props extends HTMLAttributes<HTMLDivElement> {
    fixWidth?: boolean
  }
}

export const Row: FC<RowNS.Props> = ({ className, children, fixWidth = true, ...rest }) => {
  const { createClassName } = useZoomComponent('row')

  const classNames = createClassName(className, '', {
    'with-width-fixer': fixWidth,
  })

  return (
    <div {...rest} className={classNames}>
      {children}
    </div>
  )
}
