import React, { forwardRef, type ReactNode } from 'react'

import {
  Button,
  ButtonGroup,
  Popover,
  QRCode,
  Title,
  type ButtonGroupNS,
  type ButtonNS,
  type PopoverNS,
  type QRCodeNS,
} from '..'
import { useZoomComponent } from '../../hooks'

import { useQRCodePopoverI18n, type UseQRCodePopoverI18nNS } from './use-i18n'

export namespace QRCodePopoverNS {
  export type I18n = UseQRCodePopoverI18nNS.I18n

  export interface Props extends Omit<QRCodeNS.Props, 'children'> {
    buttonProps?: ButtonNS.Props
    popoverProps?: Omit<PopoverNS.Props, 'content' | 'trigger'>
    actions?: ButtonNS.Props[]
    showDownloadAction?: boolean
    title?: ReactNode
    actionButtonsProps?: ButtonNS.Props
    children?: ButtonNS.Props['children']
  }
}

export const QRCodePopover = forwardRef<HTMLButtonElement, QRCodePopoverNS.Props>(
  (
    {
      showDownloadAction = true,
      actions = [],
      actionButtonsProps,
      title,
      popoverProps,
      buttonProps,
      children,
      ...QRCodeProps
    },
    reference,
  ) => {
    const { createClassName, globalI18ns } = useZoomComponent('qr-code-popover')
    const popoverClasses = createClassName()
    const i18n = useQRCodePopoverI18n(globalI18ns)

    const QRCodeSize = QRCodeProps.size ?? 230

    const renderActions = (download: () => Promise<void>): ReactNode => {
      const allActions: ButtonGroupNS.Props['buttons'] = [...actions]

      if (showDownloadAction) {
        allActions.push({
          children: i18n.download,
          onClick: () => {
            void download()
          },
        })
      }

      switch (allActions.length) {
        case 0: {
          return null
        }
        case 1: {
          return <Button {...actionButtonsProps} {...allActions[0]} />
        }
        default: {
          return (
            <ButtonGroup buttonsProps={actionButtonsProps} buttons={allActions} direction="row" />
          )
        }
      }
    }

    return (
      <Popover
        trigger="click"
        {...popoverProps}
        content={
          <QRCode {...QRCodeProps}>
            {({ download, render }) => (
              <div className={popoverClasses}>
                {title && (
                  <div className="qr-code-title">
                    {typeof title === 'string' ? <Title h5>{title}</Title> : title}
                  </div>
                )}

                <div
                  className="qr-code-container"
                  style={{ width: QRCodeSize, height: QRCodeSize }}
                >
                  {render()}
                </div>

                {(actions.length > 0 || showDownloadAction) && (
                  <div className="qr-code-action">{renderActions(download)}</div>
                )}
              </div>
            )}
          </QRCode>
        }
      >
        <Button ref={reference} {...buttonProps}>
          {children}
        </Button>
      </Popover>
    )
  },
)
