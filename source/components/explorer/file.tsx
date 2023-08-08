import React, { type FC, type MouseEvent } from 'react'

import { classNames, useDownload } from '@zoom-studio/js-ts-utils'

import { ContextMenu, type SelectableNS, Text } from '..'
import { type MenuItemNS } from '../menu/menu-item'

import { type ExplorerNS } from '.'
import { ExplorerFilePreview } from './file-preview'
import { type UseExplorerI18nNS } from './use-i18n'

export namespace ExplorerFileNS {
  export interface Props extends ExplorerNS.FileInterface, SelectableNS.ChildrenItemProps {
    isSelected: boolean
    typeColors: ExplorerNS.TypeColors
    onClick?: (evt: MouseEvent) => void
    i18n: Required<UseExplorerI18nNS.I18n>
    rename: () => void
  }
}

export const ExplorerFile: FC<ExplorerFileNS.Props> = ({
  'data-key': dataKey,
  className,
  name,
  type,
  isSelected,
  link,
  typeColors,
  createdAt,
  onClick,
  i18n,
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
    <div data-key={dataKey} className={className} onClick={onClick}>
      <ContextMenu items={contextMenuItems} className={classes}>
        <div className="explorer-file">
          <ExplorerFilePreview link={link} type={type} typeColors={typeColors} />

          <div className="file-info">
            <div className="file-name">
              <Text className="name">{name.split('.')[0]}</Text>
              <Text className="type" bold>
                .{type}
              </Text>
            </div>

            <div className="file-date">
              <Text small className="date">
                {createdAt}
              </Text>
            </div>
          </div>
        </div>
      </ContextMenu>
    </div>
  )
}
