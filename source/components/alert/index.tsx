import React, { FC, ReactNode, useEffect } from 'react'

import { BaseComponent, CommonVariants } from '../../types'
import { UseStatedIcon, useStatedIcon, useZoomComponent } from '../../hooks'
import {
  Button,
  ButtonNS,
  ConditionalWrapper,
  Container,
  Emoji,
  EmojiNS,
  Icon,
  IconNS,
  Text,
  Title,
} from '..'

export namespace AlertNS {
  export interface ChildrenCallbackParams extends Pick<Props, 'identifier'> {
    close: () => void
  }

  export interface Props
    extends Omit<BaseComponent, 'children'>,
      Omit<UseStatedIcon.Params, 'variant'> {
    title?: string
    description?: string
    variant?: CommonVariants
    actions?: ButtonNS.Props[]
    closable?: boolean
    onWillClose?: () => void
    banner?: boolean
    identifier: number
    children?: ReactNode | ((params: ChildrenCallbackParams) => ReactNode)
    disableDocument?: boolean
    isOpen?: boolean
    fluidContent?: boolean
  }
}

export const Alert: FC<AlertNS.Props> = ({
  variant = 'neutral',
  closable = true,
  fluidContent = true,
  disableDocument,
  className,
  containerProps,
  emoji,
  icon,
  noIconAndEmoji,
  reference,
  actions,
  banner,
  identifier,
  onWillClose,
  description,
  children,
  title,
  isOpen,
  ...rest
}) => {
  if (!isOpen) {
    return <></>
  }

  const { createClassName } = useZoomComponent('alert')
  const [iconName, iconType] = useStatedIcon({ emoji, variant, icon, noIconAndEmoji })

  const classes = createClassName(className, '', {
    [createClassName('', variant)]: true,
    [createClassName('', 'banner')]: !!banner,
  })

  const handleCloseAlert = () => {
    if (!closable) {
      return null
    }
    onWillClose?.()
  }

  const handleDisableDocument = () => {}

  const handleEnableDocument = () => {}

  useEffect(() => {
    if (disableDocument) {
      handleDisableDocument()
    } else {
      handleEnableDocument()
    }
  }, [disableDocument])

  return (
    <div {...containerProps} {...rest} ref={reference} className={classes}>
      <Container fluid={fluidContent}>
        <ConditionalWrapper
          condition={iconType !== 'nothing' && !!iconName}
          trueWrapper={child => <div className="symbol-container">{child}</div>}
        >
          {iconType === 'icon' ? (
            <Icon name={iconName as IconNS.Names} />
          ) : (
            <Emoji className="emoji" name={iconName as EmojiNS.Emojis.Names} />
          )}
        </ConditionalWrapper>

        <div className="content">
          {title && <Title className="alert-title">{title}</Title>}

          {description && <Text className="alert-description">{description}</Text>}

          {children && (
            <div className="children">
              {typeof children === 'function'
                ? children({ close: handleCloseAlert, identifier })
                : children}
            </div>
          )}
        </div>

        {actions && (
          <div className="actions">
            {actions.map((action, index) => (
              <Button key={index} size="small" {...action} />
            ))}
          </div>
        )}

        {closable && (
          <div className="closer">
            <Button
              suffixMaterialIcon="close"
              size="large"
              shape="circle"
              onClick={handleCloseAlert}
              type="link"
              variant={variant}
            />
          </div>
        )}
      </Container>
    </div>
  )
}
