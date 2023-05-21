import React, { FC, useRef, useState } from 'react'

import { ComponentMeta } from '@storybook/react'

import { Alert, Portal, PortalNS, Text } from '../components'
import { WithButtonsStory } from './components'
import { color } from '../utils'

export default {
  title: 'Utility/Portal',
  component: Portal,
  args: {
    container: document.body,
  },
} as ComponentMeta<typeof Portal>

export const InsideCustomContainer: FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const customContainerRef = useRef<HTMLDivElement | null>(null)

  return (
    <WithButtonsStory
      buttons={[{ children: 'Open portal children', onClick: () => setIsOpen(true) }]}
      secondaryChild={
        <div ref={customContainerRef}>
          <Text style={{ color: color({ source: 'text' }) }}>
            This is the custom container that the portal children will be rendered inside this
          </Text>
        </div>
      }
    >
      {isOpen && (
        <Portal container={customContainerRef.current}>
          <Alert
            onWillClose={() => setIsOpen(false)}
            identifier="portal-alert"
            title="Alert as a portal"
            description="This alert has been dynamically rendered to the custom div element"
          />
        </Portal>
      )}
    </WithButtonsStory>
  )
}

export const Playground: FC<PortalNS.Props> = props => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <WithButtonsStory
      buttons={[{ children: 'Open portal children', onClick: () => setIsOpen(true) }]}
    >
      {isOpen && (
        <Portal {...props}>
          <Alert
            onWillClose={() => setIsOpen(false)}
            identifier="portal-alert"
            title="Alert as a portal"
            description="This alert has been dynamically rendered to the target dom"
            style={{
              position: 'fixed',
              top: 0,
              bottom: 0,
              margin: 'auto',
              left: 0,
              right: 0,
              width: 'fit-content',
              height: 'fit-content',
            }}
          />
        </Portal>
      )}
    </WithButtonsStory>
  )
}
