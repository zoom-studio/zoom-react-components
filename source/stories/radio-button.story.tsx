import React, { type FC } from 'react'

import { type Meta } from '@storybook/react'

import { RadioButton, type RadioButtonNS } from '..'
import { CommonStory, StoryPlayground } from './components'
import { useI18n } from './hooks/use-i18n'

export default {
  title: 'Data Entry/Radio button',
  component: RadioButton,
  args: {
    label: 'Some label for the radio button',
  },
} as Meta<typeof RadioButton>

export const Sizes = () => {
  const { t } = useI18n('radio')
  return (
    <CommonStory
      component={RadioButton}
      stories={[
        {
          group: [
            {
              props: { name: 'size', value: 'small', size: 'small', label: t('sizingTitle') },
              name: 'Small',
            },
            {
              props: { name: 'size', value: 'normal', size: 'normal', label: t('sizingTitle') },
              name: 'Normal',
            },
            {
              props: { name: 'size', value: 'large', size: 'large', label: t('sizingTitle') },
              name: 'Large',
            },
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
                value: 'neutral',
                label: t('sampleTitle'),
                state: ['neutral', tg('states.neutral')],
              },
              name: 'Neutral',
            },
            {
              props: {
                name: 'state',
                value: 'success',
                label: t('sampleTitle'),
                state: ['success', tg('states.success')],
              },
              name: 'Success',
            },
            {
              props: {
                name: 'state',
                value: 'info',
                label: t('sampleTitle'),
                state: ['info', tg('states.info')],
              },
              name: 'Info',
            },
            {
              props: {
                name: 'state',
                value: 'warning',
                label: t('sampleTitle'),
                state: ['warning', tg('states.warning')],
              },
              name: 'Warning',
            },
            {
              props: {
                name: 'state',
                value: 'error',
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
            {
              props: { name: 'loading-disabled', value: 'normal', label: t('sampleTitle') },
              name: 'Normal',
            },
            {
              props: {
                name: 'loading-disabled',
                value: 'loading',
                label: t('sampleTitle'),
                loading: true,
              },
              name: 'Loading',
            },
            {
              props: {
                name: 'loading-disabled',
                value: 'loading-enabled',
                label: t('sampleTitle'),
                loading: true,
                disabledOnLoading: false,
              },
              name: 'Loading but not disabled',
            },
            {
              props: {
                name: 'loading-disabled',
                value: 'disabled',
                label: t('sampleTitle'),
                disabled: true,
              },
              name: 'Disabled',
            },
          ],
        },
      ]}
    />
  )
}

export const Playground: FC<RadioButtonNS.Props> = props => (
  <StoryPlayground component={RadioButton} props={props} />
)
