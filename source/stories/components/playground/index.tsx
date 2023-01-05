import React, { FC, HTMLAttributes, ReactNode } from 'react'

export namespace StoryPlaygroundNS {
  export interface Props<Props> {
    component: FC<Props>
    props?: Props
    children?: ReactNode
    containerProps?: HTMLAttributes<HTMLDivElement>
  }
}

export function StoryPlayground<Props = {}>({
  component: Component,
  children,
  props,
  containerProps,
}: React.PropsWithChildren<StoryPlaygroundNS.Props<Props>>): JSX.Element {
  return (
    <div {...containerProps} className="story-playground">
      {children}
      {/* @ts-expect-error */}
      <Component {...props} />
    </div>
  )
}
