import { FC, MouseEvent, RefObject } from 'react'

import { ButtonNS, ScrollViewNS } from '..'
import { BaseComponent } from '../../types'

import { CellNS, ColumnGroupNS, ColumnNS, FooterCellNS, HeaderCellNS } from './table-components'
import { UseTableI18nNS } from './use-i18n'

export namespace TableNS {
  export type CellDataType = string | number | boolean
  export type I18n = UseTableI18nNS.I18n

  export interface ChildrenCallbackParams<Dataset extends unknown[]> {
    HeaderCell: FC<HeaderCellNS.Props>
    Cell: FC<CellNS.Props<Dataset>>
    FooterCell: FC<FooterCellNS.Props>
    Column: FC<ColumnNS.Props<Dataset>>
    ColumnGroup: FC<ColumnGroupNS.Props>
  }

  export interface Action<Dataset extends unknown[]> extends Omit<ButtonNS.Props, 'onClick'> {
    onClick?: (data: Dataset[0], evt: MouseEvent<HTMLButtonElement>) => void
  }

  export interface VirtualizedSettings {
    estimateRowSize: (index: number) => number
  }

  export interface SortedColumnInfo {
    id: string
    desc: boolean
  }

  export interface Props<Dataset extends unknown[] = unknown[]>
    extends Omit<BaseComponent, 'children'>,
      Partial<Pick<ScrollViewNS.Props, 'maxHeight' | 'maxWidth' | 'minHeight' | 'minWidth'>> {
    dataset: Dataset
    reference?: RefObject<HTMLDivElement>
    children: (params: ChildrenCallbackParams<Dataset>) => JSX.Element
    stickyHeader?: boolean
    stickyFooter?: boolean
    stickyActions?: boolean
    selectable?: boolean | ((data: Dataset[0]) => boolean)
    renderFooter?: boolean
    resizeColumnOnReleaseMouseButton?: boolean
    id: string
    resizableColumns?: boolean
    hoverable?: boolean
    onSelectionChange?: (selectedRows: number[]) => void
    striped?: boolean
    enableSelectCheckboxOptions?: boolean
    expandableRows?: boolean
    actions?: Action<Dataset>[]
    actionsColumnWidth?: number
    renderRowExpanded?: (data: Dataset[0]) => JSX.Element
    isRowExpandable?: (data: Dataset[0]) => boolean
    virtualized?: VirtualizedSettings
    sortable?: boolean
    onSortChange?: (sortedColumn?: SortedColumnInfo) => void
    toggleSelectOnRowClick?: boolean
  }
}
