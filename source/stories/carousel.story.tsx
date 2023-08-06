import React, { type FC } from 'react'

import { type Meta } from '@storybook/react'

import { Carousel, type CarouselNS } from '../components'
import { color } from '../utils'
import { CommonStory, StoryPlayground } from './components'

interface DataType {
  index: number
}

const generateData = (length = 10): DataType[] => {
  return Array.from(Array(length)).map((_, index) => ({ index }))
}

const Children: FC<DataType> = ({ index }) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: color({ source: 'text', tone: 3 }),
        background: color({ source: 'layer', tone: 2 }),
        border: `1px solid ${color({ source: 'border', tone: 2 })}`,
        borderRadius: 4,
        fontSize: '100px',
        width: '100%',
        height: 200,
      }}
    >
      {JSON.stringify(index + 1)}
    </div>
  )
}

export default {
  title: 'Data display/Carousel',
  component: Carousel,
  args: {
    itemsPerScroll: 1,
    orientation: 'vertical',
    maxHeight: 208,
    showNavigators: true,
    showIndicators: true,
    autoPlay: 5000,
    title: 'Some title goes here',
    dataset: generateData(),
    children: (data: DataType) => <Children {...data} />,
    className: 'my-carousel',
    id: 'my-carousel',
    containerProps: {},
    style: {},
    containerRef: undefined,
    onClick: undefined,
  },
} as Meta<typeof Carousel>

export const Orientation: FC = () => {
  return (
    <CommonStory
      component={Carousel<DataType>}
      stories={[
        {
          group: [
            {
              name: 'Horizontal (Default)',
              props: { children: Children, dataset: generateData() },
            },
            {
              name: 'Vertical',
              props: {
                children: Children,
                dataset: generateData(),
                maxHeight: 200,
                orientation: 'vertical',
              },
            },
          ],
        },
      ]}
    />
  )
}

export const ItemsPerScroll: FC = () => {
  return (
    <CommonStory
      component={Carousel<DataType>}
      stories={[
        {
          group: [
            {
              name: '1 (Default)',
              props: { children: Children, dataset: generateData(), itemsPerScroll: 1 },
            },
            {
              name: '2',
              props: { children: Children, dataset: generateData(), itemsPerScroll: 2 },
            },
            {
              name: '4',
              props: { children: Children, dataset: generateData(), itemsPerScroll: 4 },
            },
          ],
        },
      ]}
    />
  )
}

export const AutoPlay: FC = () => {
  return (
    <CommonStory
      component={Carousel<DataType>}
      stories={[
        {
          group: [
            {
              name: 'No auto play (Default)',
              props: { children: Children, dataset: generateData() },
            },
            {
              name: '2000ms',
              props: { children: Children, dataset: generateData(), autoPlay: 2000 },
            },
          ],
        },
      ]}
    />
  )
}

export const Handlers: FC = () => {
  return (
    <CommonStory
      component={Carousel<DataType>}
      stories={[
        {
          group: [
            {
              name: 'Navigators/Indicators (Default)',
              props: { children: Children, dataset: generateData() },
            },
            {
              name: 'Indicators only',
              props: { children: Children, dataset: generateData(), showNavigators: false },
            },
            {
              name: 'Navigators only',
              props: { children: Children, dataset: generateData(), showIndicators: false },
            },
          ],
        },
      ]}
    />
  )
}

export const Title: FC = () => {
  return (
    <CommonStory
      component={Carousel<DataType>}
      stories={[
        {
          group: [
            {
              name: 'Without title (Default)',
              props: { children: Children, dataset: generateData() },
            },
            {
              name: 'With title',
              props: { children: Children, dataset: generateData(), title: 'Some title goes here' },
            },
          ],
        },
      ]}
    />
  )
}

export const Playground: FC<CarouselNS.Props> = props => {
  return <StoryPlayground component={Carousel} props={props} />
}
