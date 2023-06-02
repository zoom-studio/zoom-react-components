import React, { useState, type FC } from 'react'

import { type Meta } from '@storybook/react'

import { Explorer, type ExplorerNS } from '../components'
import { generateExplorerFiles } from '../fixtures'
import { CommonStory, StoryPlayground } from './components'

export default {
  title: 'Data display/Explorer',
  component: Explorer,
  args: {
    defaultTypeQuery: 'all',
    loading: false,
    disabled: false,
    isTypeSelectDisabled: false,
    isSearchInputDisabled: false,
    selectable: true,
    multiSelect: true,
    isDeletingFiles: false,
    isRenamingFile: false,
    isSavingEditedImage: false,
    files: [],
    className: 'my-explorer',
    id: 'my-explorer',
    containerProps: undefined,
    onClick: undefined,
    reference: undefined,
    style: undefined,
    onDeleteFiles: undefined,
    onRenameFile: undefined,
    onSearch: undefined,
    onEditImage: undefined,
    onSelectItems: undefined,
    uploaderProps: undefined,
    alert: undefined,
    typeColors: undefined,
    filterTypes: undefined,
  },
} as Meta<typeof Explorer>

const useExplorerStory = (withInitialFiles = true) => {
  const [isRenamingFile, setIsRenamingFile] = useState(false)
  const [isSavingEditedImage, setIsSavingEditedImage] = useState(false)
  const [isDeletingFiles, setIsDeletingFiles] = useState(false)
  const [uploaderFiles, setUploaderFiles] = useState<File[]>([])
  const [queries, setQueries] = useState<Partial<ExplorerNS.SearchParameters>>({})
  const [files, setFiles] = useState<ExplorerNS.FileInterface[]>(
    withInitialFiles ? generateExplorerFiles(100) : [],
  )

  const queriedFiles = files.filter(
    file =>
      file.name.includes(queries.query ?? '') &&
      (!queries.type || queries.type === 'all' || queries.type === file.type),
  )

  const onDeleteFiles: ExplorerNS.Props['onDeleteFiles'] = (
    fileIDs,
    closePopConfirm,
    clearSelectedFiles,
  ) => {
    setIsDeletingFiles(true)
    setTimeout(() => {
      setFiles(files => files.filter(file => !fileIDs.includes(file.id)))
      setIsDeletingFiles(false)
      closePopConfirm()
      clearSelectedFiles()
    }, 1000)
  }

  const onRenameFile: ExplorerNS.Props['onRenameFile'] = (fileID, newName, closeModal) => {
    setIsRenamingFile(true)
    setTimeout(() => {
      setFiles(files =>
        files.map(file => {
          if (file.id === fileID) {
            return { ...file, name: newName }
          }
          return file
        }),
      )
      setIsRenamingFile(false)
      closeModal()
    }, 1000)
  }

  const onEditImage: ExplorerNS.Props['onEditImage'] = (imageID, newImageResult, closeModal) => {
    if (newImageResult) {
      setIsSavingEditedImage(true)
      setTimeout(() => {
        setFiles(files =>
          files.map(file => {
            if (file.id === imageID) {
              return { ...file, link: newImageResult.base64 }
            }
            return file
          }),
        )
        setIsSavingEditedImage(false)
        closeModal()
      }, 1000)
    }
  }

  const commonProps: ExplorerNS.Props = {
    onDeleteFiles,
    isDeletingFiles,
    onRenameFile,
    isRenamingFile,
    onEditImage,
    isSavingEditedImage,
    onSearch: setQueries,
    files: queriedFiles,
    uploaderProps: {
      files: uploaderFiles,
      handleClearFiles: () => {
        setUploaderFiles([])
      },
      onWrite: files => {
        setUploaderFiles(currentFiles => currentFiles.concat(files))
      },
    },
  }

  return { commonProps }
}

export const DefaultFilesType = () => {
  const explorer1 = useExplorerStory()
  const explorer2 = useExplorerStory()
  return (
    <CommonStory
      component={Explorer}
      stories={[
        {
          group: [
            { name: 'All types (Default)', props: { ...explorer1.commonProps } },
            {
              name: 'PNGs only',
              props: {
                ...explorer2.commonProps,
                defaultTypeQuery: 'png',
                filterTypes: ['png'],
                isTypeSelectDisabled: true,
              },
            },
          ],
        },
      ]}
    />
  )
}

export const LoadingState = () => {
  const { commonProps } = useExplorerStory()
  return (
    <CommonStory
      component={Explorer}
      stories={[
        {
          group: [{ props: { ...commonProps, loading: true } }],
        },
      ]}
    />
  )
}

export const Disabled = () => {
  const { commonProps } = useExplorerStory()
  return (
    <CommonStory
      component={Explorer}
      stories={[{ group: [{ props: { ...commonProps, disabled: true } }] }]}
    />
  )
}

export const SelectableState = () => {
  const { commonProps } = useExplorerStory()
  return (
    <CommonStory
      component={Explorer}
      stories={[
        {
          group: [
            { name: 'Selectable (Default)', props: { ...commonProps, selectable: true } },
            { name: 'None selectable', props: { ...commonProps, selectable: false } },
          ],
        },
      ]}
    />
  )
}

export const MultiSelect = () => {
  const { commonProps } = useExplorerStory()
  return (
    <CommonStory
      component={Explorer}
      stories={[
        {
          group: [
            { name: 'Multi select (Default)', props: { ...commonProps, multiSelect: true } },
            { name: 'Single select', props: { ...commonProps, multiSelect: false } },
          ],
        },
      ]}
    />
  )
}

export const Playground: FC<ExplorerNS.Props> = props => {
  const { commonProps } = useExplorerStory()
  return <StoryPlayground component={Explorer} props={{ ...props, ...commonProps }} />
}
