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
    isRtl?: true
  }
}

export const Menu: FC<MenuNS.Props> = ({
  items,
  className,
  children,
  isRtl,
  linkComponent,
  ...buttonProps
}) => {
  const { createClassName } = useZoomComponent('menu')

  const containerClasses = createClassName(className, '', {
    'rtl-layout': !!isRtl,
  })

  return (
    <Button {...buttonProps} className={containerClasses}>
      {children}
      <MenuButton
        className="menu-button"
        positionOptions={{
          position: 'bottom',
          vAlign: 'bottom',
          hAlign: isRtl ? 'right' : 'left',
        }}
        menu={
          <Dropdown className={`${containerClasses}-dropdown`}>
            <MenuList>
              <Items
                items={items}
                isRTL={isRtl}
                linkComponent={linkComponent}
              />
            </MenuList>
          </Dropdown>
        }
      />
    </Button>
  )
}
