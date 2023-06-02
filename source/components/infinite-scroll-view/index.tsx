import React, {
  type ReactNode,
  type RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
  type MutableRefObject,
} from 'react'

import { type Nullish } from '@zoom-studio/zoom-js-ts-utils'

import { ScrollView, type ScrollViewNS, Spin, type SpinNS, Title, ConditionalWrapper } from '..'
import { logs } from '../../constants'
import { useZoomComponent } from '../../hooks'
import { type BaseComponent } from '../../types'

export namespace InfiniteScrollViewNS {
  export type PickedScrollViewProps = 'maxWidth' | 'maxHeight' | 'autoHide'

  export interface ChildrenCallbackParams {
    index: number
  }

  export interface Props<DataType extends unknown[] = unknown[]>
    extends Omit<BaseComponent, 'children'>,
      Pick<ScrollViewNS.Props, PickedScrollViewProps> {
    dataset: DataType
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
          {dataset.map((data, index) => (
            <div
              {...itemContainerProps}
              key={index}
              ref={node => (dataset.length === index + threshold ? lastDataRef(node) : undefined)}
              className={itemContainerClasses}
            >
              {children(data, { index })}
            </div>
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
