import React, { type FC } from 'react'

import { type Meta } from '@storybook/react'

import { Steps, type StepsNS } from '../components'
import { CommonStory, StoryPlayground } from './components'

const generateSteps = (length = 6, customSetting?: StepsNS.Step): StepsNS.Step[] => {
  return Array.from(Array(length)).map((_, index) => ({
    title: `Title ${index + 1}`,
    description: `Description of the title ${index + 1}`,
    disabled: false,
    loading: false,
    onClick: undefined,
    progress: undefined,
    ...customSetting,
  }))
}

export default {
  title: 'Navigation/Steps',
  component: Steps,
  args: {
    steps: generateSteps(6, {
      onClick: () => {},
      progress: 38,
    }),
    currentStepIndex: 1,
    disabled: false,
    className: 'my-steps',
    id: 'my-step',
    containerProps: {},
    onClick: undefined,
    style: undefined,
  },
} as Meta<typeof Steps>

export const StepTypes: FC = () => {
  return (
    <CommonStory
      component={Steps}
      stories={[
        {
          group: [
            {
              name: 'Sign only',
              props: { steps: generateSteps(3, { description: undefined, title: undefined }) },
            },
            { name: 'With title', props: { steps: generateSteps(3, { description: undefined }) } },
            { name: 'With description', props: { steps: generateSteps(3, { title: undefined }) } },
            { name: 'With title & description', props: { steps: generateSteps(3, {}) } },
            { name: 'Clickable', props: { steps: generateSteps(3, { onClick: () => {} }) } },
            { name: 'Loading', props: { steps: generateSteps(3, { loading: true }) } },
            { name: 'With progress', props: { steps: generateSteps(3, { progress: 70 }) } },
            { name: 'Disabled', props: { steps: generateSteps(3, { disabled: true }) } },
          ],
        },
      ]}
    />
  )
}

export const ActiveStep: FC = () => {
  return (
    <CommonStory
      component={Steps}
      stories={[
        {
          group: [{ props: { steps: generateSteps(3), currentStepIndex: 1 } }],
        },
      ]}
    />
  )
}

export const EntirelyDisabled: FC = () => {
  return (
    <CommonStory
      component={Steps}
      stories={[
        {
          group: [
            { name: 'Enabled (Default)', props: { steps: generateSteps(3) } },
            { name: 'Disabled', props: { steps: generateSteps(3), disabled: true } },
          ],
        },
      ]}
    />
  )
}

export const Playground: FC<StepsNS.Props> = props => {
  return <StoryPlayground component={Steps} props={props} />
}
