import React, { type FC } from 'react'

import { Dated, classNames, useVariable, type DatedNS } from '@zoom-studio/zoom-js-ts-utils'
import { findIndex } from 'lodash'

import { Text, type DatePickerNS } from '..'

export namespace DayItemNS {
  export interface Props
    extends Pick<DatePickerNS.Props, 'secondaryCalendar'>,
      Required<
        Pick<
          DatePickerNS.Props,
          'showEventPointers' | 'calendar' | 'locale' | 'weekends' | 'disabledDay'
        >
      > {
    day: number
    firstDayOfMonth: number
    index: number
    year: number
    month: number
    getWeeks: (dated: Dated) => DatedNS.LocaleNS.Name[]
    onClick: (dated: Dated) => void
    onHover: (dated: Dated) => void
    onHoverOut: (dated: Dated) => void
    selectedRange: DatePickerNS.SelectedRange
    selectedSingle: Dated | undefined
    selectedReadonly: Dated | undefined
    selectedMultiple: Dated[]
    hoveredSingle: Dated | undefined
    findEvents: DatePickerNS.FindEvents
  }
}

export const DayItem: FC<DayItemNS.Props> = ({
  day,
  firstDayOfMonth,
  index,
  secondaryCalendar,
  showEventPointers,
  month,
  year,
  calendar,
  locale,
  weekends,
  disabledDay,
  getWeeks,
  onClick,
  onHover,
  onHoverOut,
  selectedRange,
  selectedSingle,
  selectedMultiple,
  selectedReadonly,
  hoveredSingle,
  findEvents,
}) => {
  const dated = new Dated({ year, month, day }, calendar, locale)
  const weekDay = findIndex(getWeeks(dated), week => week.index === dated.dated.weekDay + 1)

  const isEqual = (targetDated?: Dated): boolean => {
    if (!targetDated) {
      return false
    }
    return targetDated.isEqual(dated.dated, {
      year: true,
      month: true,
      day: true,
      hour: false,
      minute: false,
      second: false,
      millisecond: false,
    })
  }

  const isBetween = (date1?: Dated, date2?: Dated): boolean => {
    if (!date1 || !date2) {
      return false
    }
    return dated.isBetween([date1.dated, date2.dated], 'date')
  }

  const events = findEvents(dated)

  const isDisabled = useVariable<boolean>(() => {
    return disabledDay(dated.dated)
  })

  const isToday = useVariable<boolean>(() => {
    return dated.toGregorian().isEqual(Dated.now())
  })

  const isActive = useVariable<boolean>(() => {
    return (
      isEqual(selectedRange.start) ||
      isEqual(selectedRange.end) ||
      isEqual(selectedSingle) ||
      isEqual(selectedReadonly) ||
      selectedMultiple.some(selected => isEqual(selected))
    )
  })

  const isHoliday = useVariable<boolean>(() => {
    return !!(
      (calendar === 'jalali' && events.calendar.some(event => event.isHoliday)) ||
      weekends[calendar]?.map(holidayWeekDay => holidayWeekDay - 1).includes(weekDay)
    )
  })

  const isInPreviewRange = useVariable<boolean>(() => {
    return (
      isBetween(selectedRange.start, hoveredSingle) &&
      !isBetween(selectedRange.start, selectedRange.end)
    )
  })

  const isPreviewEnd = useVariable<boolean>(() => {
    return !!selectedRange.start && !selectedRange.end && isEqual(hoveredSingle)
  })

  const isInRange = useVariable<boolean>(() => {
    return isBetween(selectedRange.start, selectedRange.end)
  })

  const isRangeStart = useVariable<boolean>(() => {
    return isEqual(selectedRange.start)
  })

  const isRangeEnd = useVariable<boolean>(() => {
    return isEqual(selectedRange.end)
  })

  const handleOnClick = () => {
    if (!isDisabled) {
      onClick(dated)
    }
  }

  const handleOnHover = () => {
    if (!isDisabled) {
      onHover(dated)
    }
  }

  const handleOnHoverOut = () => {
    if (!isDisabled) {
      onHoverOut(dated)
    }
  }

  const classes = classNames('day-item-child', {
    'disabled': isDisabled,
    'today': isToday,
    'active': isActive,
    'holiday': isHoliday,
    'in-preview-range': isInPreviewRange,
    'preview-end': isPreviewEnd,
    'in-range': isInRange,
    'range-start': isRangeStart,
    'range-end': isRangeEnd,
  })

  return (
    <div
      className="day-item"
      onMouseEnter={handleOnHover}
      onMouseLeave={handleOnHoverOut}
      onClick={handleOnClick}
    >
      {index >= firstDayOfMonth ? (
        <Text large className={classes}>
          {secondaryCalendar && (
            <span className="secondary-day">{dated.to(secondaryCalendar).dated.day}</span>
          )}

          {showEventPointers && (
            <div className="events">
              {events.calendar.length > 0 && <span className="native-event event" />}
              {events.user.length > 0 && <span className="user-event event" />}
            </div>
          )}

          {day}
        </Text>
      ) : (
        <></>
      )}
    </div>
  )
}
