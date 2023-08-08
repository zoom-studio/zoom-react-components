import React, { type FC } from 'react'

import { faker } from '@faker-js/faker'
import { type Meta } from '@storybook/react'
import { randomImage } from '@zoom-studio/js-ts-utils'

import { ImageEditor, type ImageEditorNS } from '../components'
import { CommonStory, StoryPlayground } from './components'

export default {
  title: 'Data entry/Image editor',
  component: ImageEditor,
  args: {
    src: faker.image.image(),
    grid: true,
    circleStencil: false,
    aspectRatio: undefined,
    defaultFlips: { flipHorizontally: false, flipVertically: false },
    defaultRotation: 0,
    defaultAdjustments: {
      brightness: 0,
      contrast: 0,
      hue: 0,
      saturation: 0,
    },
    confirmBeforeReset: true,
    showReset: true,
    showPreview: true,
    disabled: false,
    loading: false,
    className: 'my-image-editor',
    id: 'my-image-editor',
    containerProps: undefined,
    onClick: undefined,
    reference: undefined,
    style: undefined,
  },
} as Meta<typeof ImageEditor>

const useImageEditorStory = () => {
  const src = randomImage(undefined, undefined, 'cats')
  return { src }
}

export const StencilType: FC = () => {
  const { src } = useImageEditorStory()
  return (
    <CommonStory
      component={ImageEditor}
      stories={[
        {
          group: [
            { name: 'Rectangle (Default)', props: { src } },
            { name: 'Circle', props: { circleStencil: true, src } },
          ],
        },
      ]}
    />
  )
}

export const AspectRatio: FC = () => {
  const { src } = useImageEditorStory()
  return (
    <CommonStory
      component={ImageEditor}
      stories={[
        {
          group: [
            { name: 'Free (Default)', props: { src } },
            { name: '1:1', props: { src, aspectRatio: 1 / 1 } },
            { name: '6:9', props: { src, aspectRatio: 6 / 9 } },
            {
              name: 'Minimum 1:1 & Maximum 6:9',
              props: { src, aspectRatio: { minimum: 2 / 4, maximum: 6 / 9 } },
            },
          ],
        },
      ]}
    />
  )
}

export const Grids: FC = () => {
  const { src } = useImageEditorStory()
  return (
    <CommonStory
      component={ImageEditor}
      stories={[
        {
          group: [
            { name: 'With grids (Default)', props: { src } },
            { name: 'Without grids', props: { src, grid: false } },
          ],
        },
      ]}
    />
  )
}

export const DefaultSettings: FC = () => {
  const { src } = useImageEditorStory()
  return (
    <CommonStory
      component={ImageEditor}
      stories={[
        {
          group: [
            {
              props: {
                src,
                defaultAdjustments: { brightness: 20, contrast: 30, hue: 40, saturation: 50 },
                defaultFlips: { flipHorizontally: true, flipVertically: true },
                defaultRotation: 90,
              },
            },
          ],
        },
      ]}
    />
  )
}

export const ConfirmBeforeReset: FC = () => {
  const { src } = useImageEditorStory()
  return (
    <CommonStory
      component={ImageEditor}
      stories={[
        {
          group: [
            {
              name: 'With confirmation (Default)',
              props: { src, defaultAdjustments: { hue: 10 } },
            },
            {
              name: 'Without confirmation',
              props: { src, confirmBeforeReset: false, defaultAdjustments: { hue: 10 } },
            },
          ],
        },
      ]}
    />
  )
}

export const ShowResetButton: FC = () => {
  const { src } = useImageEditorStory()
  return (
    <CommonStory
      component={ImageEditor}
      stories={[
        {
          group: [
            {
              name: 'With reset button (Default)',
              props: { src, defaultAdjustments: { hue: 10 } },
            },
            {
              name: 'Without reset button',
              props: { src, showReset: false, defaultAdjustments: { hue: 10 } },
            },
          ],
        },
      ]}
    />
  )
}

export const ShowPreview: FC = () => {
  const { src } = useImageEditorStory()
  return (
    <CommonStory
      component={ImageEditor}
      stories={[
        {
          group: [
            {
              name: 'Show preview (Default)',
              props: { src },
            },
            {
              name: 'Without preview',
              props: { src, showPreview: false },
            },
          ],
        },
      ]}
    />
  )
}

export const DisabledAndLoading: FC = () => {
  const { src } = useImageEditorStory()
  return (
    <CommonStory
      component={ImageEditor}
      stories={[
        {
          group: [
            { name: 'Normal', props: { src } },
            { name: 'Loading', props: { src, loading: true } },
            { name: 'Disabled', props: { src, disabled: true } },
          ],
        },
      ]}
    />
  )
}

export const Errored: FC = () => {
  const { src } = useImageEditorStory()
  return (
    <CommonStory
      component={ImageEditor}
      stories={[{ group: [{ props: { src: src.concat('dd') } }] }]}
    />
  )
}

export const Playground: FC<ImageEditorNS.Props> = props => {
  return <StoryPlayground component={ImageEditor} props={props} />
}
