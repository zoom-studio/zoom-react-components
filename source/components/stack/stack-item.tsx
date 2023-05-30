import React, { forwardRef } from 'react'

import { useZoomComponent } from '../../hooks'
import { type BaseComponent } from '../../types'

import { type StackNS } from '.'

export namespace StackItemNS {
  export interface Props extends BaseComponent {
    align?: StackNS.Aligns
    justify?: StackNS.Justifies
    flex?: string | number
    grow?: string | number
    shrink?: number
    basis?: string
    inline?: boolean
  }
}

export const StackItem = forwardRef<HTMLDivElement, StackItemNS.Props>(
  (
    {
      align = 'initial',
      justify = 'initial',
      inline,
      basis,
      flex,
      grow,
      shrink,
      children,
      className,
      containerProps,
      style,
      ...rest
    },
    reference,
  ) => {
    const { createClassName } = useZoomComponent('stack-item')

    const classes = createClassName(className, '', {
      [createClassName('', `align-${align}`)]: true,
      [createClassName('', `justify-${justify}`)]: true,
    })

    return (
      <div
        {...rest}
        {...containerProps}
        ref={reference}
        className={classes}
        style={{
          ...style,
          display:
            flex || grow || shrink || basis || justify
              ? inline
                ? 'inline-flex'
                : 'flex'
              : style?.display,
          ...(flex ? { flex } : { flexGrow: grow, flexShrink: shrink, flexBasis: basis }),
        }}
      >
        {children}
      </div>
    )
  },
)
