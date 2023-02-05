import React, { FC } from 'react'

import { ComponentMeta } from '@storybook/react'

import { ListView, ListViewNS, ReactionRate, Text, Title, useMessage } from '../components'
import { color } from '../utils'
import { CommonStory, StoryPlayground } from './components'
import { useFaker } from './hooks/use-faker'
import { useFetch } from './hooks/use-fetch'
import { useI18n } from './hooks/use-i18n'

export default {
  title: 'Data display/List view',
  component: ListView,
  args: {
    dataset: [{ content: 1 }],
    maxHeight: '60vh',
    hover: true,
    badgeHolderGutter: 36,
    badgeHolderGutterReversed: false,
    className: 'my-list-view',
    children: undefined,
    scrollViewProps: undefined,
    infiniteScroll: undefined,
    badgeProps: undefined,
    avatarProps: undefined,
    actionsProps: undefined,
    imageProps: undefined,
    containerProps: undefined,
    id: undefined,
    itemsContainerProps: undefined,
    itemsProps: undefined,
    linkComponent: undefined,
    onClick: undefined,
    reference: undefined,
    style: undefined,
  },
} as ComponentMeta<typeof ListView>

const useListViewStory = () => {
  const faker = useFaker()
  const { t } = useI18n('listView')
  const message = useMessage()
  const rateTitle = t('rate')
  const ageTitle = t('age')
  const action1 = t('action1')
  const action2 = t('action2')
  const action3 = t('action3')
  const checkbox = t('checkbox')
  const radio = t('radio')
  const switcher = t('switch')
  const title = t('title')
  const description = t('description')
  const ctx1 = t('ctx1')
  const ctx2 = t('ctx2')
  const ctx3 = t('ctx3')

  const renderContent = (firstName: string, lastName: string, age: string) => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        rowGap: 6,
        margin: '4px 0',
      }}
    >
      <Title h6 style={{ color: color({ source: 'text', tone: 2 }), margin: 0 }}>
        {firstName} {lastName} | {ageTitle}: {age}
      </Title>
      <Text style={{ color: color({ source: 'text', tone: 2 }), margin: 0 }}>{rateTitle}</Text>
      <ReactionRate />
    </div>
  )

  const generateUser = () => ({
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    age: faker.random.numeric(2),
  })

  type DatasetGeneratorOptions = {
    [key in keyof ListViewNS.ListData]: boolean
  }

  const generateData = (
    index: number,
    options?: DatasetGeneratorOptions,
  ): ListViewNS.Props<ReturnType<typeof generateUser>>['dataset'][0] => ({
    content: options?.content ? generateUser() : undefined,
    badge: options?.badge ? { count: 46 } : undefined,
    avatars: options?.avatars ? faker.image.avatar() : undefined,
    checkbox: options?.checkbox ? { label: checkbox } : undefined,
    switcher: options?.switcher ? { label: switcher } : undefined,
    description: options?.description ? description : undefined,
    title: options?.title ? title : undefined,
    emoji: options?.emoji ? 'ID button' : undefined,
    icon: options?.icon ? '2k_plus' : undefined,
    image: options?.image ? faker.image.cats() : undefined,
    link: options?.link ? window.location.href : undefined,
    onClick: options?.onClick
      ? () => message.toast.success('Clicked', { duration: 500 })
      : undefined,
    contextMenu: options?.contextMenu
      ? {
          items: [
            { title: ctx1, accelerator: { ctrlOrCmd: true, otherKeys: ['F'] } },
            { title: ctx2, accelerator: { ctrlOrCmd: true, otherKeys: ['D'] } },
            { title: ctx3, accelerator: { ctrlOrCmd: true, otherKeys: ['L'] } },
          ],
        }
      : undefined,
    actions: options?.actions
      ? [{ children: action1 }, { children: action2 }, { children: action3 }]
      : undefined,
    radioButton: options?.radioButton
      ? { label: radio, name: 'radio-name', value: `radio-${index + 1}` }
      : undefined,
  })

  const generateDataset = (
    options?: DatasetGeneratorOptions,
    length = 20,
  ): ListViewNS.Props<ReturnType<typeof generateUser>>['dataset'] => {
    return Array.from(Array(length)).map((_, index) => generateData(index, options))
  }

  return { renderContent, generateUser, generateDataset, title, generateData }
}

export const UsersList = () => {
  const { generateDataset } = useListViewStory()
  return (
    <CommonStory
      component={ListView}
      stories={[
        {
          custom: (
            <ListView
              dataset={generateDataset({ avatars: true, title: true, description: true })}
              maxHeight="60vh"
            />
          ),
        },
      ]}
    />
  )
}

