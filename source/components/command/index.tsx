import React, {
  Fragment,
  forwardRef,
  useEffect,
  useRef,
  useState,
  type HTMLAttributeAnchorTarget,
  type HTMLAttributes,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
  type RefObject,
} from 'react'

import { doByRef, sleep } from '@zoom-studio/zoom-js-ts-utils'

import { Button, Portal, ScrollView, type EmojiNS, type IconNS } from '..'
import { logs } from '../../constants'
import { useZoomComponent, useZoomContext } from '../../hooks'
import { type BaseComponent } from '../../types'
import { ActionItem } from './action-item'
import { SectionItem } from './section-item'
import { isSection, makeActionItemId, shouldRenderAction, unmakeActionItemId } from './utils'

export namespace CommandNS {
  export const SECTION_TITLE_HEIGHT = 32
  export const ITEMS_WITH_DESCRIPTION_HEIGHT = 64
  export const ITEMS_WITHOUT_DESCRIPTION_HEIGHT = 54
  export const HEADER_HEIGHT = 51

  export const ActionType = ['jump-to', 'callback', 'container'] as const
  export type ActionType = (typeof ActionType)[number]

  export type ActionID = string | number

  export interface Section {
    sectionName: string
    actions: Action[]
  }

  export interface LinkPerformer {
    url: string
    target?: HTMLAttributeAnchorTarget
  }

  export interface Action {
    id: ActionID
    name: string
    type?: ActionType
    performs?: LinkPerformer | ((action: Action) => void)
    keywords?: string
    icon?: IconNS.Names
    emoji?: EmojiNS.Emojis.Names
    description?: string
    subItems?: Item[]
  }

  export type Item = Action | Section

  export interface ChildrenCallbackParams {
    isOpen: boolean
    open: () => void
    close: () => void
    toggle: () => void
  }

  export interface Props extends Omit<BaseComponent, 'children'> {
    children?: ReactNode | ((params: ChildrenCallbackParams) => ReactNode)
    items: Item[]
    defaultIsOpen?: boolean
    backdropRef?: RefObject<HTMLDivElement>
    backdropProps?: HTMLAttributes<HTMLDivElement>
    placeholder?: string
    enabledDynamicPlaceholder?: boolean
  }
}

