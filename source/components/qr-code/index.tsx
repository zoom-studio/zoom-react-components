import React, { forwardRef, useEffect, useRef, type ReactNode } from 'react'

import QRCodeStyling, {
  type CornerDotType,
  type CornerSquareType,
  type DotType,
} from 'qr-code-styling'

import { type BaseComponent } from '../../types'
import { color as generateColor } from '../../utils'
import { Renderer } from './renderer'

export namespace QRCodeNS {
  export interface ChildrenCallbackParams {
    render: () => ReactNode
    download: () => Promise<void>
  }

  export interface Props extends Omit<BaseComponent<HTMLDivElement>, 'children'> {
    children: (handlers: ChildrenCallbackParams) => ReactNode
    downloadName?: () => string
    data: string
    size?: number
    logo?: string
    color?: string
    cornersDotType?: CornerDotType
    cornersSquareType?: CornerSquareType
    dotsType?: DotType
  }
}

export const QRCode = forwardRef<HTMLDivElement, QRCodeNS.Props>(
  (
    {
      downloadName = () => `zoom-qr-code-${new Date().toISOString()}`,
      color = generateColor({ source: 'accent', tone: 1 }),
      cornersDotType = 'dot',
      cornersSquareType = 'dot',
      dotsType = 'dots',
      size = 230,
      logo,
      children,
      data,
      containerProps,
      className,
      ...rest
    },
    reference,
  ) => {
    const qrCodeRef = useRef<QRCodeStyling | null>(null)

    const render = (): ReactNode => {
      return (
        <Renderer
          qrCodeRef={qrCodeRef}
          className={className}
          containerProps={containerProps}
          reference={reference}
          {...rest}
        />
      )
    }

    const download = async (): Promise<void> => {
      const { current: qrCode } = qrCodeRef
      if (!qrCode) {
        return
      }

      qrCode.update({ backgroundOptions: { color: 'white' } })
      await qrCode.download({ extension: 'png', name: downloadName() }).finally(() => {
        qrCode.update({ backgroundOptions: { color: 'transparent' } })
      })
    }

    useEffect(() => {
      qrCodeRef.current = new QRCodeStyling({
        data,
        width: size,
        height: size,
        image: logo,
        margin: 0,
        backgroundOptions: { color: 'transparent' },
        cornersDotOptions: { color, type: cornersDotType },
        cornersSquareOptions: { color, type: cornersSquareType },
        dotsOptions: { color, type: dotsType },
        imageOptions: { crossOrigin: 'anonymous', margin: 10 },
        shape: 'square',
        type: 'svg',
      })
    }, [data, cornersDotType, cornersSquareType, dotsType, color, logo, size])

    return <>{children({ download, render })}</>
  },
)
