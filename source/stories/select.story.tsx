import React, { type FC } from 'react'

import { type Meta } from '@storybook/react'

import { faker } from '@faker-js/faker'
import { Select, type SelectNS } from '..'

export default {
  title: 'Data Entry/Select',
  component: Select,
  args: {
    label: 'پلی گروند',
    placeholder: 'سلکت موجود در پلی گروند',
    state: ['warning', 'some message'],
    searchPlaceholder: 'جستجو بین موارد',
  },
} as Meta<typeof Select>

interface OptionData {
  lastName: string
}

const useSelectStory = () => {
  const getSimpleOptions = (length = 200) => {
    const options: SelectNS.Option<number, OptionData>[] = []
    for (let index = 0; index < length; index++) {
      options.push({
        value: index,
        label: faker.person.firstName(),
        data: { lastName: faker.person.lastName() },
        disabled: index % 2 === 0,
      })
    }
    return options
  }

  const getGroupedOptions = (length = 200) => {
    const options: SelectNS.Option<number, OptionData>[] = []
    for (let index = 0; index < length; index++) {
      options.push({
        value: index,
        groupTitle: faker.airline.airplane().name,
        groupOptions: getSimpleOptions(10),
      })
    }
    return options
  }

  return {
    getSimpleOptions,
    getGroupedOptions,
  }
}

export const Playground: FC<SelectNS.Props> = props => {
  const { getGroupedOptions, getSimpleOptions } = useSelectStory()

  return (
    <div style={{ width: '100%', height: '90vh' }}>
      <Select
        label="پلی گروند"
        placeholder="سلکت موجود در پلی گروند"
        state={['warning', 'some message']}
        searchPlaceholder="جستجو بین موارد"
        showSearch={false}
        multiSelect
        options={[...getSimpleOptions(2), ...getGroupedOptions(10), ...getSimpleOptions(5)]}
        renderSelectedOption={option => option.label + ' ' + option.data?.lastName}
      >
        {option => option.label + ' ' + option.data?.lastName}
      </Select>
    </div>
  )
}
