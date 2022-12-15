import React, { FC } from 'react'

import { Dropdown, MenuButton, MenuList } from 'react-menu-list'

import { Button, ButtonNS } from '..'
import { useZoomComponent } from '../../hooks'

import { MenuItemNS } from './menu-item'
import { Items } from './menu-items'

export type MenuItem = MenuItemNS.Item
export namespace MenuNS {
  export interface Props
    extends Omit<ButtonNS.Props, 'href'>,
      Pick<MenuItemNS.Props, 'linkComponent'> {
    items: MenuItem[]
    isRTL?: boolean
    onClose?: () => void
  }
}

export const Menu: FC<MenuNS.Props> = ({
  items,
  className,
  children,
  isRTL,
  linkComponent,
  onClose,
  ...buttonProps
}) => {
  const { createClassName } = useZoomComponent('menu')

  const containerClasses = createClassName(className, '', {
    'rtl-layout': !!isRTL,
  })

  return (
    <Button {...buttonProps} className={containerClasses}>
      {children}
      <MenuButton
        className="menu-button"
        onWillClose={onClose}
        positionOptions={{
          position: 'bottom',
          vAlign: 'bottom',
          hAlign: isRTL ? 'right' : 'left',
        }}
        menu={
          <Dropdown className={`${containerClasses}-dropdown`}>
            <MenuList>
              <Items
                items={items}
                isRTL={isRTL}
                linkComponent={linkComponent}
              />
            </MenuList>
          </Dropdown>
        }
      />
    </Button>
  )
}
