import React, {
  createElement,
  FC,
  FunctionComponentElement,
  HTMLAttributes,
  MouseEvent,
  ReactNode,
  useRef,
  useState,
} from 'react'

import { useZoomComponent } from '../../hooks'

import { Menu, MenuItem, MenuNS } from '..'

export namespace ContextMenuNS {
  export type Menu = FunctionComponentElement<MenuNS.Props> | null

  export interface Props extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode
    items: MenuItem[]
    menuProps?: Omit<MenuNS.Props, 'items'>
  }
}

export const ContextMenu: FC<ContextMenuNS.Props> = ({
  children,
  items,
  className,
  menuProps: userMenuProps,
  ...rest
}) => {
  const [menuComponent, setMenuComponent] = useState<ContextMenuNS.Menu>(null)
  const { createClassName } = useZoomComponent('context-menu')
  const containerClasses = createClassName(className)
  const menuButtonRef = useRef<HTMLButtonElement | null>(null)

  const openMenu = (evt: MouseEvent<HTMLDivElement>) => () => {
    const { current: menuButton } = menuButtonRef
    if (!menuButton) {
      return null
    }

    menuButton.classList.add('zoomrc-context-menu-button')
    menuButton.style.left = `${evt.clientX}px`
    menuButton.style.top = `${evt.clientY}px`
    menuButton.querySelector<HTMLDivElement>('button.menu-button')?.click()
  }

  const handleOnContextMenu = (evt: MouseEvent<HTMLDivElement>) => {
    evt.preventDefault()

    if (!menuComponent) {
      const menu = createElement(Menu, menuProps)
      setMenuComponent(menu)
      setTimeout(openMenu(evt), 100)
    }
  }

  const menuProps: MenuNS.Props = {
    ...userMenuProps,
    items,
    onClose: () => setMenuComponent(null),
    containerRef: menuButtonRef,
    style: { visibility: 'hidden' },
  }

  return (
    <div
      {...rest}
      className={containerClasses}
      onContextMenu={handleOnContextMenu}
    >
      {menuComponent}
      {children}
    </div>
  )
}
