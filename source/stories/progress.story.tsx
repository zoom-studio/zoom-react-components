import React, { type FC } from 'react'

import { type Meta } from '@storybook/react'

import { Progress, type ProgressNS } from '..'
import { color } from '../utils'
import { CommonStory, StoryPlayground, WithNumberStory } from './components'
import { useI18n } from './hooks/use-i18n'

export default {
  title: 'Data display/Progress',
  component: Progress,
  args: {
    steps: [
      {
        percentage: 25,
        title: 'Some title',
        color: [color => color({ source: 'accent' }), { 30: color => color({ source: 'error' }) }],
      },
      { percentage: 10, color: 'red' },
    ],
  },
} as Meta<typeof Progress>

export const Types: FC = () => {
  return (
    <WithNumberStory steps={10} defaultValue={70}>
      {percentage => (
        <CommonStory
          component={Progress}
          stories={[
            {
              group: [
                {
                  name: 'Horizontal (Default)',
                  props: { type: 'horizontal', steps: { percentage } },
                },
                {
                  name: 'Vertical',
                  props: { type: 'vertical', steps: { percentage } },
                },
                {
                  name: 'Circular',
                  props: { type: 'circular', steps: { percentage } },
                },
              ],
            },
          ]}
        />
      )}
    </WithNumberStory>
  )
}

export const MultiSteps: FC = () => {
  const steps: ProgressNS.Step[] = [
    { percentage: 25, color: '#FFB727' },
    { percentage: 25, color: '#47FF39' },
    { percentage: 25, color: '#9745e4' },
    { percentage: 25, color: '#209bcc' },
  ]

  return (
    <CommonStory
      component={Progress}
      stories={[
        {
          group: [
            {
              name: 'Horizontal',
              props: { type: 'horizontal', steps },
            },
            {
              name: 'Vertical',
              props: { type: 'vertical', steps },
            },
          ],
        },
      ]}
    />
  )
}

export const WaveAnimation: FC = () => {
  return (
    <WithNumberStory steps={10} defaultValue={70}>
      {percentage => (
        <CommonStory
          component={Progress}
          stories={[
            {
              group: [
                {
                  name: 'Horizontal',
                  props: { type: 'horizontal', steps: { percentage, withWave: true } },
                },
                {
                  name: 'Vertical',
                  props: { type: 'vertical', steps: { percentage, withWave: true } },
                },
              ],
            },
          ]}
        />
      )}
    </WithNumberStory>
  )
}

export const WithPopover: FC = () => {
  const { t } = useI18n('progress')

  const steps: ProgressNS.Step[] = [
    { percentage: 25, color: '#FFB727', title: t('title1'), withWave: true },
    { percentage: 25, color: '#47FF39', title: t('title2'), withWave: true },
    { percentage: 25, color: '#9745e4', title: t('title3'), withWave: true },
    { percentage: 25, color: '#209bcc', title: t('title4'), withWave: true },
  ]

  return (
    <CommonStory
      component={Progress}
      stories={[
        {
          group: [
            {
              name: 'Horizontal',
              props: { type: 'horizontal', steps },
            },
            {
              name: 'Vertical',
              props: { type: 'vertical', steps },
            },
          ],
        },
      ]}
    />
  )
}

export const WithCustomPopover: FC = () => {
  const { t } = useI18n('popover')

  const steps: ProgressNS.Step[] = [
    {
      percentage: 25,
      title: t('title1'),
      withWave: true,
      popoverProps: {
        description: t('description'),
        title: t('title'),
        placement: 'bottom',
        defaultIsOpen: true,
      },
    },
  ]

  return (
    <CommonStory
      component={Progress}
      stories={[
        {
          group: [
            {
              name: 'Horizontal',
              props: { type: 'horizontal', steps },
            },
            {
              name: 'Vertical',
              props: { type: 'vertical', steps },
            },
          ],
        },
      ]}
    />
  )
}

