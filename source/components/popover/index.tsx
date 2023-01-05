import React, {
  FC,
  FocusEvent,
  HTMLAttributes,
  MouseEvent,
  ReactNode,
  RefObject,
  useRef,
  useState,
} from 'react'

import { Spin, Text, Title, TypographyNS } from '..'
import { useOutsideClick, useZoomComponent } from '../../hooks'

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

  export interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
    children: ReactNode
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
  }
}

export const Popover: FC<PopoverNS.Props> = ({
  trigger = 'hover',
  placement = 'top',
  showArrow = true,
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
  ...rest
}) => {
  const containerRef = customContainerRef ?? useRef<HTMLDivElement>(null)
  const { createClassName } = useZoomComponent('popover')
  const [isOpen, setIsOpen] = useState(!!defaultIsOpen)

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

  const toggle = () => setIsOpen(isOpen => (isOpen ? close : open)())

  const open = (): boolean => {
    onOpen?.()
    setIsOpen(true)
    return true
  }

  const close = (): boolean => {
    onClose?.()
    setIsOpen(false)
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
      if (isMouseEntered) open()
      else close()
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

  useOutsideClick(close, containerRef)
  return (
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
      {isOpen && (
        <div {...popoverProps} className={popoverClasses}>
          <div className="container-children">
            {showArrow && <span className="arrow" />}

            {loading ? (
              <Spin tip={loadingTitle} />
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
      )}
      {children}
    </div>
  )
}
