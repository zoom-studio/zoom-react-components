import React, { FC, HTMLAttributes } from 'react'

import { useZoomComponent } from '../../hooks'

export namespace SelectGroupNS {
  export interface Props extends HTMLAttributes<HTMLSpanElement> {}
}

export const SelectGroup: FC<SelectGroupNS.Props> = ({
  children,
  className,
  ...rest
}) => {
  const { createClassName } = useZoomComponent('select-group')

  const classes = createClassName(className)

  return (
    <div {...rest} className={classes}>
      {children}
    </div>
  )
}
