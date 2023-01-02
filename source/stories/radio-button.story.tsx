import React, { FC } from 'react'

import { ComponentMeta } from '@storybook/react'

import { RadioButton, RadioButtonNS } from '..'
import { CommonStory, StoryPlayground } from './components'
import { useI18n } from './hooks/use-i18n'

export default {
  title: 'Data Entry/Radio button',
  component: RadioButton,
  args: {
    label: 'Some label for the radio button',
  },
} as ComponentMeta<typeof RadioButton>

export const Playground: FC<RadioButtonNS.Props> = props => (
  <StoryPlayground component={RadioButton} props={props} />
)

export const Sizes = () => {
  const { t } = useI18n('radio')
  return (
    <CommonStory
      component={RadioButton}
      stories={[
        {
          group: [
            { props: { name: 'size', size: 'small', label: t('sizingTitle') }, name: 'Small' },
            { props: { name: 'size', size: 'normal', label: t('sizingTitle') }, name: 'Normal' },
            { props: { name: 'size', size: 'large', label: t('sizingTitle') }, name: 'Large' },
          ],
        },
      ]}
    />
  )
}

export const States = () => {
  const { t } = useI18n('radio')
  const { t: tg } = useI18n('global')
  return (
    <CommonStory
      component={RadioButton}
      stories={[
        {
          group: [
            {
              props: {
                name: 'state',
                label: t('sampleTitle'),
                state: ['neutral', tg('states.neutral')],
              },
              name: 'Neutral',
            },
            {
              props: {
                name: 'state',
                label: t('sampleTitle'),
                state: ['success', tg('states.success')],
              },
              name: 'Success',
            },
            {
              props: { name: 'state', label: t('sampleTitle'), state: ['info', tg('states.info')] },
              name: 'Info',
            },
            {
              props: {
                name: 'state',
                label: t('sampleTitle'),
                state: ['warning', tg('states.warning')],
              },
              name: 'Warning',
            },
            {
              props: {
                name: 'state',
                label: t('sampleTitle'),
                state: ['error', tg('states.error')],
              },
              name: 'Error',
            },
          ],
        },
      ]}
    />
  )
}

export const LoadingAndDisabled = () => {
  const { t } = useI18n('radio')
  return (
    <CommonStory
      component={RadioButton}
      stories={[
        {
          group: [
            { props: { name: 'loading-disabled', label: t('sampleTitle') }, name: 'Normal' },
            {
              props: { name: 'loading-disabled', label: t('sampleTitle'), loading: true },
              name: 'Loading',
            },
            {
              props: {
                name: 'loading-disabled',
                label: t('sampleTitle'),
                loading: true,
                disabledOnLoading: false,
              },
              name: 'Loading but not disabled',
            },
            {
              props: { name: 'loading-disabled', label: t('sampleTitle'), disabled: true },
              name: 'Disabled',
            },
          ],
        },
      ]}
    />
  )
}
