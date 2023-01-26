import React, { FC } from 'react'

import { ComponentMeta } from '@storybook/react'

import { Spin, VirtualizedScrollView } from '../components'
import { color } from '../utils'
import { CommonStory } from './components'

export default {
  title: 'Layout/Virtualized Scroll view',
  component: VirtualizedScrollView.FixedList,
  args: {},
} as ComponentMeta<typeof VirtualizedScrollView.FixedList>

const listChild = ({ index }: VirtualizedScrollView.FixedListNS.Child) => (
  <div
    style={{
      color: color({ source: 'text' }),
      background: index % 2 === 0 ? 'transparent' : color({ source: 'layer', tone: 3 }),
      textAlign: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      direction: 'ltr',
    }}
  >
    {index}
  </div>
)

const gridChild = ({ colIndex, rowIndex }: VirtualizedScrollView.FixedGridNS.Child) => (
  <div
    style={{
      color: color({ source: 'text' }),
      textAlign: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background:
        colIndex % 2
          ? rowIndex % 2 === 0
            ? color({ source: 'layer', tone: 3 })
            : 'transparent'
          : rowIndex % 2
          ? color({ source: 'layer', tone: 3 })
          : 'transparent',
    }}
  >
    r{rowIndex} c{colIndex}
  </div>
)

export const FixedList: FC = () => {
  return (
    <CommonStory
      component={VirtualizedScrollView.FixedList}
      stories={[
        {
          group: [
            {
              name: '1,000,000 records',
              props: {
                height: 500,
                width: '100%',
                itemCount: 1000000,
                itemSize: 30,
                children: listChild,
              },
            },
            {
              name: 'With custom ScrollView props',
              props: {
                height: 500,
                width: '100%',
                itemCount: 500,
                itemSize: 30,
                children: listChild,
                scrollViewProps: { autoHide: true, className: 'my-custom-scroll-view-component' },
              },
            },
            {
              name: 'Lazy mount',
              props: {
                height: 500,
                width: '100%',
                itemCount: 500,
                itemSize: 30,
                useIsScrolling: true,
                children: ({ isScrolling, index }) => (
                  <div
                    style={{
                      color: 'white',
                      background: index % 2 === 0 ? 'transparent' : '#80808017',
                      textAlign: 'center',
                    }}
                  >
                    {isScrolling ? <Spin size="small" /> : index}
                  </div>
                ),
              },
            },
            {
              name: 'Horizontal',
              props: {
                height: 100,
                width: 500,
                itemCount: 1000,
                itemSize: 50,
                useIsScrolling: true,
                layout: 'horizontal',
                children: listChild,
              },
            },
          ],
        },
      ]}
    />
  )
}

export const VariableList: FC = () => {
  return (
    <CommonStory
      component={VirtualizedScrollView.VariableList}
      stories={[
        {
          group: [
            {
              name: '1,000,000 records',
              props: {
                height: 500,
                width: '100%',
                itemCount: 1000000,
                itemSize: index => (index % 2 ? 60 : 30),
                children: listChild,
                estimatedItemSize: 45,
              },
            },
            {
              name: 'With custom ScrollView props',
              props: {
                height: 500,
                width: '100%',
                itemCount: 500,
                itemSize: index => (index % 2 ? 60 : 30),
                children: listChild,
                scrollViewProps: { autoHide: true, className: 'my-custom-scroll-view-component' },
                estimatedItemSize: 45,
              },
            },
            {
              name: 'Lazy mount',
              props: {
                height: 500,
                width: '100%',
                itemCount: 500,
                itemSize: index => (index % 2 ? 60 : 30),
                useIsScrolling: true,
                estimatedItemSize: 45,
                children: ({ isScrolling, index }) => (
                  <div
                    style={{
                      color: 'white',
                      background: index % 2 === 0 ? 'transparent' : '#80808017',
                      textAlign: 'center',
                    }}
                  >
                    {isScrolling ? <Spin size="small" /> : index}
                  </div>
                ),
              },
            },
            {
              name: 'Horizontal',
              props: {
                height: 100,
                width: 500,
                itemCount: 1000,
                itemSize: index => (index % 2 ? 60 : 30),
                estimatedItemSize: 45,
                layout: 'horizontal',
                children: listChild,
              },
            },
          ],
        },
      ]}
    />
  )
}

