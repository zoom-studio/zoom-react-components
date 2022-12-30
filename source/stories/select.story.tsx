import React, { FC } from 'react'

import { ComponentMeta } from '@storybook/react'

import { Button, Select, SelectNS, Title } from '..'
import { SELECT_OPTIONS, SIMPLE_SELECT_OPTIONS } from '../fixtures'

import { useAddDataAttrs } from './hooks'
import './styles/_form.scss'

export default {
  title: 'Select',
  component: Select,
  args: {
    label: 'لیبل',
    multiSelect: true,
    placeholder: 'پلیس هولدر',
    options: SIMPLE_SELECT_OPTIONS,
  },
} as ComponentMeta<typeof Select>

export const _Select: FC<SelectNS.Props> = props => {
  const { nextLayout, toggleLayout } = useAddDataAttrs('rtl')
  return (
    <>
      <div className="form-components-story">
        <Title h1>Layout</Title>
        <Button onClick={toggleLayout}>Switch to {nextLayout}</Button>
      </div>

      <div className="form-components-story">
        <Title h1>Playground</Title>
        <div>
          <Select {...props} options={SELECT_OPTIONS} />
        </div>
      </div>

      {selects.map(({ title, group }, index) => (
        <div key={index} className="form-components-story">
          <Title h1>{title}</Title>
          {group.map(({ title, ...props }, index) => (
            <div key={index}>
              <Title>{title}</Title>
              <Select {...props} />
            </div>
          ))}
        </div>
      ))}
    </>
  )
}

const selects: Array<{
  title: string
  group: Array<SelectNS.Props & { title: string }>
}> = [
  {
    title: 'Loading or disabled',
    group: [
      {
        title: 'Not loading or disabled',
        placeholder: 'کاملا نرمال',
        label: 'کاملا نرمال',
      },
      {
        title: 'Loading',
        placeholder: 'در حال بارگذاری',
        label: 'در حال بارگذاری',
        loading: true,
        state: ['info'],
      },
      {
        title: 'Loading but not disabled',
        placeholder: 'در حال بارگذاری',
        label: 'در حال بارگذاری',
        loading: true,
        disabledOnLoading: false,
      },
      {
        title: 'Disabled',
        placeholder: 'غیر فعال',
        label: 'غیر فعال',
        disabled: true,
      },
    ],
  },
]
