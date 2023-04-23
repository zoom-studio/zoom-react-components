import React, { FC } from 'react'

import { MaybeArray } from '../../../types'

export namespace ColumnGroupNS {
  export interface Props {
    width?: string | number
    children: MaybeArray<JSX.Element>
  }
}

export const ColumnGroup: FC<ColumnGroupNS.Props> = ({ width }) => {
  return <></>
}
