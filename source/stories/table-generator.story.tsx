import React, { type FC } from 'react'

import { type Meta } from '@storybook/react'

import { TableGenerator, type TableGeneratorNS } from '../components'
import { CommonStory, StoryPlayground } from './components'

export default {
  title: 'Data entry/Table generator',
  component: TableGenerator,
  args: {
    cellsData: [
      ['a', 'b', 'c', 'd'],
      ['e', 'f', 'g', 'h'],
      ['i', 'j', 'k', 'l'],
      ['m', 'n', 'o', 'p'],
      ['q', 'r', 's', 't'],
      ['u', 'v', 'w', 'x'],
      ['y', 'z'],
    ],
    onWrite: undefined,
    maxHeight: '50vh',
    scrollViewProps: { autoHide: true },
    className: 'my-table-generator',
    id: 'my-table-generator',
    style: undefined,
    onClick: undefined,
    containerProps: undefined,
  },
} as Meta<typeof TableGenerator>

export const Basic: FC = () => {
  return (
    <CommonStory
      component={TableGenerator}
      stories={[
        {
          group: [
            { name: '3x6', props: { cellsData: { rows: 3, cols: 6 } } },
            { name: '10x10', props: { cellsData: { rows: 10, cols: 10 } } },
          ],
        },
      ]}
    />
  )
}

export const WithDefaultData: FC = () => {
  return (
    <CommonStory
      component={TableGenerator}
      stories={[
        {
          group: [
            {
              props: {
                cellsData: [
                  ['a', 'b', 'c', 'd'],
                  ['e', 'f', 'g', 'h'],
                  ['i', 'j', 'k', 'l'],
                  ['m', 'n', 'o', 'p'],
                  ['q', 'r', 's', 't'],
                  ['u', 'v', 'w', 'x'],
                  ['y', 'z'],
                ],
              },
            },
          ],
        },
      ]}
    />
  )
}

export const MaxHeight: FC = () => {
  return (
    <CommonStory
      component={TableGenerator}
      stories={[
        {
          group: [
            {
              name: '50vh (Default)',
              props: { cellsData: { rows: 20, cols: 30 } },
            },
            {
              name: 'unset (Custom)',
              props: { cellsData: { rows: 20, cols: 30 }, maxHeight: 'unset' },
            },
            {
              name: '100px (Custom)',
              props: { cellsData: { rows: 20, cols: 30 }, maxHeight: 100 },
            },
          ],
        },
      ]}
    />
  )
}

export const CustomScrollView: FC = () => {
  return (
    <CommonStory
      component={TableGenerator}
      stories={[
        {
          group: [
            {
              name: '20x30',
              props: { cellsData: { rows: 20, cols: 30 }, scrollViewProps: { autoHide: false } },
            },
          ],
        },
      ]}
    />
  )
}

export const Playground: FC<TableGeneratorNS.Props> = props => {
  return <StoryPlayground component={TableGenerator} props={props} />
}
