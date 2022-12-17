import React, {
  createElement,
  FC,
  FunctionComponentElement,
  HTMLAttributes,
  MouseEvent,
  ReactNode,
  RefObject,
  useRef,
  useState,
} from 'react'

import { useZoomComponent } from '../../hooks'

import { Menu, MenuNS } from '..'

export namespace ContextMenuNS {
  export type Menu = FunctionComponentElement<MenuNS.Props> | null

  export interface Props extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode
    items: MenuNS.Item[]
    menuProps?: Omit<MenuNS.Props, 'items'>
    containerRef?:
      | RefObject<HTMLDivElement>
      | ((element: HTMLDivElement | null) => void)
  }
}

export const ContextMenu: FC<ContextMenuNS.Props> = ({
  menuProps: userMenuProps,
  children,
  items,
  className,
  containerRef,
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
    style: { visibility: 'hidden', position: 'fixed' },
  }

  return (
    <div
      {...rest}
      className={containerClasses}
      onContextMenu={handleOnContextMenu}
      ref={containerRef}
    >
      {menuComponent}
      {children}
    </div>
  )
}
