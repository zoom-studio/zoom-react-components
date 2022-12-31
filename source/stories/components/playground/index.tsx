import React, { FC, ReactNode } from 'react'

export namespace StoryPlaygroundNS {
  export interface Props<Props> {
    component: FC<Props>
    props?: Props
    children?: ReactNode
  }
}

export function StoryPlayground<Props = {}>({
  component: Component,
  children,
  props,
}: React.PropsWithChildren<StoryPlaygroundNS.Props<Props>>): JSX.Element {
  return (
    <div className="story-playground">
      {children}
      {/* @ts-expect-error */}
      <Component {...props} />
    </div>
  )
}
