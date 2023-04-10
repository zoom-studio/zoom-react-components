import React from 'react'

import { DeepKeys, MaybeArray } from '../../../types'

export namespace ColumnNS {
  export interface Props<Dataset extends unknown[]> {
    width?: number
    sortable?: boolean
    accessor: DeepKeys<Dataset[0]>
    children: MaybeArray<JSX.Element>
    id?: string
  }
}

export const Column = <Dataset extends unknown[]>({ width, accessor }: ColumnNS.Props<Dataset>) => {
  return <></>
}
