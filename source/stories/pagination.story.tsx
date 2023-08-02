import React, { type FC } from 'react'

import { type Meta } from '@storybook/react'

import { Pagination, type PaginationNS } from '../components'
import { CommonStory, StoryPlayground } from './components'

export default {
  title: 'Navigation/Pagination',
  component: Pagination,
  args: {
    totalPages: 30,
    defaultPage: 24,
    linkify: page => `https://example.com?page=${page}`,
    disabledPage: page => [10, 11, 12, 26, 28, 29].includes(page),
    disabled: false,
    showCustomPageInput: true,
    onWrite: undefined,
    className: 'my-pagination',
    id: 'my-pagination',
    containerProps: undefined,
    onClick: undefined,
    style: undefined,
  },
} as Meta<typeof Pagination>

export const TotalPages: FC = () => {
  return (
    <CommonStory
      component={Pagination}
      stories={[
        {
          group: [
            { name: '1', props: { totalPages: 1 } },
            { name: '2', props: { totalPages: 2 } },
            { name: '7', props: { totalPages: 7 } },
            { name: '50', props: { totalPages: 50 } },
            { name: '100', props: { totalPages: 100 } },
          ],
        },
      ]}
    />
  )
}

export const DefaultPage: FC = () => {
  return (
    <CommonStory
      component={Pagination}
      stories={[
        {
          group: [
            { name: 'defaultPage=1 (Default)', props: { totalPages: 100 } },
            { name: 'defaultPage=5', props: { totalPages: 100, defaultPage: 50 } },
          ],
        },
      ]}
    />
  )
}

export const EntirelyDisabled: FC = () => {
  return (
    <CommonStory
      component={Pagination}
      stories={[
        {
          group: [
            { name: 'Active (Default)', props: { totalPages: 100 } },
            { name: 'Disabled', props: { totalPages: 100, disabled: true } },
          ],
        },
      ]}
    />
  )
}

export const DisabledPages: FC = () => {
  return (
    <CommonStory
      component={Pagination}
      stories={[
        {
          group: [
            { name: 'Active (Default)', props: { totalPages: 30 } },
            {
              name: 'Disabled [3, 10, 11, 12, 26, 28, 29]',
              props: {
                totalPages: 30,
                disabledPage: page => [3, 10, 11, 12, 26, 28, 29].includes(page),
              },
            },
          ],
        },
      ]}
    />
  )
}

export const LinkedPages: FC = () => {
  return (
    <CommonStory
      component={Pagination}
      stories={[
        {
          group: [
            { name: 'None-liked (Default)', props: { totalPages: 100 } },
            {
              name: 'Linked',
              props: {
                totalPages: 100,
                linkify: page => `https://example.com?page=${page}`,
                disabledPage: page => page === 3,
              },
            },
          ],
        },
      ]}
    />
  )
}

export const CustomPageInput: FC = () => {
  return (
    <CommonStory
      component={Pagination}
      stories={[
        {
          group: [
            { name: 'With custom page input (Default)', props: { totalPages: 100 } },
            {
              name: 'Without custom page input',
              props: { totalPages: 100, showCustomPageInput: false },
            },
          ],
        },
      ]}
    />
  )
}

export const Playground: FC<PaginationNS.Props> = props => {
  return (
    <StoryPlayground
      component={Pagination}
      props={props}
      containerProps={{
        style: { height: '30vh', display: 'flex', alignItems: 'center', justifyContent: 'center' },
      }}
    />
  )
}