export const WithoutHoverEffect = () => {
  const { generateDataset } = useListViewStory()
  return (
    <CommonStory
      component={ListView}
      stories={[
        {
          custom: (
            <ListView
              dataset={generateDataset({ avatars: true, title: true, description: true })}
              maxHeight="60vh"
              hover={false}
            />
          ),
        },
      ]}
    />
  )
}

export const WithBadge = () => {
  const { generateDataset } = useListViewStory()
  return (
    <CommonStory
      component={ListView}
      stories={[
        {
          custom: (
            <ListView
              dataset={generateDataset({
                avatars: true,
                title: true,
                description: true,
                badge: true,
              })}
              maxHeight="60vh"
            />
          ),
        },
      ]}
    />
  )
}

export const WithContextMenu = () => {
  const { generateDataset } = useListViewStory()
  return (
    <CommonStory
      component={ListView}
      stories={[
        {
          custom: (
            <ListView
              dataset={generateDataset({
                avatars: true,
                title: true,
                description: true,
                contextMenu: true,
              })}
              maxHeight="60vh"
            />
          ),
        },
      ]}
    />
  )
}

export const Linked = () => {
  const { generateDataset } = useListViewStory()
  return (
    <CommonStory
      component={ListView}
      stories={[
        {
          custom: (
            <ListView
              dataset={generateDataset({
                avatars: true,
                title: true,
                description: true,
                link: true,
              })}
              maxHeight="60vh"
            />
          ),
        },
      ]}
    />
  )
}

export const Clickable = () => {
  const { generateDataset } = useListViewStory()
  return (
    <CommonStory
      component={ListView}
      stories={[
        {
          custom: (
            <ListView
              dataset={generateDataset({
                avatars: true,
                title: true,
                description: true,
                onClick: true,
              })}
              maxHeight="60vh"
            />
          ),
        },
      ]}
    />
  )
}

export const WithSomeActions = () => {
  const { generateDataset } = useListViewStory()
  return (
    <CommonStory
      component={ListView}
      stories={[
        {
          custom: (
            <ListView
              dataset={generateDataset({
                avatars: true,
                title: true,
                description: true,
                actions: true,
              })}
              maxHeight="60vh"
            />
          ),
        },
      ]}
    />
  )
}

export const WithAnImage = () => {
  const { generateDataset } = useListViewStory()
  return (
    <CommonStory
      component={ListView}
      stories={[
        {
          custom: (
            <ListView
              imageProps={{ withImageViewer: true }}
              avatarProps={{ withImageViewer: true }}
              dataset={generateDataset({
                avatars: true,
                title: true,
                description: true,
                image: true,
              })}
              maxHeight="60vh"
            />
          ),
        },
      ]}
    />
  )
}

export const WithIcon = () => {
  const { generateDataset } = useListViewStory()
  return (
    <CommonStory
      component={ListView}
      stories={[
        {
          custom: (
            <ListView
              dataset={generateDataset({
                title: true,
                icon: true,
              })}
              maxHeight="60vh"
            />
          ),
        },
      ]}
    />
  )
}

export const WithEmoji = () => {
  const { generateDataset } = useListViewStory()
  return (
    <CommonStory
      component={ListView}
      stories={[
        {
          custom: (
            <ListView
              dataset={generateDataset({
                title: true,
                emoji: true,
              })}
              maxHeight="60vh"
            />
          ),
        },
      ]}
    />
  )
}

export const Checkboxes = () => {
  const { generateDataset } = useListViewStory()
  return (
    <CommonStory
      component={ListView}
      stories={[
        { custom: <ListView dataset={generateDataset({ checkbox: true }, 4)} maxHeight="60vh" /> },
      ]}
    />
  )
}

export const RadioButtons = () => {
  const { generateDataset } = useListViewStory()
  return (
    <CommonStory
      component={ListView}
      stories={[
        {
          custom: <ListView dataset={generateDataset({ radioButton: true }, 4)} maxHeight="60vh" />,
        },
      ]}
    />
  )
}

export const Switches = () => {
  const { generateDataset } = useListViewStory()
  return (
    <CommonStory
      component={ListView}
      stories={[
        { custom: <ListView dataset={generateDataset({ switcher: true }, 4)} maxHeight="60vh" /> },
      ]}
    />
  )
}

export const CustomContent = () => {
  const { generateDataset, renderContent } = useListViewStory()
  return (
    <CommonStory
      component={ListView}
      stories={[
        {
          custom: (
            <ListView dataset={generateDataset({ content: true })} maxHeight="60vh">
              {({ content }) => renderContent(content!.firstName, content!.lastName, content!.age)}
            </ListView>
          ),
        },
      ]}
    />
  )
}

