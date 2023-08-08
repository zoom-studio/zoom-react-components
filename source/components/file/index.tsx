import React, { type MouseEvent, forwardRef, useRef, type Ref } from 'react'

import { formatFileSize } from '@zoom-studio/js-ts-utils'

import { ConditionalWrapper, ExplorerNS, Icon, Image, Progress, SVGIcon, Text, Title } from '../..'
import { useComponentSize, useZoomComponent, useZoomContext } from '../../hooks'
import { type BaseComponent, type CommonSize } from '../../types'
import { customizeFileTypeColors, getFileTypeColors, isImage } from '../explorer/utils'
import { CustomLink } from '../custom-link'

export namespace FileNS {
  export interface DownloadableSettings {
    percentage: number
    isDownloaded: boolean
  }

  export interface LinkedSettings {
    openOnNewTab?: boolean
  }

  export interface Props extends Omit<BaseComponent, 'children'> {
    size?: CommonSize
    fileType: ExplorerNS.MaybeAllFileTypes
    url: string
    fileName: string
    fileSize: number
    downloadable?: DownloadableSettings | false
    linked?: LinkedSettings
    withImageViewer?: boolean
    typeColors?: Partial<ExplorerNS.TypeColors>
    autoWidth?: boolean
    openImageViewerOnClick?: boolean
  }
}

export const File = forwardRef<HTMLDivElement, FileNS.Props>(
  (
    {
      typeColors: providedTypeColors,
      size: providedSize,
      withImageViewer = true,
      autoWidth = true,
      openImageViewerOnClick = true,
      className,
      containerProps,
      fileName,
      downloadable,
      fileSize,
      fileType,
      url,
      linked,
      onClick,
      ...rest
    },
    reference,
  ) => {
    const size = useComponentSize(providedSize)
    const imageRef = useRef<HTMLImageElement | undefined>(undefined)

    const typeColors: ExplorerNS.TypeColors = customizeFileTypeColors(
      ExplorerNS.DefaultTypeColors,
      providedTypeColors,
    )

    const { createClassName } = useZoomComponent('file')
    const { linkComponent } = useZoomContext()

    const isImageFile = isImage(fileType)

    const previewSize = size === 'small' ? 40 : size === 'normal' ? 50 : 60

    const fileColors = getFileTypeColors(fileType, typeColors)

    const shouldRenderDownloadIcon =
      downloadable &&
      !downloadable.isDownloaded &&
      (!downloadable.percentage || downloadable.percentage >= 100)

    const isDownloading =
      !!downloadable &&
      !downloadable.isDownloaded &&
      downloadable.percentage > 0 &&
      downloadable.percentage < 100

    const classes = createClassName(className, '', {
      [createClassName('', 'auto-width')]: !!autoWidth,
      [createClassName('', 'clickable')]: !!onClick || !!linked || isImageFile,
      [createClassName('', size)]: true,
    })

    const handleOnClick = (evt: MouseEvent<HTMLDivElement>) => {
      if (openImageViewerOnClick && isImageFile && !linked) {
        imageRef.current?.click()
      }

      onClick?.(evt)
    }

    return (
      <div
        {...containerProps}
        {...rest}
        className={classes}
        ref={reference}
        onClick={handleOnClick}
      >
        <ConditionalWrapper
          condition={!!linked}
          falseWrapper={children => <div className="file-container">{children}</div>}
          trueWrapper={children => (
            <CustomLink
              userLink={linkComponent}
              target={linked?.openOnNewTab ? '_blank' : undefined}
              href={url}
              className="file-container"
            >
              {children}
            </CustomLink>
          )}
        >
          <div className="file-preview">
            {isDownloading && (
              <Progress
                type="circular"
                className="download-progress"
                circularSize={previewSize + 6}
                circularStroke={6}
                steps={{ percentage: downloadable.percentage, color: fileColors.background }}
                showInfo
                info="percentage"
                circularPercentageFontSize={previewSize / 3}
              />
            )}

            {shouldRenderDownloadIcon ? (
              <div
                className="download-icon-container"
                style={{
                  width: previewSize,
                  height: previewSize,
                  background: fileColors.background,
                }}
              >
                <Icon name="download" className="download-icon" />
              </div>
            ) : (
              <>
                {isImageFile && !downloadable ? (
                  <Image
                    src={url}
                    className="image-preview"
                    onOpenImageViewerClick={evt => {
                      evt.preventDefault()
                    }}
                    withImageViewer={withImageViewer}
                    imageViewerOpenerIconSize={previewSize / 2}
                    width={previewSize}
                    shape="circle"
                    height={previewSize}
                    ref={imageRef as Ref<HTMLImageElement>}
                  />
                ) : (
                  <div
                    className="unknown-preview"
                    style={{
                      width: previewSize,
                      height: previewSize,
                      background: fileColors.background,
                    }}
                  >
                    {!isDownloading && (
                      <SVGIcon
                        name="file"
                        size={previewSize / 1.8}
                        className="file-icon"
                        color="white"
                      />
                    )}
                  </div>
                )}
              </>
            )}
          </div>

          <div className="file-info">
            <Title h6 className="file-name">
              <span className="name">{fileName}</span>
              <span className="type">{'.'.concat(fileType)}</span>
            </Title>
            <Text className="file-size">{formatFileSize(fileSize)}</Text>
          </div>
        </ConditionalWrapper>
      </div>
    )
  },
)
