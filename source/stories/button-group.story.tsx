import React, { FC, ReactNode } from 'react'

import { ComponentMeta } from '@storybook/react'

import { ButtonGroup, ButtonGroupNS, ButtonNS } from '..'
import { CommonStory, CommonStoryNS, StoryPlayground } from './components'
import { useI18n } from './hooks/use-i18n'

export default {
  title: 'Call To Action/Button group',
  component: ButtonGroup,
  args: {
    children: 'Global children',
    buttons: [{ children: 'First button' }, { children: 'Second button' }, {}, {}],
  },
} as ComponentMeta<typeof ButtonGroup>

const generateSampleButtons = (children: ReactNode, props?: ButtonNS.Props): ButtonNS.Props[] =>
  Array.from(Array(4)).map(() => ({ children, ...props }))

const generateTypes = (
  children: ReactNode,
  direction: ButtonGroupNS.Props['direction'],
): CommonStoryNS.Story<ButtonGroupNS.Props>[] => {
  return ButtonNS.Types.map(type => ({
    title: '',
    group: [
      {
        name: `Type: ${type}`,
        props: { buttons: generateSampleButtons(children, { type }), direction },
      },
    ],
  }))
}

export const Directions: FC<ButtonGroupNS.Props> = () => {
  const { t } = useI18n('button')
  const buttons = generateSampleButtons(t('sampleTitle'))
  return (
    <CommonStory
      component={ButtonGroup}
      stories={[
        {
          group: [
            { name: 'Row', props: { direction: 'row', buttons } },
            { name: 'Column', props: { direction: 'column', buttons } },
          ],
        },
      ]}
    />
  )
}

export const TypesInRowDir: FC<ButtonGroupNS.Props> = () => {
  const { t } = useI18n('button')
  return <CommonStory component={ButtonGroup} stories={generateTypes(t('sampleTitle'), 'row')} />
}

export const TypesInColDir: FC<ButtonGroupNS.Props> = () => {
  const { t } = useI18n('button')
  return <CommonStory component={ButtonGroup} stories={generateTypes(t('sampleTitle'), 'column')} />
}

export const MixedVariants: FC<ButtonGroupNS.Props> = () => {
  const { t } = useI18n('button')
  return (
    <CommonStory
      component={ButtonGroup}
      stories={[
        {
          group: [
            {
              name: 'Primary type',
              props: {
                children: t('sampleTitle'),
                buttons: [
                  { variant: 'error' },
                  { variant: 'info' },
                  { variant: 'neutral' },
                  { variant: 'success' },
                  { variant: 'warning' },
                ],
              },
            },
            {
              name: 'Secondary type',
              props: {
                children: t('sampleTitle'),
                type: 'secondary',
                buttons: [
                  { variant: 'error' },
                  { variant: 'info' },
                  { variant: 'neutral' },
                  { variant: 'success' },
                  { variant: 'warning' },
                ],
              },
            },
          ],
        },
      ]}
    />
  )
}

export const Playground: FC<ButtonGroupNS.Props> = props => (
  <StoryPlayground props={props} component={ButtonGroup} />
)
