import React, { forwardRef } from 'react'

import { useZoomComponent } from '../../hooks'
import { BaseComponent } from '../../types'

export namespace ContainerNS {
  export interface Props extends BaseComponent {
    fluid?: boolean
  }
}

export const Container = forwardRef<HTMLDivElement, ContainerNS.Props>(
  ({ fluid = true, className, containerProps, ...rest }, reference) => {
    const { createClassName } = useZoomComponent('container')

    const classes = createClassName(className, '', {
      [createClassName('', 'fluid')]: !!fluid,
    })

    return <div {...containerProps} {...rest} ref={reference} className={classes} />
  },
)
