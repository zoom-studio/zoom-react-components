import React, { type FC, type ReactNode } from 'react'

import { type ProgressNS } from '.'
import { useZoomComponent } from '../../hooks'
import { color } from '../../utils'
import { Icon } from '../icon'

export namespace ProgressInfoNS {
  export interface Props
    extends Pick<ProgressNS.Props, 'info' | 'failed' | 'dynamicColors' | 'dynamicInfo'> {
    percentage: number
    percentageFontSize: ProgressNS.Size
    iconsFontsize: ProgressNS.Size
  }
}

export const ProgressInfo: FC<ProgressInfoNS.Props> = ({
  percentageFontSize,
  iconsFontsize,
  info,
  failed,
  percentage,
  dynamicColors,
  dynamicInfo,
}) => {
  const { createClassName } = useZoomComponent('progress-info')
  const classes = createClassName()

  const percentageText = (
    <span className="percentage" style={{ fontSize: percentageFontSize }}>{`${percentage}%`}</span>
  )

  const failedIcon = (
    <Icon
      name="error_outline"
      className="progress-icon failed"
      style={{ fontSize: iconsFontsize }}
    />
  )

  const doneIcon = (
    <Icon name="task_alt" className="progress-icon done" style={{ fontSize: iconsFontsize }} />
  )

  const ongoingIcon = (
    <Icon
      name="hourglass_empty"
      className="progress-icon ongoing"
      style={{
        fontSize: iconsFontsize,
        color: color({ source: dynamicColors ? 'info' : 'text' }),
      }}
    />
  )

  const renderInfo = (): ReactNode => {
    if (!info) {
      return ''
    }

    if (typeof info === 'string') {
      switch (info) {
        case 'percentage': {
          return percentageText
        }
        case 'status': {
          return percentage >= 100 ? doneIcon : ongoingIcon
        }
      }
    }

    switch (info.name) {
      case 'seconds-left': {
        const { duration } = info
        let secondsLeft =
          parseInt((duration / 1000 - (percentage * duration) / 100000).toFixed(0)) + 1
        if (secondsLeft >= duration / 1000) {
          secondsLeft = duration / 1000
        }
        if (secondsLeft <= 0) {
          secondsLeft = 1
        }
        return (
          <span className="percentage" style={{ fontSize: percentageFontSize }}>
            {secondsLeft}
          </span>
        )
      }
    }
  }

  return (
    <div className={classes}>
      {failed ? (
        failedIcon
      ) : dynamicInfo ? (
        <>{percentage >= 100 ? doneIcon : percentageText}</>
      ) : (
        renderInfo()
      )}
    </div>
  )
}
