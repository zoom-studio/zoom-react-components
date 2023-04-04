import { Fragment, useMemo } from 'react'

import { ColumnDef, createColumnHelper } from '@tanstack/react-table'

import { MaybeArray } from '../../../types'
import { ArrayUtils } from '../../../utils'

import { Cell, Column, ColumnGroup, FooterCell, HeaderCell } from '../table-components'
import { TableNS } from '../types'
import { createColumn } from './create-column'

const columnHelper = createColumnHelper<object>()

export const useGenerateColumns = <Dataset extends unknown[]>({
  children,
}: Pick<TableNS.Props<Dataset>, 'children'>): ColumnDef<unknown, any>[] => {
  const columns = useMemo<ColumnDef<unknown, any>[]>(() => {
    const result: ColumnDef<unknown, any>[] = []

    const childNode = children({ Cell, Column, FooterCell, HeaderCell, ColumnGroup })
    if (childNode.type !== Fragment) {
      throw Error('Child node of Table component should be a React.Fragment element')
    }

    let columnNodes = childNode?.props?.children as MaybeArray<JSX.Element> | null
    if (!columnNodes) {
      throw Error('Provide some Column or ColumnGroup elements')
    }

    columnNodes = ArrayUtils.toArray(columnNodes)

    for (const columnNode of columnNodes) {
      createColumn({ columnHelper, columnNode, result })
    }

    return result
  }, [children])

  return columns
}
