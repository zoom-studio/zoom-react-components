import React, { FC } from 'react'

import { useZoomComponent } from '../../hooks'
import { BaseComponent } from '../../types'

export namespace TableNS {
  export interface Props extends BaseComponent {}
}

export const Table: FC<TableNS.Props> = ({
  className,
  containerProps,
  children,
  // ...rest
}) => {
  const { createClassName } = useZoomComponent('table')

  const classes = createClassName(className)

  return <div {...containerProps} className={classes}></div>
}