export const InfiniteScroll = () => {
  const { generateData } = useListViewStory()
  const { data, isLoading, sendQuery } = useFetch()

  return (
    <CommonStory
      component={ListView}
      stories={[
        {
          custom: (
            <ListView
              dataset={data.map((d, index) => ({
                ...generateData(index, { avatars: true, description: true }),
                content: d,
              }))}
              maxHeight="60vh"
              infiniteScroll={{ handleOnLoadMore: sendQuery, isLoading, threshold: 3 }}
            >
              {({ content }) => (
                <Title h6 style={{ margin: 0, color: color({ source: 'text', tone: 3 }) }}>
                  {content}
                </Title>
              )}
            </ListView>
          ),
        },
      ]}
    />
  )
}

export const EverythingTogether = () => {
  const { generateDataset, renderContent } = useListViewStory()
  return (
    <CommonStory
      component={ListView}
      stories={[
        {
          custom: (
            <ListView
              dataset={generateDataset({
                avatars: true,
                title: true,
                description: true,
                actions: true,
                badge: true,
                checkbox: true,
                content: true,
                contextMenu: true,
                emoji: true,
                icon: true,
                image: true,
                link: true,
                onClick: true,
                radioButton: true,
                switcher: true,
              })}
              maxHeight="60vh"
            >
              {({ content }) => renderContent(content!.firstName, content!.lastName, content!.age)}
            </ListView>
          ),
        },
      ]}
    />
  )
}

export const InfiniteEverythingTogether = () => {
  const { generateData } = useListViewStory()
  const { data, isLoading, sendQuery } = useFetch()

  return (
    <CommonStory
      component={ListView}
      stories={[
        {
          custom: (
            <ListView
              maxHeight="60vh"
              infiniteScroll={{ isLoading, handleOnLoadMore: sendQuery }}
              dataset={data.map((d, index) => ({
                ...generateData(index, {
                  avatars: true,
                  title: true,
                  description: true,
                  actions: true,
                  badge: true,
                  checkbox: true,
                  content: true,
                  contextMenu: true,
                  emoji: true,
                  icon: true,
                  image: true,
                  link: true,
                  onClick: true,
                  radioButton: true,
                  switcher: true,
                }),
                content: d,
              }))}
            >
              {({ content }) => (
                <Title h6 style={{ margin: 0, color: color({ source: 'text', tone: 3 }) }}>
                  {content}
                </Title>
              )}
            </ListView>
          ),
        },
      ]}
    />
  )
}

export const CustomBadgeSettings = () => {
  const { generateData } = useListViewStory()
  return (
    <CommonStory
      component={ListView}
      stories={[
        {
          custom: (
            <ListView
              dataset={Array.from(Array(20)).map((_, index) => ({
                ...generateData(index, { avatars: true, description: true, title: true }),
                badge: {
                  background: color({ source: 'info' }),
                  count: index + 10,
                },
              }))}
              badgeProps={{ direction: 'row-reverse' }}
              badgeHolderGutter={60}
              badgeHolderGutterReversed
              maxHeight="60vh"
            />
          ),
        },
      ]}
    />
  )
}

export const CustomScrollbarSettings = () => {
  const { generateDataset } = useListViewStory()
  return (
    <CommonStory
      component={ListView}
      stories={[
        {
          custom: (
            <ListView
              dataset={generateDataset({ avatars: true, title: true, description: true })}
              maxHeight="60vh"
              scrollViewProps={{ autoHide: true }}
            />
          ),
        },
      ]}
    />
  )
}

export const CustomActionButtons = () => {
  const { generateDataset } = useListViewStory()
  return (
    <CommonStory
      component={ListView}
      stories={[
        {
          custom: (
            <ListView
              dataset={generateDataset({
                avatars: true,
                title: true,
                description: true,
                actions: true,
              })}
              maxHeight="60vh"
              actionsProps={{ buttonsProps: { variant: 'info' }, direction: 'column' }}
            />
          ),
        },
      ]}
    />
  )
}

export const Playground: FC<ListViewNS.Props> = props => {
  const { generateDataset, renderContent } = useListViewStory()

  return (
    <StoryPlayground
      component={ListView}
      props={{
        ...props,
        dataset: generateDataset({
          avatars: true,
          title: true,
          description: true,
          actions: true,
          badge: true,
          checkbox: true,
          content: true,
          contextMenu: true,
          emoji: true,
          icon: true,
          image: true,
          link: true,
          onClick: true,
          radioButton: true,
          switcher: true,
        }),
        children: ({ content }) =>
          renderContent(
            (content as any).firstName,
            (content as any).lastName,
            (content as any).age,
          ),
      }}
    />
  )
}
