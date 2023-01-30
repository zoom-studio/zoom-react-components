import React, { FC } from 'react'

import { ComponentMeta } from '@storybook/react'

import { Tour, TourNS, useMessage } from '../components'
import { LoremPage, useCreateLoremSectionRefs } from '../fixtures'
import { WithButtonsStory } from './components'

export default {
  title: 'Data display/Tour',
  component: Tour,
  args: {
    steps: [],
    onStart: undefined,
    onEnd: undefined,
    defaultActiveStep: 0,
    children: undefined,
    id: undefined,
    className: undefined,
    style: {},
    backdropProps: {},
    containerProps: {},
    onClick: undefined,
  },
} as ComponentMeta<typeof Tour>

const useTourStory = () => {
  const refs = useCreateLoremSectionRefs()
  const message = useMessage()

  const steps: TourNS.Step[] = []

  const commonProps: Omit<TourNS.Props, 'children'> = {
    steps,
    onStart: () => message.toast.neutral('The tour has been started!'),
    onEnd: () => message.toast.neutral('Completed! now you are a pro!'),
  }

  return { refs, steps, commonProps }
}

export const Playground: FC<TourNS.Props> = props => {
  const { refs, commonProps } = useTourStory()
  return (
    <Tour {...props} {...commonProps}>
      {({ startTour, stopTour }) => (
        <WithButtonsStory
          buttons={[
            { children: 'Start the tour', onClick: startTour },
            { children: 'Stop the tour', onClick: stopTour },
          ]}
        >
          <LoremPage refs={refs} />
        </WithButtonsStory>
      )}
    </Tour>
  )
}
