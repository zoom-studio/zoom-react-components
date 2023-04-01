import React, { FC } from 'react'

import { ComponentMeta } from '@storybook/react'

import { TableGenerator, TableGeneratorNS } from '../components'
import { StoryPlayground } from './components'

export default {
  title: 'Data entry/Table generator',
  component: TableGenerator,
  args: {},
} as ComponentMeta<typeof TableGenerator>

export const Playground: FC<TableGeneratorNS.Props> = props => {
  return <StoryPlayground component={TableGenerator} props={props} />
}
