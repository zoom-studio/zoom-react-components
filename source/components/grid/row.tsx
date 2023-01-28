import React, { FC } from 'react'

import { useZoomComponent } from '../../hooks'
import { BaseComponent } from '../../types'

export namespace RowNS {
  export interface Props extends BaseComponent {
    fixWidth?: boolean
  }
}

export const Row: FC<RowNS.Props> = ({
  fixWidth = true,
  className,
  children,
  containerProps,
  reference,
  ...rest
}) => {
  const { createClassName } = useZoomComponent('row')

  const classNames = createClassName(className, '', {
    'with-width-fixer': fixWidth,
  })

  return (
    <div {...rest} {...containerProps} ref={reference} className={classNames}>
      {children}
    </div>
  )
}
