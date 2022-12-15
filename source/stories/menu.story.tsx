import React, { FC, ReactNode, useEffect } from 'react'

import { ComponentMeta } from '@storybook/react'
import { classNames } from '@zoom-studio/zoom-js-ts-utils'

import { Menu as MenuComponent, MenuNS } from '../components'
import { enMenuItems, faMenuItems } from '../fixtures'
import { addThemeToBody } from '../utils'

import './styles/_menu.scss'

export default {
  title: 'Menu',
  component: MenuComponent,
} as ComponentMeta<typeof MenuComponent>

namespace MenuStoryNS {
  export interface Props {
    children: ReactNode
    layout: 'ltr' | 'rtl'
  }
}

const MenuStory: FC<MenuStoryNS.Props> = ({ children, layout }) => {
  const isRTL = layout === 'rtl'

  useEffect(() => {
    const htmlElement = document.querySelector('html')

    if (htmlElement) {
      htmlElement.setAttribute('dir', layout)
      htmlElement.setAttribute('data-digits', isRTL ? 'farsi' : 'latin')
    }
    addThemeToBody()
  }, [])

  const containerClasses = classNames('menu-story', {
    'rtl-layout': isRTL,
  })

  return (
    <div className={containerClasses}>
      <div className="menu-buttons">{children}</div>
    </div>
  )
}

export const LTRLayout: FC<MenuNS.Props> = () => (
  <MenuStory layout="ltr">
    <MenuComponent items={enMenuItems}>LTR Layout</MenuComponent>
  </MenuStory>
)

export const RTLLayout: FC<MenuNS.Props> = () => (
  <MenuStory layout="rtl">
    <MenuComponent items={faMenuItems} isRtl>
      RTL Layout
    </MenuComponent>
  </MenuStory>
)
