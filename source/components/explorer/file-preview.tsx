import React, { type FC, type ReactNode } from 'react'

import { Image, SVGIcon } from '..'

import { type ExplorerNS } from '.'
import { getFileTypeColors, isImage } from './utils'

export namespace ExplorerFilePreviewNS {
  export interface Props {
    type: ExplorerNS.MaybeAllFileTypes
    link: string
    typeColors: ExplorerNS.TypeColors
  }
}

export const ExplorerFilePreview: FC<ExplorerFilePreviewNS.Props> = ({
  type,
  link,
  typeColors,
}) => {
  const previewsSize = 20

  const renderImagePreview = (): ReactNode => {
    return <Image src={link} className="image-preview" width={previewsSize} height={previewsSize} />
  }

  const renderUnknownFilePreview = (): ReactNode => {
    const colors = getFileTypeColors(type, typeColors)

    return (
      <div className="unknown-preview">
        <SVGIcon name="file" size={previewsSize} className="file-icon" color={colors.background} />
      </div>
    )
  }

  return (
    <div className="explorer-file-preview" style={{ height: previewsSize }}>
      {isImage(type) ? renderImagePreview() : renderUnknownFilePreview()}
    </div>
  )
}
