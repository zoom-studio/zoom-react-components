import React, { FC } from 'react'

import { ComponentMeta } from '@storybook/react'
import { randomImage } from '@zoom-studio/zoom-js-ts-utils'

import { AvatarEditor, AvatarEditorNS } from '../components'
import { CommonStory, StoryPlayground } from './components'

export default {
  title: 'Data entry/Avatar editor',
  component: AvatarEditor,
  args: {
    src: randomImage(undefined, undefined, 'cats'),
    borderRadius: 2000,
    borderColor: [0, 0, 0, 0.8],
    borderWidth: 6,
    size: 250,
    defaultScale: 1,
    minScaleOut: 0.1,
    maxScale: 6,
    scaleStep: 0.1,
    rotateStep: 90,
    allowScaleOut: true,
    noBounds: false,
    fitCanvasSize: true,
    loading: false,
    crossOrigin: 'anonymous',
  },
} as ComponentMeta<typeof AvatarEditor>

const useAvatarEditorStory = () => {
  const src = randomImage(undefined, undefined, 'cats')
  return { src }
}

export const LoadingAndError: FC = () => {
  const { src } = useAvatarEditorStory()
  return (
    <CommonStory
      component={AvatarEditor}
      stories={[
        {
          group: [
            { name: 'Normal', props: { src } },
            { name: 'Loading', props: { src, loading: true } },
            { name: 'Errored', props: { src: src + 'dd' } },
          ],
        },
      ]}
    />
  )
}

export const CustomBorder: FC = () => {
  const { src } = useAvatarEditorStory()
  return (
    <CommonStory
      component={AvatarEditor}
      stories={[
        {
          group: [
            { name: 'Default', props: { src } },
            {
              name: 'Custom',
              props: { src, borderColor: [63, 189, 121, 0.9], borderRadius: 30, borderWidth: 20 },
            },
          ],
        },
      ]}
    />
  )
}

export const AllowScaleOut: FC = () => {
  const { src } = useAvatarEditorStory()
  return (
    <CommonStory
      component={AvatarEditor}
      stories={[
        {
          group: [
            { name: 'Allowed scale out (Default)', props: { src, allowScaleOut: true } },
            { name: 'Without scale out', props: { src, allowScaleOut: false } },
          ],
        },
      ]}
    />
  )
}

export const DefaultScale: FC = () => {
  const { src } = useAvatarEditorStory()
  return (
    <CommonStory
      component={AvatarEditor}
      stories={[
        {
          group: [
            { name: 'default=1', props: { src } },
            { name: 'custom: 4', props: { src, defaultScale: 4 } },
          ],
        },
      ]}
    />
  )
}

export const CustomScaleRange: FC = () => {
  const { src } = useAvatarEditorStory()
  return (
    <CommonStory
      component={AvatarEditor}
      stories={[
        {
          group: [
            { name: 'min:0.1 | max:6 (Default)', props: { src } },
            { name: 'min:1 | max:20', props: { src, minScaleOut: 1, maxScale: 20 } },
          ],
        },
      ]}
    />
  )
}

export const ScaleSteps: FC = () => {
  const { src } = useAvatarEditorStory()
  return (
    <CommonStory
      component={AvatarEditor}
      stories={[
        {
          group: [
            { name: 'step:0.1 (Default)', props: { src } },
            { name: 'step:2', props: { src, scaleStep: 2, minScaleOut: 1, maxScale: 20 } },
          ],
        },
      ]}
    />
  )
}

export const RotateSteps: FC = () => {
  const { src } = useAvatarEditorStory()
  return (
    <CommonStory
      component={AvatarEditor}
      stories={[
        {
          group: [
            { name: 'step:90 (Default)', props: { src } },
            { name: 'step:10', props: { src, rotateStep: 10 } },
          ],
        },
      ]}
    />
  )
}

export const Bounds: FC = () => {
  const { src } = useAvatarEditorStory()
  return (
    <CommonStory
      component={AvatarEditor}
      stories={[
        {
          group: [
            { name: 'Respect bounds (Default)', props: { src } },
            { name: 'No bounds', props: { src, noBounds: true } },
          ],
        },
      ]}
    />
  )
}

export const Playground: FC<AvatarEditorNS.Props> = props => {
  return <StoryPlayground component={AvatarEditor} props={props} />
}
