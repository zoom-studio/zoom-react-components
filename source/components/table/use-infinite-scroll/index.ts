import { RefObject, useCallback, useEffect, useRef } from 'react'

import { ZoomLogProviderNS } from '../../zoom-log-provider'
import { TableNS } from '../types'

export namespace UseTableInfiniteScrollNS {
  export const DEFAULT_THRESHOLD = 5

  export interface Prams {
    infiniteScrollSettings: TableNS.InfiniteScrollSettings
    virtualizedSettings?: TableNS.VirtualizedSettings
    dataset: unknown[]
    isLoading: boolean
    sendLog: ZoomLogProviderNS.Log
    scrollableContainerRef: RefObject<HTMLDivElement>
  }
}

export const useTableInfiniteScroll = ({
  infiniteScrollSettings: {
    threshold = UseTableInfiniteScrollNS.DEFAULT_THRESHOLD,
    loadOnMount = true,
    handleOnLoadMore,
    maxDatasetLength,
  },
  dataset,
  isLoading,
  sendLog,
  virtualizedSettings,
  scrollableContainerRef,
}: UseTableInfiniteScrollNS.Prams) => {
  const observerRef = useRef<IntersectionObserver | null>(null)

  const isMoreDataRemaining = !maxDatasetLength || dataset.length < maxDatasetLength

  const handleLoadMoreData = () => {
    if (isMoreDataRemaining) {
      void handleOnLoadMore()
    }
  }

  const isIntersectingInVirtualizedTable = (): boolean => {
    if (!virtualizedSettings) {
      return true
    }

    const { current: scrollableContainer } = scrollableContainerRef
    if (!scrollableContainer) {
      return true
    }

    const { scrollHeight, scrollTop, clientHeight } = scrollableContainer
    const isScrollNearBottom =
      scrollHeight - scrollTop - clientHeight < threshold * 2 * virtualizedSettings.estimateRowSize

    return isScrollNearBottom
  }

  const lastRowRef = useCallback(
    (node: HTMLTableRowElement | null) => {
      if (isLoading) {
        return null
      }
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
      observerRef.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && isIntersectingInVirtualizedTable()) {
          handleLoadMoreData()
        }
      })
      if (node) {
        observerRef.current.observe(node)
      }
    },
    [isLoading],
  )

  useEffect(() => {
    if (loadOnMount) {
      handleLoadMoreData()
    }
  }, [])

  return { lastRowRef, isMoreDataRemaining }
}
