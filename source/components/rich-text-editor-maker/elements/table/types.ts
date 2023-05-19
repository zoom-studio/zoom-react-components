import { RenderElementProps } from 'slate-react'

export namespace TableElementNS {
  export type VerticalSide = 'top' | 'bottom'
  export type HorizontalSide = 'right' | 'left'

  export const TableStyles = [
    'normal',
    'with-header',
    'with-sidebar',
    'with-header-and-sidebar',
  ] as const
  export type TableStyles = typeof TableStyles[number]

  export interface CellInfo {
    rowIndex: number
    colIndex: number
  }

  export const CLASS_NAMES = {
    colActions: 'col-actions-container',
    rowActions: 'row-action-cell',
    inputCell: 'input-cell',
  }

  export interface Props extends RenderElementProps {}
}
