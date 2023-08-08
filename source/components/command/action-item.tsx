import React, { type FC, type HTMLAttributes, type MouseEvent } from 'react'

import { classNames } from '@zoom-studio/js-ts-utils'

import { CommandNS } from '.'
import { ConditionalWrapper, Emoji, Icon, Text, Title, type IconNS } from '..'
import { CustomLink, type CustomLinkNS } from '../custom-link'
import { makeActionItemId } from './utils'

export namespace ActionItemNS {
  export interface Props {
    action: CommandNS.Action
    isLastActionInSection?: boolean
    linkComponent: CustomLinkNS.Props['userLink']
    performAction: (action?: CommandNS.Item) => void
    activeItem: CommandNS.ActionID | null
    handleOnMouseEnterAction: (
      action: CommandNS.Action,
    ) => (evt: MouseEvent<HTMLDivElement> | MouseEvent<HTMLAnchorElement>) => void
  }
}

export const ActionItem: FC<ActionItemNS.Props> = ({
  action,
  isLastActionInSection,
  handleOnMouseEnterAction,
  linkComponent,
  activeItem,
  performAction,
}) => {
  const { type: providedType, name, description, emoji, icon, performs, subItems, id } = action

  const type: CommandNS.ActionType | undefined =
    subItems && subItems.length > 0 ? 'container' : providedType

  const typeIcon: IconNS.Names | null =
    type === 'container'
      ? 'arrow_right_alt'
      : type === 'jump-to'
      ? 'launch'
      : type === 'callback'
      ? 'rocket'
      : null

  const classes = classNames('command-item action-item', {
    'last-section-action': !!isLastActionInSection,
    'active': activeItem === makeActionItemId(id),
  })

  const containerProps: HTMLAttributes<HTMLDivElement | HTMLSpanElement> | Record<string, boolean> =
    {
      'data-item': true,
      'data-action': true,
      'data-has-description': !!description,
      'id': makeActionItemId(id),
      'className': classes,
      'onMouseEnter': handleOnMouseEnterAction(action),
      'style': {
        height: description
          ? CommandNS.ITEMS_WITH_DESCRIPTION_HEIGHT
          : CommandNS.ITEMS_WITHOUT_DESCRIPTION_HEIGHT,
      },
    }

  return (
    <ConditionalWrapper
      condition={typeof performs === 'object' && 'url' in performs}
      falseWrapper={children => (
        <div
          {...containerProps}
          onClick={() => {
            performAction(action)
          }}
        >
          {children}
        </div>
      )}
      trueWrapper={children => (
        <CustomLink
          userLink={linkComponent}
          href={(performs as CommandNS.LinkPerformer).url}
          target={(performs as CommandNS.LinkPerformer).target ?? '_self'}
          {...containerProps}
        >
          {children}
        </CustomLink>
      )}
    >
      <input className="focus-input-helper" />

      <div className="sign-container">
        {emoji ? (
          <Emoji className="sign emoji" name={emoji} />
        ) : icon ? (
          <Icon className="sign icon" name={icon} />
        ) : (
          <></>
        )}
      </div>

      <div className="titles">
        <Title h5 className="name">
          {name}
        </Title>
        {description && <Text className="description">{description}</Text>}
      </div>

      {typeIcon && (
        <div className="type">
          <Icon className="type-icon" name={typeIcon} />
        </div>
      )}
    </ConditionalWrapper>
  )
}
