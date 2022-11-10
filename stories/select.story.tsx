import React, { FC } from 'react'

import { ComponentMeta } from '@storybook/react'

import { Select as SelectComponent, SelectGroup, SelectOption } from '..'

export default {
  title: 'Select',
  component: SelectComponent,
} as ComponentMeta<typeof SelectComponent>

export const Select: FC = () => {
  return (
    <>
      ssssssssssssss
      <SelectComponent>
        <div>other</div>
        <SelectOption>option</SelectOption>
        <SelectGroup>group</SelectGroup>
      </SelectComponent>
    </>
  )
}
