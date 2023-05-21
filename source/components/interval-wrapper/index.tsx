import React, { FC, ReactNode, useEffect, useState } from 'react'

export namespace IntervalWrapperNS {
  export interface Props {
    interval: number
    strategy?: 'toggle' | 'immediate-reload'
    immediateReloadDelay?: number
    children?: ReactNode
    loader?: ReactNode
  }
}

export const IntervalWrapper: FC<IntervalWrapperNS.Props> = ({
  strategy = 'toggle',
  immediateReloadDelay = 10,
  interval,
  children,
  loader,
}) => {
  const [shouldRenderChildren, setShouldRenderChildren] = useState(strategy === 'immediate-reload')

  const toggleRender = () => {
    setShouldRenderChildren(currentShouldRender => !currentShouldRender)
  }

  useEffect(() => {
    const intervalID = setInterval(() => {
      if (strategy === 'toggle') {
        toggleRender()
      } else {
        toggleRender()
        setTimeout(toggleRender, immediateReloadDelay)
      }
    }, interval)

    return () => {
      clearInterval(intervalID)
    }
  }, [strategy, immediateReloadDelay])

  return <>{shouldRenderChildren ? children : loader ?? <></>}</>
}
