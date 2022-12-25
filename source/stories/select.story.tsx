import React, { FC } from 'react'

import { ComponentMeta } from '@storybook/react'

import { Select, Title } from '..'

import './styles/_form.scss'

export default {
  title: 'Select',
  component: Select,
} as ComponentMeta<typeof Select>

export const _Select: FC = () => {
  return (
    <>
      <div className="form-components-story">
        <Title h1>Playground</Title>
        <Select />
      </div>
    </>
  )
}
