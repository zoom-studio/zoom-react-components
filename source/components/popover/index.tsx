import React, {
  FC,
  FocusEvent,
  HTMLAttributes,
  MouseEvent,
  ReactNode,
  RefObject,
  useEffect,
  useRef,
} from 'react'

import { Spin, SpinNS, Text, Title, TypographyNS } from '..'
import { logs } from '../../constants'
import { useOutsideClick, useZoomComponent } from '../../hooks'
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

  export interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'width'> {
    children?: ReactNode
    containerRef?: RefObject<HTMLDivElement>
    title?: string
    titleProps?: TypographyNS.TitleNS.Props
    popoverProps?: HTMLAttributes<HTMLDivElement>
    content?: ReactNode
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
  }
}

export const Popover: FC<PopoverNS.Props> = ({
  trigger = 'hover',
  placement = 'top',
  showArrow = true,
  hoverDelay = 0,
  containerRef: customContainerRef,
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
  ...rest
}) => {
  const OPEN = 'open'
  const containerRef = customContainerRef ?? useRef<HTMLDivElement>(null)
  const timeout = useRef<number | null>(null)
  const { createClassName, sendLog } = useZoomComponent('popover')
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

  const isOpen = (): boolean => {
    const { current: container } = containerRef
    if (!container) {
      if (isValidPopover) {
        sendLog(logs.popoverNotFoundContainerRef, 'isOpen function')
      }
      return false
    }
    return container.classList.contains(OPEN)
  }

  const toggle = () => (isOpen() ? close : open)()

  const open = (): boolean => {
    onOpen?.()
    const { current: container } = containerRef
    if (!container) {
      if (isValidPopover) {
        sendLog(logs.popoverNotFoundContainerRef, 'open function')
      }
      return isOpen()
    }
    container.classList.add(OPEN)
    if (autoCloseDelay) {
      setTimeout(close, autoCloseDelay)
    }
    return true
  }

  const close = (): boolean => {
    onClose?.()
    const { current: container } = containerRef
    if (!container) {
      if (isValidPopover) {
        sendLog(logs.popoverNotFoundContainerRef, 'close function')
      }
      return isOpen()
    }
    container.classList.remove(OPEN)
    container.blur()
    return false
  }

  const handleOnFocusOrBlur = (evt: FocusEvent<HTMLDivElement>) => {
    const isFocused = evt.type === 'focus'
    if (trigger === 'focus') {
      if (isFocused) open()
      else close()
    }
    if (isFocused) rest?.onFocus?.(evt)
    else rest?.onBlur?.(evt)
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
    if (isMouseEntered) rest?.onMouseEnter?.(evt)
    else rest?.onMouseLeave?.(evt)
  }

  const handleOnClick = (evt: MouseEvent<HTMLDivElement>) => {
    if (trigger === 'click') {
      toggle()
    }
    rest?.onClick?.(evt)
  }

  useEffect(() => {
    if (defaultIsOpen) {
      open()
    }
  }, [])

  useOutsideClick(close, containerRef)
  return (
    <ConditionalWrapper
      condition={isValidPopover}
      trueWrapper={child => <>{child}</>}
      falseWrapper={() => <>{children}</>}
    >
      <div
        {...rest}
        className={classes}
        ref={containerRef}
        onFocus={handleOnFocusOrBlur}
        onBlur={handleOnFocusOrBlur}
        onMouseEnter={handleOnMouseEnterOrLeave}
        onMouseLeave={handleOnMouseEnterOrLeave}
        onClick={handleOnClick}
      >
        <div {...popoverProps} className={popoverClasses} style={{ width: width ?? 'max-content' }}>
          <div className="container-children">
            {showArrow && <span className="arrow" />}

            {loading ? (
              <div className="popover-loader">
                <Spin {...spinProps} tip={loadingTitle || spinProps?.tip} />
              </div>
            ) : (
              <>
                {title && (
                  <Title h5 {...titleProps} className={titleClasses}>
                    {title}
                  </Title>
                )}

                {description && (
                  <Text {...descriptionProps} className={descriptionClasses}>
                    {description}
                  </Text>
                )}

                {content && (
                  <div {...contentProps} className={contentClasses}>
                    {content}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        {children}
      </div>
    </ConditionalWrapper>
  )
}
