import { FC, RefObject } from 'react'

import { ScrollViewNS } from '..'
import { BaseComponent } from '../../types'

import { CellNS, ColumnGroupNS, ColumnNS, FooterCellNS, HeaderCellNS } from './table-components'

export namespace TableNS {
  export type CellDataType = string | number | boolean

  export interface ScrollInfo {
    isScrolled: boolean
    isScrollAtBottom: boolean
  }

  export interface ChildrenCallbackParams<Dataset extends unknown[]> {
    HeaderCell: FC<HeaderCellNS.Props>
    Cell: FC<CellNS.Props<Dataset>>
    FooterCell: FC<FooterCellNS.Props>
    Column: FC<ColumnNS.Props<Dataset>>
    ColumnGroup: FC<ColumnGroupNS.Props>
  }

  export interface Props<Dataset extends unknown[] = unknown[]>
    extends Omit<BaseComponent, 'children'>,
      Partial<Pick<ScrollViewNS.Props, 'maxHeight' | 'maxWidth' | 'minHeight' | 'minWidth'>> {
    dataset: Dataset
    reference?: RefObject<HTMLDivElement>
    children: (params: ChildrenCallbackParams<Dataset>) => JSX.Element
    stickyHeader?: boolean
    stickyFooter?: boolean
    selectable?: boolean
    renderFooter?: boolean
    resizeColumnOnReleaseMouseButton?: boolean
    id: string
    resizableColumns?: boolean
  }
}
