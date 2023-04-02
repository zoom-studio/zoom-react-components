import React, { ReactNode } from 'react'

import { BaseComponent } from '../../../types'

export namespace CellNS {
  export interface Props<Dataset extends unknown[]>
    extends Omit<BaseComponent<HTMLTableCellElement>, 'children'> {
    children?: ReactNode | ((data: Dataset[0]) => ReactNode)
  }
}

export const Cell = <Dataset extends unknown[]>({
  children,
  className,
  containerProps,
}: CellNS.Props<Dataset>) => {
  return <td></td>
}
