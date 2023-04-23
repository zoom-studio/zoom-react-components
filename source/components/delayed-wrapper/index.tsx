import React, { FC, ReactNode, useEffect, useState } from 'react'

export namespace DelayedWrapperNS {
  export interface Props {
    timeout: number
    loader?: ReactNode
    children?: ReactNode
  }
}

export const DelayedWrapper: FC<DelayedWrapperNS.Props> = ({ timeout, children, loader }) => {
  const [shouldRenderChildren, setShouldRenderChildren] = useState(false)

  useEffect(() => {
    const timeoutID = setTimeout(() => {
      setShouldRenderChildren(true)
    }, timeout)

    return () => {
      clearTimeout(timeoutID)
    }
  }, [])

  return <>{shouldRenderChildren ? children : loader ?? <></>}</>
}
