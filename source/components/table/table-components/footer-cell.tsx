import React, { type FC } from 'react'

import { type BaseComponent } from '../../../types'

export namespace FooterCellNS {
  export interface Props extends BaseComponent<HTMLTableCellElement> {}
}

export const FooterCell: FC<FooterCellNS.Props> = ({ children, className, containerProps }) => {
  return <td></td>
}
