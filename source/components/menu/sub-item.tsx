import React, { FC, ReactNode } from 'react'

import {
  SubMenuItem as SubMenuItemComponent,
  SubMenuItemProps,
} from 'react-menu-list'

export namespace SubMenuItemNS {
  export interface Props extends Omit<SubMenuItemProps, 'menu' | 'children'> {
    title: string
    children?: ReactNode
  }
}

export const SubMenuItem: FC<SubMenuItemNS.Props> = ({
  title,
  children,
  ...rest
}) => {
  return (
    <SubMenuItemComponent {...rest} menu={children}>
      {title}
    </SubMenuItemComponent>
  )
}
