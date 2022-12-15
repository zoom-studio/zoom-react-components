import React, { FC, HTMLAttributes } from 'react'

import { useZoomComponent } from '../../hooks'
import { Range } from '../../types'

export namespace ColNS {
  export type ColumnsRange = Range<1, 25>

  export interface Props extends HTMLAttributes<HTMLDivElement> {
    xs?: ColumnsRange
    sm?: ColumnsRange
    md?: ColumnsRange
    lg?: ColumnsRange
  }
}

export const Col: FC<ColNS.Props> = ({
  xs,
  sm,
  md,
  lg,
  children,
  className,
  ...rest
}): JSX.Element => {
  const { createClassName } = useZoomComponent('col')

  const classNames = createClassName(className, undefined, {
    [xs ? `zoomrc-col-xs-${xs}` : '']: true,
    [sm ? `zoomrc-col-sm-${sm}` : '']: true,
    [md ? `zoomrc-col-md-${md}` : '']: true,
    [lg ? `zoomrc-col-lg-${lg}` : '']: true,
  })

  return (
    <div {...rest} className={classNames}>
      {children}
    </div>
  )
}
