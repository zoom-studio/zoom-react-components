import React, { FC } from 'react'

import { FloatingPortal, FloatingFocusManager, useMergeRefs } from '@floating-ui/react'

import { ConditionalWrapper, Spin, Text, Title } from '..'
import { usePopoverContext } from './use-popover-context'
import { useZoomComponent } from '../../hooks'

import { PopoverNS } from '.'

export namespace PopoverContentNS {
  export interface Props
    extends Omit<PopoverNS.Props, 'isOpen' | 'onOpenChange' | 'onOpen' | 'onClose'> {}
}

export const PopoverContent: FC<PopoverContentNS.Props> = ({
  trigger = 'hover',
  placement = 'top',
  showArrow = true,
  hoverDelay = 0,
  children,
  className,
  title,
  reference,
  titleProps,
  popoverProps,
  content,
  contentProps,
  description,
  descriptionProps,
  defaultIsOpen,
  loading,
  spinProps,
  width,
  autoCloseDelay,
  containerProps,
  style,
}) => {
  const { context: floatingContext, ...context } = usePopoverContext()
  const { createClassName } = useZoomComponent('popover')

  const ref = useMergeRefs([context.refs.setFloating, reference!])

  const titleClasses = createClassName(titleProps?.className, 'title')
  const descriptionClasses = createClassName(descriptionProps?.className, 'description')
  const contentClasses = createClassName(contentProps?.className, 'content')
  const classes = createClassName(className, '', {
    [createClassName('', placement)]: true,
    [createClassName('', 'loading')]: !!loading,
  })
  const popoverClasses = createClassName(popoverProps?.className, 'container', {
    'with-arrow': !!showArrow,
  })

  return (
    <FloatingPortal>
      {context.isOpen && (
        <FloatingFocusManager context={floatingContext}>
          <div
            className={classes}
            ref={ref}
            style={{
              position: context.strategy,
              top: context.y ?? 0,
              left: context.x ?? 0,
              width: 'max-content',
              ...style,
            }}
          >
            <div
              {...popoverProps}
              className={popoverClasses}
              style={{ width: width ?? 'max-content' }}
            >
              <div className="container-children">
                {showArrow && <span className="arrow" />}

                {loading ? (
                  <div className="popover-loader">
                    <Spin {...spinProps} />
                  </div>
                ) : (
                  <>
                    <ConditionalWrapper
                      condition={typeof title === 'string'}
                      falseWrapper={children => <>{children}</>}
                      trueWrapper={children => (
                        <Title h5 {...titleProps} className={titleClasses}>
                          {children}
                        </Title>
                      )}
                    >
                      {title}
                    </ConditionalWrapper>

                    {description && (
                      <Text {...descriptionProps} className={descriptionClasses}>
                        {description}
                      </Text>
                    )}

                    {content && (
                      <div {...contentProps} className={contentClasses}>
                        {typeof content === 'function'
                          ? content({ closePopover: close, openPopover: open })
                          : content}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </FloatingFocusManager>
      )}
    </FloatingPortal>
  )
}
