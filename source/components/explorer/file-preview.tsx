import React, { type FC, type ReactNode } from 'react'

import { Image, SVGIcon, Text } from '..'

import { type ExplorerNS } from '.'
import { getFileTypeColors, isImage } from './utils'

export namespace ExplorerFilePreviewNS {
  export interface Props {
    type: ExplorerNS.MaybeAllFileTypes
    link: string
    typeColors: ExplorerNS.TypeColors
    viewMode: ExplorerNS.ViewMode
  }
}

export const ExplorerFilePreview: FC<ExplorerFilePreviewNS.Props> = ({
  type,
  link,
  typeColors,
  viewMode,
}) => {
  const previewsSize = viewMode === 'grid' ? 50 : 20

  const renderImagePreview = (): ReactNode => {
    return (
      <Image
        src={link}
        className="image-preview"
        width={viewMode === 'grid' ? '90%' : previewsSize}
        height={previewsSize}
      />
    )
  }

  const renderUnknownFilePreview = (): ReactNode => {
    const colors = getFileTypeColors(type, typeColors)

    return (
      <div className="unknown-preview">
        <SVGIcon name="file" size={previewsSize} className="file-icon" color={colors.background} />

        {viewMode === 'grid' && (
          <Text className="file-type" small bold style={{ color: colors.foreground }}>
            {type.toUpperCase()}
          </Text>
        )}
      </div>
    )
  }

  return (
    <div className="explorer-file-preview" style={{ height: previewsSize }}>
      {isImage(type) ? renderImagePreview() : renderUnknownFilePreview()}
    </div>
  )
}
