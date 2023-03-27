import React, { forwardRef } from 'react'

import timeShifter, { Toast as TimeShiftType } from 'react-hot-toast'

import { Button, ButtonNS, Icon, Title } from '../..'
import { useZoomComponent } from '../../../hooks'
import { DEFAULT_TIME_SHIFT_DURATION } from '../constants'

import { TimeShiftProgress } from './progress'

export namespace TimeShiftNS {
  export interface Props {
    message: string
    onShift: (destroy: () => void, timeShiftId: string) => void
    onShiftTitle: string
    onShiftButtonsProps?: ButtonNS.Props
    moreActions?: ButtonNS.Props[]
    duration?: number
    id?: string
    closable?: boolean
    thisTimeShift?: TimeShiftType
    playSound?: boolean
    customSound?: string
  }
}

export const TimeShift = forwardRef<HTMLDivElement, TimeShiftNS.Props>(
  (
    {
      duration = DEFAULT_TIME_SHIFT_DURATION,
      closable = true,
      onShiftButtonsProps,
      onShiftTitle,
      message,
      onShift,
      id,
      moreActions,
      thisTimeShift,
    },
    reference,
  ) => {
    const { createClassName } = useZoomComponent('time-shift')
    const classes = createClassName()
    const timeShiftId = (id ?? thisTimeShift?.id) || '-1'

    const destroy = () => {
      timeShifter.dismiss(timeShiftId)
    }

    const handleOnShift = () => {
      onShift(destroy, timeShiftId)
    }

    const handleClose = () => {
      if (closable) {
        destroy()
      }
    }

    return (
      <div ref={reference} className={classes}>
        <TimeShiftProgress duration={duration} />

        <Title h5 className="message">
          {message}
        </Title>

        <div className="actions">
          <Button
            onClick={handleOnShift}
            htmlType="button"
            variant="warning"
            children={onShiftTitle}
            {...onShiftButtonsProps}
          />

          {moreActions?.map((action, index) => (
            <Button htmlType="button" {...action} key={index} />
          ))}
        </div>

        {closable && (
          <Button
            onClick={handleClose}
            className="close-button"
            shape="circle"
            type="text"
            size="large"
          >
            <Icon name="close" />
          </Button>
        )}
      </div>
    )
  },
)
