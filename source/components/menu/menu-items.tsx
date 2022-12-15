import React, { FC } from 'react'

import { Dropdown, MenuList } from 'react-menu-list'

import { SubMenuItem } from './sub-item'
import { MenuItem, MenuItemNS } from './menu-item'
import { useZoomComponent } from '../../hooks'

export namespace ItemsNS {
  export interface Props extends Pick<MenuItemNS.Props, 'linkComponent'> {
    items: MenuItemNS.Item[]
    isRTL?: boolean
  }
}

export const Items: FC<ItemsNS.Props> = ({ items, isRTL, linkComponent }) => {
  const { createClassName } = useZoomComponent('menu-item')

  const containerClasses = createClassName('with-subitems', '', {
    'rtl-layout': !!isRTL,
  })

  return (
    <>
      {items.map((item, index) => {
        if (item.children) {
          return (
            <SubMenuItem
              className={containerClasses}
              isRTL={isRTL}
              key={index}
              title={item.title}
              positionOptions={{
                position: isRTL ? 'left' : 'right',
                vAlign: 'top',
                hAlign: isRTL ? 'right' : 'left',
              }}
            >
              <Dropdown>
                <MenuList>
                  <Items
                    isRTL={isRTL}
                    items={item.children}
                    key={index}
                    linkComponent={linkComponent}
                  />
                </MenuList>
              </Dropdown>
            </SubMenuItem>
          )
        }

        return (
          <MenuItem
            {...item}
            key={index}
            linkComponent={linkComponent}
            isRTL={isRTL}
          />
        )
      })}
    </>
  )
}
