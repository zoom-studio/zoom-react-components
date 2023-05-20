import React, { CSSProperties, FC, useRef } from 'react'

import { ComponentMeta } from '@storybook/react'

import { Emoji, ResizableMaker, ResizableMakerNS } from '../components'
import { color } from '../utils'

export default {
  title: 'Utility/Resizable maker',
  component: ResizableMaker,
  args: {
    direction: 'XY',
  },
} as ComponentMeta<typeof ResizableMaker>

const useResizableMakerStory = () => {
  const resizable = useRef<HTMLDivElement | null>(null)

  const handlersStyle: CSSProperties = {
    position: 'absolute',
    background: color({ source: 'accent' }),
    margin: 'auto',
    borderRadius: 10,
  }

  const renderChildren = (
    resize: ResizableMakerNS.ChildrenCallbackParams['resize'],
    direction: ResizableMakerNS.ResizeDirections,
  ) => (
    <div
      ref={resizable}
      style={{
        width: 300,
        height: 300,
        background: color({ source: 'layer', tone: 2 }),
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
        margin: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Emoji name="smiling face" />

      {(direction === 'Y' || direction === 'XY') && (
        <span
          style={{ ...handlersStyle, width: '30%', left: 0, right: 0, height: 10, bottom: 0 }}
          onMouseDown={resize('ns')}
        />
      )}
      {(direction === 'X' || direction === 'XY') && (
        <span
          style={{ ...handlersStyle, height: '30%', right: 0, top: 0, bottom: 0, width: 10 }}
          onMouseDown={resize('ew')}
        />
      )}
    </div>
  )

  return { renderChildren, resizable }
}

export const DirectionX = () => {
  const { renderChildren, resizable } = useResizableMakerStory()
  return (
    <ResizableMaker direction="X" resizable={resizable}>
      {({ resize }) => renderChildren(resize, 'X')}
    </ResizableMaker>
  )
}

export const DirectionY = () => {
  const { renderChildren, resizable } = useResizableMakerStory()
  return (
    <ResizableMaker direction="Y" resizable={resizable}>
      {({ resize }) => renderChildren(resize, 'Y')}
    </ResizableMaker>
  )
}

export const DirectionXY = () => {
  const { renderChildren, resizable } = useResizableMakerStory()
  return (
    <ResizableMaker direction="XY" resizable={resizable}>
      {({ resize }) => renderChildren(resize, 'XY')}
    </ResizableMaker>
  )
}

export const Playground: FC<ResizableMakerNS.Props> = props => {
  const { renderChildren, resizable } = useResizableMakerStory()
  return (
    <ResizableMaker {...props} resizable={resizable}>
      {({ resize }) => renderChildren(resize, props.direction ?? 'Y')}
    </ResizableMaker>
  )
}
