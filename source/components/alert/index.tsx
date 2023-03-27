import React, { forwardRef, ReactNode, useEffect } from 'react'

import {
  Button,
  ButtonNS,
  ConditionalWrapper,
  Container,
  Emoji,
  EmojiNS,
  Icon,
  IconNS,
  Spin,
  Text,
  Title,
  useAlert,
} from '..'
import { UseStatedIcon, useStatedIcon, useZoomComponent } from '../../hooks'
import { BaseComponent, CommonVariants } from '../../types'

export namespace AlertNS {
  export type Identifier = string | number

  export interface HandlerCallbackParams extends Pick<Props, 'identifier'> {
    destroy: () => void
  }

  export interface Props
    extends Omit<BaseComponent, 'children'>,
      Omit<UseStatedIcon.Params, 'variant'> {
    identifier: Identifier
    title?: string
    description?: string
    variant?: CommonVariants
    actions?: ButtonNS.Props[] | ((params: HandlerCallbackParams) => ButtonNS.Props[])
    closable?: boolean
    onWillClose?: (identifier: Identifier) => void
    banner?: boolean
    children?: ReactNode | ((params: HandlerCallbackParams) => ReactNode)
    disableDocument?: boolean
    fluidContent?: boolean
    openByDefault?: boolean
    loading?: boolean
  }
}

export const Alert = forwardRef<HTMLDivElement, AlertNS.Props>(
  (
    {
      variant = 'neutral',
      closable = true,
      fluidContent = true,
      openByDefault = true,
      loading,
      disableDocument,
      className,
      containerProps,
      emoji,
      icon,
      noIconAndEmoji,
      actions,
      banner,
      identifier,
      onWillClose,
      description,
      children,
      title,
      ...rest
    },
    reference,
  ) => {
    const alert = useAlert()
    const isOpen = alert.isOpen(identifier)

    const { createClassName } = useZoomComponent('alert')
    const [iconName, iconType] = useStatedIcon({ emoji, variant, icon, noIconAndEmoji })

    const classes = createClassName(className, '', {
      [createClassName('', variant)]: true,
      [createClassName('', 'banner')]: !!banner,
      [createClassName('', 'document-disabled')]: !!disableDocument,
    })

    const documentDisabledClasses = createClassName('', 'document-disabler')

    const titleClasses = createClassName('', 'title', {
      'with-more-content': !!children || !!description,
    })

    const handleCloseAlert = () => {
      if (!closable) {
        return null
      }
      onWillClose?.(identifier)
      alert.destroy(identifier)
    }

    useEffect(() => {
      if (openByDefault) {
        alert.show(identifier)
      }
    }, [])

    return isOpen ? (
      <>
        {disableDocument && <div className={documentDisabledClasses} />}

        <div
          {...containerProps}
          {...rest}
          ref={reference}
          className={classes}
          data-identifier={identifier}
        >
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
              {title && <Title className={titleClasses}>{title}</Title>}

              {description && <Text className="alert-description">{description}</Text>}

              {children && (
                <div className="children">
                  {typeof children === 'function'
                    ? children({ destroy: handleCloseAlert, identifier })
                    : children}
                </div>
              )}
            </div>

            {actions && (
              <div className="actions">
                {[
                  typeof actions === 'function'
                    ? actions({ destroy: handleCloseAlert, identifier })
                    : actions,
                ][0].map((action, index) => (
                  <Button key={index} size="small" {...action} />
                ))}
              </div>
            )}

            {loading ? (
              <Spin
                size="small"
                color={color =>
                  color({ source: variant === 'neutral' ? 'text' : variant, tone: 2 })
                }
              />
            ) : (
              closable && (
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
              )
            )}
          </Container>
        </div>
      </>
    ) : (
      <></>
    )
  },
)
