import { Fragment, useMemo, useRef } from 'react'

import { type ColumnDef, createColumnHelper } from '@tanstack/react-table'
import { toArray, type MaybeArray } from '@zoom-studio/zoom-js-ts-utils'

import { Cell, Column, ColumnGroup, FooterCell, HeaderCell } from '../table-components'
import { type TableNS } from '../types'
import { addCheckBoxes } from './add-checkboxes'
import { addExpanders } from './add-expanders'
import { addActions } from './add-actions'
import { createColumn } from './create-column'
import { type UseTableI18nNS } from '../use-i18n'

export namespace UseGenerateColumnsNS {
  export interface Params<Dataset extends unknown[]>
    extends Pick<
      TableNS.Props<Dataset>,
      'children' | 'selectable' | 'renderRowExpanded' | 'actionsColumnWidth' | 'dragToSelect'
    > {
    i18n: Required<UseTableI18nNS.I18n>
    actions: TableNS.Action<Dataset>[]
    isLoading: boolean
  }
}

const columnHelper = createColumnHelper<object>()

export const useGenerateColumns = <Dataset extends unknown[]>({
  children,
  selectable,
  i18n,
  renderRowExpanded,
  actions,
  actionsColumnWidth,
  dragToSelect,
  isLoading,
}: UseGenerateColumnsNS.Params<Dataset>): ColumnDef<unknown, any>[] => {
  const isStartedToSelectViaDragRef = useRef(false)
  const isClickedCheckboxCheckedRef = useRef(false)

  const columns = useMemo<ColumnDef<unknown, any>[]>(() => {
    const result: ColumnDef<unknown, any>[] = []

    const childNode = children({
      Footer: FooterCell,
      Header: HeaderCell,
      Cell,
      Column,
      ColumnGroup,
    })
    if (childNode.type !== Fragment) {
      throw Error('Child node of Table component should be a React.Fragment element')
    }

    let columnNodes = childNode?.props?.children as MaybeArray<JSX.Element>
    if (!columnNodes) {
      throw Error('Provide some Column or ColumnGroup elements')
    }

    columnNodes = toArray(columnNodes)

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
        isStartedToSelectViaDragRef,
        isClickedCheckboxCheckedRef,
        dragToSelect,
        isLoading,
      })
    }

    if (renderRowExpanded) {
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
