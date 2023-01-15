import React, { CSSProperties, FC, useState } from 'react'

import { ComponentMeta } from '@storybook/react'

import { ConditionalWrapper, ConditionalWrapperNS, Title } from '../components'
import { color } from '../utils'
import { WithButtonsStory } from './components'

const wrappersStyles: CSSProperties = {
  display: 'block',
  overflow: 'hidden',
  borderRadius: 10,
  padding: 10,
  textAlign: 'center',
}

export default {
  title: 'Utility/Conditional wrapper',
  component: ConditionalWrapper,
  args: {
    children: (
      <Title h1 style={{ color: color({ source: 'text' }) }}>
        Some content as the fixed children. If the condition is true, a div element with darkred
        background will wrap this content. If not, then you will see a span with blue background
      </Title>
    ),
    trueWrapper: children => (
      <div style={{ background: '#861313', ...wrappersStyles }}>{children}</div>
    ),
    falseWrapper: children => (
      <span style={{ background: '#3608b1', ...wrappersStyles }}>{children}</span>
    ),
  },
} as ComponentMeta<typeof ConditionalWrapper>

export const Playground: FC<ConditionalWrapperNS.Props> = props => {
  const [status, setStatus] = useState(!!props.condition)

  return (
    <WithButtonsStory
      buttons={[
        { onClick: () => setStatus(true), children: 'Set condition to true' },
        { onClick: () => setStatus(false), children: 'Set condition to false' },
      ]}
    >
      <ConditionalWrapper {...props} condition={status} />
    </WithButtonsStory>
  )
}
