import React, { CSSProperties, FC, useRef } from 'react'

import { ComponentMeta } from '@storybook/react'

import { Emoji, ResizableMaker, ResizableMakerNS } from '../components'
import { color } from '../utils'

export default {
  title: 'Utility/Resizable maker',
  component: ResizableMaker,
  args: {},
} as ComponentMeta<typeof ResizableMaker>

const useResizableMakerStory = () => {
  const resizable = useRef<HTMLDivElement | null>(null)
  const borderWidth = 20
  const borderLength = 40
  const position = -1 * (borderWidth / 2)

  const handlersStyle: CSSProperties = {
    position: 'absolute',
    background: color({ source: 'accent' }),
    margin: 'auto',
    borderRadius: 10,
  }

  const getHandlerStyle = (direction: ResizableMakerNS.ResizeDirection): CSSProperties => {
    switch (direction) {
      case 'top': {
        return {
          ...handlersStyle,
          top: position,
          left: 0,
          right: 0,
          width: borderLength,
          height: borderWidth,
        }
      }
      case 'bottom': {
        return {
          ...handlersStyle,
          bottom: position,
          right: 0,
          left: 0,
          width: borderLength,
          height: borderWidth,
        }
      }
      case 'start': {
        return {
          ...handlersStyle,
          left: position,
          top: 0,
          bottom: 0,
          height: borderLength,
          width: borderWidth,
        }
      }
      case 'end': {
        return {
          ...handlersStyle,
          right: position,
          top: 0,
          bottom: 0,
          height: borderLength,
          width: borderWidth,
        }
      }
      case 'topStart': {
        return {
          ...handlersStyle,
          left: position,
          top: position,
          width: borderWidth,
          height: borderWidth,
        }
      }
      case 'topEnd': {
        return {
          ...handlersStyle,
          right: position,
          top: position,
          width: borderWidth,
          height: borderWidth,
        }
      }
      case 'bottomStart': {
        return {
          ...handlersStyle,
          left: position,
          bottom: position,
          width: borderWidth,
          height: borderWidth,
        }
      }
      case 'bottomEnd': {
        return {
          ...handlersStyle,
          right: position,
          bottom: position,
          width: borderWidth,
          height: borderWidth,
        }
      }
    }
  }

  const renderChildren = (
    resize: ResizableMakerNS.ChildrenCallbackParams['resize'],
    isResizing: boolean,
  ) => (
    <div
      ref={resizable}
      style={{
        width: 300,
        height: 300,
        background: color({ source: 'layer', tone: 2 }),
        position: 'fixed',
        left: 150,
        top: 150,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Emoji
        name={isResizing ? 'face with spiral eyes' : 'smiling face'}
        style={{ maxWidth: '80%' }}
      />

      {ResizableMakerNS.ResizeDirection.map((direction, index) => (
        <span key={index} onMouseDown={resize(direction)} style={getHandlerStyle(direction)} />
      ))}
    </div>
  )

  return { renderChildren, resizable }
}

export const Playground: FC<ResizableMakerNS.Props> = props => {
  const { renderChildren, resizable } = useResizableMakerStory()
  return (
    <ResizableMaker {...props} resizable={resizable}>
      {({ resize, isResizing }) => renderChildren(resize, isResizing)}
    </ResizableMaker>
  )
}