export const Info: FC = () => {
  return (
    <WithNumberStory steps={10} defaultValue={70}>
      {percentage => (
        <CommonStory
          component={Progress}
          stories={[
            {
              title: 'Horizontal',
              group: [
                {
                  name: 'Percentage',
                  props: { showInfo: true, steps: { percentage }, info: 'percentage' },
                },
                {
                  name: 'Status',
                  props: { showInfo: true, steps: { percentage }, info: 'status' },
                },
                {
                  name: 'Seconds left',
                  props: {
                    showInfo: true,
                    steps: { percentage },
                    info: { name: 'seconds-left', duration: 15000 },
                  },
                },
              ],
            },
            {
              title: 'Vertical',
              group: [
                {
                  name: 'Percentage',
                  props: {
                    showInfo: true,
                    steps: { percentage },
                    info: 'percentage',
                    type: 'vertical',
                    verticalHeight: 100,
                  },
                },
                {
                  name: 'Status',
                  props: {
                    showInfo: true,
                    steps: { percentage },
                    info: 'status',
                    type: 'vertical',
                    verticalHeight: 100,
                  },
                },
                {
                  name: 'Seconds left',
                  props: {
                    showInfo: true,
                    steps: { percentage },
                    info: { name: 'seconds-left', duration: 15000 },
                    type: 'vertical',
                    verticalHeight: 100,
                  },
                },
              ],
            },
            {
              title: 'Circular',
              group: [
                {
                  name: 'Percentage',
                  props: {
                    showInfo: true,
                    steps: { percentage },
                    info: 'percentage',
                    type: 'circular',
                  },
                },
                {
                  name: 'Status',
                  props: {
                    showInfo: true,
                    steps: { percentage },
                    info: 'status',
                    type: 'circular',
                  },
                },
                {
                  name: 'Seconds left',
                  props: {
                    showInfo: true,
                    steps: { percentage },
                    info: { name: 'seconds-left', duration: 15000 },
                    type: 'circular',
                  },
                },
              ],
            },
          ]}
        />
      )}
    </WithNumberStory>
  )
}

export const Failure: FC = () => {
  return (
    <WithNumberStory steps={10} defaultValue={70}>
      {percentage => (
        <CommonStory
          component={Progress}
          stories={[
            {
              group: [
                {
                  name: 'Horizontal',
                  props: {
                    type: 'horizontal',
                    steps: { percentage, color: color({ source: 'error' }) },
                    info: 'percentage',
                    showInfo: true,
                    failed: true,
                  },
                },
                {
                  name: 'Vertical',
                  props: {
                    type: 'vertical',
                    steps: { percentage, color: color({ source: 'error' }) },
                    info: 'status',
                    showInfo: true,
                    failed: true,
                  },
                },
                {
                  name: 'Circular',
                  props: {
                    type: 'circular',
                    steps: { percentage, color: color({ source: 'error' }) },
                    info: 'status',
                    showInfo: true,
                    failed: true,
                  },
                },
              ],
            },
          ]}
        />
      )}
    </WithNumberStory>
  )
}

export const DynamicColorsAndInfo: FC = () => {
  return (
    <WithNumberStory steps={10} defaultValue={70}>
      {percentage => (
        <CommonStory
          component={Progress}
          stories={[
            {
              group: [
                {
                  name: 'Horizontal',
                  props: {
                    type: 'horizontal',
                    steps: { percentage },
                    showInfo: true,
                    dynamicColors: true,
                    dynamicInfo: true,
                  },
                },
                {
                  name: 'Vertical',
                  props: {
                    type: 'vertical',
                    steps: { percentage },
                    showInfo: true,
                    dynamicColors: true,
                    dynamicInfo: true,
                  },
                },
                {
                  name: 'Circular',
                  props: {
                    type: 'circular',
                    steps: { percentage },
                    showInfo: true,
                    dynamicColors: true,
                    dynamicInfo: true,
                  },
                },
              ],
            },
          ]}
        />
      )}
    </WithNumberStory>
  )
}

