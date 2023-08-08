import React, { type FC } from 'react'

import { formatFileSize } from '@zoom-studio/js-ts-utils'

import {
  Button,
  type ButtonNS,
  type ExplorerNS,
  PopConfirm,
  Progress,
  Text,
  Tooltip,
  type UploaderNS,
} from '..'
import { getFileTypeColors } from '../explorer/utils'

import { UploaderFilePreview } from './file-preview'
import { type UseUploaderI18nNS } from './use-i18n'

export namespace UploaderFileNS {
  export interface Props
    extends UploaderNS.FileInterface,
      Pick<UploaderNS.Props, 'onRemove' | 'isRemovingFile'> {
    typeColors: ExplorerNS.TypeColors
    isRTL: boolean
    i18n: Required<UseUploaderI18nNS.I18n>
    index: number
  }
}

export const UploaderFile: FC<UploaderFileNS.Props> = ({
  percentage = 100,
  name,
  type,
  typeColors,
  imageSource,
  isRTL,
  i18n,
  size,
  index,
  onRemove,
  isRemovingFile,
}) => {
  const percentageColor = getFileTypeColors(type, typeColors)
  const previewsSize = 40

  const actionButtonProps: ButtonNS.Props = {
    shape: 'circle',
    type: 'secondary',
    variant: 'error',
    className: 'action-button',
  }

  const handleOnRemove = (closePopConfirm: () => void) => () => {
    onRemove?.(index, closePopConfirm)
  }

  return (
    <div className="uploader-file">
      <UploaderFilePreview
        previewsSize={previewsSize}
        typeColors={typeColors}
        imageSource={imageSource}
        type={type}
      />

      <div className="file-info-container">
        <div className="file-name-container">
          <Text small className="file-name">
            {name}
          </Text>
          <Text small className="upload-size">
            {formatFileSize(size, 0)}
          </Text>
        </div>

        <div className="upload-progress">
          <Progress
            steps={{
              color: [percentageColor.background, { '100': color => color({ source: 'success' }) }],
              percentage: parseFloat(percentage.toFixed()),
              withWave: percentage < 100,
            }}
            dynamicInfo
            horizontalHeight={10}
            showInfo
            info="percentage"
            horizontalWidth="100%"
          />
        </div>
      </div>

      <div className="file-actions">
        {percentage === 100 ? (
          <PopConfirm
            title={i18n.removeFileTitle}
            description={i18n.removeFileDescription}
            confirm={handlers => ({
              children: i18n.removeFileConfirm,
              onClick: handleOnRemove(handlers.closePopover),
              disabled: isRemovingFile,
              loading: isRemovingFile,
            })}
            placement={isRTL ? 'top-start' : 'top-end'}
            cancel={handlers => ({
              children: i18n.removeFileDiscard,
              onClick: handlers.closePopover,
              disabled: isRemovingFile,
            })}
            buttonProps={{
              ...actionButtonProps,
              prefixMaterialIcon: 'delete',
              disabled: isRemovingFile,
            }}
          />
        ) : (
          <Tooltip
            title={i18n.cancelUploading}
            placement={isRTL ? 'top-start' : 'top-end'}
            hoverDelay={200}
          >
            <Button {...actionButtonProps} prefixMaterialIcon="close" />
          </Tooltip>
        )}
      </div>
    </div>
  )
}
