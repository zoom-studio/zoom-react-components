import { RenderElementProps } from 'slate-react'

export namespace TableElementNS {
  export type VerticalSide = 'top' | 'bottom'
  export type HorizontalSide = 'right' | 'left'

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
