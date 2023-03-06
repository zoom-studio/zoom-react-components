import React, { FC, MouseEvent } from 'react'

import { classNames } from '@zoom-studio/zoom-js-ts-utils'

import { ContextMenu, Text } from '..'

import { ExplorerNS } from '.'
import { ExplorerFilePreview } from './file-preview'

export namespace ExplorerFileNS {
  export interface Props extends ExplorerNS.FileInterface {
    isSelected: boolean
    typeColors: ExplorerNS.TypeColors
    onClick: (evt: MouseEvent) => void
    viewMode: ExplorerNS.ViewMode
  }
}

export const ExplorerFile: FC<ExplorerFileNS.Props> = ({
  id,
  name,
  size,
  type,
  moreInfo,
  isSelected,
  link,
  typeColors,
  createdAt,
  updatedAt,
  onClick,
  viewMode,
}) => {
  const classes = classNames('file-context-menu', {
    selected: isSelected,
  })

  return (
    <ContextMenu items={[{ title: 'sss' }]} className={classes} onClick={onClick}>
      <div className="explorer-file">
        <ExplorerFilePreview viewMode={viewMode} link={link} type={type} typeColors={typeColors} />

        <div className="file-info">
          <div className="file-name">
            <Text className="name">{name.split('.')[0]}</Text>
            <Text className="type" bold>
              .{type}
            </Text>
          </div>

          {viewMode === 'row' && (
            <div className="file-date">
              <Text small className="date">
                {createdAt}
              </Text>
            </div>
          )}
        </div>
      </div>
    </ContextMenu>
  )
}
