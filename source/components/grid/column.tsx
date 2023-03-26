import React, { forwardRef } from 'react'

import { useZoomComponent } from '../../hooks'
import { BaseComponent, Range } from '../../types'

export namespace ColNS {
  export type ColumnsRange = Range<1, 25>

  export interface Props extends BaseComponent {
    xs?: ColumnsRange
    sm?: ColumnsRange
    md?: ColumnsRange
    lg?: ColumnsRange
  }
}

export const Col = forwardRef<HTMLDivElement, ColNS.Props>(
  ({ xs, sm, md, lg, children, className, containerProps, ...rest }, reference) => {
    const { createClassName } = useZoomComponent('col')

    const classNames = createClassName(className, undefined, {
      [xs ? `zoomrc-col-xs-${xs}` : '']: true,
      [sm ? `zoomrc-col-sm-${sm}` : '']: true,
      [md ? `zoomrc-col-md-${md}` : '']: true,
      [lg ? `zoomrc-col-lg-${lg}` : '']: true,
    })

    return (
      <div {...rest} {...containerProps} ref={reference} className={classNames}>
        {children}
      </div>
    )
  },
)
