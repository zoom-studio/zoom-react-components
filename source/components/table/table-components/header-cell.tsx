import React, { type FC } from 'react'

import { type BaseComponent } from '../../../types'

export namespace HeaderCellNS {
  export interface Props extends BaseComponent<HTMLTableCellElement> {}
}

export const HeaderCell: FC<HeaderCellNS.Props> = ({ children, className, containerProps }) => {
  return <th></th>
}
