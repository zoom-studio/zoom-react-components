import React, { type FC } from 'react'

import { type Meta } from '@storybook/react'

import { Spin, type SpinNS } from '../components'
import { CommonStory, StoryPlayground } from './components'
import { useI18n } from './hooks/use-i18n'

export default {
  title: 'Loaders/Spin',
  component: Spin,
  args: {
    speed: '0.5s',
    size: 'normal',
  },
} as Meta<typeof Spin>

export const Sizes: FC = () => {
  return (
    <CommonStory
      component={Spin}
      stories={[
        {
          group: [
            { name: 'Small', props: { size: 'small' } },
            { name: 'Normal', props: { size: 'normal' } },
            { name: 'Large', props: { size: 'large' } },
          ],
        },
      ]}
    />
  )
}

export const WithTip: FC = () => {
  const { t } = useI18n('spin')
  return (
    <CommonStory
      component={Spin}
      stories={[
        {
          group: [
            { name: 'Small', props: { size: 'small', tip: t('tip') } },
            { name: 'Normal', props: { size: 'normal', tip: t('tip') } },
            { name: 'Large', props: { size: 'large', tip: t('tip') } },
          ],
        },
      ]}
    />
  )
}

export const CustomSpeed: FC = () => {
  return (
    <CommonStory
      component={Spin}
      stories={[
        {
          group: [
            { name: 'Custom: five seconds', props: { speed: '5s' } },
            { name: 'Default: five tenths(s)' },
            { name: 'Custom: one tenths(s)', props: { speed: '0.25s' } },
          ],
        },
      ]}
    />
  )
}

export const CustomColor: FC = () => {
  return (
    <CommonStory
      component={Spin}
      stories={[
        {
          group: [
            {
              name: 'From vars (Error)',
              props: { color: color => color({ source: 'success' }), size: 'large' },
            },
            {
              name: 'From vars (Warning)',
              props: { color: color => color({ source: 'warning' }), size: 'large' },
            },
            {
              name: 'Custom (Purple)',
              props: { color: 'purple', size: 'large' },
            },
          ],
        },
      ]}
    />
  )
}

export const Playground: FC<SpinNS.Props> = props => {
  return <StoryPlayground component={Spin} props={props} />
}
