import { Fragment, useMemo } from 'react'

import { ColumnDef, createColumnHelper } from '@tanstack/react-table'

import { MaybeArray } from '../../../types'
import { ArrayUtils } from '../../../utils'

import { Cell, Column, ColumnGroup, FooterCell, HeaderCell } from '../table-components'
import { TableNS } from '../types'
import { addCheckBoxes } from './add-checkboxes'
import { addExpanders } from './add-expanders'
import { addActions } from './add-actions'
import { createColumn } from './create-column'
import { UseTableI18nNS } from '../use-i18n'

export namespace UseGenerateColumnsNS {
  export interface Params<Dataset extends unknown[]>
    extends Pick<
      TableNS.Props<Dataset>,
      | 'children'
      | 'selectable'
      | 'enableSelectCheckboxOptions'
      | 'expandableRows'
      | 'actionsColumnWidth'
    > {
    i18n: Required<UseTableI18nNS.I18n>
    actions: TableNS.Action<Dataset>[]
  }
}

const columnHelper = createColumnHelper<object>()

export const useGenerateColumns = <Dataset extends unknown[]>({
  children,
  selectable,
  i18n,
  enableSelectCheckboxOptions,
  expandableRows,
  actions,
  actionsColumnWidth,
}: UseGenerateColumnsNS.Params<Dataset>): ColumnDef<unknown, any>[] => {
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
      createColumn({
        columnHelper,
        columnNode,
        result,
      })
    }

    if (selectable) {
      addCheckBoxes({
        columnHelper,
        result,
        i18n,
        enableSelectCheckboxOptions,
      })
    }

    if (expandableRows) {
      addExpanders({
        columnHelper,
        result,
      })
    }

    if (actions.length > 0) {
      addActions({
        columnHelper,
        result,
        actionsColumnWidth,
        actions: actions as TableNS.Action<unknown[]>[],
      })
    }

    return result
  }, [children])

  return columns
}
