import React, { type FC, type MouseEvent } from 'react'

import { faker as Faker } from '@faker-js/faker'
import { type Meta } from '@storybook/react'

import { Image, Selectable, type SelectableNS, Text } from '../components'
import { color } from '../utils'
import { CommonStory, StoryPlayground } from './components'
import { useFaker } from './hooks/use-faker'

interface DataType {
  profile: string
  address: string
}

interface ItemComponentProps extends DataType {
  isSelected: boolean
  select: (evt: MouseEvent<Element>) => void
}

const ItemComponent = ({ address, profile, isSelected, select }: ItemComponentProps) => (
  <div
    onClick={select}
    style={{
      border: `1px solid ${color({ source: 'border', tone: 2 })}`,
      display: 'flex',
      margin: '10px 0',
      background: isSelected ? color({ source: 'border', tone: 2 }) : 'transparent',
      alignItems: 'center',
      gap: 10,
      padding: '0 10px',
      borderRadius: 8,
      color: color({ source: 'text' }),
    }}
  >
    <Image width={30} src={profile} shape="circle" />
    <Text style={{ flex: 1 }}>{address}</Text>
  </div>
)

const useSelectableStory = () => {
  const faker = useFaker()

  const dataset: DataType[] = Array.from(Array(30)).map(() => ({
    profile: faker.image.people(),
    address: faker.address.streetAddress(),
  }))

  const renderChildren = (
    Item: FC<ItemComponentProps>,
    { data, select, isSelected }: SelectableNS.ChildrenCallbackParams<DataType[]>,
  ) => {
    return <Item {...data} isSelected={isSelected} select={select} />
  }

  return { dataset, renderChildren }
}

export default {
  title: 'Data display/Selectable',
  component: Selectable,
  args: {
    itemComponent: ItemComponent,
    dataset: Array.from(Array(30)).map(() => ({
      profile: Faker.image.people(),
      address: Faker.address.streetAddress(),
    })),
    tolerance: 0,
    multiSelect: true,
    disabled: false,
    deselectOnOutsideClick: true,
    children: undefined,
    defaultSelections: [],
    onSelect: undefined,
    id: 'my-selectable-component',
    className: 'my-selectable-comonent',
    containerProps: undefined,
    onClick: undefined,
    style: undefined,
  },
} as Meta<typeof Selectable>

export const Tolerance = () => {
  const { dataset, renderChildren } = useSelectableStory()

  return (
    <CommonStory
      component={Selectable}
      stories={[
        {
          title: 'tolerance: 0 (Default)',
          custom: (
            <Selectable itemComponent={ItemComponent} dataset={dataset} children={renderChildren} />
          ),
        },
        {
          title: 'tolerance: 10',
          custom: (
            <Selectable
              tolerance={10}
              itemComponent={ItemComponent}
              dataset={dataset}
              children={renderChildren}
            />
          ),
        },
      ]}
    />
  )
}

export const MultiSelect = () => {
  const { dataset, renderChildren } = useSelectableStory()

  return (
    <CommonStory
      component={Selectable}
      stories={[
        {
          title: 'Multi select (Default)',
          custom: (
            <Selectable itemComponent={ItemComponent} dataset={dataset} children={renderChildren} />
          ),
        },
        {
          title: 'Single select',
          custom: (
            <Selectable
              multiSelect={false}
              itemComponent={ItemComponent}
              dataset={dataset}
              children={renderChildren}
            />
          ),
        },
      ]}
    />
  )
}

export const DisableState = () => {
  const { dataset, renderChildren } = useSelectableStory()

  return (
    <CommonStory
      component={Selectable}
      stories={[
        {
          title: 'Disabled',
          custom: (
            <Selectable
              disabled
              itemComponent={ItemComponent}
              dataset={dataset}
              children={renderChildren}
            />
          ),
        },
      ]}
    />
  )
}

export const DeselectOnOutsideClick = () => {
  const { dataset, renderChildren } = useSelectableStory()

  return (
    <CommonStory
      component={Selectable}
      stories={[
        {
          title: 'Deselect on outside click (Default)',
          custom: (
            <Selectable itemComponent={ItemComponent} dataset={dataset} children={renderChildren} />
          ),
        },
        {
          title: 'Do nothing when outside clicked',
          custom: (
            <Selectable
              deselectOnOutsideClick={false}
              itemComponent={ItemComponent}
              dataset={dataset}
              children={renderChildren}
            />
          ),
        },
      ]}
    />
  )
}

export const WithDefaultSelection = () => {
  const { dataset, renderChildren } = useSelectableStory()

  return (
    <CommonStory
      component={Selectable}
      stories={[
        {
          custom: (
            <Selectable
              itemComponent={ItemComponent}
              dataset={dataset}
              children={renderChildren}
              defaultSelections={[2, 4, 6, 8]}
            />
          ),
        },
      ]}
    />
  )
}

export const Playground: FC<SelectableNS.Props<DataType, DataType[]>> = props => {
  const { dataset } = useSelectableStory()

  return (
    <StoryPlayground
      component={Selectable}
      props={{
        ...props,
        dataset,
        itemComponent: ItemComponent as FC<object>,
        children: (Item: FC<ItemComponentProps>, { data, select, isSelected }) => (
          <Item {...(data as DataType)} isSelected={isSelected} select={select} />
        ),
      }}
    />
  )
}
