import React, { FC, MouseEvent, ReactNode, RefObject, useRef } from 'react'

import { logs } from '../../constants'
import { useZoomComponent } from '../../hooks'

export namespace ResizableMakerNS {
  export const ResizeDirections = ['Y', 'X', 'XY'] as const
  export type ResizeDirections = typeof ResizeDirections[number]

  export type CursorDirections = typeof CursorDirections[number]
  export const CursorDirections = ['ns', 'ew', 'ne', 'se'] as const

  export interface ResizableInfo {
    clientY: number
    clientX: number
    height: number
    width: number
    isResizing: boolean
  }

  export interface ChildrenCallbackParams {
    resize: (cursorDirection: CursorDirections) => (evt: MouseEvent<HTMLDivElement>) => void
  }

  export interface Props {
    direction: ResizeDirections
    resizable: (() => HTMLElement) | RefObject<HTMLElement | null>
    children: ReactNode | ((params: ChildrenCallbackParams) => ReactNode)
  }
}

export const ResizableMaker: FC<ResizableMakerNS.Props> = ({
  resizable: providedResizable,
  children,
  direction,
}) => {
  const resizableInfoRef = useRef<ResizableMakerNS.ResizableInfo | null>(null)
  const { sendLog, createClassName } = useZoomComponent('resizable-maker')

  const getResizingClasses = (cursorDirection: ResizableMakerNS.CursorDirections[]): string[] => {
    const classes = [createClassName('', 'resizing')]
    cursorDirection.forEach(direction => classes.push(createClassName('', `resizing-${direction}`)))
    return classes
  }

  const getResizable = (): HTMLElement => {
    if (!providedResizable) {
      throw new Error('The "resizable" is null or undefined')
    }
    if (typeof providedResizable === 'function') {
      return providedResizable()
    }
    if ('current' in providedResizable) {
      if (!providedResizable.current) {
        throw new Error('The "resizable" is ref but is not initialized yet')
      }
      return providedResizable.current
    }
    return providedResizable
  }

  const handleResize =
    (cursorDirection: ResizableMakerNS.CursorDirections) => (evt: MouseEvent<HTMLDivElement>) => {
      const resizable = getResizable()

      const styles = document.defaultView?.getComputedStyle(resizable)
      if (!styles) {
        return sendLog(logs.resizableMakerComputedStylesNotFound, 'handleResize fn')
      }

      const { height, width } = styles

      resizableInfoRef.current = {
        clientY: evt.clientY,
        clientX: evt.clientX,
        height: parseInt(height ?? '200'),
        width: parseInt(width ?? '200'),
        isResizing: true,
      }

      document.body.classList.add(...getResizingClasses([cursorDirection]))

      document.addEventListener('mouseup', handleOnMouseUp)
      document.addEventListener('mousemove', handleOnMouseMove)
    }

  const handleOnMouseUp = () => {
    document.body.classList.remove(...getResizingClasses([...ResizableMakerNS.CursorDirections]))
    resizableInfoRef.current = {
      clientY: 0,
      clientX: 0,
      height: 0,
      width: 0,
      isResizing: false,
    }

    document.removeEventListener('mouseup', handleOnMouseUp)
    document.removeEventListener('mousemove', handleOnMouseMove)
  }

  const handleOnMouseMove = (evt: globalThis.MouseEvent) => {
    if (resizableInfoRef.current?.isResizing) {
      const { current: resizableInfo } = resizableInfoRef
      if (!resizableInfo) {
        return sendLog(logs.resizableMakerResizableInfoRefNotFound, 'handleOnMouseMove fn')
      }

      const resizable = getResizable()
      const { clientY, clientX, height, width } = resizableInfo

      if (direction === 'Y' || direction === 'XY') {
        resizable.style.height = `${height + evt.clientY - clientY}px`
      }
      if (direction === 'X' || direction === 'XY') {
        resizable.style.width = `${width + evt.clientX - clientX}px`
      }
    }
  }

  return <>{typeof children === 'function' ? children({ resize: handleResize }) : children}</>
}
