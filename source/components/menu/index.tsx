import React, { FC } from 'react'

import { Dropdown, MenuButton, MenuList } from 'react-menu-list'

import { Button, ButtonNS } from '..'
import { useZoomComponent, useZoomContext } from '../../hooks'

import { MenuItemNS } from './menu-item'
import { Items } from './menu-items'

export namespace MenuNS {
  export type Item = MenuItemNS.Item

  export interface Props
    extends Omit<ButtonNS.Props, 'href'>,
      Pick<MenuItemNS.Props, 'linkComponent' | 'closeOnItemClick'> {
    items: Item[]
    isRTL?: boolean
    onClose?: () => void
    onOpen?: () => void
  }
}

export const Menu: FC<MenuNS.Props> = ({
  items,
  className,
  children,
  isRTL,
  linkComponent,
  onClose,
  onOpen,
  closeOnItemClick,
  ...buttonProps
}) => {
  const { createClassName } = useZoomComponent('menu')
  const { isDarwin } = useZoomContext()

  const containerClasses = createClassName(className, '', {
    'rtl-layout': !!isRTL,
  })

  return (
    <Button {...buttonProps} className={containerClasses} useSpan>
      {children}
      <MenuButton
        className="menu-button"
        onWillClose={onClose}
        onWillOpen={onOpen}
        positionOptions={{
          position: 'bottom',
          vAlign: 'bottom',
          hAlign: isRTL ? 'right' : 'left',
        }}
        menu={
          <Dropdown className={`${containerClasses} dropdown`}>
            <MenuList>
              <Items
                items={items}
                isRTL={isRTL}
                linkComponent={linkComponent}
                isDarwin={isDarwin}
                closeOnItemClick={closeOnItemClick}
              />
            </MenuList>
          </Dropdown>
        }
      />
    </Button>
  )
}
