import React, { FC, HTMLAttributes } from 'react'

import { ICON_NAMES } from './constants/icon-names'
import { useZoomComponent } from '../../hooks/use-zoom-component'

export namespace IconNS {
  export type Names = typeof ICON_NAMES[number]
  export interface Props extends HTMLAttributes<HTMLSpanElement> {
    name: Names
  }
}

export const Icon: FC<IconNS.Props> = ({ name, className, ...rest }) => {
  const { createClassName } = useZoomComponent('icon')

  const classNames = createClassName(className, undefined, {
    'material-icons': true,
  })

  return (
    <span {...rest} className={classNames}>
      {name}
    </span>
  )
}
