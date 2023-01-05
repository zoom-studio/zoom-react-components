import React, { FC, HTMLAttributes, ReactNode } from 'react'

import { useStatedIcon, UseStatedIcon, useZoomComponent } from '../../hooks'
import { CommonSize } from '../../types'
import { Emoji, EmojiNS } from '../emoji'
import { Icon, IconNS } from '../icon'
import { Button, ButtonNS, Text } from '..'
import { ConditionalWrapper } from '../conditional-wrapper'

export namespace ToastNS {
  export type Identifier = string | number
  export type ID = string | number
  export type Props = Toast

  export interface Toast extends UseStatedIcon.Params {
    id: ID
    identifier: Identifier
    duration: number
    size: CommonSize
    children: ReactNode | string
    containerProps?: HTMLAttributes<HTMLDivElement>
    loading?: boolean
    closable?: boolean
    actions?: ButtonNS.Props[]
    progress?: boolean
  }

  export interface IconResult {
    type: 'emoji' | 'icon' | 'nothing'
    name?: IconNS.Names | EmojiNS.Emojis.Names
  }
}

export const Toast: FC<ToastNS.Props> = ({
  size = 'normal',
  variant = 'neutral',
  closable = true,
  progress = true,
  icon,
  children,
  containerProps,
  id,
  loading,
  emoji,
  noIconAndEmoji,
  duration,
  identifier,
  actions,
}) => {
  const { createClassName } = useZoomComponent('toast')
  const [iconName, iconType] = useStatedIcon({ emoji, variant, icon, noIconAndEmoji })
  const classes = createClassName(containerProps?.className, '', {
    [createClassName('', size)]: true,
    [createClassName('', variant)]: true,
    [createClassName('', 'loading')]: !!loading,
  })

  return (
    <div className={classes}>
      <div className="content">
        <ConditionalWrapper
          condition={iconType !== 'nothing' && !!iconName}
          trueWrapper={child => <div className="icon">{child}</div>}
        >
          {iconType === 'icon' ? (
            <Icon name={iconName as IconNS.Names} />
          ) : (
            <Emoji name={iconName as EmojiNS.Emojis.Names} />
          )}
        </ConditionalWrapper>

        <ConditionalWrapper
          condition={typeof children === 'string'}
          trueWrapper={child => <Text className="children">{child}</Text>}
          falseWrapper={child => <div className="children">{child}</div>}
        >
          {children}
        </ConditionalWrapper>

        {closable && (
          <span>
            <Icon name="close" />
          </span>
        )}
      </div>

      {actions && (
        <div className="action">
          {actions.map((action, index) => (
            <Button {...action} key={index} />
          ))}
        </div>
      )}

      {progress && (
        <div className="progress-container">
          <span className="progress" />
        </div>
      )}
    </div>
  )
}
