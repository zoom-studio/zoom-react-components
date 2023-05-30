import React, { type FC, type MouseEvent } from 'react'

import { classNames, useDownload } from '@zoom-studio/zoom-js-ts-utils'

import { ContextMenu, Text } from '..'
import { type MenuItemNS } from '../menu/menu-item'

import { type ExplorerNS } from '.'
import { ExplorerFilePreview } from './file-preview'
import { type UseExplorerI18nNS } from './use-i18n'

export namespace ExplorerFileNS {
  export interface Props extends ExplorerNS.FileInterface {
    isSelected: boolean
    typeColors: ExplorerNS.TypeColors
    onClick?: (evt: MouseEvent) => void
    viewMode: ExplorerNS.ViewMode
    i18n: Required<UseExplorerI18nNS.I18n>
    rename: () => void
  }
}

export const ExplorerFile: FC<ExplorerFileNS.Props> = ({
  name,
  type,
  isSelected,
  link,
  typeColors,
  createdAt,
  onClick,
  viewMode,
  i18n,
  id,
  rename,
}) => {
  const { handleDownload } = useDownload({ link, fileName: name })

  const classes = classNames('file-context-menu', {
    selected: isSelected,
  })

  const handleOnMenuItemsClick = (callBack: () => void) => (evt: MouseEvent<HTMLSpanElement>) => {
    callBack()
    onClick?.(evt)
  }

  const contextMenuItems: MenuItemNS.Item[] = [
    { title: i18n.fileContextMenuDownload, onClick: handleOnMenuItemsClick(handleDownload) },
    { title: i18n.fileContextMenuRename, onClick: handleOnMenuItemsClick(rename) },
  ]

  return (
    <ContextMenu items={contextMenuItems} className={classes} onClick={onClick}>
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
