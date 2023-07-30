import React, { type FC } from 'react'

import { Dated, useVariable, type DatedNS } from '@zoom-studio/zoom-js-ts-utils'
import { findIndex } from 'lodash'

import { Text, type DatePickerNS } from '..'
import { DayItem } from './day-item'

export namespace DayPickerNS {
  export interface Props
    extends Required<
        Pick<
          DatePickerNS.Props,
          | 'startingDayOfWeek'
          | 'calendar'
          | 'showEventPointers'
          | 'locale'
          | 'weekends'
          | 'disabledDay'
        >
      >,
      Pick<DatePickerNS.Props, 'secondaryCalendar'> {
    dated: Dated
    onDayItemClick: (dated: Dated) => void
    handleOnDayItemHover: (dated: Dated) => void
    handleOnDayItemHoverOut: (dated: Dated) => void
    selectedRange: DatePickerNS.SelectedRange
    selectedSingle: Dated | undefined
    selectedMultiple: Dated[]
    hoveredSingle: Dated | undefined
    findEvents: DatePickerNS.FindEvents
    selectedReadonly: Dated | undefined
  }
}

export const DayPicker: FC<DayPickerNS.Props> = ({
  startingDayOfWeek,
  calendar,
  dated,
  secondaryCalendar,
  showEventPointers,
  locale,
  weekends,
  disabledDay,
  onDayItemClick,
  handleOnDayItemHover,
  handleOnDayItemHoverOut,
  findEvents,
  selectedReadonly,
  selectedRange,
  selectedSingle,
  selectedMultiple,
  hoveredSingle,
}) => {
  const getWeeks = (dated: Dated): DatedNS.LocaleNS.Name[] => {
    const weeks = dated.calendarInfo.weeks
    const firstDays = weeks.slice(startingDayOfWeek[calendar] - 1, weeks.length)
    const nextDays = weeks.slice(0, startingDayOfWeek[calendar] - 1)
    return [...firstDays, ...nextDays]
  }

  const firstDayOfMonth = useVariable<number>(() => {
    const firstDateDated = new Dated({ ...dated.dated, day: 1 }, calendar)
    return findIndex(getWeeks(firstDateDated), week => week.long === firstDateDated.format('$DDD'))
  })

  return (
    <>
      <div className="week-day-names">
        {getWeeks(dated).map((week, index) => (
          <Text key={index} className="week-item">
            {week.short}
          </Text>
        ))}
      </div>

      <div className="day-picker">
        <div className="days">
          {Array.from(Array(dated.daysInMonth + firstDayOfMonth)).map((_, index) => {
            const day = index - firstDayOfMonth + 1
            return (
              <DayItem
                calendar={calendar}
                locale={locale}
                year={dated.dated.year}
                onClick={onDayItemClick}
                onHover={handleOnDayItemHover}
                month={dated.dated.month}
                key={index}
                selectedReadonly={selectedReadonly}
                index={index}
                showEventPointers={showEventPointers}
                firstDayOfMonth={firstDayOfMonth}
                secondaryCalendar={secondaryCalendar}
                day={day}
                weekends={weekends}
                getWeeks={getWeeks}
                disabledDay={disabledDay}
                selectedRange={selectedRange}
                selectedSingle={selectedSingle}
                selectedMultiple={selectedMultiple}
                onHoverOut={handleOnDayItemHoverOut}
                hoveredSingle={hoveredSingle}
                findEvents={findEvents}
              />
            )
          })}
        </div>
      </div>
    </>
  )
}
