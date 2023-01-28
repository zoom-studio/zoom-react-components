import React, { FC } from 'react'

import { BaseComponent } from '../../types'
import { useZoomComponent } from '../../hooks'

export namespace ContainerNS {
  export interface Props extends BaseComponent {
    fluid?: boolean
  }
}

export const Container: FC<ContainerNS.Props> = ({
  fluid = true,
  reference,
  className,
  containerProps,
  ...rest
}) => {
  const { createClassName } = useZoomComponent('container')

  const classes = createClassName(className, '', {
    [createClassName('', 'fluid')]: !!fluid,
  })

  return <div {...containerProps} {...rest} ref={reference} className={classes} />
}
