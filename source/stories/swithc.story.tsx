import React, { FC } from 'react'

import { ComponentMeta } from '@storybook/react'

import { Switch, SwitchNS } from '..'
import { CommonStory, StoryPlayground } from './components'
import { useI18n } from './hooks/use-i18n'

export default {
  title: 'Data Entry/Switch',
  component: Switch,
  args: {
    label: 'Some label for the switch',
  },
} as ComponentMeta<typeof Switch>

export const Playground: FC<SwitchNS.Props> = props => (
  <StoryPlayground component={Switch} props={props} />
)

export const Sizes = () => {
  const { t } = useI18n('switch')
  return (
    <CommonStory
      component={Switch}
      stories={[
        {
          group: [
            { props: { size: 'small', label: t('sizingTitle') }, name: 'Small' },
            { props: { size: 'normal', label: t('sizingTitle') }, name: 'Normal' },
            { props: { size: 'large', label: t('sizingTitle') }, name: 'Large' },
          ],
        },
      ]}
    />
  )
}

export const States = () => {
  const { t } = useI18n('switch')
  const { t: tg } = useI18n('global')
  return (
    <CommonStory
      component={Switch}
      stories={[
        {
          group: [
            {
              props: { label: t('sampleTitle'), state: ['neutral', tg('states.neutral')] },
              name: 'Neutral',
            },
            {
              props: { label: t('sampleTitle'), state: ['success', tg('states.success')] },
              name: 'Success',
            },
            {
              props: { label: t('sampleTitle'), state: ['info', tg('states.info')] },
              name: 'Info',
            },
            {
              props: { label: t('sampleTitle'), state: ['warning', tg('states.warning')] },
              name: 'Warning',
            },
            {
              props: { label: t('sampleTitle'), state: ['error', tg('states.error')] },
              name: 'Error',
            },
          ],
        },
      ]}
    />
  )
}

export const LoadingAndDisabled = () => {
  const { t } = useI18n('switch')
  return (
    <CommonStory
      component={Switch}
      stories={[
        {
          group: [
            { props: { label: t('sampleTitle') }, name: 'Normal' },
            { props: { label: t('sampleTitle'), loading: true }, name: 'Loading' },
            {
              props: { label: t('sampleTitle'), loading: true, disabledOnLoading: false },
              name: 'Loading but not disabled',
            },
            { props: { label: t('sampleTitle'), disabled: true }, name: 'Disabled' },
          ],
        },
      ]}
    />
  )
}
