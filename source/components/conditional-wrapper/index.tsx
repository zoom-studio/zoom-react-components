import React, { FC, ReactNode } from 'react'

export namespace ConditionalWrapperNS {
  export type Wrapper = (children?: ReactNode) => JSX.Element

  export interface Props {
    condition: boolean | null | undefined
    trueWrapper: Wrapper
    falseWrapper: Wrapper
    children?: ReactNode
  }
}

export const ConditionalWrapper: FC<ConditionalWrapperNS.Props> = ({
  condition,
  children,
  trueWrapper,
  falseWrapper,
}) => {
  return <>{condition ? trueWrapper(children) : falseWrapper(children)}</>
}
