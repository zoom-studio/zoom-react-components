import React, { FC, ReactNode } from 'react'

import {
  SubMenuItem as SubMenuItemComponent,
  SubMenuItemProps,
} from 'react-menu-list'
import { classNames } from '@zoom-studio/zoom-js-ts-utils'

import { Icon } from '../icon'

export namespace SubMenuItemNS {
  export interface Props extends Omit<SubMenuItemProps, 'menu' | 'children'> {
    title?: string
    children?: ReactNode
    isRTL?: boolean
  }
}

export const SubMenuItem: FC<SubMenuItemNS.Props> = ({
  title,
  children,
  isRTL,
  ...rest
}) => {
  const iconClassnames = classNames('chevron-icon', {
    'ltr-layout': !isRTL,
  })

  return (
    <SubMenuItemComponent {...rest} menu={children}>
      <Icon name="chevron_left" className={iconClassnames} />

      <span className="menu-item-child">{title}</span>
    </SubMenuItemComponent>
  )
}
