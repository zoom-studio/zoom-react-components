import React, { FC, HTMLAttributes } from 'react'

import { usezoomlangComponent } from '../../hooks/use-molang-component'

export namespace SelectGroupNS {
  export interface Props extends HTMLAttributes<HTMLSpanElement> {}
}

export const SelectGroup: FC<SelectGroupNS.Props> = ({
  children,
  className,
  ...rest
}) => {
  const { createClassName } = usezoomlangComponent('select-group')

  const classes = createClassName(className)

  return (
    <div {...rest} className={classes}>
      {children}
    </div>
  )
}
