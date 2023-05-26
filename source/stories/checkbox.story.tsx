import React, { FC } from 'react'

import { ComponentMeta } from '@storybook/react'

import { Checkbox, CheckboxNS } from '..'
import { CommonStory, StoryPlayground } from './components'
import { useI18n } from './hooks/use-i18n'

export default {
  title: 'Data Entry/Checkbox',
  component: Checkbox,
  args: {
    label: 'Some label for the checkbox',
  },
} as ComponentMeta<typeof Checkbox>

export const Sizes = () => {
  const { t } = useI18n('checkbox')
  return (
    <CommonStory
      component={Checkbox}
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

export const Modes = () => {
  const { t } = useI18n('checkbox')
  return (
    <CommonStory
      component={Checkbox}
      stories={[
        {
          group: [
            { props: { label: t('sampleTitle'), checked: true }, name: 'Checked' },
            {
              props: { label: t('sampleTitle'), indeterminate: true, checked: true },
              name: 'Indeterminate',
            },
            { props: { label: t('sampleTitle'), checked: false }, name: 'Unchecked' },
          ],
        },
      ]}
    />
  )
}

export const States = () => {
  const { t } = useI18n('checkbox')
  const { t: tg } = useI18n('global')
  return (
    <CommonStory
      component={Checkbox}
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
  const { t } = useI18n('checkbox')
  return (
    <CommonStory
      component={Checkbox}
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

export const Playground: FC<CheckboxNS.Props> = props => (
  <StoryPlayground component={Checkbox} props={props} />
)
