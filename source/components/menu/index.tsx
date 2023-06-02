import React, { forwardRef } from 'react'

import { Dropdown, MenuButton, MenuList } from 'react-menu-list'

import { Button, type ButtonNS } from '..'
import { useZoomComponent, useZoomContext } from '../../hooks'

import { type MenuItemNS } from './menu-item'
import { Items } from './menu-items'

export namespace MenuNS {
  export type Item = MenuItemNS.Item

  export interface Props
    extends Omit<ButtonNS.Props, 'href'>,
      Pick<MenuItemNS.Props, 'closeOnItemClick'> {
    items: Item[]
    onClose?: () => void
    onOpen?: () => void
  }
}

export const Menu = forwardRef<HTMLButtonElement, MenuNS.Props>(
  (
    { items, className, children, onClose, onOpen, closeOnItemClick, ...buttonProps },
    reference,
  ) => {
    const { createClassName } = useZoomComponent('menu')
    const { isDarwin, linkComponent, isRTL } = useZoomContext()

    const containerClasses = createClassName(className, '', {
      'rtl-layout': !!isRTL,
    })

    return (
      <Button {...buttonProps} ref={reference} className={containerClasses} useSpan>
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
  },
)
