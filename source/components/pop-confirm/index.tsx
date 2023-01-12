import React, { FC, HTMLAttributes, ReactNode } from 'react'

import { Button, ButtonNS, Emoji, EmojiNS, Icon, IconNS, Popover, PopoverNS, Text, Title } from '..'
import { UseStatedIcon, useStatedIcon, useZoomComponent } from '../../hooks'
import { CommonVariants } from '../../types'
import { ConditionalWrapper } from '../conditional-wrapper'

export namespace PopConfirmNS {
  export type Action = ButtonNS.Props

  export interface Props
    extends Omit<UseStatedIcon.Params, 'variant'>,
      Pick<
        PopoverNS.Props,
        'onOpen' | 'onClose' | 'defaultIsOpen' | 'placement' | 'autoCloseDelay' | 'hoverDelay'
      > {
    title: string
    buttonProps?: Omit<ButtonNS.Props, 'onClick'>
    children?: ReactNode
    variant?: CommonVariants
    confirm?: Action
    cancel?: Action
    popConfirmProps?: HTMLAttributes<HTMLDivElement>
    description?: string
    trigger?: Exclude<PopoverNS.Trigger, 'focus'>
  }
}

export const PopConfirm: FC<PopConfirmNS.Props> = ({
  trigger = 'click',
  variant = 'neutral',
  cancel = { text: 'Cancel' },
  confirm = { text: 'Confirm' },
  title,
  children,
  buttonProps,
  emoji,
  icon,
  noIconAndEmoji,
  popConfirmProps,
  description,
  ...popoverProps
}) => {
  const { createClassName } = useZoomComponent('pop-confirm')
  const [iconName, iconType] = useStatedIcon({ emoji, variant, icon, noIconAndEmoji })

  const contentClasses = createClassName(popConfirmProps?.className, '', {
    [createClassName('', variant)]: true,
  })

  return (
    <Popover
      {...popoverProps}
      trigger={trigger}
      content={
        <div {...popConfirmProps} className={contentClasses}>
          <div className="title">
            <ConditionalWrapper
              condition={iconType !== 'nothing' && !!iconName}
              trueWrapper={child => <div className="icon">{child}</div>}
            >
              {iconType === 'icon' ? (
                <Icon name={iconName as IconNS.Names} />
              ) : (
                <Emoji className="emoji" name={iconName as EmojiNS.Emojis.Names} />
              )}
            </ConditionalWrapper>

            <Title h5>{title}</Title>
          </div>

          {description && <Text className="description">{description}</Text>}

          <div className="actions">
            <Button size="small" type="primary" {...confirm}>
              {confirm.children}
            </Button>

            <Button size="small" type="secondary" {...cancel}>
              {cancel.children}
            </Button>
          </div>
        </div>
      }
    >
      <Button {...buttonProps}>{children}</Button>
    </Popover>
  )
}
