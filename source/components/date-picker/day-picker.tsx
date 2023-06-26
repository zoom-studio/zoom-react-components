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
          | 'userEvents'
          | 'calendarEvents'
          | 'weekends'
        >
      >,
      Pick<DatePickerNS.Props, 'secondaryCalendar'> {
    dated: Dated
  }
}

export const DayPicker: FC<DayPickerNS.Props> = ({
  startingDayOfWeek,
  calendar,
  dated,
  secondaryCalendar,
  showEventPointers,
  locale,
  userEvents,
  calendarEvents,
  weekends,
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
                month={dated.dated.month}
                key={index}
                index={index}
                showEventPointers={showEventPointers}
                firstDayOfMonth={firstDayOfMonth}
                secondaryCalendar={secondaryCalendar}
                day={day}
                userEvents={userEvents}
                calendarEvents={calendarEvents}
                weekends={weekends}
                getWeeks={getWeeks}
              />
            )
          })}
        </div>
      </div>
    </>
  )
}
