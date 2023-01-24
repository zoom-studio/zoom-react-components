import { sleep } from '@zoom-studio/zoom-js-ts-utils'
import React, { FC, HTMLAttributes, KeyboardEvent, MouseEvent, useRef, useState } from 'react'

import { Avatar, Input, InputNS, ScrollView, Text, Textarea, TextareaNS } from '..'
import { useComponentSize, useZoomComponent } from '../../hooks'
import { CommonSize } from '../../types'

export namespace MentionNS {
  export const Types = ['input', 'textarea'] as const
  export type Types = typeof Types[number]

  export type EntryElement = HTMLInputElement | HTMLTextAreaElement

  export const ReservedKeys = ['ArrowDown', 'ArrowUp', 'Enter'] as const
  export type ReservedKeys = typeof ReservedKeys[number]

  export interface User {
    name: string
    username: string
    avatar: string
  }

  export interface Props {
    users: User[]
    as?: Types
    textareaProps?: TextareaNS.Props
    inputProps?: InputNS.Props
    containerProps?: HTMLAttributes<HTMLDivElement>
    maxHeight?: string | number
    debounce?: boolean
    isLoading?: boolean
    size?: CommonSize
    usernameRegex?: RegExp
    symbol?: string
    onMention?: (mention: string) => void
  }
}

export const Mention: FC<MentionNS.Props> = ({
  size: providedSize,
  as = 'textarea',
  maxHeight = 200,
  debounce = true,
  usernameRegex = /^[a-z0-9_.]+$/,
  symbol = '@',
  onMention,
  isLoading,
  users,
  inputProps,
  textareaProps,
  containerProps,
}) => {
  const usersListRef = useRef<HTMLUListElement | null>(null)
  const size = useComponentSize(providedSize)
  const { createClassName } = useZoomComponent('mention')
  const [activeUserIndex, setActiveUserIndex] = useState(0)
  const [isUsersListOpen, setIsUsersListOpen] = useState(false)
  // const [mention, setMention] = useState<string>('')

  const classes = createClassName(containerProps?.className, '', {
    [createClassName('', as)]: true,
    [createClassName('', size)]: true,
    [createClassName('', 'loading')]: !!isLoading,
  })

  const userItemClasses = (userIndex: number): string => {
    return createClassName('', 'user', {
      [createClassName('', 'user-active')]: activeUserIndex === userIndex,
    })
  }

  const handleResetStates = () => {
    setIsUsersListOpen(false)
    // setMention('')
    setActiveUserIndex(0)
  }

  const handleMention = async (entryElement: MentionNS.EntryElement) => {
    await sleep(10)
    let { selectionStart, value, selectionEnd } = entryElement
    if (selectionStart !== selectionEnd) {
      return handleResetStates()
    }

    selectionStart = selectionStart ?? 0
    value = value.slice(0, selectionStart)

    const lastAtSymbol = value.lastIndexOf(symbol)
    if (lastAtSymbol < 0) {
      return handleResetStates()
    }

    value = value.slice(lastAtSymbol, value.length)
    const mention = value.slice(1)
    if (!usernameRegex.test(mention) && value !== symbol) {
      return handleResetStates()
    }

    onMention?.(mention)
    // setMention(mention)
    setIsUsersListOpen(true)
  }

  const handleOnNavigationDone = (activeUserIndex: number) => {
    activeUserIndex++

    const { current: usersList } = usersListRef
    const scrollSection = usersListRef.current?.parentElement as HTMLDivElement | null
    if (!usersList || !scrollSection) {
      return null
    }

    const user: HTMLLIElement | null = usersList.querySelector(`li[tabindex="${activeUserIndex}"]`)
    if (!user) {
      return null
    }

    scrollSection.scrollTop = user.offsetTop - scrollSection.clientHeight + 50
  }

  const handleChangeActiveUserIndex = (pressedKey: MentionNS.ReservedKeys) => {
    setActiveUserIndex(activeIndex => {
      if (pressedKey === 'ArrowUp') {
        const nextIndex = activeIndex - 1
        if (nextIndex <= 0) {
          return 0
        }
        handleOnNavigationDone(nextIndex)
        return nextIndex
      } else if (pressedKey === 'ArrowDown') {
        const nextIndex = activeIndex + 1
        if (nextIndex >= users.length) {
          return activeIndex
        }
        handleOnNavigationDone(nextIndex)
        return nextIndex
      }
      return activeIndex
    })
  }

  const handleSelectUser = (handySelectedUserIndex?: number) => {
    // const { username } = users[handySelectedUserIndex ?? activeUserIndex]
    // console.log(username)
  }

  const handleOnKeyDown = (evt: KeyboardEvent<MentionNS.EntryElement>) => {
    const key = evt.key as MentionNS.ReservedKeys
    if (isUsersListOpen && MentionNS.ReservedKeys.includes(key)) {
      evt.preventDefault()

      switch (key) {
        case 'ArrowDown':
        case 'ArrowUp': {
          handleChangeActiveUserIndex(key)
          break
        }
        case 'Enter': {
          handleSelectUser()
        }
      }

      return
    }

    void handleMention(evt.currentTarget)
    inputProps?.onKeyDown?.(evt as KeyboardEvent<HTMLInputElement>)
    textareaProps?.onKeyDown?.(evt as KeyboardEvent<HTMLTextAreaElement>)
  }

  const handleOnMouseUp = (evt: MouseEvent<MentionNS.EntryElement>) => {
    void handleMention(evt.currentTarget)
    inputProps?.onMouseUp?.(evt as MouseEvent<HTMLInputElement>)
    textareaProps?.onMouseUp?.(evt as MouseEvent<HTMLTextAreaElement>)
  }

  const handleOnUserClick = (userIndex: number) => () => {
    setActiveUserIndex(userIndex)
    handleSelectUser(userIndex)
  }

  const inputAndTextareaProps: HTMLAttributes<MentionNS.EntryElement> = {
    onKeyDown: handleOnKeyDown,
    onMouseUp: handleOnMouseUp,
  }

  return (
    <div className={classes}>
      {isUsersListOpen && (
        <ScrollView className="users-list-container" style={{ maxHeight }} autoHide>
          <ul className="users-list" ref={usersListRef}>
            {users.map((user, index) => (
              <li
                key={index}
                tabIndex={index + 1}
                className={userItemClasses(index)}
                onClick={handleOnUserClick(index)}
              >
                <Avatar
                  avatars={[user.avatar]}
                  size="small"
                  containerProps={{ className: 'user-avatar' }}
                />
                <Text
                  className="user-name"
                  large={size === 'large'}
                  normal={size === 'normal'}
                  small={size === 'small'}
                >
                  {user.name}
                </Text>
                <Text className="user-username">{`${symbol}${user.username}`}</Text>
              </li>
            ))}
          </ul>
        </ScrollView>
      )}

      {as === 'textarea' ? (
        <Textarea
          {...textareaProps}
          {...inputAndTextareaProps}
          defaultValue="hey my name is @hamid and im trying to create @mention using @js language"
        />
      ) : (
        <Input
          {...inputProps}
          {...inputAndTextareaProps}
          defaultValue="hey my name is @hamid and im trying to create @mention using @js language"
        />
      )}
    </div>
  )
}
