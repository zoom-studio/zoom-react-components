import React, { FC } from 'react'

import { Dropdown, MenuList } from 'react-menu-list'

import { SubMenuItem } from './sub-item'
import { MenuItem, MenuItemNS } from './menu-item'
import { useZoomComponent } from '../../hooks'

export namespace ItemsNS {
  export interface Props extends Pick<MenuItemNS.Props, 'linkComponent' | 'closeOnItemClick'> {
    items: MenuItemNS.Item[]
    isRTL?: boolean
    isDarwin: boolean
  }
}

export const Items: FC<ItemsNS.Props> = ({
  items,
  isRTL,
  linkComponent,
  closeOnItemClick,
  isDarwin,
}) => {
  const { createClassName } = useZoomComponent('menu-item')

  const containerClasses = (children: MenuItemNS.Item[], selfDisabled: boolean) => {
    return createClassName('with-subitems', '', {
      'rtl-layout': !!isRTL,
      'disabled': !children.some(child => !child.isDisabled) || selfDisabled,
    })
  }

  return (
    <>
      {items.map((item, index) => {
        if (item.children) {
          return (
            <SubMenuItem
              className={containerClasses(item.children, !!item.isDisabled)}
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
                    isDarwin={isDarwin}
                    closeOnItemClick={closeOnItemClick}
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
            closeOnItemClick={closeOnItemClick}
            isDarwin={isDarwin}
          />
        )
      })}
    </>
  )
}
