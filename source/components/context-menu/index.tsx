import React, {
  createElement,
  forwardRef,
  FunctionComponentElement,
  MouseEvent,
  MutableRefObject,
  ReactNode,
  RefObject,
  useRef,
  useState,
} from 'react'

import { useZoomComponent } from '../../hooks'

import { Menu, MenuNS } from '..'
import { logs } from '../../constants'
import { BaseComponent } from '../../types'

export namespace ContextMenuNS {
  export type Menu = FunctionComponentElement<MenuNS.Props> | null

  export interface Props extends Omit<BaseComponent, 'reference'> {
    children?: ReactNode
    items: MenuNS.Item[]
    menuProps?: Omit<MenuNS.Props, 'items'>
    reference?: RefObject<HTMLDivElement> | ((element: HTMLDivElement | null) => void)
  }
}

export const ContextMenu = forwardRef<HTMLDivElement, ContextMenuNS.Props>(
  (
    { menuProps: userMenuProps, children, items, className, onClick, containerProps, ...rest },
    reference,
  ) => {
    const [menuComponent, setMenuComponent] = useState<ContextMenuNS.Menu>(null)
    const { createClassName, sendLog } = useZoomComponent('context-menu')
    const containerClasses = createClassName(className)
    const menuButtonRef = useRef<HTMLButtonElement | null>(null)

    const openMenu = (evt: MouseEvent<HTMLDivElement>) => () => {
      const { current: menuButton } = menuButtonRef
      if (!menuButton) {
        sendLog(logs.contextMenuNotFoundButtonRef, 'openMenu function')
        return null
      }

      menuButton.classList.add('zoomrc-context-menu-button')
      menuButton.style.left = `${evt.clientX}px`
      menuButton.style.top = `${evt.clientY}px`
      menuButton.querySelector<HTMLDivElement>('button.menu-button')?.click()
    }

    const handleContextMenu = (evt: MouseEvent<HTMLDivElement>) => {
      if (!menuComponent) {
        const menu = createElement(Menu, menuProps)
        setMenuComponent(menu)
        setTimeout(openMenu(evt), 100)
      }
    }

    const handleOnClicks = (evt: MouseEvent<HTMLDivElement>) => {
      evt.preventDefault()
      evt.stopPropagation()

      if (evt.type === 'click' || evt.nativeEvent.which === 1) {
        onClick?.(evt)
      } else if (evt.type === 'contextmenu' || evt.nativeEvent.which === 3) {
        handleContextMenu(evt)
      }
    }

    const menuProps: MenuNS.Props & { ref: MutableRefObject<HTMLButtonElement | null> } = {
      ...userMenuProps,
      items,
      onClose: () => setMenuComponent(null),
      ref: menuButtonRef,
      style: { visibility: 'hidden', position: 'fixed' },
    }

    return (
      <div
        {...rest}
        className={containerClasses}
        onContextMenu={handleOnClicks}
        onClick={handleOnClicks}
        ref={reference}
      >
        {menuComponent}
        {children}
      </div>
    )
  },
)
