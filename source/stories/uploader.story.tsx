import React, { type FC, useState } from 'react'

import { type Meta } from '@storybook/react'
import { pullAt } from 'lodash'
import { faker } from '@faker-js/faker'

import { Uploader, type UploaderNS } from '../components'
import { CommonStory, StoryPlayground } from './components'
import { useI18n } from './hooks/use-i18n'

export default {
  title: 'Data entry/Uploader',
  component: Uploader,
  args: {
    title: 'Upload files',
    description: 'Upload documents you want to share with your team.',
    accept: 'image/*',
    maxFiles: 1,
    loading: false,
    disabled: false,
    disabledOnLoading: true,
    isRemovingFile: false,
    state: ['neutral'],
    className: 'my-uploader',
    id: 'my-uploader',
    files: [],
    containerProps: undefined,
    style: undefined,
    typeColors: undefined,
    stateMessageProps: undefined,
    reference: undefined,
    onWrite: undefined,
    onRemove: undefined,
    onClick: undefined,
  },
} as Meta<typeof Uploader>

const useUploaderStory = (withInitialFiles = false) => {
  const { t } = useI18n('uploader')

  const initialFiles: UploaderNS.FileInterface[] = Array.from(Array(10)).map(() => ({
    name: faker.system.fileName(),
    size: faker.datatype.number({ min: 200, max: 200000, precision: 0.01 }),
    type: faker.system.fileExt(),
  }))

  const [isRemovingFile, setIsRemovingFile] = useState(false)
  const [files, setFiles] = useState<(File | UploaderNS.FileInterface)[]>(
    withInitialFiles ? initialFiles : [],
  )

  const handleOnWrite = (files: File[]) => {
    setFiles(currentFiles => currentFiles.concat(...files))
  }

  const handleOnRemoveFiles: UploaderNS.Props['onRemove'] = (fileIndex, closePopConfirm) => {
    setIsRemovingFile(true)
    setTimeout(() => {
      setFiles(files => {
        const newFiles = [...files]
        pullAt(newFiles, fileIndex)
        return newFiles
      })
      closePopConfirm()
      setIsRemovingFile(false)
    }, 300)
  }

  const commonProps: UploaderNS.Props = {
    files,
    isRemovingFile,
    onWrite: handleOnWrite,
    onRemove: handleOnRemoveFiles,
  }

  return {
    commonProps,
    files,
    setFiles,
    handleOnWrite,
    handleOnRemoveFiles,
    isRemovingFile,
    title: t('title'),
    description: t('description'),
  }
}

export const TitleAndDescription: FC = () => {
  const { title, description } = useUploaderStory()
  const uploader1 = useUploaderStory()
  const uploader2 = useUploaderStory()
  const uploader3 = useUploaderStory()
  const uploader4 = useUploaderStory()
  return (
    <CommonStory
      component={Uploader}
      stories={[
        {
          group: [
            {
              name: 'With title and description',
              props: { ...uploader1.commonProps, title, description },
            },
            { name: 'With title only', props: { ...uploader2.commonProps, title } },
            { name: 'With description only', props: { ...uploader3.commonProps, description } },
            { name: 'Without title and description', props: { ...uploader4.commonProps } },
          ],
        },
      ]}
    />
  )
}

export const MaximumFiles: FC = () => {
  const uploader1 = useUploaderStory()
  const uploader2 = useUploaderStory()
  return (
    <CommonStory
      component={Uploader}
      stories={[
        {
          group: [
            { name: 'maxFiles=1 (Default)', props: { ...uploader1.commonProps } },
            { name: 'maxFiles=5', props: { ...uploader2.commonProps, maxFiles: 5 } },
          ],
        },
      ]}
    />
  )
}

export const AcceptableFiles: FC = () => {
  const uploader1 = useUploaderStory()
  const uploader2 = useUploaderStory()
  const uploader3 = useUploaderStory()
  const uploader4 = useUploaderStory()
  const uploader5 = useUploaderStory()
  const uploader6 = useUploaderStory()
  return (
    <CommonStory
      component={Uploader}
      stories={[
        {
          group: [
            {
              name: 'Accepts any files (Default)',
              props: { ...uploader1.commonProps },
            },
            {
              name: 'Accepts any kind of images',
              props: { ...uploader2.commonProps, accept: 'image/*' },
            },
            {
              name: 'Accepts any kind of audios',
              props: { ...uploader3.commonProps, accept: 'audio/*' },
            },
            {
              name: 'Accepts any kind of videos',
              props: { ...uploader4.commonProps, accept: 'video/*' },
            },
            {
              name: 'Accepts PDFs only',
              props: { ...uploader5.commonProps, accept: '.pdf' },
            },
            {
              name: 'Accepts PDFs and PNGs',
              props: { ...uploader6.commonProps, accept: '.pdf, .png' },
            },
          ],
        },
      ]}
    />
  )
}

export const LoadingAndDisabled: FC = () => {
  const uploader1 = useUploaderStory()
  const uploader2 = useUploaderStory()
  const uploader3 = useUploaderStory()
  const uploader4 = useUploaderStory()
  return (
    <CommonStory
      component={Uploader}
      stories={[
        {
          group: [
            {
              name: 'Normal',
              props: uploader1.commonProps,
            },
            {
              name: 'Loading',
              props: { ...uploader2.commonProps, loading: true },
            },
            {
              name: 'Loading but not disabled',
              props: { ...uploader3.commonProps, loading: true, disabledOnLoading: false },
            },
            {
              name: 'Disabled',
              props: { ...uploader4.commonProps, disabled: true },
            },
          ],
        },
      ]}
    />
  )
}

export const States: FC = () => {
  const { t } = useI18n('global')
  const { title, description } = useUploaderStory()
  const uploader1 = useUploaderStory()
  const uploader2 = useUploaderStory()
  const uploader3 = useUploaderStory()
  const uploader4 = useUploaderStory()
  const uploader5 = useUploaderStory()
  return (
    <CommonStory
      component={Uploader}
      stories={[
        {
          group: [
            {
              props: {
                ...uploader1.commonProps,
                title,
                description,
                state: ['neutral', t('states.neutral')],
              },
              name: 'Neutral',
            },
            {
              props: {
                ...uploader2.commonProps,
                title,
                description,
                state: ['success', t('states.success')],
              },
              name: 'Success',
            },
            {
              props: {
                ...uploader3.commonProps,
                title,
                description,
                state: ['info', t('states.info')],
              },
              name: 'Info',
            },
            {
              props: {
                ...uploader4.commonProps,
                title,
                description,
                state: ['warning', t('states.warning')],
              },
              name: 'Warning',
            },
            {
              props: {
                ...uploader5.commonProps,
                title,
                description,
                state: ['error', t('states.error')],
              },
              name: 'Error',
            },
          ],
        },
      ]}
    />
  )
}

export const Playground: FC<UploaderNS.Props> = props => {
  const { commonProps } = useUploaderStory(false)
  return <StoryPlayground component={Uploader} props={{ ...props, ...commonProps }} />
}
