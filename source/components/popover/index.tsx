import React, {
  cloneElement,
  FC,
  FocusEvent,
  HTMLAttributes,
  MouseEvent,
  ReactNode,
  RefObject,
  useEffect,
  useRef,
  useState,
} from 'react'

import { Spin, SpinNS, Text, Title, TypographyNS } from '..'
import { useOutsideClick, useZoomComponent } from '../../hooks'
import { BaseComponent } from '../../types'
import { ConditionalWrapper } from '../conditional-wrapper'

export namespace PopoverNS {
  export const Trigger = ['click', 'focus', 'hover'] as const
  export type Trigger = typeof Trigger[number]

  export type Placement = typeof Placement[number]
  const Placement = [
    'top-start',
    'top',
    'top-end',
    'right-start',
    'right',
    'right-end',
    'bottom-start',
    'bottom',
    'bottom-end',
    'left-start',
    'left',
    'left-end',
  ] as const

  export interface Handlers {
    openPopover: () => void
    closePopover: () => void
  }

  export interface Props extends Omit<BaseComponent, 'children'> {
    title?: string | ReactNode
    titleProps?: TypographyNS.TitleNS.Props
    popoverProps?: HTMLAttributes<HTMLDivElement>
    content?: ReactNode | ((handlers: Handlers) => ReactNode)
    contentProps?: HTMLAttributes<HTMLDivElement>
    description?: string
    descriptionProps?: TypographyNS.TextNS.Props
    trigger?: Trigger
    onOpen?: VoidFunction
    onClose?: VoidFunction
    defaultIsOpen?: boolean
    loading?: boolean
    loadingTitle?: string
    placement?: Placement
    showArrow?: boolean
    spinProps?: SpinNS.Props
    hoverDelay?: number
    width?: string | number
    autoCloseDelay?: number
    childRef?: RefObject<HTMLElement | null>
    children?: JSX.Element | ((handlers: Handlers) => JSX.Element)
  }
}

export const Popover: FC<PopoverNS.Props> = ({
  reference: customContainerRef,
  childRef: customChildRef,
  trigger = 'hover',
  placement = 'top',
  showArrow = true,
  hoverDelay = 0,
  children,
  className,
  title,
  titleProps,
  popoverProps,
  content,
  contentProps,
  description,
  descriptionProps,
  onOpen,
  onClose,
  defaultIsOpen,
  loading,
  loadingTitle,
  spinProps,
  width,
  autoCloseDelay,
  containerProps,
  ...rest
}) => {
  const [isOpen, setIsOpen] = useState(!!defaultIsOpen)
  const containerRef = customContainerRef ?? useRef<HTMLDivElement>(null)
  const childRef = customChildRef ?? useRef<HTMLElement | null>(null)
  const timeout = useRef<number | null>(null)
  const { createClassName } = useZoomComponent('popover')
  const isValidPopover = !!title || !!description || !!content || loading

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

  const toggle = () => {
    setIsOpen(currentIsOpen => {
      if (currentIsOpen) {
        onClose?.()
        return false
      } else {
        onOpen?.()
        return true
      }
    })
  }

  const open = () => {
    onOpen?.()
    setIsOpen(true)

    if (autoCloseDelay) {
      setTimeout(close, autoCloseDelay)
    }
  }

  const close = () => {
    onClose?.()
    setIsOpen(false)
  }

  const handleOnFocusOrBlur = (evt: FocusEvent<HTMLDivElement>) => {
    const isFocused = evt.type === 'focus'
    if (trigger === 'focus') {
      if (isFocused) open()
      else close()
    }
    if (isFocused) containerProps?.onFocus?.(evt)
    else containerProps?.onBlur?.(evt)
  }

  const handleOnMouseEnterOrLeave = (evt: MouseEvent<HTMLDivElement>) => {
    const isMouseEntered = evt.type === 'mouseenter'
    if (trigger === 'hover') {
      if (isMouseEntered) {
        timeout.current = window.setTimeout(open, hoverDelay)
      } else {
        if (timeout.current) {
          clearTimeout(timeout.current)
        }
        close()
      }
    }
    if (isMouseEntered) containerProps?.onMouseEnter?.(evt)
    else containerProps?.onMouseLeave?.(evt)
  }

  const handleOnClick = (evt: MouseEvent<HTMLDivElement>) => {
    if (trigger === 'click') {
      if (evt.target === childRef.current) {
        toggle()
      } else {
        open()
      }
    }
    rest?.onClick?.(evt)
  }

  const getChildren = (): JSX.Element => {
    return (
      (typeof children === 'function'
        ? children({ openPopover: open, closePopover: close })
        : children) || <></>
    )
  }

  useEffect(() => {
    if (defaultIsOpen) {
      open()
    }

    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current)
      }
    }
  }, [])

  useOutsideClick(close, containerRef)
  return (
    <ConditionalWrapper
      condition={isValidPopover}
      trueWrapper={child => <>{child}</>}
      falseWrapper={() => <>{getChildren()}</>}
    >
      <div
        {...rest}
        {...containerProps}
        className={classes}
        ref={containerRef}
        onFocus={handleOnFocusOrBlur}
        onBlur={handleOnFocusOrBlur}
        onMouseEnter={handleOnMouseEnterOrLeave}
        onMouseLeave={handleOnMouseEnterOrLeave}
        onClick={handleOnClick}
      >
        {isOpen && (
          <div
            {...popoverProps}
            className={popoverClasses}
            style={{ width: width ?? 'max-content' }}
          >
            <div className="container-children">
              {showArrow && <span className="arrow" />}

              {loading ? (
                <div className="popover-loader">
                  <Spin {...spinProps} tip={loadingTitle || spinProps?.tip} />
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
        )}

        {children && cloneElement(getChildren(), { reference: childRef })}
      </div>
    </ConditionalWrapper>
  )
}