export const Command = forwardRef<HTMLDivElement, CommandNS.Props>(
  (
    {
      placeholder: providedPlaceholder = 'Search for commands...',
      items = [],
      enabledDynamicPlaceholder = true,
      className,
      containerProps,
      defaultIsOpen,
      backdropRef,
      backdropProps,
      style,
      children,
    },
    reference,
  ) => {
    const { createClassName, sendLog } = useZoomComponent('command')
    const { linkComponent } = useZoomContext()

    const [isOpen, setIsOpen] = useState(!!defaultIsOpen)
    const [placeholder, setPlaceholder] = useState(providedPlaceholder)
    const [query, setQuery] = useState('')
    const [currentItems, setCurrentItems] = useState(items)
    const [prevItems, setPrevItems] = useState(items)
    const [commandBoxHeight, setCommandBoxHeight] = useState(500)
    const [activeItem, setActiveItem] = useState<string | null>(null)

    const bodyRef = useRef<HTMLDivElement>(null)
    const searchInputRef = useRef<HTMLInputElement>(null)

    const classes = createClassName(className, '')
    const backdropClasses = createClassName(className, 'backdrop')

    const close = () => {
      setIsOpen(false)
    }

    const open = () => {
      setIsOpen(true)
    }

    const toggle = () => {
      setIsOpen(isOpen => {
        if (isOpen) {
          close()
          return false
        }
        open()
        return true
      })
    }

    const handleOnMouseEnterAction =
      (action: CommandNS.Action) =>
      (evt: MouseEvent<HTMLDivElement> | MouseEvent<HTMLAnchorElement>) => {
        if (enabledDynamicPlaceholder) {
          setPlaceholder(action.name)
          setActiveItem(makeActionItemId(action.id))
        }
      }

    const handleOnMouseLeaveBody = (evt: MouseEvent<HTMLDivElement>) => {
      setPlaceholder(providedPlaceholder)
    }

    const handleOnMouseEnterSection = (evt: MouseEvent<HTMLDivElement>) => {
      setPlaceholder(providedPlaceholder)
    }

    const doByBodyRef = (functionName: string, callback: (body: HTMLDivElement) => void) => {
      doByRef(bodyRef, callback, () => {
        sendLog(logs.commandBodyRefNotFound, `${functionName} fn`)
      })
    }

    const focusActiveItem = () => {
      if (!activeItem) {
        return
      }

      doByBodyRef('focusActiveItem', body => {
        const activeItemInput = body.querySelector(`*[data-action="true"]#${activeItem} input`) as
          | HTMLInputElement
          | undefined

        activeItemInput?.focus()
        searchInputRef.current?.focus()
      })
    }

    const findActionById = (items: CommandNS.Item[], id: string) => {
      const foundInFirstLevel = items.find(
        item => !isSection(item) && item.id === unmakeActionItemId(id),
      )

      if (foundInFirstLevel) {
        return foundInFirstLevel
      }

      let action: CommandNS.Item | undefined

      for (const item of items) {
        if (isSection(item) && item.actions.length > 0) {
          action = item.actions.find(action => action.id === unmakeActionItemId(id))
          if (action) {
            break
          }
        }
      }

      return action
    }

    const handleOnKeyDownInput = (evt: KeyboardEvent<HTMLInputElement>) => {
      if (!['ArrowDown', 'ArrowUp', 'Enter', 'Escape', 'Backspace'].includes(evt.key)) {
        return
      }

      evt.preventDefault()

      switch (evt.key) {
        case 'Backspace': {
          if (!query) {
            setCurrentItems(prevItems)
          }
          break
        }
        case 'Escape': {
          close()
          break
        }
        case 'Enter': {
          if (!activeItem) {
            break
          }
          const action = findActionById(currentItems, activeItem)
          if (!action || isSection(action)) {
            break
          }

          // container action
          if (action.subItems && action.subItems.length > 0) {
            setPrevItems(currentItems)
            setCurrentItems(action.subItems)
            setActiveItem(null)
          } else if (action.performs) {
            if (typeof action.performs === 'function') {
              action.performs(action)
            }
          }

          break
        }
        case 'ArrowDown':
        case 'ArrowUp': {
          doByBodyRef('handleOnKeyDown [Arrows]', body => {
            const findElement = (
              direction: 'next' | 'prev',
              currentElement: Element,
            ): Element | null => {
              const nextElement =
                direction === 'next'
                  ? currentElement.nextElementSibling
                  : currentElement.previousElementSibling

              if (!nextElement) {
                return null
              }

              if (nextElement.getAttribute('data-section')) {
                return findElement(direction, nextElement)
              }
              return nextElement
            }

            setActiveItem(currentItem => {
              const firstItemId = body.querySelector('*[data-action="true"]')?.id
              const currentElement = body.querySelector(`*[data-action="true"]#${currentItem}`)

              // no items out there
              if (!firstItemId) {
                return currentItem
              }

              // no item selected (initial state)
              if (!currentElement) {
                return firstItemId
              }

              const nextElement = findElement(
                evt.key === 'ArrowDown' ? 'next' : 'prev',
                currentElement,
              )

              // next/prev element found and can be selected
              if (nextElement) {
                return nextElement.id
              }

              // next element not found, return to the first element
              if (evt.key === 'ArrowDown') {
                return firstItemId
              }

              const allElements = body.querySelectorAll('*[data-action="true"]')
              if (!allElements || allElements.length === 0) {
                return currentItem
              }

              // prev element not found, return to the last element
              return allElements.item(allElements.length - 1).id
            })
          })
          break
        }
      }
    }

    useEffect(() => {
      void sleep(10).then(() => {
        const { current: body } = bodyRef
        if (body) {
          let height = CommandNS.HEADER_HEIGHT

          body
            .querySelectorAll('div[data-item="true"], a[data-item="true"]')
            .forEach(itemElement => {
              if (itemElement.getAttribute('data-action')) {
                if (itemElement.getAttribute('data-has-description')) {
                  height += CommandNS.ITEMS_WITH_DESCRIPTION_HEIGHT
                } else {
                  height += CommandNS.ITEMS_WITHOUT_DESCRIPTION_HEIGHT
                }
              } else {
                height += CommandNS.SECTION_TITLE_HEIGHT
              }
            })

          setCommandBoxHeight(height > 500 ? 500 : height)
        } else {
          setCommandBoxHeight(500)
        }
      })
    }, [currentItems, query])

    useEffect(() => {
      focusActiveItem()
    }, [activeItem])

    return (
      <>
        <Portal>
          {isOpen && (
            <>
              <div
                {...backdropProps}
                onClick={close}
                className={backdropClasses}
                ref={backdropRef}
              />

              <div
                {...containerProps}
                style={{ ...style, height: commandBoxHeight }}
                className={classes}
                ref={reference}
              >
                <div className="header" style={{ height: CommandNS.HEADER_HEIGHT }}>
                  <input
                    className="search-input"
                    autoFocus
                    placeholder={placeholder}
                    ref={searchInputRef}
                    type="text"
                    value={query}
                    onKeyDown={handleOnKeyDownInput}
                    onChange={evt => {
                      setQuery(evt.currentTarget.value)
                    }}
                  />

                  <Button
                    prefixMaterialIcon="cancel"
                    shape="circle"
                    type="text"
                    onClick={close}
                    className="close-button"
                  />
                </div>

                <div className="body" ref={bodyRef} onMouseLeave={handleOnMouseLeaveBody}>
                  <ScrollView maxHeight={commandBoxHeight - CommandNS.HEADER_HEIGHT}>
                    {currentItems.map((item, index) =>
                      isSection(item) ? (
                        <SectionItem
                          linkComponent={linkComponent}
                          key={index}
                          section={item}
                          query={query}
                          activeItem={activeItem}
                          handleOnMouseEnterAction={handleOnMouseEnterAction}
                          handleOnMouseEnterSection={handleOnMouseEnterSection}
                        />
                      ) : shouldRenderAction(item, query) ? (
                        <ActionItem
                          key={index}
                          action={item}
                          activeItem={activeItem}
                          linkComponent={linkComponent}
                          handleOnMouseEnterAction={handleOnMouseEnterAction}
                        />
                      ) : (
                        <Fragment key={index} />
                      ),
                    )}
                  </ScrollView>
                </div>
              </div>
            </>
          )}
        </Portal>

        {typeof children === 'function' ? children?.({ isOpen, close, open, toggle }) : children}
      </>
    )
  },
)
