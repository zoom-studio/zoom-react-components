import React from 'react'

import { useZoomComponent, useZoomContext } from '../../hooks'
import {
  ContextMenu,
  ConditionalWrapper,
  Badge,
  Icon,
  Emoji,
  Avatar,
  Title,
  Text,
  Image,
  Checkbox,
  RadioButton,
  Switch,
  ButtonGroup,
} from '..'
import { CustomLink } from '../custom-link'

import { ListViewNS } from '.'

export namespace ListViewItemNS {
  export interface Props<ContentType>
    extends ListViewNS.ListData<ContentType>,
      Pick<
        ListViewNS.Props<ContentType>,
        | 'children'
        | 'imageProps'
        | 'avatarProps'
        | 'badgeProps'
        | 'actionsProps'
        | 'itemsProps'
        | 'linkComponent'
        | 'badgeHolderGutter'
        | 'hover'
        | 'badgeHolderGutterReversed'
      > {
    index: number
  }
}

export const ListViewItem = <ContentType extends unknown = unknown>({
  hover = true,
  badgeHolderGutter,
  badgeHolderGutterReversed,
  actions,
  avatars,
  badge,
  checkbox,
  content,
  description,
  image,
  radioButton,
  switcher,
  title,
  contextMenu,
  children,
  actionsProps,
  link,
  avatarProps,
  badgeProps,
  imageProps,
  linkComponent,
  index,
  itemsProps,
  onClick,
  emoji,
  icon,
}: ListViewItemNS.Props<ContentType>): JSX.Element => {
  const { createClassName } = useZoomComponent('list-view-item')
  const { isRTL } = useZoomContext()

  const classes = createClassName(itemsProps?.className)
  const finalContentClasses = createClassName('', 'content', {
    hover: !!hover,
  })

  return (
    <div
      {...itemsProps}
      {...itemsProps?.containerProps}
      className={classes}
      ref={itemsProps?.reference}
    >
      <ConditionalWrapper
        condition={!!contextMenu}
        falseWrapper={children => <div className="context-content" children={children} />}
        trueWrapper={children => (
          <ContextMenu {...contextMenu!} className="context-content" children={children} />
        )}
      >
        <ConditionalWrapper
          condition={!!badge}
          falseWrapper={children => (
            <div className="badge-content-container">
              <div className="badge-content" children={children} />
            </div>
          )}
          trueWrapper={children => (
            <Badge
              {...badgeProps}
              {...badge}
              className="badge-content-container"
              childrenContainerProps={{ className: 'badge-content' }}
              children={children}
              offset={badgeProps?.offset ?? 18}
            />
          )}
        >
          <ConditionalWrapper
            condition={!!link}
            falseWrapper={children => (
              <div className="link-content" onClick={onClick} children={children} />
            )}
            trueWrapper={children => (
              <CustomLink
                userLink={linkComponent}
                className="link-content"
                href={link}
                onClick={onClick}
                children={children}
              />
            )}
          >
            <div
              className={finalContentClasses}
              style={{
                [badgeHolderGutterReversed
                  ? `padding${isRTL ? 'Left' : 'Right'}`
                  : `padding${isRTL ? 'Right' : 'Left'}`]: badge
                  ? badgeHolderGutter ?? 36
                  : undefined,
              }}
            >
              {(avatars || emoji || icon || title || description || image) && (
                <div className="header">
                  {(avatars || emoji || icon || title || description) && (
                    <div className="meta-data-and-texts">
                      {(avatars || emoji || icon) && (
                        <div className="meta-data">
                          {avatars && (
                            <Avatar {...avatarProps} avatars={[avatars]} className="avatar" />
                          )}
                          {icon && <Icon name={icon} className="icon" />}
                          {emoji && <Emoji name={emoji} className="emoji" />}
                        </div>
                      )}

                      {(title || description) && (
                        <div className="texts">
                          {title && <Title className="title">{title}</Title>}
                          {description && <Text className="description">{description}</Text>}
                        </div>
                      )}
                    </div>
                  )}

                  {image && (
                    <div className="image">
                      <Image width="200px" {...imageProps} src={image} />
                    </div>
                  )}
                </div>
              )}

              {children && (
                <div className="custom-content-container">
                  {typeof children === 'function' ? children({ content, index }) : children}
                </div>
              )}

              {(checkbox || radioButton || switcher || actions) && (
                <div className="footer">
                  {(checkbox || radioButton || switcher) && (
                    <div className="data-entries">
                      {checkbox && <Checkbox {...checkbox} />}
                      {radioButton && <RadioButton {...radioButton} />}
                      {switcher && <Switch {...switcher} />}
                    </div>
                  )}

                  {actions && (
                    <div className="actions">
                      <ButtonGroup {...actionsProps} buttons={actions} />
                    </div>
                  )}
                </div>
              )}
            </div>
          </ConditionalWrapper>
        </ConditionalWrapper>
      </ConditionalWrapper>
    </div>
  )
}
