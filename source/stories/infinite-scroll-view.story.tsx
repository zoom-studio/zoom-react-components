import React, { type FC } from 'react'

import { type Meta } from '@storybook/react'

import { Emoji, InfiniteScrollView, type InfiniteScrollViewNS } from '../components'
import { CommonStory, StoryPlayground, WithButtonsStory } from './components'
import { useFetch } from './hooks/use-fetch'
import { useI18n } from './hooks/use-i18n'

const renderData = (data: string | unknown): JSX.Element => {
  return <div className="infinite-scroll-data">{data as string}</div>
}

const useInfiniteScrollViewStory = () => {
  const { t } = useI18n('infiniteScrollView')

  const endMessage = t('endMessage')
  const loadingMessage = t('loadingMessage')

  return { endMessage, loadingMessage }
}

export default {
  title: 'Layout/Infinite scroll view',
  component: InfiniteScrollView,
  args: {
    maxWidth: '100%',
    maxHeight: 'calc(100vh - 100px)',
    children: renderData,
    reverseScroll: false,
    loadOnMount: true,
    threshold: 5,
    endMessage: 'End of list...',
    isLoading: false,
    spinProps: { tip: 'Loading more...' },
    autoHide: true,
    maxDatasetLength: Number.MAX_SAFE_INTEGER,
  },
} as Meta<typeof InfiniteScrollView>

export const Endless = () => {
  const { data, isLoading, sendQuery } = useFetch()
  const { endMessage } = useInfiniteScrollViewStory()
  return (
    <CommonStory
      component={InfiniteScrollView}
      stories={[
        {
          group: [
            {
              props: {
                isLoading,
                endMessage,
                dataset: data,
                handleOnLoadMore: sendQuery,
                maxHeight: 'calc(100vh - 100px)',
                children: renderData,
              },
            },
          ],
        },
      ]}
    />
  )
}

export const ReversedEndless = () => {
  const { data, isLoading, sendQuery } = useFetch()
  const { endMessage } = useInfiniteScrollViewStory()
  return (
    <CommonStory
      component={InfiniteScrollView}
      stories={[
        {
          group: [
            {
              props: {
                isLoading,
                endMessage,
                dataset: data,
                handleOnLoadMore: sendQuery,
                maxHeight: 'calc(100vh - 100px)',
                children: renderData,
                reverseScroll: true,
              },
            },
          ],
        },
      ]}
    />
  )
}

export const MaxDatasetLength = () => {
  const { data, isLoading, sendQuery } = useFetch({ maxItems: 201, itemsPerQuery: 50 })
  const { endMessage } = useInfiniteScrollViewStory()
  return (
    <CommonStory
      component={InfiniteScrollView}
      stories={[
        {
          group: [
            {
              props: {
                isLoading,
                endMessage,
                dataset: data,
                handleOnLoadMore: sendQuery,
                maxHeight: 'calc(100vh - 100px)',
                children: renderData,
                maxDatasetLength: 201,
              },
            },
          ],
        },
      ]}
    />
  )
}

export const EndMessage = () => {
  const { data, isLoading, sendQuery } = useFetch({ maxItems: 50 })
  const { endMessage } = useInfiniteScrollViewStory()
  return (
    <CommonStory
      component={InfiniteScrollView}
      stories={[
        {
          group: [
            {
              name: 'String message (Default)',
              props: {
                isLoading,
                endMessage,
                dataset: data,
                handleOnLoadMore: sendQuery,
                maxHeight: '36vh',
                children: renderData,
                maxDatasetLength: 50,
              },
            },
            {
              name: 'Custom node',
              props: {
                isLoading,
                endMessage: (
                  <div>
                    {endMessage} <Emoji name="person lifting weights" />
                  </div>
                ),
                dataset: data,
                handleOnLoadMore: sendQuery,
                maxHeight: '36vh',
                children: renderData,
                maxDatasetLength: 50,
              },
            },
          ],
        },
      ]}
    />
  )
}

export const LoadMessage = () => {
  const { data, isLoading, sendQuery } = useFetch({ sleepTime: 3000 })
  const { endMessage, loadingMessage } = useInfiniteScrollViewStory()
  return (
    <CommonStory
      component={InfiniteScrollView}
      stories={[
        {
          group: [
            {
              props: {
                isLoading,
                endMessage,
                dataset: data,
                handleOnLoadMore: sendQuery,
                maxHeight: 'calc(100vh - 100px)',
                children: renderData,
                spinProps: { tip: loadingMessage },
              },
            },
          ],
        },
      ]}
    />
  )
}

export const Threshold = () => {
  const { data, isLoading, sendQuery } = useFetch()
  const { endMessage } = useInfiniteScrollViewStory()

  return (
    <CommonStory
      component={InfiniteScrollView}
      stories={[
        {
          group: [
            {
              name: 'Threshold 5 (Default)',
              props: {
                isLoading,
                endMessage,
                dataset: data,
                handleOnLoadMore: sendQuery,
                maxHeight: '36vh',
                children: renderData,
              },
            },
            {
              name: 'Threshold 2',
              props: {
                isLoading,
                endMessage,
                dataset: data,
                handleOnLoadMore: sendQuery,
                maxHeight: '36vh',
                children: renderData,
                threshold: 2,
              },
            },
          ],
        },
      ]}
    />
  )
}

export const NoDataOnMount = () => {
  const { data, isLoading, sendQuery } = useFetch()
  const { endMessage } = useInfiniteScrollViewStory()
  return (
    <WithButtonsStory buttons={[{ children: 'Load data manually', onClick: sendQuery }]}>
      <InfiniteScrollView
        dataset={data}
        handleOnLoadMore={sendQuery}
        isLoading={isLoading}
        maxHeight="calc(100vh - 100px)"
        endMessage={endMessage}
        loadOnMount={false}
      >
        {renderData}
      </InfiniteScrollView>
    </WithButtonsStory>
  )
}

export const CustomizedScrollView = () => {
  const { data, isLoading, sendQuery } = useFetch()
  const { endMessage } = useInfiniteScrollViewStory()
  return (
    <CommonStory
      component={InfiniteScrollView}
      stories={[
        {
          group: [
            {
              props: {
                isLoading,
                endMessage,
                dataset: data,
                handleOnLoadMore: sendQuery,
                maxHeight: 'calc(100vh - 100px)',
                children: renderData,
                autoHide: true,
              },
            },
          ],
        },
      ]}
    />
  )
}

export const Playground: FC<InfiniteScrollViewNS.Props> = props => {
  const { data, isLoading, sendQuery } = useFetch({
    sleepTime: 200,
    maxItems: props.maxDatasetLength,
  })

  return (
    <StoryPlayground
      component={InfiniteScrollView}
      props={{ ...props, isLoading, dataset: data, handleOnLoadMore: sendQuery }}
    />
  )
}
