import React, { FC, useState } from 'react'

import { ComponentMeta } from '@storybook/react'

import { Alert, Collapse, CollapseNS } from '../components'
import { WithButtonsStory } from './components'

export default {
  title: 'Feedback/Collapse',
  component: Collapse,
  args: {
    expanded: false,
    transition: { property: 'all' },
    childHeight: 'auto-detect',
  },
} as ComponentMeta<typeof Collapse>

export const Playground: FC<CollapseNS.Props> = props => {
  const [expanded, setExpanded] = useState(!!props.expanded)

  return (
    <WithButtonsStory
      groupedButtons={false}
      buttons={[
        {
          onClick: () => setExpanded(expanded => !expanded),
          style: { margin: '0 0 20px 0' },
          children: expanded ? 'Collapse alert' : 'Expand alert',
        },
      ]}
    >
      <Collapse {...props} expanded={expanded}>
        <Alert
          closable={false}
          identifier="collapse-alert"
          title="Some alert"
          description="This alert will be collapsed/expanded using the above button"
        />
      </Collapse>
    </WithButtonsStory>
  )
}
