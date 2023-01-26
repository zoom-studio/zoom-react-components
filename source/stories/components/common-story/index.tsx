import React, { CSSProperties, FC, HTMLAttributes, ReactNode } from 'react'

import { Title } from '../../..'

export namespace CommonStoryNS {
  export interface Group<Props> {
    name?: string | ReactNode
    props?: Props
    containerProps?: HTMLAttributes<HTMLDivElement>
  }

  export interface Story<Props> {
    title?: string | ReactNode
    group?: Group<Props>[]
    custom?: ReactNode
  }

  export interface Props<Props> {
    stories: Story<Props>[]
    component: FC<Props>
    containerStyles?: CSSProperties
  }
}

export function CommonStory<Props = {}>({
  component: Component,
  stories,
  containerStyles,
}: React.PropsWithChildren<CommonStoryNS.Props<Props>>): JSX.Element {
  return (
    <div style={containerStyles} className="common-story">
      {stories.map(({ title, group, custom }, index) => (
        <div key={index} className="common-story-child">
          {title && (typeof title === 'string' ? <Title h1>{title}</Title> : title)}

          {custom && <div>{custom}</div>}

          {group?.map(({ name, props, containerProps }, index) => (
            <div key={index} {...containerProps}>
              {name && (typeof name === 'string' ? <Title>{name}</Title> : name)}
              {/* @ts-expect-error */}
              <Component {...props} />
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
