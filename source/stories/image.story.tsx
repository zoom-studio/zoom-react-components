import React, { FC, useState } from 'react'

import { ComponentMeta } from '@storybook/react'

import { Button, Image, ImageNS } from '../components'
import { CommonStory, CommonStoryNS, StoryPlayground } from './components'

import { image } from '../fixtures/image'
import { useI18n } from './hooks/use-i18n'

export default {
  title: 'Data display/Image',
  component: Image,
  args: {
    alt: 'Sample image',
    lazy: true,
    width: 200,
    height: 400,
  },
} as ComponentMeta<typeof Image>

const ImageStory: FC<Omit<ImageNS.Props, 'src'>> = props => {
  const { t } = useI18n('image')
  const [key, setKey] = useState(1)

  const getProps = (): ImageNS.Props => {
    const width = props.width ? +props.width : (10 - Math.floor(Math.random() * 5 + 1)) * 100
    const height = props.height ? +props.height : (10 - Math.floor(Math.random() * 5 + 1)) * 100
    return { ...props, src: image(width, height), width, height }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', rowGap: 10 }}>
      <Button onClick={() => setKey(k => k + 1)}>{t('reGenerate')}</Button>
      <Image key={key} {...getProps()} />
    </div>
  )
}

export const LazyLoading: FC<ImageNS.Props> = () => {
  const generateStories = (): CommonStoryNS.Group<ImageNS.Props>[] => {
    const group: CommonStoryNS.Group<ImageNS.Props>[] = []
    Array.from(Array(50)).forEach((_, index) => {
      const size = index + 80
      group.push({ props: { src: image(size, size), width: size, height: size } })
    })
    return group
  }

  return <CommonStory component={Image} stories={[{ group: generateStories() }]} />
}

export const FailureState = () => {
  return (
    <CommonStory
      component={Image}
      stories={[{ group: [{ props: { src: image().replace('//', '//a') } }] }]}
    />
  )
}

export const WithImageViewer = () => {
  return (
    <CommonStory
      component={ImageStory}
      stories={[
        {
          group: [
            {
              name: 'Only the clicked image',
              props: { height: 200, width: 200, withImageViewer: true },
            },
            {
              name: 'Multiple images',
              props: {
                height: 300,
                width: 300,
                withImageViewer: true,
                imageViewerCustomImages: Array.from(Array(10)).map((_, index) => ({
                  name: `Image ${index + 1}`,
                  source: image(),
                })),
              },
            },
            {
              name: 'Custom opener icon size',
              props: {
                height: 500,
                width: 500,
                imageViewerOpenerIconSize: 200,
                withImageViewer: true,
              },
            },
          ],
        },
      ]}
    />
  )
}

export const Shapes = () => {
  const generateStories = (): CommonStoryNS.Group<ImageNS.Props>[] => {
    const group: CommonStoryNS.Group<ImageNS.Props>[] = []
    ImageNS.Shapes.forEach((shape, index) => {
      const size = index + 80
      group.push({
        name: shape,
        props: { src: image(size + 100, size), width: size + 100, height: size, shape },
      })
    })
    return group
  }

  return <CommonStory component={Image} stories={[{ group: generateStories() }]} />
}

export const Playground: FC<ImageNS.Props> = props => {
  return <StoryPlayground component={ImageStory} props={props} />
}
