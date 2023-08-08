import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type MutableRefObject,
  type ReactNode,
  type RefObject,
} from 'react'

import { type Nullish } from '@zoom-studio/js-ts-utils'
import { type Dictionary, isArray } from 'lodash'

import { ConditionalWrapper, ScrollView, Spin, Title, type ScrollViewNS, type SpinNS } from '..'
import { logs } from '../../constants'
import { useZoomComponent } from '../../hooks'
import { type BaseComponent } from '../../types'

export namespace InfiniteScrollViewNS {
  export const INDEX_IDENTIFIER = '__ZOOMRC_INFINITE_SCROLL_VIEW_MUTATED_DATASET_INDEX_IDENTIFIER__'

  export type PickedScrollViewProps = 'maxWidth' | 'maxHeight' | 'autoHide'

  export interface ChildrenCallbackParams {
    index: number
  }

  export interface BetwixtRenderParams<DataType extends unknown[] = unknown[]> {
    datasetKey: string
    datasetKeyIndex: number
    dataset: DataType
  }

  export interface Props<DataType extends unknown[] = unknown[]>
    extends Omit<BaseComponent, 'children'>,
      Pick<ScrollViewNS.Props, PickedScrollViewProps> {
    dataset: DataType
    groupBy?: keyof DataType[0]
    isLoading: boolean
    handleOnLoadMore: () => void | Promise<void>
    children: (data: DataType[0], params: ChildrenCallbackParams) => JSX.Element
    scrollViewProps?: Omit<ScrollViewNS.Props, PickedScrollViewProps>
    maxDatasetLength?: number
    reverseScroll?: boolean
    loadOnMount?: boolean
    threshold?: number
    reference?: RefObject<HTMLDivElement>
    spinProps?: SpinNS.Props
    endMessage?: string | ReactNode
    itemsContainerProps?: Omit<BaseComponent, 'children'>
    itemContainerProps?: Omit<BaseComponent, 'children'>
    itemsReferenceKey?: string
    handleSetProps?: (index: number, reference: null | undefined) => Record<string, any>
    useScrollViewComponent?: boolean
    renderBetwixtBeforeDataset?: (params: BetwixtRenderParams) => ReactNode
    renderBetwixtAfterDataset?: (params: BetwixtRenderParams) => ReactNode
  }
}

