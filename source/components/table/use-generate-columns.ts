import { Fragment, useMemo } from 'react'

import { ColumnDef, createColumnHelper, IdentifiedColumnDef } from '@tanstack/react-table'
import { get } from 'lodash'

import { MaybeArray } from '../../types'
import { ArrayUtils } from '../../utils'

import {
  Cell,
  CellNS,
  Column,
  ColumnNS,
  FooterCell,
  FooterCellNS,
  HeaderCell,
  HeaderCellNS,
} from './table-components'
import { TableNS } from './types'

const columnHelper = createColumnHelper<object>()

export const useGenerateColumns = <Dataset extends unknown[]>({
  children,
}: Pick<TableNS.Props<Dataset>, 'children'>): ColumnDef<unknown, any>[] => {
  const columns = useMemo<ColumnDef<unknown, any>[]>(() => {
    const result: ColumnDef<unknown, any>[] = []

    const childNode = children({ Cell, Column, FooterCell, HeaderCell })

    if (childNode.type !== Fragment) {
      throw Error('Child node of Table component should be a React.Fragment element')
    }

    let columnNodes = childNode?.props?.children as MaybeArray<JSX.Element> | null
    if (!columnNodes) {
      throw Error('Provide some Column elements')
    }

    columnNodes = ArrayUtils.toArray(columnNodes)

    for (const columnNode of columnNodes) {
      if (columnNode?.type === Column) {
        const columnProps = columnNode.props as ColumnNS.Props<Dataset>
        const columnChildren = ArrayUtils.toArray(columnProps.children)

        if (columnChildren) {
          const columnOptions: IdentifiedColumnDef<object, unknown> = {}

          for (const columnChild of columnChildren) {
            switch (columnChild.type) {
              case Cell: {
                const { children } = columnChild.props as CellNS.Props<Dataset>
                columnOptions.cell = context => {
                  const { original: rowData } = context.row
                  switch (typeof children) {
                    case 'function': {
                      return children(rowData)
                    }
                    case 'undefined': {
                      return get(rowData, columnProps.accessor)
                    }
                    default: {
                      return children
                    }
                  }
                }
                break
              }

              case FooterCell: {
                const { children } = columnChild.props as FooterCellNS.Props
                columnOptions.footer = data => {
                  return children
                }
                break
              }

              case HeaderCell: {
                const { children } = columnChild.props as HeaderCellNS.Props
                columnOptions.header = data => {
                  return children
                }
                break
              }
            }
          }

          result.push(
            <ColumnDef<unknown, any>>(
              columnHelper.accessor(<string>columnProps.accessor, columnOptions)
            ),
          )
        }
      }
    }

    return result
  }, [children])

  return columns
}
