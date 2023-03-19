import { SelectNS } from '..'

import { ExplorerNS } from '.'
import { color } from '../../utils'

export const getFileTypesFilterOptions = (i18n: Required<ExplorerNS.I18n>) => {
  const options: SelectNS.Option<ExplorerNS.MaybeAllFileTypesWithAll>[] = [
    { label: i18n.allTypes, value: 'all' },
  ]

  for (const option of ExplorerNS.AllFileTypes) {
    if (option !== 'unknowns') {
      options.push({ label: option, value: option })
    }
  }

  return options
}

export const isImage = (fileType: ExplorerNS.MaybeAllFileTypes): boolean => {
  return ExplorerNS.ImageType.includes(<ExplorerNS.ImageType>fileType)
}

export const customizeFileTypeColors = (
  defaultColors: ExplorerNS.TypeColors,
  providedColors?: Partial<ExplorerNS.TypeColors>,
): ExplorerNS.TypeColors => {
  const colors: Partial<ExplorerNS.TypeColors> = {
    ...providedColors,
  }

  Object.keys(defaultColors).forEach(type => {
    colors[type] = providedColors?.[type] ?? defaultColors[type]
  })

  return <Required<ExplorerNS.TypeColors>>colors
}

export const getFileTypeColors = (
  type: ExplorerNS.MaybeNotPreviewedKnownFileType,
  colors: ExplorerNS.TypeColors,
): ExplorerNS.TypeColorInfo => {
  if (type in colors) {
    return colors[type]
  }
  if (isImage(type)) {
    return { background: color({ source: 'accent' }), foreground: 'white' }
  }
  return colors.unknowns
}

export const excludeFileExtension = (fileName: string): string => {
  return fileName.split('.')[0]
}

export const getDefaultViewMode = (providedViewMode?: ExplorerNS.ViewMode): ExplorerNS.ViewMode => {
  if (providedViewMode) {
    return providedViewMode
  }

  const storedViewMode = <ExplorerNS.ViewMode>localStorage.getItem(ExplorerNS.VIEW_MODE_STORE_KEY)
  if (ExplorerNS.ViewMode.includes(storedViewMode)) {
    return storedViewMode
  }

  return 'grid'
}
