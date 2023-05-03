import React, { FC } from 'react'

import { ComponentMeta } from '@storybook/react'
import { randomImage } from '@zoom-studio/zoom-js-ts-utils'

import { Button, ImageViewer, ImageViewerNS, useMessage } from '../components'
import { CommonStory, StoryPlayground } from './components'
import { useI18n } from './hooks/use-i18n'

const generateImage = (length = 10): ImageViewerNS.Image[] => {
  return Array.from(Array(length)).map((_, index) => ({
    name: `sample-image-name-which-is-at-index-${index}-of-${length}-images-in-total.jpeg`,
    source: randomImage(),
  }))
}

export default {
  title: 'Data display/Image viewer',
  component: ImageViewer,
  args: {
    images: generateImage(6),
    showDelete: true,
    showDownload: true,
    showPrint: true,
    showSlides: true,
    showCounter: true,
    showName: true,
    showZoomControls: true,
    confirmBeforeDelete: true,
    defaultActiveImageIndex: 0,
  },
} as ComponentMeta<typeof ImageViewer>

const useImageViewerStory = () => {
  const { toast } = useMessage()
  const { t } = useI18n('imageViewer')

  const onWillPrint = () => toast.success('Printed')
  const onWillDownload = () => toast.success('Downloaded')
  const onWillZoom = (type: ImageViewerNS.ZoomTypes) => toast.success(`Zoomed ${type}`)
  const onDelete = () => toast.success('Deleted')
  const onWillNavigate = (type: ImageViewerNS.NavigateTypes) => toast.success(`${type} navigation`)
  const onWillClose = () => toast.success('Closed')
  const onWillDoubleClick = () => toast.success('Double clicked')

  const children = ({ openImageViewer }: ImageViewerNS.ChildrenCallbackParams) => (
    <Button onClick={openImageViewer}>{t('opener')}</Button>
  )

  const handlers = {
    onWillDownload,
    onWillPrint,
    onWillZoom,
    onDelete,
    onWillNavigate,
    onWillClose,
    onWillDoubleClick,
  }

  return { handlers, children }
}

export const MultipleImages = () => {
  const { children } = useImageViewerStory()
  return (
    <CommonStory
      component={ImageViewer}
      stories={[{ group: [{ props: { children, images: generateImage(30) } }] }]}
    />
  )
}

export const SingleImages = () => {
  const { children } = useImageViewerStory()
  return (
    <CommonStory
      component={ImageViewer}
      stories={[{ group: [{ props: { children, images: generateImage(1) } }] }]}
    />
  )
}

export const DeleteImage = () => {
  const { children, handlers } = useImageViewerStory()
  return (
    <CommonStory
      component={ImageViewer}
      stories={[
        {
          group: [
            {
              name: 'Without delete button (Default)',
              props: { children, images: generateImage(4) },
            },
            {
              name: 'With delete button (With pop confirm before delete - Default)',
              props: {
                children,
                images: generateImage(4),
                showDelete: true,
                onDelete: handlers.onDelete,
              },
            },
            {
              name: 'With delete button (Without pop confirm before delete)',
              props: {
                children,
                images: generateImage(4),
                showDelete: true,
                onDelete: handlers.onDelete,
                confirmBeforeDelete: false,
              },
            },
          ],
        },
      ]}
    />
  )
}

export const PrintImage = () => {
  const { children } = useImageViewerStory()
  return (
    <CommonStory
      component={ImageViewer}
      stories={[
        {
          group: [
            {
              name: 'With print button (Default)',
              props: { children, images: generateImage(4) },
            },
            {
              name: 'Without print button',
              props: { children, images: generateImage(4), showPrint: false },
            },
            {
              name: 'Custom print content',
              props: {
                children,
                images: generateImage(4),
                printSettings: {
                  content: ({ name, source }) => (
                    <div>
                      <p>My custom print content</p>
                      <p>Image name: {name}</p>
                      <img src={source} />
                    </div>
                  ),
                },
              },
            },
          ],
        },
      ]}
    />
  )
}

export const DownloadImage = () => {
  const { children } = useImageViewerStory()
  return (
    <CommonStory
      component={ImageViewer}
      stories={[
        {
          group: [
            {
              name: 'With download button (Default)',
              props: { children, images: generateImage(4) },
            },
            {
              name: 'Without download button',
              props: { children, images: generateImage(4), showDownload: false },
            },
          ],
        },
      ]}
    />
  )
}

export const slides = () => {
  const { children } = useImageViewerStory()
  return (
    <CommonStory
      component={ImageViewer}
      stories={[
        {
          group: [
            {
              name: 'With slides (Default)',
              props: { children, images: generateImage(4) },
            },
            {
              name: 'Without slides',
              props: { children, images: generateImage(4), showSlides: false },
            },
          ],
        },
      ]}
    />
  )
}

export const ImagesName = () => {
  const { children } = useImageViewerStory()
  return (
    <CommonStory
      component={ImageViewer}
      stories={[
        {
          group: [
            {
              name: 'With images name (Default)',
              props: { children, images: generateImage(4) },
            },
            {
              name: 'Without images name',
              props: { children, images: generateImage(4), showName: false },
            },
          ],
        },
      ]}
    />
  )
}

export const Counter = () => {
  const { children } = useImageViewerStory()
  return (
    <CommonStory
      component={ImageViewer}
      stories={[
        {
          group: [
            {
              name: 'With counter (Default)',
              props: { children, images: generateImage(4) },
            },
            {
              name: 'Without counter',
              props: { children, images: generateImage(4), showCounter: false },
            },
          ],
        },
      ]}
    />
  )
}

export const ZoomControllers = () => {
  const { children } = useImageViewerStory()
  return (
    <CommonStory
      component={ImageViewer}
      stories={[
        {
          group: [
            {
              name: 'With zoom controllers (Default)',
              props: { children, images: generateImage(4) },
            },
            {
              name: 'Without zoom controllers',
              props: { children, images: generateImage(4), showZoomControls: false },
            },
          ],
        },
      ]}
    />
  )
}

export const DefaultActiveImage = () => {
  const { children } = useImageViewerStory()
  return (
    <CommonStory
      component={ImageViewer}
      stories={[
        {
          group: [
            {
              name: '[0] is the active image by default (Default)',
              props: { children, images: generateImage(4) },
            },
            {
              name: '[2] is the active image by default',
              props: { children, images: generateImage(4), defaultActiveImageIndex: 2 },
            },
          ],
        },
      ]}
    />
  )
}

export const Playground: FC<ImageViewerNS.Props> = props => {
  const { children, handlers } = useImageViewerStory()

  return (
    <StoryPlayground
      component={ImageViewer}
      props={{
        ...props,
        ...handlers,
        children,
      }}
    />
  )
}
