import React, { FC } from 'react'

import { useZoomComponent } from '../../hooks'
import { BaseComponent } from '../../types'

export namespace ExplorerNS {
  export interface Props extends Omit<BaseComponent, 'children'> {}
}

export const Explorer: FC<ExplorerNS.Props> = ({ className, containerProps, reference }) => {
  const { createClassName } = useZoomComponent('explorer')

  const classes = createClassName(className)

  return <div className={classes} {...containerProps} ref={reference}></div>
}
