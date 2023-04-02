import React from 'react'

import { DeepKeys, MaybeArray } from '../../../types'

export namespace ColumnNS {
  export interface Props<Dataset extends unknown[]> {
    width?: string | number
    accessor: DeepKeys<Dataset[0]>
    children: MaybeArray<JSX.Element>
  }
}

export const Column = <Dataset extends unknown[]>({ width, accessor }: ColumnNS.Props<Dataset>) => {
  return <></>
}
