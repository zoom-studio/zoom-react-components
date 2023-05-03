import React, { FC } from 'react'

import { MaybeArray } from '@zoom-studio/zoom-js-ts-utils'

export namespace ColumnGroupNS {
  export interface Props {
    width?: string | number
    children: MaybeArray<JSX.Element>
  }
}

export const ColumnGroup: FC<ColumnGroupNS.Props> = ({ width }) => {
  return <></>
}
