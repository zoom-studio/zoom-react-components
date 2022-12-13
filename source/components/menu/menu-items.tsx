import React, { FC } from 'react'

import { MenuList, Dropdown } from 'react-menu-list'

import { SubMenuItem } from './sub-item'
import { MenuItem, MenuItemNS } from './menu-item'
import { useZoomComponent } from '../../hooks/use-zoom-component'

export namespace ItemsNS {
  export interface Props {
    items: MenuItemNS.Item[]
  }
}

export const Items: FC<ItemsNS.Props> = ({ items }) => {
  const { createClassName } = useZoomComponent('menu-items')

  const containerClasses = createClassName()

  return (
    <>
      {items.map((item, index) => {
        if (item.children) {
          return (
            <SubMenuItem
              className={containerClasses}
              key={index}
              title={item.title}
            >
              <Dropdown>
                <MenuList>
                  <Items items={item.children} key={index} />
                </MenuList>
              </Dropdown>
            </SubMenuItem>
          )
        }

        return <MenuItem {...item} key={index} />
      })}
    </>
  )
}
