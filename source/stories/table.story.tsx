import React, { FC } from 'react'

import { ComponentMeta } from '@storybook/react'

import { Table, TableNS } from '../components'

export default {
  title: 'Data display/Table',
  component: Table,
  args: {},
} as ComponentMeta<typeof Table>

type Person = {
  name: {
    first: string
    last: string
  }
  age: number
  visits: number
  status: string
  progress: number
}

const defaultData: Person[] = [
  {
    name: {
      first: 'tanner',
      last: 'linsley',
    },
    age: 24,
    visits: 100,
    status: 'In Relationship',
    progress: 50,
  },
  {
    name: {
      first: 'tandy',
      last: 'miller',
    },
    age: 40,
    visits: 40,
    status: 'Single',
    progress: 80,
  },
  {
    name: {
      first: 'joe',
      last: 'dirte',
    },
    age: 45,
    visits: 20,
    status: 'Complicated',
    progress: 10,
  },
]

export const Playground: FC<TableNS.Props> = props => {
  return (
    <Table dataset={defaultData}>
      {({ Cell, Column, FooterCell, HeaderCell }) => (
        <>
          <Column width={200} accessor="name">
            <Cell>
              {data => (
                <>
                  {data.name.first}-{data.name.last}
                </>
              )}
            </Cell>
          </Column>

          <Column accessor="age">
            <HeaderCell>Age</HeaderCell>
            <Cell />
          </Column>

          <Column accessor="status">
            <HeaderCell>Status</HeaderCell>
            <Cell>{data => <span>{data.status}</span>}</Cell>
            <FooterCell>Status</FooterCell>
          </Column>
        </>
      )}
    </Table>
  )
}
