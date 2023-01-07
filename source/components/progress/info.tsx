import React, { FC } from 'react'

import { ProgressNS } from '.'
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

  return (
    <div className={classes}>
      {failed ? (
        failedIcon
      ) : dynamicInfo ? (
        <>{percentage >= 100 ? doneIcon : percentageText}</>
      ) : (
        <>
          {info === 'percentage' && percentageText}
          {info === 'status' && <>{percentage >= 100 ? doneIcon : ongoingIcon}</>}
        </>
      )}
    </div>
  )
}
