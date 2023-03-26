import React, { FC, HTMLAttributes, MouseEvent, ReactNode } from 'react'

import { Button, ButtonNS, Emoji, EmojiNS, Icon, IconNS, Popover, PopoverNS, Text, Title } from '..'
import { UseStatedIcon, useStatedIcon, useZoomComponent } from '../../hooks'
import { CommonVariants } from '../../types'
import { ConditionalWrapper } from '../conditional-wrapper'

export namespace PopConfirmNS {
  export type Action = ButtonNS.Props | ((handlers: PopoverNS.Handlers) => ButtonNS.Props)

  export interface Props
    extends Omit<UseStatedIcon.Params, 'variant'>,
      Pick<
        PopoverNS.Props,
        | 'onOpen'
        | 'onClose'
        | 'defaultIsOpen'
        | 'placement'
        | 'autoCloseDelay'
        | 'hoverDelay'
        | 'width'
      > {
    title: string
    buttonProps?: Omit<ButtonNS.Props, 'onClick'>
    children?: ReactNode
    variant?: CommonVariants
    confirm?: Action
    cancel?: Action
    containerProps?: HTMLAttributes<HTMLDivElement>
    description?: string
  }
}

export const PopConfirm: FC<PopConfirmNS.Props> = ({
  cancel: providedCancel = { children: 'Cancel' },
  confirm: providedConfirm = { children: 'Confirm' },
  variant = 'neutral',
  title,
  children,
  buttonProps,
  emoji,
  icon,
  noIconAndEmoji,
  containerProps,
  description,
  ...popoverProps
}) => {
  const { createClassName } = useZoomComponent('pop-confirm')
  const [iconName, iconType] = useStatedIcon({ emoji, variant, icon, noIconAndEmoji })

  const contentClasses = createClassName(containerProps?.className, '', {
    [createClassName('', variant)]: true,
  })

  const renderContent = (handlers: PopoverNS.Handlers) => {
    const cancel = typeof providedCancel === 'function' ? providedCancel(handlers) : providedCancel
    const confirm =
      typeof providedConfirm === 'function' ? providedConfirm(handlers) : providedConfirm

    const handleOnCancel = (evt: MouseEvent<HTMLButtonElement>) => {
      evt.stopPropagation()
      cancel.onClick?.(evt)
    }

    const handleOnConfirm = (evt: MouseEvent<HTMLButtonElement>) => {
      evt.stopPropagation()
      confirm.onClick?.(evt)
    }

    return (
      <div {...containerProps} className={contentClasses}>
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
          <Button size="small" type="primary" {...confirm} onClick={handleOnConfirm}>
            {confirm.children}
          </Button>

          <Button size="small" type="secondary" {...cancel} onClick={handleOnCancel}>
            {cancel.children}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <Popover {...popoverProps} trigger="click" content={renderContent}>
      <Button {...buttonProps}>{children}</Button>
    </Popover>
  )
}
