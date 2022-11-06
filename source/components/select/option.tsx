import React, { FC, HTMLAttributes } from 'react'

import { usezoomlangComponent } from '../../hooks/use-molang-component'

export namespace SelectOptionNS {
  export interface Props extends HTMLAttributes<HTMLSpanElement> {}
}

export const SelectOption: FC<SelectOptionNS.Props> = ({
  children,
  className,
  ...rest
}) => {
  const { createClassName } = usezoomlangComponent('select-option')

  const classes = createClassName(className)

  return (
    <div {...rest} className={classes}>
      {children}
    </div>
  )
}
