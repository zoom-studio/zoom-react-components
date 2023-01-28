import React, { FC } from 'react'

import { useZoomComponent } from '../../hooks'
import { BaseComponent } from '../../types'
import { ICON_NAMES } from './constants/icon-names'

export namespace IconNS {
  export type Names = typeof ICON_NAMES[number]

  export interface Props extends BaseComponent<HTMLSpanElement> {
    name: Names
    flipOn?: 'rtl' | 'ltr'
  }
}

export const Icon: FC<IconNS.Props> = ({
  name,
  className,
  flipOn,
  containerProps,
  reference,
  ...rest
}) => {
  const { createClassName } = useZoomComponent('icon')

  const classNames = createClassName(className, undefined, {
    'material-icons': true,
    'flip-on-ltr-layout': flipOn === 'ltr',
    'flip-on-rtl-layout': flipOn === 'rtl',
  })

  return (
    <span {...rest} {...containerProps} ref={reference} className={classNames}>
      {name}
    </span>
  )
}
