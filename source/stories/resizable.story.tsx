import React, { CSSProperties, FC } from 'react'

import { ComponentMeta } from '@storybook/react'

import { Resizable, ResizableNS } from '../components'
import { CommonStory, StoryPlayground } from './components'
import { color } from '../utils'

const renderChildren = ({ isResizing }: ResizableNS.ChildrenCallbackParams) => (
  <div
    children={isResizing ? 'Resizing...' : 'Resize me :)'}
    style={{
      width: '100%',
      height: '100%',
      background: color({ source: 'layer', tone: 2 }),
      color: color({ source: 'text', tone: 2 }),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      direction: 'ltr',
      userSelect: 'none',
    }}
  />
)

const enableAllHandlers: ResizableNS.HandlersObject = {
  bottom: true,
  bottomEnd: true,
  bottomStart: true,
  end: true,
  start: true,
  top: true,
  topEnd: true,
  topStart: true,
}

const containerStyles: CSSProperties = {
  position: 'fixed',
  top: 200,
  left: 200,
  margin: 'auto',
}

export default {
  title: 'Layout/Resizable',
  component: Resizable,
  args: {
    maxWidth: 1000,
    minWidth: 200,
    maxHeight: 1000,
    minHeight: 200,
    initialWidth: 300,
    initialHeight: 300,
    bottom: true,
    bottomEnd: true,
    bottomStart: true,
    end: true,
    start: true,
    top: true,
    topEnd: true,
    topStart: true,
    children: renderChildren,
    style: containerStyles,
  },
} as ComponentMeta<typeof Resizable>

export const InitialSizes: FC = () => {
  return (
    <CommonStory
      component={Resizable}
      stories={[
        {
          group: [
            {
              name: 'width:200px height:200px (Default)',
              props: {
                ...enableAllHandlers,
                children: renderChildren,
              },
            },
            {
              name: 'width:500px height:100px',
              props: {
                ...enableAllHandlers,
                children: renderChildren,
                initialWidth: 500,
                initialHeight: 100,
              },
            },
          ],
        },
      ]}
    />
  )
}

export const MaxSizes: FC = () => {
  return (
    <CommonStory
      component={Resizable}
      stories={[
        {
          group: [
            {
              name: 'max-width:unset max-height:unset (Default)',
              props: {
                ...enableAllHandlers,
                children: renderChildren,
              },
            },
            {
              name: 'max-width:400px max-height:500px',
              props: {
                ...enableAllHandlers,
                children: renderChildren,
                maxHeight: 500,
                maxWidth: 400,
              },
            },
          ],
        },
      ]}
    />
  )
}

export const MinSizes: FC = () => {
  return (
    <CommonStory
      component={Resizable}
      stories={[
        {
          group: [
            {
              name: 'min-width:unset min-height:unset (Default)',
              props: {
                ...enableAllHandlers,
                children: renderChildren,
              },
            },
            {
              name: 'min-width:40px min-height:50px',
              props: {
                ...enableAllHandlers,
                children: renderChildren,
                minHeight: 50,
                minWidth: 40,
              },
            },
          ],
        },
      ]}
    />
  )
}

export const Playground: FC<ResizableNS.Props> = props => {
  return <StoryPlayground component={Resizable} props={props} />
}
