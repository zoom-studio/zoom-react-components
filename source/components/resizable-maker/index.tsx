import React, { FC, MouseEvent, ReactNode, RefObject, useState } from 'react'

export namespace ResizableMakerNS {
  export type Evt = MouseEvent<HTMLElement> | globalThis.MouseEvent

  export type ResizeDirection = typeof ResizeDirection[number]
  export const ResizeDirection = [
    'topEnd',
    'top',
    'topStart',
    'start',
    'bottomEnd',
    'bottom',
    'bottomStart',
    'end',
  ] as const

  export interface ChildrenCallbackParams {
    resize: (direction: ResizeDirection) => (evt: ResizableMakerNS.Evt) => void
    isResizing: boolean
  }

  export interface Props {
    resizable: (() => HTMLElement) | RefObject<HTMLElement | null>
    children: ReactNode | ((params: ChildrenCallbackParams) => ReactNode)
  }
}

export const ResizableMaker: FC<ResizableMakerNS.Props> = ({
  resizable: providedResizable,
  children,
}) => {
  const [isResizing, setIsResizing] = useState(false)

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

  const getStyle = (styleKey: string): number => {
    return parseInt(window.getComputedStyle(getResizable()).getPropertyValue(styleKey))
  }

  const resizeXPositive = (evt: ResizableMakerNS.Evt) => {
    let offsetX = 0

    const elementDrag = (evt: ResizableMakerNS.Evt) => {
      const { clientX } = evt
      const x = clientX - getResizable().offsetLeft - offsetX
      getResizable().style.width = x + 'px'
    }

    const closeDragElement = () => {
      setIsResizing(false)
      document.removeEventListener('mouseup', closeDragElement)
      document.removeEventListener('mousemove', elementDrag)
    }

    if (evt.button !== 0) return
    evt = evt || window.event
    evt.preventDefault()
    const { clientX } = evt
    offsetX = clientX - getResizable().offsetLeft - getStyle('width')
    document.addEventListener('mouseup', closeDragElement)
    document.addEventListener('mousemove', elementDrag)
  }

  const resizeYPositive = (evt: ResizableMakerNS.Evt) => {
    let offsetY = 0

    const elementDrag = (evt: ResizableMakerNS.Evt) => {
      const { clientY } = evt
      const y = clientY - getResizable().offsetTop - offsetY
      getResizable().style.height = y + 'px'
    }

    const closeDragElement = () => {
      setIsResizing(false)
      document.removeEventListener('mouseup', closeDragElement)
      document.removeEventListener('mousemove', elementDrag)
    }

    if (evt.button !== 0) return
    evt = evt || window.event
    evt.preventDefault()
    const { clientY } = evt
    offsetY = clientY - getResizable().offsetTop - getStyle('height')

    document.addEventListener('mouseup', closeDragElement)
    document.addEventListener('mousemove', elementDrag)
  }

  const resizeXNegative = (evt: ResizableMakerNS.Evt) => {
    let offsetX = 0
    let startX = 0
    let startW = 0

    const elementDrag = (evt: ResizableMakerNS.Evt) => {
      const { clientX } = evt
      const x = clientX - offsetX
      const w = startW + startX - x
      getResizable().style.left = x + 'px'
      getResizable().style.width = w + 'px'
    }

    const closeDragElement = () => {
      setIsResizing(false)
      document.removeEventListener('mouseup', closeDragElement)
      document.removeEventListener('mousemove', elementDrag)
    }

    if (evt.button !== 0) return
    evt = evt || window.event
    evt.preventDefault()
    const { clientX } = evt
    startX = getStyle('left')
    startW = getStyle('width')
    offsetX = clientX - startX

    document.addEventListener('mouseup', closeDragElement)
    document.addEventListener('mousemove', elementDrag)
  }

  const resizeYNegative = (evt: ResizableMakerNS.Evt) => {
    let offsetY = 0
    let startY = 0
    let startH = 0

    const elementDrag = (evt: ResizableMakerNS.Evt) => {
      const { clientY } = evt
      const y = clientY - offsetY
      const h = startH + startY - y
      getResizable().style.top = y + 'px'
      getResizable().style.height = h + 'px'
    }

    const closeDragElement = () => {
      setIsResizing(false)
      document.removeEventListener('mouseup', closeDragElement)
      document.removeEventListener('mousemove', elementDrag)
    }

    if (evt.button !== 0) {
      return null
    }

    evt = evt || window.event
    evt.preventDefault()

    const { clientY } = evt
    startY = getStyle('top')
    startH = getStyle('height')
    offsetY = clientY - startY

    document.addEventListener('mouseup', closeDragElement)
    document.addEventListener('mousemove', elementDrag)
  }

  const handleResize =
    (direction: ResizableMakerNS.ResizeDirection) => (evt: ResizableMakerNS.Evt) => {
      setIsResizing(true)

      switch (direction) {
        case 'top': {
          resizeYNegative(evt)
          break
        }
        case 'bottom': {
          resizeYPositive(evt)
          break
        }
        case 'start': {
          resizeXNegative(evt)
          break
        }
        case 'end': {
          resizeXPositive(evt)
          break
        }
        case 'topStart': {
          resizeXNegative(evt)
          resizeYNegative(evt)
          break
        }
        case 'topEnd': {
          resizeXPositive(evt)
          resizeYNegative(evt)
          break
        }
        case 'bottomStart': {
          resizeXNegative(evt)
          resizeYPositive(evt)
          break
        }
        case 'bottomEnd': {
          resizeXPositive(evt)
          resizeYPositive(evt)
          break
        }
      }
    }

  return (
    <>
      {typeof children === 'function' ? children({ resize: handleResize, isResizing }) : children}
    </>
  )
}
