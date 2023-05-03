import React, { forwardRef } from 'react'

import { formatFileSize } from '@zoom-studio/zoom-js-ts-utils'

import { useComponentSize, useZoomComponent } from '../../hooks'
import { BaseComponent, CommonSize } from '../../types'
import { ExplorerNS, Image, SVGIcon, Text } from '../..'
import { isImage } from '../explorer/utils'

export namespace FileNS {
  export interface Props extends Omit<BaseComponent, 'children'> {
    size?: CommonSize
    fileType: ExplorerNS.MaybeAllFileTypes
    url: string
    fileName: string
    fileSize: number
    downloadable?: boolean
    downloadedSize?: number
    withImageViewer?: boolean
  }
}

export const File = forwardRef<HTMLDivElement, FileNS.Props>(
  (
    {
      size: providedSize,
      withImageViewer = true,
      className,
      containerProps,
      fileName,
      downloadable,
      downloadedSize,
      fileSize,
      fileType,
      url,
    },
    reference,
  ) => {
    const { createClassName } = useZoomComponent('file')
    const size = useComponentSize(providedSize)

    const previewSize = 60

    const classes = createClassName(className, '', {
      [createClassName('', size)]: true,
    })

    return (
      <div {...containerProps} className={classes} ref={reference}>
        <div className="file-preview">
          {isImage(fileType) ? (
            <Image
              src={url}
              className="image-preview"
              withImageViewer={withImageViewer}
              imageViewerOpenerIconSize={previewSize / 2}
              width={previewSize}
              height={previewSize}
            />
          ) : (
            <div className="unknown-preview">
              <SVGIcon
                name="file"
                size={previewSize}
                className="file-icon"
                color={color => color({ source: 'accent' })}
              />

              <Text className="file-type" small bold>
                {fileType.toUpperCase()}
              </Text>
            </div>
          )}
        </div>

        <div className="file-info">
          <Text className="file-name">{fileName}</Text>
          <Text className="file-size">{formatFileSize(fileSize)}</Text>
        </div>
      </div>
    )
  },
)
