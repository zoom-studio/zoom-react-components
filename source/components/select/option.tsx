import React, { FC, HTMLAttributes } from 'react'

import { useZoomComponent } from '../../hooks'

export namespace SelectOptionNS {
  export interface Props extends HTMLAttributes<HTMLSpanElement> {}
}

export const SelectOption: FC<SelectOptionNS.Props> = ({
  children,
  className,
  ...rest
}) => {
  const { createClassName } = useZoomComponent('select-option')

  const classes = createClassName(className)

  return (
    <div {...rest} className={classes}>
      {children}
    </div>
  )
}
