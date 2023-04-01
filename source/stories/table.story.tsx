import React, { FC } from 'react'

import { ComponentMeta } from '@storybook/react'

import { Table, TableNS } from '../components'
import { StoryPlayground } from './components'

export default {
  title: 'Data display/Table',
  component: Table,
  args: {},
} as ComponentMeta<typeof Table>

export const Playground: FC<TableNS.Props> = props => {
  return <StoryPlayground component={Table} props={props} />
}
