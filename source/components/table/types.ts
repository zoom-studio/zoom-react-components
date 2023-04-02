import { FC, RefObject } from 'react'

import { BaseComponent } from '../../types'

import { CellNS, ColumnNS, FooterCellNS, HeaderCellNS } from './table-components'

export namespace TableNS {
  export type CellDataType = string | number | boolean

  export interface ChildrenCallbackParams<Dataset extends unknown[]> {
    HeaderCell: FC<HeaderCellNS.Props>
    Cell: FC<CellNS.Props<Dataset>>
    FooterCell: FC<FooterCellNS.Props>
    Column: FC<ColumnNS.Props<Dataset>>
  }

  export interface Props<Dataset extends unknown[] = unknown[]>
    extends Omit<BaseComponent, 'children'> {
    dataset: Dataset
    reference?: RefObject<HTMLDivElement>
    children: (params: ChildrenCallbackParams<Dataset>) => JSX.Element
  }
}