export const FixedGrid: FC = () => {
  return (
    <CommonStory
      component={VirtualizedScrollView.FixedGrid}
      stories={[
        {
          group: [
            {
              name: '1,000 * 1,000 records',
              props: {
                children: gridChild,
                columnCount: 1000,
                rowCount: 1000,
                columnWidth: 100,
                rowHeight: 100,
                height: 500,
                width: 500,
              },
            },
            {
              name: 'With custom ScrollView props',
              props: {
                children: gridChild,
                columnCount: 100,
                rowCount: 100,
                columnWidth: 100,
                rowHeight: 100,
                height: 500,
                width: 500,
                scrollViewProps: { autoHide: true, className: 'my-custom-scroll-view-component' },
              },
            },
            {
              name: 'Lazy mount',
              props: {
                columnCount: 100,
                rowCount: 100,
                columnWidth: 100,
                rowHeight: 100,
                height: 500,
                width: 500,
                useIsScrolling: true,
                children: ({ isScrolling, colIndex, rowIndex }) => (
                  <div
                    style={{
                      color: color({ source: 'text' }),
                      textAlign: 'center',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background:
                        colIndex % 2
                          ? rowIndex % 2 === 0
                            ? color({ source: 'layer', tone: 3 })
                            : 'transparent'
                          : rowIndex % 2
                          ? color({ source: 'layer', tone: 3 })
                          : 'transparent',
                    }}
                  >
                    {isScrolling ? <Spin size="small" /> : `r${rowIndex} c${colIndex}`}
                  </div>
                ),
              },
            },
          ],
        },
      ]}
    />
  )
}

export const VariableGrid: FC = () => {
  return (
    <CommonStory
      component={VirtualizedScrollView.VariableGrid}
      stories={[
        {
          group: [
            {
              name: '1,000 * 1,000 records',
              props: {
                children: gridChild,
                columnCount: 1000,
                rowCount: 1000,
                columnWidth: index => (index % 2 === 0 ? 70 : 120),
                rowHeight: index => (index % 2 === 0 ? 70 : 120),
                estimatedColumnWidth: 95,
                estimatedRowHeight: 95,
                height: 500,
                width: 500,
              },
            },
            {
              name: 'With custom ScrollView props',
              props: {
                children: gridChild,
                columnCount: 1000,
                rowCount: 1000,
                columnWidth: index => (index % 2 === 0 ? 70 : 120),
                rowHeight: index => (index % 2 === 0 ? 70 : 120),
                estimatedColumnWidth: 95,
                estimatedRowHeight: 95,
                height: 500,
                width: 500,
                scrollViewProps: { autoHide: true, className: 'my-custom-scroll-view-component' },
              },
            },
            {
              name: 'Lazy mount',
              props: {
                columnCount: 1000,
                rowCount: 1000,
                columnWidth: index => (index % 2 === 0 ? 70 : 120),
                rowHeight: index => (index % 2 === 0 ? 70 : 120),
                estimatedColumnWidth: 95,
                estimatedRowHeight: 95,
                useIsScrolling: true,
                height: 500,
                width: 500,
                children: ({ isScrolling, colIndex, rowIndex }) => (
                  <div
                    style={{
                      color: color({ source: 'text' }),
                      textAlign: 'center',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background:
                        colIndex % 2
                          ? rowIndex % 2 === 0
                            ? color({ source: 'layer', tone: 3 })
                            : 'transparent'
                          : rowIndex % 2
                          ? color({ source: 'layer', tone: 3 })
                          : 'transparent',
                    }}
                  >
                    {isScrolling ? <Spin size="small" /> : `r${rowIndex} c${colIndex}`}
                  </div>
                ),
              },
            },
          ],
        },
      ]}
    />
  )
}

export const AutoFixedList: FC = () => {
  return (
    <CommonStory
      component={VirtualizedScrollView.AutoFixedList}
      stories={[
        {
          group: [
            {
              name: '1,000,000 records',
              containerProps: { style: { height: '100vh' } },
              props: {
                itemCount: 1000000,
                itemSize: 30,
                children: listChild,
              },
            },
          ],
        },
      ]}
    />
  )
}
