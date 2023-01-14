import React, { FC, useEffect, useState } from 'react'

import { useZoomComponent } from '../../../hooks'
import { CommonVariants } from '../../../types'
import { Progress } from '../..'

export namespace MessageProgressNS {
  export interface Props {
    duration: number
    variant: CommonVariants
    isPaused: boolean
  }
}

export const MessageProgress: FC<MessageProgressNS.Props> = ({ duration, variant, isPaused }) => {
  const [percentage, setPercentage] = useState(0)
  const { createClassName } = useZoomComponent('message-progress')

  const intervalPeriod = duration / 100
  const classes = createClassName()

  useEffect(() => {
    const intervalID = setInterval(() => {
      if (!isPaused) {
        setPercentage(percentage => {
          if (percentage >= 100) {
            clearInterval(intervalID)
          }
          return percentage + 1
        })
      }
    }, intervalPeriod)

    if (isPaused) {
      clearInterval(intervalID)
    }

    return () => {
      clearInterval(intervalID)
    }
  }, [isPaused])

  return (
    <div className={classes}>
      <Progress
        transition={`all ${intervalPeriod}ms linear`}
        horizontalHeight={10}
        steps={{
          percentage,
          color: [color => color({ source: variant === 'neutral' ? 'accent' : variant })],
        }}
      />
    </div>
  )
}
