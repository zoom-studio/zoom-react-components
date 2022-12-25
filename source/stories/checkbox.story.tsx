import React, { FC } from 'react'

import { ComponentMeta } from '@storybook/react'

import { Button, Title, Checkbox, CheckboxNS } from '..'

import { useAddDataAttrs } from './hooks'
import './styles/_form.scss'

export default {
  title: 'Checkbox',
  component: Checkbox,
  args: {
    label: 'Some label for the checkbox',
  },
} as ComponentMeta<typeof Checkbox>

export const _Checkbox: FC<CheckboxNS.Props> = props => {
  const { nextLayout, toggleLayout } = useAddDataAttrs('rtl')

  return (
    <>
      <div className="form-components-story">
        <Title h1>Layout</Title>
        <Button onClick={toggleLayout}>Switch to {nextLayout}</Button>
      </div>

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
