import React, {
  forwardRef,
  type HTMLAttributes,
  type MouseEvent,
  type ReactNode,
  useEffect,
} from 'react'

import { useComponentSize, useZoomComponent } from '../../hooks'
import { type BaseComponent, type CommonSize } from '../../types'

import { Button, type ButtonNS, ScrollView, Title, Portal } from '..'

export namespace BottomSheetNS {
  export type Action = ButtonNS.Props

  export interface Props extends Omit<BaseComponent, 'children'> {
    children: ReactNode
    isOpen?: boolean
    onClose?: () => void
    size?: CommonSize
    backdropProps?: HTMLAttributes<HTMLDivElement>
    closable?: boolean
    actions?: Action[]
    secondaryActions?: Action[]
    cancelButtonProps?: Action
    title?: string
    cancelButton?: string | false
    onCancelButtonClick?: (evt: MouseEvent<HTMLButtonElement>, defaultOnClick: () => void) => void
    onWillCancelButtonClick?: (evt: MouseEvent<HTMLButtonElement>) => void
    closeButtonProps?: Action
  }
}

export const BottomSheet = forwardRef<HTMLDivElement, BottomSheetNS.Props>(
  (
    {
      size: providedSize,
      cancelButton = 'انصراف',
      closable = true,
      className,
      containerProps,
      isOpen,
      actions,
      backdropProps,
      cancelButtonProps,
      closeButtonProps,
      onCancelButtonClick,
      onWillCancelButtonClick,
      secondaryActions,
      title,
      children,
      onClose,
      ...rest
    },
    reference,
  ) => {
    const size = useComponentSize(providedSize)
    const { createClassName } = useZoomComponent('bottom-sheet')

    const classes = createClassName(className, '', {
      [createClassName('', size)]: true,
    })

    const backdropClasses = createClassName(backdropProps?.className, 'backdrop')

    const close = () => {
      if (closable) {
        onClose?.()
      }
    }

    const handleOnCancelButtonClick = (evt: MouseEvent<HTMLButtonElement>) => {
      if (onCancelButtonClick) {
        onCancelButtonClick(evt, close)
        return
      }
      onWillCancelButtonClick?.(evt)
      close()
    }

    const onEscape = (evt: globalThis.KeyboardEvent) => {
      if (evt.key === 'Escape' || evt.which === 27) {
        close()
      }
      window.removeEventListener('keydown', onEscape)
    }

    useEffect(() => {
      if (isOpen) {
        window.addEventListener('keydown', onEscape)
      } else {
        window.removeEventListener('keydown', onEscape)
      }
    }, [isOpen])

    return (
      <Portal>
        {isOpen && (
          <>
            <div {...backdropProps} className={backdropClasses} onClick={close} />

            <div {...containerProps} {...rest} className={classes} ref={reference}>
              <div className="header">
                <Title className="title" h6>
                  {title}
                </Title>

                {closable && (
                  <Button
                    prefixMaterialIcon="close"
                    shape="square"
                    size="large"
                    className="close"
                    type="link"
                    variant="error"
                    onClick={close}
                    {...closeButtonProps}
                  />
                )}
              </div>

              <div className="body">
                <ScrollView maxHeight="calc(100vh - 200px)">{children}</ScrollView>
              </div>

              <div className="footer">
                <div className="actions secondary">
                  {cancelButton && closable && (
                    <Button
                      type="link"
                      variant="error"
                      {...cancelButtonProps}
                      onClick={handleOnCancelButtonClick}
                    >
                      {cancelButton}
                    </Button>
                  )}
                  {secondaryActions?.map((action, index) => (
                    <Button size="small" type="dashed" {...action} key={index} />
                  ))}
                </div>

                <div className="actions">
                  {actions?.map((action, index) => (
                    <Button size="small" {...action} key={index} />
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </Portal>
    )
  },
)
