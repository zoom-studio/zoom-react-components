import React, { FC, SVGAttributes } from 'react'

import { ProgressNS } from '.'
import { useZoomComponent } from '../../hooks'
import { generateProgressColor } from './utils'

export const CircularProgress: FC<ProgressNS.Props> = ({
  circularSize: size = 200,
  circularStroke: stroke = 10,
  steps,
  containerProps,
  info,
  type,
}) => {
  const { createClassName } = useZoomComponent('progress')
  const classes = createClassName(containerProps?.className, 'circular')
  const backgroundClasses = createClassName('', 'background')
  const progressClasses = createClassName('', 'bar')
  const defaultPercentage = 78

  const step = 'length' in steps ? steps[0] : steps
  const percentage = step.percentage ?? defaultPercentage
  const circleSize = size / 2
  const radius = (size - stroke) / 2
  const dashArray = radius * Math.PI * 2
  const dashOffset = dashArray - (dashArray * percentage) / 100

  const circlesProps: SVGAttributes<SVGCircleElement> = {
    cx: circleSize,
    cy: circleSize,
    r: radius,
    fill: 'none',
  }

  return (
    <div className={classes}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle {...circlesProps} strokeWidth={`${stroke}px`} className={backgroundClasses} />
        <circle
          {...circlesProps}
          strokeWidth={`${stroke - 4}px`}
          className={progressClasses}
          transform={`rotate(-90 ${circleSize} ${circleSize})`}
          stroke={generateProgressColor(step, defaultPercentage)}
          style={{
            strokeDasharray: dashArray,
            strokeDashoffset: dashOffset,
          }}
        />
        <text x="50%" y="50%" dy=".3em" textAnchor="middle" className="text">
          {`${percentage}%`}
        </text>
      </svg>
    </div>
  )
}
