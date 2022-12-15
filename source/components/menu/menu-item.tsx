import React, { FC } from 'react'

import { MenuItem as MenuItemComponent, MenuItemProps } from 'react-menu-list'

import { Icon } from '..'
import { useZoomComponent } from '../../hooks'
import { ConditionalWrapper } from '../conditional-wrapper'
import { CustomLink, CustomLinkNS } from '../custom-link'

export namespace MenuItemNS {
  export interface Item extends Omit<MenuItemProps, 'children'> {
    title: string
    onClick?: () => void
    link?: string
    isActive?: boolean
    children?: Props[]
    accelerator?: {
      ctrlOrCmd?: 'control' | 'command'
      otherKeys: string
    }
  }

  export interface Props extends Item {
    linkComponent?: CustomLinkNS.Props['userLink']
    isRTL?: boolean
  }
}

export const MenuItem: FC<MenuItemNS.Props> = ({
  title,
  onClick,
  link,
  isActive,
  accelerator,
  className,
  linkComponent,
  isRTL,
  ...rest
}) => {
  const { createClassName } = useZoomComponent('menu-item')

  const containerClasses = createClassName(className, '', {
    'active': !!isActive,
    'rtl-layout': !!isRTL,
  })

  return (
    <MenuItemComponent {...rest} className={containerClasses}>
      <ConditionalWrapper
        condition={!!onClick}
        trueWrapper={children => (
          <span className="menu-item-child">{children}</span>
        )}
        falseWrapper={children => (
          <CustomLink
            userLink={linkComponent}
            onClick={onClick}
            href={link}
            className="menu-item-child"
          >
            {children}
          </CustomLink>
        )}
      >
        <span className="menu-item-title">{title}</span>

        {accelerator && (
          <span className="menu-item-accelerator">
            {accelerator.ctrlOrCmd &&
              (accelerator.ctrlOrCmd === 'command' ? (
                <span className="command">
                  <Icon name="keyboard_command_key" />
                </span>
              ) : (
                <span className="control">Ctrl</span>
              ))}
            <span className="other-keys">{'+' + accelerator.otherKeys}</span>
          </span>
        )}
      </ConditionalWrapper>
    </MenuItemComponent>
  )
}
