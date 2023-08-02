import React, { useEffect, useRef, type FC, type MutableRefObject } from 'react'

import { doByRef } from '@zoom-studio/zoom-js-ts-utils'
import type QRCodeStyling from 'qr-code-styling'

import { type QRCodeNS } from '.'
import { logs } from '../../constants'
import { useZoomComponent } from '../../hooks'

export namespace RendererNS {
  export interface Props
    extends Pick<QRCodeNS.Props, 'className' | 'containerProps' | 'id' | 'onClick' | 'style'> {
    qrCodeRef: MutableRefObject<QRCodeStyling | null>
    reference: React.ForwardedRef<HTMLDivElement>
  }
}

export const Renderer: FC<RendererNS.Props> = ({
  className,
  containerProps,
  qrCodeRef,
  reference,
  ...rest
}) => {
  const { createClassName, sendLog } = useZoomComponent('qr-code')
  const containerRef = reference ?? useRef<HTMLDivElement>(null)

  const classes = createClassName(className)

  const onContainerRefFails = () => {
    sendLog(logs.qrCodeQrCodeContainerRefNotFound, 'useEffect inside Renderer component')
  }

  const onQrCodeRefFails = () => {
    sendLog(logs.qrCodeQrCodeRefNotFound, 'useEffect inside Renderer component')
  }

  useEffect(() => {
    setTimeout(() => {
      doByRef(
        qrCodeRef,
        qrCode => {
          doByRef(
            containerRef,
            container => {
              qrCode.append(container)
            },
            onContainerRefFails,
          )
        },
        onQrCodeRefFails,
      )
    }, 100)
  }, [])

  return <div {...containerProps} {...rest} ref={containerRef} className={classes} />
}
