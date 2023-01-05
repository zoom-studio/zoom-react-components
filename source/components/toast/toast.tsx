import React, { FC, HTMLAttributes, ReactNode } from 'react'

import { useZoomComponent } from '../../hooks'
import { CommonSize, CommonVariants } from '../../types'

export namespace ToastNS {
  export type Identifier = string | number
  export type ID = string | number
  export type Props = Toast

  export interface Toast {
    id: ID
    identifier: Identifier
    variant: CommonVariants
    duration: number
    size: CommonSize
    children: ReactNode | string
    containerProps?: HTMLAttributes<HTMLDivElement>
    loading?: boolean
    closable?: boolean
  }
}

export const Toast: FC<ToastNS.Props> = ({
  children,
  containerProps,
  id,
  loading,
  size,
  variant,
}) => {
  const { createClassName } = useZoomComponent('toast')
  const classes = createClassName(containerProps?.className)

  return <div className={classes}></div>
}
