import React, { type FC, useEffect, useMemo, useState } from 'react'

import { useZoomComponent } from '../../../hooks'

import { Progress, type ProgressNS } from '../..'
import { color } from '../../../utils'

export namespace TimeShiftProgressNS {
  export interface Props {
    duration: number
  }
}

export const TimeShiftProgress: FC<TimeShiftProgressNS.Props> = ({ duration }) => {
  const [percentage, setPercentage] = useState(0)
  const { createClassName } = useZoomComponent('time-shift-progress')

  const intervalPeriod = duration / 100
  const classes = createClassName()

  const progressColor = useMemo<ProgressNS.Color>(() => {
    const baseColor = color({ source: 'warning' })
    const dangerColor = color({ source: 'error' })

    return [baseColor, { '50-100': dangerColor }]
  }, [percentage])

  useEffect(() => {
    const intervalID = setInterval(() => {
      setPercentage(percentage => {
        if (percentage >= 100) {
          clearInterval(intervalID)
        }
        return percentage + 1
      })
    }, intervalPeriod)

    return () => {
      clearInterval(intervalID)
    }
  }, [])

  return (
    <div className={classes}>
      <Progress
        steps={{ percentage, color: progressColor }}
        type="circular"
        transition={`all ${intervalPeriod}ms linear, stroke 150ms linear`}
        info={{ name: 'seconds-left', duration }}
        showInfo
        circularSize={60}
        circularStroke={8}
      />
    </div>
  )
}
