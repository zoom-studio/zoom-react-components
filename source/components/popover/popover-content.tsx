import React, { FC, MutableRefObject } from 'react'

import {
  FloatingArrow,
  FloatingFocusManager,
  FloatingPortal,
  useMergeRefs,
} from '@floating-ui/react'

import { ConditionalWrapper, Spin, Text, Title } from '..'
import { useZoomComponent } from '../../hooks'
import { usePopoverContext } from './use-popover-context'

import { PopoverNS } from '.'
import { color } from '../../utils'

export namespace PopoverContentNS {
  export interface Props
    extends Omit<PopoverNS.Props, 'isOpen' | 'onOpenChange' | 'onOpen' | 'onClose'> {
    arrowRef: MutableRefObject<SVGSVGElement | null>
    toggle: () => void
    open: () => void
    close: () => void
  }
}

export const PopoverContent: FC<PopoverContentNS.Props> = ({
  placement,
  showArrow,
  className,
  title,
  reference,
  titleProps,
  popoverProps,
  content,
  contentProps,
  description,
  descriptionProps,
  loading,
  close,
  open,
  toggle,
  spinProps,
  width,
  style,
  arrowRef,
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
                {showArrow && (
                  <FloatingArrow
                    ref={arrowRef}
                    context={floatingContext}
                    width={24}
                    height={10}
                    tipRadius={4}
                    strokeWidth={1}
                    fill={color({ source: 'layer', tone: 1 })}
                    stroke={color({ source: 'border', tone: 2 })}
                  />
                )}

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
