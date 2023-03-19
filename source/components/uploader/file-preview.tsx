import React, { FC, ReactNode } from 'react'

import { Image, SVGIcon, Text, ExplorerNS } from '..'
import { getFileTypeColors, isImage } from '../explorer/utils'

export namespace UploaderFilePreviewNS {
  export interface Props {
    type: ExplorerNS.MaybeAllFileTypes
    typeColors: ExplorerNS.TypeColors
    imageSource?: string | null
    previewsSize: number
  }
}

export const UploaderFilePreview: FC<UploaderFilePreviewNS.Props> = ({
  type,
  imageSource,
  typeColors,
  previewsSize,
}) => {
  const renderImagePreview = (): ReactNode => {
    return (
      <Image
        src={imageSource!}
        className="image-preview"
        width={previewsSize}
        height={previewsSize}
        withImageViewer
        imageViewerOpenerIconSize={previewsSize - 10}
      />
    )
  }

  const renderUnknownFilePreview = (): ReactNode => {
    const colors = getFileTypeColors(type, typeColors)

    return (
      <div className="unknown-preview">
        <SVGIcon name="file" size={previewsSize} className="file-icon" color={colors.background} />
        <Text className="file-type" small bold style={{ color: colors.foreground }}>
          {type.toUpperCase()}
        </Text>
      </div>
    )
  }

  return (
    <div className="uploader-file-preview" style={{ height: previewsSize, width: previewsSize }}>
      {isImage(type) && imageSource ? renderImagePreview() : renderUnknownFilePreview()}
    </div>
  )
}