export const ColorPerPercentage: FC = () => {
  const color: ProgressNS.Color = [
    color => color({ source: 'warning' }),
    {
      10: color => color({ source: 'error' }),
      30: color => color({ source: 'error' }),
      50: color => color({ source: 'error' }),
      70: color => color({ source: 'error' }),
      90: color => color({ source: 'error' }),
    },
  ]

  return (
    <WithNumberStory steps={10} defaultValue={70}>
      {percentage => (
        <CommonStory
          component={Progress}
          stories={[
            {
              group: [
                {
                  name: 'Horizontal',
                  props: { type: 'horizontal', steps: { percentage, color }, showInfo: true },
                },
                {
                  name: 'Vertical',
                  props: { type: 'vertical', steps: { percentage, color }, showInfo: true },
                },
                {
                  name: 'Circular',
                  props: { type: 'circular', steps: { percentage, color }, showInfo: true },
                },
              ],
            },
          ]}
        />
      )}
    </WithNumberStory>
  )
}

export const ColorPerPercentageRange: FC = () => {
  const color: ProgressNS.Color = [
    color => color({ source: 'warning' }),
    {
      '20-40': color => color({ source: 'error' }),
      '80-90': color => color({ source: 'error' }),
    },
  ]

  return (
    <WithNumberStory steps={10} defaultValue={70}>
      {percentage => (
        <CommonStory
          component={Progress}
          stories={[
            {
              group: [
                {
                  name: 'Horizontal',
                  props: { type: 'horizontal', steps: { percentage, color }, showInfo: true },
                },
                {
                  name: 'Vertical',
                  props: { type: 'vertical', steps: { percentage, color }, showInfo: true },
                },
                {
                  name: 'Circular',
                  props: { type: 'circular', steps: { percentage, color }, showInfo: true },
                },
              ],
            },
          ]}
        />
      )}
    </WithNumberStory>
  )
}

export const CircularSizing: FC = () => {
  return (
    <WithNumberStory steps={10} defaultValue={70}>
      {percentage => (
        <CommonStory
          component={Progress}
          stories={[
            {
              group: [
                {
                  name: 'Stroke width',
                  props: {
                    type: 'circular',
                    steps: { percentage },
                    showInfo: true,
                    circularStroke: 20,
                    dynamicColors: true,
                    dynamicInfo: true,
                  },
                },
                {
                  name: 'Circle size',
                  props: {
                    type: 'circular',
                    steps: { percentage },
                    showInfo: true,
                    circularSize: 250,
                    circularIconFontSize: 120,
                    circularPercentageFontSize: 60,
                    dynamicColors: true,
                    dynamicInfo: true,
                  },
                },
              ],
            },
          ]}
        />
      )}
    </WithNumberStory>
  )
}

export const HorizontalSizing: FC = () => {
  return (
    <WithNumberStory steps={10} defaultValue={70}>
      {percentage => (
        <CommonStory
          component={Progress}
          stories={[
            {
              group: [
                {
                  name: 'Height',
                  props: {
                    steps: { percentage, withWave: true },
                    horizontalHeight: 50,
                    showInfo: true,
                    dynamicColors: true,
                    dynamicInfo: true,
                  },
                },
                {
                  name: 'Width',
                  props: {
                    steps: { percentage, withWave: true },
                    horizontalWidth: '50%',
                    showInfo: true,
                    dynamicColors: true,
                    dynamicInfo: true,
                  },
                },
              ],
            },
          ]}
        />
      )}
    </WithNumberStory>
  )
}

export const VerticalSizing: FC = () => {
  return (
    <WithNumberStory steps={10} defaultValue={70}>
      {percentage => (
        <CommonStory
          component={Progress}
          stories={[
            {
              group: [
                {
                  name: 'Height',
                  props: {
                    type: 'vertical',
                    steps: { percentage, withWave: true },
                    verticalHeight: 100,
                    showInfo: true,
                    dynamicColors: true,
                    dynamicInfo: true,
                  },
                },
                {
                  name: 'Width',
                  props: {
                    type: 'vertical',
                    steps: { percentage, withWave: true },
                    verticalWidth: 50,
                    showInfo: true,
                    dynamicColors: true,
                    dynamicInfo: true,
                  },
                },
              ],
            },
          ]}
        />
      )}
    </WithNumberStory>
  )
}

export const Playground: FC<ProgressNS.Props> = props => {
  return <StoryPlayground component={Progress} props={props} />
}
