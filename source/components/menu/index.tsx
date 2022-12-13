import React, { FC } from 'react'

import { MenuList, MenuButton, Dropdown } from 'react-menu-list'

import { Button, ButtonNS } from '..'
import { useZoomComponent } from '../../hooks/use-zoom-component'

import { MenuItemNS } from './menu-item'
import { Items } from './menu-items'

export namespace MenuNS {
  export interface Props extends Omit<ButtonNS.Props, 'href'> {
    items: MenuItemNS.Item[]
  }
}

export const Menu: FC<MenuNS.Props> = ({
  items,
  className,
  children,
  ...buttonProps
}) => {
  const { createClassName } = useZoomComponent('menu')

  const containerClasses = createClassName(className)

  return (
    <Button {...buttonProps} className={containerClasses}>
      {children}
      <MenuButton
        className="menu-button"
        menu={
          <Dropdown className={`${containerClasses}-dropdown`}>
            <MenuList>
              <Items items={items} />
            </MenuList>
          </Dropdown>
        }
      />
    </Button>
  )
}
