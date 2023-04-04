import React, { CSSProperties, useState } from 'react'

import { getCoreRowModel, useReactTable } from '@tanstack/react-table'

import { ScrollView } from '..'
import { useZoomComponent } from '../../hooks'

import { TableBody } from './table-body'
import { TableFooter } from './table-footer'
import { TableHeader } from './table-header'
import { TableNS } from './types'
import { useGenerateColumns } from './use-generate-columns'

export const Table = <Dataset extends unknown[]>({
  resizeColumnOnReleaseMouseButton: resizeOnEnd,
  maxHeight = '700px',
  stickyHeader = true,
  stickyFooter = true,
  resizableColumns = true,
  renderFooter,
  selectable,
  className,
  containerProps,
  reference,
  dataset,
  children,
  maxWidth,
  minHeight,
  minWidth,
  id,
}: TableNS.Props<Dataset>) => {
  const [{ isScrolled, isScrollAtBottom }, setScrollInfo] = useState<TableNS.ScrollInfo>({
    isScrolled: false,
    isScrollAtBottom: false,
  })

  const { createClassName } = useZoomComponent('table')
  const columns = useGenerateColumns({ children })
  const table = useReactTable({
    columns,
    data: dataset,
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode: resizeOnEnd ? 'onEnd' : 'onChange',
  })

  const classes = createClassName(className, '', {
    [createClassName('', 'sticky-header')]: stickyHeader,
    [createClassName('', 'sticky-footer')]: stickyFooter,
    [createClassName('', 'scrolled')]: isScrolled,
    [createClassName('', 'scrolled-to-bottom')]: isScrollAtBottom,
  })

  const tableStyles: CSSProperties = {
    width: table.getCenterTotalSize(),
  }

  const handleOnScrollTable = (evt: Event) => {
    const { scrollTop, scrollHeight, clientHeight } = evt.currentTarget as HTMLDivElement
    setScrollInfo({
      isScrolled: scrollTop > 0,
      isScrollAtBottom: Math.abs(scrollHeight - scrollTop - clientHeight) < 1,
    })
  }

  return (
    <div {...containerProps} ref={reference} id={id} className={classes}>
      <ScrollView
        className="table-scroll-view"
        maxHeight={maxHeight}
        maxWidth={maxWidth}
        minHeight={minHeight}
        minWidth={minWidth}
        onScroll={handleOnScrollTable}
      >
        <table cellSpacing={0} style={tableStyles}>
          <TableHeader
            table={table}
            resizableColumns={resizableColumns}
            resizeColumnOnReleaseMouseButton={!!resizeOnEnd}
          />
          <TableBody table={table} />
          {renderFooter && <TableFooter table={table} />}
        </table>
      </ScrollView>
    </div>
  )
}

export type { TableNS } from './types'
