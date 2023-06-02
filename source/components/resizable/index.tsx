import React, { type CSSProperties, type FC, type ReactNode, useRef } from 'react'

import { classNames, toKebabCase } from '@zoom-studio/zoom-js-ts-utils'

import { ResizableMaker, ResizableMakerNS } from '../resizable-maker'
import { useZoomComponent } from '../../hooks'
import { type BaseComponent } from '../../types'

export namespace ResizableNS {
  export type Size = number | string

  export type HandlersObject = {
    [handler in ResizableMakerNS.ResizeDirection]?: boolean
  }

  export interface ChildrenCallbackParams {
    isResizing: boolean
  }

  export interface Props extends Omit<BaseComponent, 'children'>, HandlersObject {
    initialWidth?: Size
    initialHeight?: Size
    maxWidth?: Size
    maxHeight?: Size
    minWidth?: Size
    minHeight?: Size
    children?: ReactNode | ((params: ChildrenCallbackParams) => ReactNode)
  }
}

export const Resizable: FC<ResizableNS.Props> = ({
  initialHeight = 200,
  initialWidth = 200,
  maxHeight = 'unset',
  maxWidth = 'unset',
  minHeight = 'unset',
  minWidth = 'unset',
  bottom,
  bottomEnd,
  bottomStart,
  end,
  start,
  top,
  topEnd,
  topStart,
  children,
  className,
  containerProps,
  style,
}) => {
  const { createClassName } = useZoomComponent('resizable')
  const containerRef = useRef<HTMLDivElement>(null)

  const classes = createClassName(className)

  const handlers: Required<ResizableNS.HandlersObject> = {
    bottom: bottom ?? false,
    bottomEnd: bottomEnd ?? false,
    bottomStart: bottomStart ?? false,
    end: end ?? false,
    start: start ?? false,
    top: top ?? false,
    topEnd: topEnd ?? false,
    topStart: topStart ?? false,
  }

  const isEnabled = (handler: ResizableMakerNS.ResizeDirection) => !!handlers?.[handler]

  const createHandlerClassName = (handler: ResizableMakerNS.ResizeDirection) => {
    return classNames('resizable-handler', {
      [`handler-${toKebabCase(handler)}`]: true,
    })
  }

  const containerStyles: CSSProperties = {
    ...(style ?? {}),
    width: initialWidth,
    height: initialHeight,
    maxHeight,
    minHeight,
    maxWidth,
    minWidth,
  }

  return (
    <ResizableMaker resizable={containerRef}>
      {({ resize, isResizing }) => (
        <div {...containerProps} style={containerStyles} className={classes} ref={containerRef}>
          {ResizableMakerNS.ResizeDirection.map((handler, index) =>
            isEnabled(handler) ? (
              <span
                key={index}
                onMouseDown={evt => {
                  resize(handler)(evt)
                }}
                className={createHandlerClassName(handler)}
              />
            ) : (
              <></>
            ),
          )}

          {typeof children === 'function' ? children({ isResizing }) : children}
        </div>
      )}
    </ResizableMaker>
  )
}
