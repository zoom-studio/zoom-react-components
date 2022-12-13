import React, { FC } from 'react'

import { MenuItem as MenuItemComponent, MenuItemProps } from 'react-menu-list'
import { Link as RouterLink } from 'react-router-dom'

import { useZoomComponent } from '../../hooks/use-zoom-component'
import { CustomLink, CustomLinkNS } from '../custom-link'
import { Icon } from '..'

export namespace MenuItemNS {
  export interface Item extends Omit<MenuItemProps, 'children'> {
    title: string
    onClick?: () => void
    link?: string
    linkComponent?: CustomLinkNS.Props['UserLink']
    isActive?: boolean
    children?: Props[]
    accelerator?: {
      ctrlOrCmd?: 'control' | 'command'
      otherKeys: string
    }
  }

  export interface Props extends Item {}
}

export const MenuItem: FC<MenuItemNS.Props> = ({
  title,
  onClick,
  link,
  isActive,
  accelerator,
  className,
  linkComponent: LinkComponent = RouterLink,
  ...rest
}) => {
  const { createClassName } = useZoomComponent('menu-item')

  const containerClasses = createClassName(className, '', {
    active: !!isActive,
  })

  return (
    <MenuItemComponent {...rest} className={containerClasses}>
      <CustomLink
        UserLink={LinkComponent}
        onClick={onClick}
        href={link}
        className="menu-item-child"
      >
        <span className="menu-item-title">{title}</span>

        {accelerator && (
          <span className="menu-item-accelerator">
            {accelerator.ctrlOrCmd && (
              <>
                {accelerator.ctrlOrCmd === 'command' ? (
                  <span className="command">
                    <Icon name="keyboard_command_key" />
                  </span>
                ) : (
                  <span className="control">Ctrl</span>
                )}
                +
              </>
            )}
            <span className="other-keys">{accelerator.otherKeys}</span>
          </span>
        )}
      </CustomLink>
    </MenuItemComponent>
  )
}
