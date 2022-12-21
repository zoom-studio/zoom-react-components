import React, {
  FC,
  HTMLAttributes,
  MouseEvent,
  RefObject,
  useEffect,
  useRef,
  useState,
} from 'react'

import { useZoomComponent } from '../../hooks'
import { makeElementDraggable } from '../../utils'

import { ButtonNS, Button, Icon, Title } from '..'

export namespace DialogNS {
  export type Action = ButtonNS.Props
  export type ButtonProps = ButtonNS.Props
  export type Size = 'small' | 'normal' | 'large'

  export interface BackdropProps extends HTMLAttributes<HTMLDivElement> {}
  export interface HeaderProps extends HTMLAttributes<HTMLDivElement> {}
  export interface BodyProps extends HTMLAttributes<HTMLDivElement> {}
  export interface FooterProps extends HTMLAttributes<HTMLDivElement> {}

  export interface Props extends HTMLAttributes<HTMLDivElement> {
    isOpen?: boolean
    onClose?: () => void
    closable?: boolean
    backdropProps?: BackdropProps
    actions?: Action[]
    size?: Size
    secondaryActions?: Action[]
    title?: string
    cancelButton?: string | false
    cancelButtonProps?: ButtonProps
    onCancelButtonClick?: (
      evt: MouseEvent<HTMLButtonElement>,
      defaultOnClick: () => void,
    ) => void
    onWillCancelButtonClick?: (evt: MouseEvent<HTMLButtonElement>) => void
    fullScreen?: boolean
    fullScreenButtonProps?: ButtonProps
    withFullscreenButton?: boolean
    closeButtonProps?: ButtonProps
    headerProps?: HeaderProps
    bodyProps?: BodyProps
    footerProps?: FooterProps
    dialogRef?: RefObject<HTMLDivElement>
    backdropRef?: RefObject<HTMLDivElement>
  }
}

const HEADER_ACTION_BUTTON_CLASS = 'header-action-button'

export const Dialog: FC<DialogNS.Props> = ({
  size = 'normal',
  cancelButton = 'انصراف',
  withFullscreenButton = true,
  closable = true,
  dialogRef: customDialogRef,
  children,
  className,
  isOpen,
  onClose,
  backdropProps,
  actions,
  secondaryActions,
  title,
  cancelButtonProps,
  onCancelButtonClick,
  onWillCancelButtonClick,
  fullScreen,
  fullScreenButtonProps,
  closeButtonProps,
  headerProps,
  bodyProps,
  footerProps,
  backdropRef,
  ...rest
}) => {
  const dialogRef = customDialogRef ?? useRef<HTMLDivElement>(null)
  const [isFullscreen, setIsFullscreen] = useState(!!fullScreen)
  const { createClassName } = useZoomComponent('dialog')
  const headerClasses = createClassName(headerProps?.className, 'header')
  const bodyClasses = createClassName(bodyProps?.className, 'body')
  const footerClasses = createClassName(footerProps?.className, 'footer')
  const backdropClasses = createClassName(backdropProps?.className, 'backdrop')

  const actionButtonClasses = (classNames?: string) => {
    return createClassName(classNames, 'action-button')
  }

  const cancelButtonClasses = createClassName(
    cancelButtonProps?.className,
    'action-button',
  )

  const fullscreenButtonClasses = createClassName(
    fullScreenButtonProps?.className,
    'fullscreen-button',
    {
      [HEADER_ACTION_BUTTON_CLASS]: true,
    },
  )

  const closeButtonClasses = createClassName(
    closeButtonProps?.className,
    'close-button',
    {
      [HEADER_ACTION_BUTTON_CLASS]: true,
    },
  )

  const dialogClasses = createClassName(className, '', {
    [`${createClassName('', size)}`]: true,
    fullscreen: isFullscreen,
  })

  const close = () => {
    if (closable) {
      onClose?.()
    }
  }

  const handleOnCancelButtonClick = (evt: MouseEvent<HTMLButtonElement>) => {
    if (onCancelButtonClick) {
      return onCancelButtonClick(evt, close)
    }
    onWillCancelButtonClick?.(evt)
    close()
  }

  const toggleFullscreen = () => {
    setIsFullscreen(isFullscreen => !isFullscreen)
  }

  const onEscape = (evt: globalThis.KeyboardEvent) => {
    if (evt.key === 'Escape' || evt.which === 27) {
      close()
    }
  }

  const handleOnOpen = () => {
    const { current: dialog } = dialogRef

    window.addEventListener('keydown', onEscape)

    if (dialog) {
      makeElementDraggable({
        element: dialog,
        onDragStart: () => setIsFullscreen(false),
        whiteList: ['draggable-area'],
      })
    }
  }

  const handleOnClose = () => {
    window.removeEventListener('keydown', onEscape)
  }

  useEffect(() => {
    if (isOpen) {
      handleOnOpen()
    } else {
      handleOnClose()
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      setIsFullscreen(!!fullScreen)
    }
  }, [fullScreen])

  return (
    <>
      {isOpen && (
        <>
          <div
            onClick={close}
            {...backdropProps}
            className={backdropClasses}
            ref={backdropRef}
          />

          <div {...rest} className={dialogClasses} ref={dialogRef}>
            <div {...headerProps} className={headerClasses}>
              <Title h6 className="title draggable-area">
                {title}
              </Title>

              <div className="actions">
                {withFullscreenButton && (
                  <Button
                    type="text"
                    onClick={toggleFullscreen}
                    {...fullScreenButtonProps}
                    className={fullscreenButtonClasses}
                  >
                    <Icon name={isFullscreen ? 'crop' : 'crop_free'} />
                  </Button>
                )}

                {closable && (
                  <Button
                    type="text"
                    onClick={close}
                    {...closeButtonProps}
                    className={closeButtonClasses}
                  >
                    <Icon name="close" />
                  </Button>
                )}
              </div>
            </div>

            <div {...bodyProps} className={bodyClasses}>
              {children}
            </div>

            <div {...footerProps} className={footerClasses}>
              <div className="actions secondary">
                {cancelButton && closable && (
                  <Button
                    type="link"
                    variant="error"
                    {...cancelButtonProps}
                    className={cancelButtonClasses}
                    onClick={handleOnCancelButtonClick}
                  >
                    {cancelButton}
                  </Button>
                )}
                {secondaryActions?.map((action, index) => (
                  <Button
                    {...action}
                    className={actionButtonClasses(action.className)}
                    key={index}
                  />
                ))}
              </div>

              <div className="actions">
                {actions?.map((action, index) => (
                  <Button
                    {...action}
                    className={actionButtonClasses(action.className)}
                    key={index}
                  />
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
