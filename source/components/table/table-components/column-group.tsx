import React, { type FC } from 'react'

import { type MaybeArray } from '@zoom-studio/js-ts-utils'

export namespace ColumnGroupNS {
  export interface Props {
    width?: string | number
    children: MaybeArray<JSX.Element>
  }
}

export const ColumnGroup: FC<ColumnGroupNS.Props> = ({ width }) => {
  return <></>
}
