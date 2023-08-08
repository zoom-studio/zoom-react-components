import React, {
  Fragment,
  forwardRef,
  useEffect,
  useRef,
  useState,
  type HTMLAttributeAnchorTarget,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
  type RefObject,
} from 'react'

import { doByRef, sleep } from '@zoom-studio/js-ts-utils'

import { Button, Portal, ScrollView, Text, type EmojiNS, type IconNS } from '..'
import { logs } from '../../constants'
import { useZoomComponent, useZoomContext } from '../../hooks'
import { type BaseComponent } from '../../types'
import { ActionItem } from './action-item'
import { SectionItem } from './section-item'
import {
  extractActions,
  isSection,
  makeActionItemId,
  shouldRenderAction,
  unmakeActionItemId,
} from './utils'

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

  export interface Path {
    name: string
    id: string
    items: Item[]
  }

  export interface Props extends Omit<BaseComponent, 'children'> {
    items: Item[]
    children?: ReactNode | ((params: ChildrenCallbackParams) => ReactNode)
    defaultIsOpen?: boolean
    backdropRef?: RefObject<HTMLDivElement>
    backdropProps?: HTMLAttributes<HTMLDivElement>
    placeholder?: string
    onWillOpen?: () => void
    onWillClose?: () => void
  }
}

export const Command = forwardRef<HTMLDivElement, CommandNS.Props>(
  (
    {
      placeholder = 'Search for commands...',
      items = [],
      className,
      containerProps,
      defaultIsOpen,
      backdropRef,
      backdropProps,
      style,
      children,
      onWillClose,
      onWillOpen,
      ...rest
    },
    reference,
  ) => {
    const { createClassName, sendLog } = useZoomComponent('command')
    const { linkComponent, isRTL } = useZoomContext()

    const [isOpen, setIsOpen] = useState(!!defaultIsOpen)
    const [query, setQuery] = useState('')
    const [path, setPath] = useState<CommandNS.Path[]>([])
    const [commandBoxHeight, setCommandBoxHeight] = useState(500)
    const [activeItem, setActiveItem] = useState<string | null>(null)

    const bodyRef = useRef<HTMLDivElement>(null)
    const searchInputRef = useRef<HTMLInputElement>(null)
    const pathsRef = useRef<HTMLDivElement>(null)

    const classes = createClassName(className, '')
    const backdropClasses = createClassName(className, 'backdrop')

    const currentItems = path[path.length - 1]?.items ?? items

    const resetStates = () => {
      setQuery('')
      setPath([])
      setCommandBoxHeight(500)
      setActiveItem(null)
    }

    const handleOnMouseEnterAction = (action: CommandNS.Action) => () => {
      setActiveItem(makeActionItemId(action.id))
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

    const scrollPathsContainerToEnd = () => {
      setTimeout(() => {
        doByRef(pathsRef, pathsContainer => {
          pathsContainer.scrollLeft = isRTL
            ? pathsContainer.scrollWidth * -1
            : pathsContainer.scrollWidth
        })
      }, 10)
    }

    const backToPrevPath = () => {
      const prevPath = path[path.length - 1]

      if (prevPath) {
        setPath(path.slice(0, path.length - 1))
        setActiveItem(prevPath.id)
      } else {
        setPath([])
      }

      scrollPathsContainerToEnd()
    }

    const goToPath = (index: number) => () => {
      const targetPath = path[index]

      if (targetPath) {
        setPath(path.slice(0, index))
        setActiveItem(targetPath.id)
      }

      scrollPathsContainerToEnd()
    }

    const addNewPath = (pathItems: CommandNS.Item[], pathName: string, id: string) => {
      setPath(paths => [...paths, { items: pathItems, name: pathName, id }])
      const firstPathAction = extractActions(pathItems)[0]
      setActiveItem(firstPathAction ? makeActionItemId(firstPathAction.id) : null)

      scrollPathsContainerToEnd()
    }

    const performAction = (action?: CommandNS.Item) => {
      if (!activeItem) {
        return
      }
      action = action ?? findActionById(currentItems, activeItem)
      if (!action || isSection(action)) {
        return
      }

      // container action
      if (action.subItems && action.subItems.length > 0) {
        addNewPath(action.subItems, action.name, makeActionItemId(action.id))
      } else if (action.performs) {
        if (typeof action.performs === 'function') {
          action.performs(action)
        } else {
          const { id } = action
          doByBodyRef('performAction', body => {
            const actionElement = body.querySelector(
              `a[data-action="true"]#${makeActionItemId(id)}`,
            ) as HTMLAnchorElement | undefined

            actionElement?.click()
          })
        }
      }
    }

    const handleOnKeyDownInput = (evt: KeyboardEvent<HTMLInputElement>) => {
      if (!['ArrowDown', 'ArrowUp', 'Enter', 'Backspace'].includes(evt.key)) {
        return
      }

      switch (evt.key) {
        case 'Backspace': {
          if (!query) {
            evt.preventDefault()

            backToPrevPath()
          }
          break
        }
        case 'Enter': {
          evt.preventDefault()
          performAction()
          break
        }
        case 'ArrowDown':
        case 'ArrowUp': {
          evt.preventDefault()

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

    const handleOnDocumentKeyDown = (evt: globalThis.KeyboardEvent) => {
      if (!['Escape'].includes(evt.key)) {
        return
      }

      switch (evt.key) {
        case 'Escape': {
          evt.preventDefault()

          resetStates()
          close()
          break
        }
      }
    }

    const close = () => {
      onWillClose?.()
      document.removeEventListener('keydown', handleOnDocumentKeyDown)
      setIsOpen(false)
    }

    const open = () => {
      onWillOpen?.()
      document.addEventListener('keydown', handleOnDocumentKeyDown)
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

    const registerCommandShortcut = (evt: globalThis.KeyboardEvent) => {
      if (evt.keyCode !== 75 || !evt.ctrlKey) {
        return
      }

      evt.preventDefault()
      toggle()
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

    useEffect(() => {
      document.addEventListener('keydown', registerCommandShortcut)
      if (isOpen) {
        document.addEventListener('keydown', handleOnDocumentKeyDown)
      }

      return () => {
        document.removeEventListener('keydown', registerCommandShortcut)
        document.removeEventListener('keydown', handleOnDocumentKeyDown)
      }
    }, [])

    return (
      <>
        <Portal>
          {isOpen && (
            <>
              <div
                {...rest}
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
                  <div ref={pathsRef} className="paths">
                    {path.map((item, index) => (
                      <Fragment key={index}>
                        <Text onClick={goToPath(index)}>{item.name}</Text>
                        <Text className="splitter">/</Text>
                      </Fragment>
                    ))}
                  </div>

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

                <div className="body" ref={bodyRef}>
                  <ScrollView maxHeight={commandBoxHeight - CommandNS.HEADER_HEIGHT}>
                    {currentItems.map((item, index) =>
                      isSection(item) ? (
                        <SectionItem
                          linkComponent={linkComponent}
                          key={index}
                          section={item}
                          query={query}
                          performAction={performAction}
                          activeItem={activeItem}
                          handleOnMouseEnterAction={handleOnMouseEnterAction}
                        />
                      ) : shouldRenderAction(item, query) ? (
                        <ActionItem
                          key={index}
                          action={item}
                          activeItem={activeItem}
                          performAction={performAction}
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
