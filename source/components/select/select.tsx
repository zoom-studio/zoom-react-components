import React, { FC, HTMLAttributes } from 'react'

import { usezoomlangComponent } from '../../hooks/use-molang-component'
import { SelectGroup, SelectOption } from '.'
import { strictRender } from '../../utils/strict-renders'

export namespace SelectNS {
  export interface Props extends HTMLAttributes<HTMLDivElement> {}
}

export const Select: FC<SelectNS.Props> = ({
  children,
  className,
  ...rest
}) => {
  const { createClassName } = usezoomlangComponent('select')

  const classes = createClassName(className)

  return (
    <div {...rest} className={classes}>
      {/* {Children.map(children, child => {
        if (isValidElement(child) && child.type === SelectOption) {
          return child
        }
      })} */}

      {strictRender(children, SelectOption, SelectGroup)}
    </div>
  )
}
