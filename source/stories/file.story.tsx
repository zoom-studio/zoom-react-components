import React, { type FC } from 'react'

import { faker } from '@faker-js/faker'
import { type Meta } from '@storybook/react'
import { randomNumber, randomPDF } from '@zoom-studio/js-ts-utils'

import { File, type FileNS } from '../components'
import { CommonStory, StoryPlayground } from './components'

export default {
  title: 'Data display/File',
  component: File,
  args: {
    url: faker.image.avatar(),
    fileName: faker.system.fileName({ extensionCount: 0 }),
    fileSize: 8000,
    fileType: 'avi',
    linked: undefined,
    downloadable: false,
    autoWidth: true,
    withImageViewer: true,
    openImageViewerOnClick: true,
    size: 'normal',
    className: 'my-file',
    id: 'my-file',
    containerProps: undefined,
    onClick: undefined,
    style: undefined,
    typeColors: undefined,
  },
} as Meta<typeof File>

const useFileStory = () => {
  const fileName = () => faker.system.fileName({ extensionCount: 0 })
  const image = () => faker.image.avatar()
  const fileSize = () => randomNumber({ min: 30, max: 10000 })

  return { fileName, image, fileSize }
}

export const Models: FC = () => {
  const { fileName, image, fileSize } = useFileStory()

  return (
    <CommonStory
      component={File}
      stories={[
        {
          title: 'Linked',
          group: [
            {
              name: 'Image file',
              props: {
                fileName: fileName(),
                fileType: 'png',
                url: image(),
                fileSize: fileSize(),
                linked: { openOnNewTab: true },
              },
            },
            {
              name: 'Known file type',
              props: {
                fileName: fileName(),
                fileType: 'pdf',
                url: randomPDF(),
                fileSize: fileSize(),
                linked: { openOnNewTab: true },
              },
            },
          ],
        },
        {
          title: 'Downloadable',
          group: [
            {
              name: 'Not downloaded',
              props: {
                fileName: fileName(),
                fileType: 'pdf',
                url: randomPDF(),
                fileSize: fileSize(),
                downloadable: {
                  percentage: 0,
                  isDownloaded: false,
                },
              },
            },
            {
              name: 'Download in progress',
              props: {
                fileName: fileName(),
                fileType: 'json',
                url: randomPDF(),
                fileSize: fileSize(),
                downloadable: {
                  percentage: 78,
                  isDownloaded: false,
                },
              },
            },
            {
              name: 'Download completed',
              props: {
                fileName: fileName(),
                fileType: 'json',
                url: randomPDF(),
                fileSize: fileSize(),
                downloadable: {
                  percentage: 100,
                  isDownloaded: true,
                },
              },
            },
          ],
        },
        {
          title: 'Normal',
          group: [
            {
              name: 'Image file',
              props: {
                fileName: fileName(),
                fileType: 'png',
                url: image(),
                fileSize: fileSize(),
              },
            },
            {
              name: 'Known file type',
              props: {
                fileName: fileName(),
                fileType: 'pdf',
                url: randomPDF(),
                fileSize: fileSize(),
              },
            },
            {
              name: 'Unknown file type',
              props: {
                fileName: fileName(),
                fileType: 'json',
                url: randomPDF(),
                fileSize: fileSize(),
              },
            },
          ],
        },
      ]}
    />
  )
}

export const Sizes: FC = () => {
  const { fileName, fileSize, image } = useFileStory()

  return (
    <CommonStory
      component={File}
      stories={[
        {
          group: [
            {
              name: 'Small',
              props: {
                fileName: fileName(),
                fileSize: fileSize(),
                fileType: 'avi',
                url: image(),
                size: 'small',
              },
            },
            {
              name: 'Normal (Default)',
              props: {
                fileName: fileName(),
                fileSize: fileSize(),
                fileType: 'avi',
                url: image(),
                size: 'normal',
              },
            },
            {
              name: 'Large',
              props: {
                fileName: fileName(),
                fileSize: fileSize(),
                fileType: 'avi',
                url: image(),
                size: 'large',
              },
            },
          ],
        },
      ]}
    />
  )
}

export const Width: FC = () => {
  const { fileName, fileSize, image } = useFileStory()

  return (
    <CommonStory
      component={File}
      stories={[
        {
          group: [
            {
              name: 'Auto (Default)',
              props: {
                fileName: fileName(),
                fileSize: fileSize(),
                fileType: 'avi',
                url: image(),
                size: 'small',
              },
            },
            {
              name: 'Block',
              props: {
                fileName: fileName(),
                fileSize: fileSize(),
                fileType: 'avi',
                url: image(),
                size: 'normal',
                autoWidth: false,
              },
            },
          ],
        },
      ]}
    />
  )
}

export const Playground: FC<FileNS.Props> = props => {
  return <StoryPlayground component={File} props={props} />
}
