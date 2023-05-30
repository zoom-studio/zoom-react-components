import React, { type FC } from 'react'

import { type Meta } from '@storybook/react'

import { Skeleton } from '../components'
import { CommonStory } from './components'

export default {
  title: 'Loaders/Skeleton',
  component: Skeleton.Avatar,
} as Meta<typeof Skeleton.Avatar>

export const Avatar: FC = () => {
  return (
    <CommonStory
      component={Skeleton.Avatar}
      stories={[
        {
          title: 'Types',
          group: [
            { name: 'Single', props: { type: 'single' } },
            { name: 'Group', props: { type: 'group' } },
          ],
        },
        {
          title: 'Sizes (Single)',
          group: [
            { name: 'Small', props: { type: 'single', size: 'small' } },
            { name: 'Normal', props: { type: 'single', size: 'normal' } },
            { name: 'Large', props: { type: 'single', size: 'large' } },
          ],
        },
        {
          title: 'Sizes (Group)',
          group: [
            { name: 'Small', props: { type: 'group', size: 'small' } },
            { name: 'Normal', props: { type: 'group', size: 'normal' } },
            { name: 'Large', props: { type: 'group', size: 'large' } },
          ],
        },
        {
          title: 'Custom size (150px)',
          group: [
            { name: 'Single', props: { type: 'single', customSize: 150 } },
            { name: 'Group', props: { type: 'group', customSize: 150 } },
          ],
        },
        {
          title: 'Not animated',
          group: [
            { name: 'Single', props: { type: 'single', animated: false } },
            { name: 'Group', props: { type: 'group', animated: false } },
          ],
        },
        {
          title: 'Custom items count in grouped type',
          group: [
            { name: 'Three items (Default)', props: { type: 'group', groupLength: 3 } },
            { name: 'Five items (Custom)', props: { type: 'group', groupLength: 5 } },
          ],
        },
      ]}
    />
  )
}

export const Form: FC = () => {
  return (
    <CommonStory
      component={Skeleton.Form}
      stories={[
        {
          title: 'Sizes',
          group: [
            { name: 'Small', props: { size: 'small' } },
            { name: 'Normal', props: { size: 'normal' } },
            { name: 'Large', props: { size: 'large' } },
          ],
        },
        {
          title: 'Shapes',
          group: [
            { name: 'Default', props: { shape: 'default' } },
            { name: 'Circle', props: { shape: 'circle' } },
            { name: 'Sharp', props: { shape: 'sharp' } },
            { name: 'Square', props: { shape: 'square' } },
            { name: 'Sharp square', props: { shape: 'sharp-square' } },
            { name: 'Rounded', props: { shape: 'rounded' } },
          ],
        },
        {
          title: 'Custom size',
          group: [{ name: 'Small', props: { customSize: { width: '50%', height: '100px' } } }],
        },
        {
          title: 'Not animated',
          group: [{ props: { animated: false } }],
        },
      ]}
    />
  )
}

export const Image: FC = () => {
  return (
    <CommonStory
      component={Skeleton.Image}
      stories={[
        { group: [{ name: 'Default size (100% with 1:1 ratio)', props: {} }] },
        { group: [{ name: 'Custom size', props: { customSize: { width: 200, height: 400 } } }] },
        { group: [{ name: 'Not animated', props: { animated: false } }] },
        {
          group: [
            {
              name: 'Custom icon',
              props: {
                icon: 'broken_image',
                customSize: { width: 200, height: 200 },
                iconSize: '100px',
              },
            },
          ],
        },
      ]}
    />
  )
}

export const Paper: FC = () => {
  return (
    <CommonStory
      component={Skeleton.Paper}
      stories={[
        { group: [{ name: 'Size (Required)', props: { size: { width: 200, height: 200 } } }] },
        {
          group: [
            {
              name: 'with icon',
              props: { size: { width: '50%', height: 100 }, icon: 'search_off' },
            },
          ],
        },
        {
          group: [
            {
              name: 'Custom icon size',
              props: {
                size: { width: 50, height: 50 },
                icon: 'settings_ethernet',
                iconSize: '28px',
              },
            },
          ],
        },
        {
          group: [
            {
              name: 'Circular',
              props: { size: { width: 230, height: 230 }, icon: 'restaurant', circular: true },
            },
          ],
        },
        {
          group: [
            {
              name: 'Not animated',
              props: { size: { width: '100%', height: 300 }, animated: false },
            },
          ],
        },
      ]}
    />
  )
}

export const Paragraph: FC = () => {
  return (
    <CommonStory
      component={Skeleton.Paragraph}
      stories={[
        {
          title: 'Lines count',
          group: [
            { name: 'Four lines (Default)', props: {} },
            { name: 'Ten lines (Custom)', props: { lines: 10 } },
          ],
        },
        {
          title: 'Animation',
          group: [{ name: 'Not animated', props: { lines: 6, animated: false } }],
        },
      ]}
    />
  )
}

export const Title: FC = () => {
  return (
    <CommonStory
      component={Skeleton.Title}
      stories={[
        {
          title: 'Tag level',
          group: [
            { name: 'h1', props: { tagLevel: 1 } },
            { name: 'h2', props: { tagLevel: 2 } },
            { name: 'h3', props: { tagLevel: 3 } },
            { name: 'h4 (Default)', props: { tagLevel: 4 } },
            { name: 'h5', props: { tagLevel: 5 } },
            { name: 'h6', props: { tagLevel: 6 } },
          ],
        },
        {
          title: 'Width',
          group: [
            { name: '80% (Default)', props: {} },
            { name: '50px (Custom)', props: { width: 50 } },
            { name: '100% (Custom)', props: { width: '100%' } },
          ],
        },
        {
          title: 'Animation',
          group: [{ name: 'Not animated', props: { animated: false } }],
        },
      ]}
    />
  )
}
