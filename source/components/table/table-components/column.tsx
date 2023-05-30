import React, { type ReactNode } from 'react'

import { type MaybeString, type DeepKeys, type MaybeArray } from '@zoom-studio/zoom-js-ts-utils'

import { type TableNS } from '../types'

export namespace ColumnNS {
  export interface Props<Dataset extends unknown[]> extends TableNS.ColumnMeta {
    width?: number
    sortable?: boolean
    hidable?: boolean
    resizable?: boolean
    id?: DeepKeys<Dataset[0]> | MaybeString
    accessor: DeepKeys<Dataset[0]>
    children?: MaybeArray<JSX.Element>
    summary?: ReactNode
  }
}

export const Column = <Dataset extends unknown[]>({ width, accessor }: ColumnNS.Props<Dataset>) => {
  return <></>
}
