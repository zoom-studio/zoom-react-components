import React, { FC, MouseEvent } from 'react'

import { MenuItem as MenuItemComponent } from 'react-menu-list'

import { Icon } from '..'
import { useZoomComponent } from '../../hooks'
import { ConditionalWrapper } from '../conditional-wrapper'
import { CustomLink, CustomLinkNS } from '../custom-link'

export namespace MenuItemNS {
  export interface Item {
    title?: string
    className?: string
    onClick?: () => void
    link?: string
    isActive?: boolean
    children?: Props[]
    isSeparator?: boolean
    accelerator?: {
      ctrlOrCmd?: boolean
      otherKeys: string[]
    }
  }

  export interface Props extends Item {
    linkComponent?: CustomLinkNS.Props['userLink']
    isRTL?: boolean
    isDarwinOS?: boolean
    closeOnItemClick?: boolean
  }
}

export const MenuItem: FC<MenuItemNS.Props> = ({
  closeOnItemClick = true,
  title,
  onClick,
  link,
  isActive,
  accelerator,
  className,
  linkComponent,
  isRTL,
  isDarwinOS,
  isSeparator,
  ...rest
}) => {
  const { createClassName } = useZoomComponent('menu-item')

  const containerClasses = createClassName(className, '', {
    'active': !!isActive,
    'rtl-layout': !!isRTL,
  })

  const handleOnClick = (evt: MouseEvent<HTMLSpanElement>) => {
    if (!closeOnItemClick) {
      evt.stopPropagation()
    }
    onClick?.()
  }

  return (
    <MenuItemComponent {...rest} className={containerClasses}>
      {isSeparator ? (
        <span className="separator" />
      ) : (
        <ConditionalWrapper
          condition={!!onClick}
          trueWrapper={children => (
            <span className="menu-item-child" onClick={handleOnClick}>
              {children}
            </span>
          )}
          falseWrapper={children => (
            <CustomLink
              userLink={linkComponent}
              onClick={handleOnClick}
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
                (isDarwinOS ? (
                  <span className="command">
                    <Icon name="keyboard_command_key" />
                  </span>
                ) : (
                  <span className="control">Ctrl</span>
                ))}
              <span className="other-keys">
                {(accelerator.ctrlOrCmd ? '+' : '') +
                  accelerator.otherKeys.join('+')}
              </span>
            </span>
          )}
        </ConditionalWrapper>
      )}
    </MenuItemComponent>
  )
}
