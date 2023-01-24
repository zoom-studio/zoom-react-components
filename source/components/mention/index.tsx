import React, {
  FC,
  FocusEvent,
  HTMLAttributes,
  KeyboardEvent,
  MouseEvent,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react'

import { sleep } from '@zoom-studio/zoom-js-ts-utils'

import { Avatar, ScrollView, Text, Textarea, TextareaNS } from '..'
import { useComponentSize, useZoomComponent } from '../../hooks'
import { logs } from '../../constants'

export namespace MentionNS {
  export const ReservedKeys = ['ArrowDown', 'ArrowUp', 'Enter'] as const
  export type ReservedKeys = typeof ReservedKeys[number]

  export interface User {
    name: string
    username: string
    avatar: string
  }

  export interface Props extends TextareaNS.Props {
    users: User[]
    mentionContainerProps?: HTMLAttributes<HTMLDivElement>
    maxHeight?: string | number
    usernameRegex?: RegExp
    symbol?: string
    closeUsersListOnBlur?: boolean
  }
}

export const Mention: FC<MentionNS.Props> = ({
  size: providedSize,
  users: providedUsers,
  maxHeight = 200,
  closeUsersListOnBlur = true,
  usernameRegex = /^[a-z0-9_.]+$/,
  symbol = '@',
  mentionContainerProps,
  ...textareaProps
}) => {
  const textareaRef = textareaProps.textareaRef ?? useRef<HTMLTextAreaElement | null>(null)
  const usersListRef = useRef<HTMLUListElement | null>(null)
  const size = useComponentSize(providedSize)
  const { createClassName, sendLog } = useZoomComponent('mention')
  const [activeUserIndex, setActiveUserIndex] = useState(0)
  const [isUsersListOpen, setIsUsersListOpen] = useState(false)
  const [mention, setMention] = useState<string>('')
  const [users, setUsers] = useState(providedUsers)

  const classes = createClassName(mentionContainerProps?.className, '', {
    [createClassName('', size)]: true,
  })

  const userItemClasses = (userIndex: number): string => {
    return createClassName('', 'user', {
      [createClassName('', 'user-active')]: activeUserIndex === userIndex,
    })
  }

  const isMentionInUsername = (username: string, mention: string): boolean => {
    username = username.toLowerCase()
    mention = mention.toLowerCase()
    return username.includes(mention)
  }

  const handleResetStates = () => {
    setIsUsersListOpen(false)
    setMention('')
    setActiveUserIndex(0)
  }

  const handleMention = async (entryElement: HTMLTextAreaElement) => {
    await sleep(10)
    setActiveUserIndex(0)
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

    setMention(mention)
    setUsers(providedUsers.filter(({ username }) => isMentionInUsername(username, mention)))
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

    scrollSection.scrollTop = user.offsetTop - scrollSection.clientHeight / 2
  }

  const handleChangeActiveUserIndex = (pressedKey: MentionNS.ReservedKeys) => {
    setActiveUserIndex(currentIndex => {
      if (pressedKey === 'ArrowUp') {
        const nextIndex = currentIndex - 1
        if (nextIndex <= 0) {
          return 0
        }
        handleOnNavigationDone(nextIndex)
        return nextIndex
      } else if (pressedKey === 'ArrowDown') {
        const nextIndex = currentIndex + 1
        if (nextIndex >= users.length) {
          return currentIndex
        }
        handleOnNavigationDone(nextIndex)
        return nextIndex
      }
      return currentIndex
    })
  }

  const handleSelectUser = (handySelectedUserIndex?: number) => {
    const { username } = users[handySelectedUserIndex ?? activeUserIndex]
    const { current: textarea } = textareaRef
    if (!textarea) {
      return sendLog(logs.mentionNotFoundTextareaRef, 'handleSelectUser function')
    }

    let { selectionStart, value } = textarea
    selectionStart = selectionStart ?? 0

    const startOfReplace = value.slice(0, selectionStart).lastIndexOf(symbol)
    const beforeMention = value.slice(0, startOfReplace)
    const afterMention = value.slice(selectionStart, value.length)

    value = `${beforeMention}${beforeMention.slice(-1) === ' ' ? '' : ''}${symbol}${username}${
      afterMention.slice(0, 1) === ' ' ? '' : ' '
    }${afterMention}`

    textarea.value = value
    handleResetStates()
    textareaProps.onWrite?.(value)
    textarea.focus()
  }

  const handleOnKeyDown = (evt: KeyboardEvent<HTMLTextAreaElement>) => {
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
    textareaProps.onKeyDown?.(evt)
  }

  const handleOnMouseUp = (evt: MouseEvent<HTMLTextAreaElement>) => {
    void handleMention(evt.currentTarget)
    textareaProps.onMouseUp?.(evt)
  }

  const handleOnUserClick = (userIndex: number) => () => {
    setActiveUserIndex(userIndex)
    handleSelectUser(userIndex)
  }

  const handleOnBlur = (evt: FocusEvent<HTMLTextAreaElement>) => {
    if (closeUsersListOnBlur) {
      handleResetStates()
    }
    textareaProps.onBlur?.(evt)
  }

  const renderUsername = (username: string): ReactNode => {
    if (!mention || !isMentionInUsername(username, mention)) {
      return symbol + username
    }

    username = username.replace(mention, '')
    return (
      <>
        <span>
          {symbol}
          {mention}
        </span>
        {username}
      </>
    )
  }

  useEffect(() => {
    setUsers(providedUsers)
  }, [providedUsers])

  return (
    <div {...mentionContainerProps} className={classes}>
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
                  imageProps={{ erroredStateIconFontSize: '20px' }}
                />
                <Text
                  className="user-name"
                  large={size === 'large'}
                  normal={size === 'normal'}
                  small={size === 'small'}
                >
                  {user.name}
                </Text>
                <Text
                  className="user-username"
                  large={size === 'large'}
                  normal={size === 'normal'}
                  small={size === 'small'}
                >
                  {renderUsername(user.username)}
                </Text>
              </li>
            ))}
          </ul>
        </ScrollView>
      )}

      <Textarea
        {...textareaProps}
        onKeyDown={handleOnKeyDown}
        onMouseUp={handleOnMouseUp}
        textareaRef={textareaRef}
        onBlur={handleOnBlur}
        size={size}
      />
    </div>
  )
}