export const InfiniteScrollView = <DataType extends unknown[] = unknown[]>({
  useScrollViewComponent = true,
  itemsReferenceKey = 'ref',
  reverseScroll = false,
  loadOnMount = true,
  threshold = 5,
  endMessage,
  isLoading,
  className,
  children,
  spinProps,
  handleSetProps,
  containerProps,
  reference,
  dataset,
  scrollViewProps,
  maxHeight,
  maxWidth,
  handleOnLoadMore,
  maxDatasetLength,
  autoHide,
  itemsContainerProps,
  itemContainerProps,
  groupBy,
  renderBetwixtAfterDataset,
  renderBetwixtBeforeDataset,
  ...rest
}: InfiniteScrollViewNS.Props<DataType>): JSX.Element => {
  const nativeViewportRef = useRef<HTMLDivElement>(null)
  const scrollViewRef = useRef<ScrollViewNS.ContainerNode | HTMLDivElement | null>(null)
  const [isScrollAtBottom, setIsScrollAtBottom] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const { createClassName, sendLog } = useZoomComponent('infinite-scroll-view')

  const isMoreDataRemaining = !maxDatasetLength || dataset.length < maxDatasetLength

  const handleLoadMoreData = () => {
    if (isMoreDataRemaining) {
      void handleOnLoadMore()
    }
  }

  const lastDataRef = useCallback(
    (node: HTMLElement | null) => {
      if (isLoading || (reverseScroll && !isScrollAtBottom)) {
        return null
      }
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
      observerRef.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          handleLoadMoreData()
        }
      })
      if (node) {
        observerRef.current.observe(node)
      }
    },
    [isLoading, isScrollAtBottom],
  )

  const classes = createClassName(className, '', {
    reversed: !!reverseScroll,
  })

  const itemContainerClasses = createClassName(itemContainerProps?.className, 'item')

  const contentContainerClasses = createClassName(itemsContainerProps?.className, 'content')

  const handleOnScroll = (evt: Event) => {
    const scrollableTarget = evt.target as HTMLDivElement | null
    if (!scrollableTarget) {
      sendLog(logs.infiniteScrollViewScrollableTargetNotFound, 'handleOnScroll fn')
      return
    }

    if (scrollableTarget.scrollTop < 2) {
      scrollableTarget.scrollTop = 2
    }
  }

  const getViewport = (): Nullish<HTMLElement> => {
    if (useScrollViewComponent) {
      const { osInstance } = (scrollViewRef as MutableRefObject<ScrollViewNS.ContainerNode>).current
      const elements = osInstance()?.elements()
      return elements?.viewport
    }
    return nativeViewportRef.current
  }

  const mutatedDataset = useMemo(() => {
    if (groupBy) {
      const groups: Dictionary<any> = {}
      dataset.forEach((data: any, index) => {
        if (groups[data[groupBy]]) {
          groups[data[groupBy]].push({ ...data, [InfiniteScrollViewNS.INDEX_IDENTIFIER]: index })
        } else {
          groups[data[groupBy]] = [{ ...data, [InfiniteScrollViewNS.INDEX_IDENTIFIER]: index }]
        }
      })
      return groups
    }
    return dataset
  }, [dataset, groupBy])

  const renderData = useCallback(
    (data: DataType[0], index: number): JSX.Element => {
      return (
        <div
          {...itemContainerProps}
          key={index}
          data-is-observer={dataset.length === index + threshold ? 'true' : undefined}
          ref={node => (dataset.length === index + threshold ? lastDataRef(node) : undefined)}
          className={itemContainerClasses}
        >
          {children(data, { index })}
        </div>
      )
    },
    [lastDataRef],
  )

  useEffect(() => {
    if (loadOnMount) {
      handleLoadMoreData()
    }
  }, [])

  useEffect(() => {
    if (dataset.length > 0 && reverseScroll && scrollViewRef.current) {
      const viewport = getViewport()

      if (viewport) {
        const { clientHeight } = viewport
        viewport.scrollTo({ top: clientHeight })
        setIsScrollAtBottom(true)
      } else {
        sendLog(logs.infiniteScrollViewElementNotFound, 'useEffect with deps of dataset')
      }
    }
  }, [dataset])

  return (
    <div {...containerProps} {...rest} className={classes} ref={reference}>
      <ConditionalWrapper
        condition={useScrollViewComponent}
        falseWrapper={child => (
          <div
            ref={scrollViewRef as MutableRefObject<HTMLDivElement>}
            className="zoomrc-scroll-view"
          >
            <div
              className="os-viewport native-scrollbar"
              ref={nativeViewportRef}
              style={{ maxHeight, maxWidth }}
            >
              {child}
            </div>
          </div>
        )}
        trueWrapper={child => (
          <ScrollView
            {...scrollViewProps}
            autoHide={autoHide}
            ref={scrollViewRef as MutableRefObject<ScrollViewNS.ContainerNode>}
            maxHeight={maxHeight}
            maxWidth={maxWidth}
            onScroll={handleOnScroll}
          >
            {child}
          </ScrollView>
        )}
      >
        <div {...itemsContainerProps} className={contentContainerClasses}>
          {isArray(mutatedDataset)
            ? mutatedDataset.map(renderData)
            : Object.keys(mutatedDataset).map((datasetKey, datasetKeyIndex) => (
                <Fragment key={datasetKeyIndex}>
                  {renderBetwixtBeforeDataset?.({
                    dataset: mutatedDataset[datasetKey],
                    datasetKey,
                    datasetKeyIndex,
                  })}

                  {mutatedDataset[datasetKey].map((data: any) =>
                    renderData(data, data[InfiniteScrollViewNS.INDEX_IDENTIFIER]),
                  )}

                  {renderBetwixtAfterDataset?.({
                    dataset: mutatedDataset[datasetKey],
                    datasetKey,
                    datasetKeyIndex,
                  })}
                </Fragment>
              ))}

          {isMoreDataRemaining ? (
            <div className="loading-message">{isLoading && <Spin {...spinProps} />}</div>
          ) : (
            endMessage && (
              <div className="end-message">
                {typeof endMessage === 'string' ? (
                  <Title h5 className="end-message-title">
                    {endMessage}
                  </Title>
                ) : (
                  endMessage
                )}
              </div>
            )
          )}
        </div>
      </ConditionalWrapper>
    </div>
  )
}
