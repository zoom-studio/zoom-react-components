import React, { FC } from 'react'
import { useZoomComponent } from '../../hooks'
import { BaseComponent } from '../../types'

export namespace TabNS {
  export interface Props extends Omit<BaseComponent, 'children'> {}
}

export const Tab: FC<TabNS.Props> = ({ className, containerProps, reference }) => {
  const { createClassName } = useZoomComponent('tab')

  const classes = createClassName(className)

  return <div {...containerProps} ref={reference} className={classes}></div>
}
