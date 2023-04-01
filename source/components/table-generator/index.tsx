import React, { FC } from 'react'

import { useZoomComponent } from '../../hooks'
import { BaseComponent } from '../../types'

export namespace TableGeneratorNS {
  export interface Props extends Omit<BaseComponent, 'children'> {}
}

export const TableGenerator: FC<TableGeneratorNS.Props> = ({
  className,
  containerProps,
  // ...rest
}) => {
  const { createClassName } = useZoomComponent('table-generator')

  const classes = createClassName(className)

  return <div {...containerProps} className={classes}></div>
}
