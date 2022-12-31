import React, { FC } from 'react'

import { ComponentMeta } from '@storybook/react'

import { Input, InputNS } from '..'
import { CommonStory, StoryPlayground } from './components'
import { useI18n } from './hooks/use-i18n'

export default {
  title: 'Data Entry/Input',
  component: Input,
  args: {
    label: 'Some input in here',
    size: 'small',
    disabled: false,
    loading: false,
  },
} as ComponentMeta<typeof Input>

const useInputStory = () => {
  const { t } = useI18n('input')
  return {
    label: t('label'),
    placeholder: t('placeholder'),
  }
}

export const Playground: FC<InputNS.Props> = props => {
  return <StoryPlayground component={Input} props={props} />
}

export const LoadingAndDisabled: FC = () => {
  const { label, placeholder } = useInputStory()
  return (
    <CommonStory
      component={Input}
      stories={[
        {
          group: [
            { name: 'Normal', props: { label, placeholder } },
            { name: 'Loading', props: { label, placeholder, loading: true } },
            {
              name: 'Loading but not disabled',
              props: {
                label,
                placeholder,
                loading: true,
                disabledOnLoading: false,
              },
            },
            { name: 'Disabled', props: { label, placeholder, disabled: true } },
          ],
        },
      ]}
    />
  )
}

export const Sizes: FC = () => {
  const { label, placeholder } = useInputStory()
  return (
    <CommonStory
      component={Input}
      stories={[
        {
          group: [
            { props: { label, placeholder, size: 'small' }, name: 'Small' },
            { props: { label, placeholder, size: 'normal' }, name: 'Normal' },
            { props: { label, placeholder, size: 'large' }, name: 'Large' },
          ],
        },
      ]}
    />
  )
}

export const States: FC = () => {
  const { label, placeholder } = useInputStory()
  const { t } = useI18n('global')
  return (
    <CommonStory
      component={Input}
      stories={[
        {
          group: [
            {
              props: { label, placeholder, state: ['neutral', t('states.neutral')] },
              name: 'Neutral',
            },
            {
              props: { label, placeholder, state: ['success', t('states.success')] },
              name: 'Success',
            },
            { props: { label, placeholder, state: ['info', t('states.info')] }, name: 'Info' },
            {
              props: { label, placeholder, state: ['warning', t('states.warning')] },
              name: 'Warning',
            },
            { props: { label, placeholder, state: ['error', t('states.error')] }, name: 'Error' },
          ],
        },
      ]}
    />
  )
}

export const LabelAndPlaceholder: FC = () => {
  const { label, placeholder } = useInputStory()
  return (
    <CommonStory
      component={Input}
      stories={[
        {
          group: [
            { name: 'Without label and placeholder' },
            { props: { label, placeholder }, name: 'With label and placeholder' },
            { props: { label }, name: 'With label only' },
            { props: { placeholder }, name: 'With placeholder only' },
          ],
        },
      ]}
    />
  )
}
