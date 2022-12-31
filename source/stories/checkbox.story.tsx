import React, { FC } from 'react'

import { ComponentMeta } from '@storybook/react'

import { Checkbox, CheckboxNS, Title } from '..'
import { CommonStory, StoryPlayground } from './components'
import { useI18n } from './hooks/use-i18n'

export default {
  title: 'Data Entry/Checkbox',
  component: Checkbox,
  args: {
    label: 'Some label for the checkbox',
  },
} as ComponentMeta<typeof Checkbox>

export const Playground: FC<CheckboxNS.Props> = props => (
  <StoryPlayground component={Checkbox} props={props} />
)

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

export const _Checkbox: FC<CheckboxNS.Props> = props => {
  return (
    <>
      <div className="form-components-story">
        <div>
          <Title h1>Playground</Title>
          <Checkbox {...props} />
        </div>
      </div>

      {checkboxes.map(({ title, group }, index) => (
        <div key={index} className="form-components-story">
          <Title h1>{title}</Title>
          {group.map(({ title, ...props }, index) => (
            <div key={index}>
              <Title>{title}</Title>
              <Checkbox {...props} />
            </div>
          ))}
        </div>
      ))}
    </>
  )
}

const checkboxes: Array<{
  title: string
  group: Array<CheckboxNS.Props & { title: string }>
}> = [
  {
    title: 'Loading or disabled',
    group: [
      {
        title: 'Not loading or disabled',
        label: 'کاملا نرمال',
      },
      {
        title: 'Loading',
        label: 'در حال بارگذاری',
        loading: true,
        state: ['info'],
      },
      {
        title: 'Loading but not disabled',
        label: 'در حال بارگذاری',
        loading: true,
        disabledOnLoading: false,
      },
      {
        title: 'Disabled',
        label: 'غیر فعال',
        disabled: true,
      },
    ],
  },
  {
    title: 'Sizes',
    group: [
      {
        title: 'Small input 29',
        label: 'چک‌باکس کوچک',
        size: 'small',
      },
      {
        title: 'Normal input 36',
        label: 'چک‌باکس نرمال',
        size: 'normal',
      },
      {
        title: 'Large input 47',
        label: 'چک‌باکس بزرگ',
        size: 'large',
      },
    ],
  },

  {
    title: 'States',
    group: [
      {
        title: 'Neutral',
        label: 'من را تیک بزن',
        state: ['neutral'],
      },
      {
        title: 'Success',
        label: 'من را تیک بزن',
        state: ['success', 'من را با موفقیت تیک زدی'],
      },

      {
        title: 'Info',
        label: 'من را تیک بزن',
        state: ['info', 'من باید تیک زده بشم'],
      },
      {
        title: 'Warning',
        label: 'من را تیک بزن',
        state: ['warning', 'بهتره منو تیک بزنی'],
      },
      {
        title: 'Error',
        label: 'من را تیک بزن',
        state: ['error', 'باید منو تیک بزنی'],
      },
    ],
  },

  {
    title: 'Label',
    group: [
      {
        title: 'With label',
        label: 'لیبل در اینجا قرار می‌گیرد',
      },
      {
        title: 'Without label',
      },
    ],
  },
]
