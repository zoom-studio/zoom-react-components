import React from 'react'

import { ColumnDef, ColumnHelper, GroupColumnDef, IdentifiedColumnDef } from '@tanstack/react-table'
import { get } from 'lodash'

import { ArrayUtils, StringUtils } from '../../../utils'

import {
  Cell,
  CellNS,
  Column,
  ColumnGroup,
  ColumnGroupNS,
  ColumnNS,
  FooterCell,
  FooterCellNS,
  HeaderCell,
  HeaderCellNS,
} from '../table-components'

export namespace CreateColumnNS {
  export interface Params {
    columnHelper: ColumnHelper<object>
    result: ColumnDef<unknown, any>[]
    columnNode: JSX.Element
  }
}

export const createColumn = <Dataset extends unknown[]>({
  columnHelper,
  result,
  columnNode,
}: CreateColumnNS.Params) => {
  if (columnNode?.type === ColumnGroup) {
    const columnGroupProps = columnNode?.props as ColumnGroupNS.Props | null

    if (columnGroupProps) {
      const { children } = columnGroupProps
      let columnGroupChildren = children

      if (columnGroupChildren) {
        columnGroupChildren = ArrayUtils.toArray(columnGroupChildren)
        const columnGroupOptions: GroupColumnDef<object> = {
          id: StringUtils.random(20),
          columns: [],
        }

        for (const columnGroupChild of columnGroupChildren) {
          switch (columnGroupChild.type) {
            case Column:
            case ColumnGroup: {
              createColumn({
                columnNode: columnGroupChild,
                result: columnGroupOptions.columns as ColumnDef<unknown, any>[],
                columnHelper,
              })
              break
            }

            case HeaderCell: {
              const { children } = columnGroupChild.props as HeaderCellNS.Props
              columnGroupOptions.header = data => {
                return children
              }
              break
            }

            case FooterCell: {
              const { children } = columnGroupChild.props as FooterCellNS.Props
              columnGroupOptions.footer = data => {
                return children
              }
              break
            }
          }
        }

        result.push(columnHelper.group(columnGroupOptions) as ColumnDef<unknown, any>)
      }
    }
  }

  if (columnNode?.type === Column) {
    const columnProps = columnNode.props as ColumnNS.Props<Dataset>
    const columnChildren = columnProps?.children ? ArrayUtils.toArray(columnProps.children) : []

    if (columnChildren) {
      const columnOptions: IdentifiedColumnDef<object, unknown> = {
        id: columnProps.id?.toString() ?? StringUtils.random(20),
      }

      for (const columnChild of columnChildren) {
        switch (columnChild.type) {
          case Cell: {
            const { children } = columnChild.props as CellNS.Props<Dataset>
            columnOptions.cell = context => {
              const { original: rowData, index } = context.row
              switch (typeof children) {
                case 'function': {
                  return children(rowData, index)
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
              return <>{children}</>
            }
            break
          }

          case HeaderCell: {
            const { children } = columnChild.props as HeaderCellNS.Props
            columnOptions.header = data => {
              return (
                <>
                  <div className="header-name">{children}</div>
                  {columnProps.summary && (
                    <div className="column-summary">{columnProps.summary}</div>
                  )}
                </>
              )
            }
            break
          }
        }
      }

      result.push(
        columnHelper.accessor(columnProps.accessor as string, {
          ...columnOptions,
          size: columnProps.width,
          enableSorting: columnProps.sortable ?? true,
          enableHiding: columnProps.hidable ?? true,
          enableResizing: columnProps.resizable ?? true,
          meta: {
            togglerLabel: columnProps.togglerLabel,
            hidden: columnProps.hidden,
          },
        }) as ColumnDef<unknown, any>,
      )
    }
  }
}
