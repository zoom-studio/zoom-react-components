import React, { type FC } from 'react'

import { Dated, classNames, useVariable, type DatedNS } from '@zoom-studio/zoom-js-ts-utils'
import { findIndex } from 'lodash'
import { type KhayyamNS } from 'omar-khayyam'

import { Text, type DatePickerNS } from '..'

export namespace DayItemNS {
  export interface Props
    extends Pick<DatePickerNS.Props, 'secondaryCalendar'>,
      Required<
        Pick<
          DatePickerNS.Props,
          'showEventPointers' | 'calendar' | 'locale' | 'userEvents' | 'calendarEvents' | 'weekends'
        >
      > {
    day: number
    firstDayOfMonth: number
    index: number
    year: number
    month: number
    getWeeks: (dated: Dated) => DatedNS.LocaleNS.Name[]
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
  userEvents,
  calendarEvents,
  weekends,
  getWeeks,
}) => {
  const dated = new Dated({ year, month, day }, calendar, locale)
  const weekDay = findIndex(getWeeks(dated), week => week.index === dated.dated.weekDay + 1)

  const events = useVariable(() => {
    const eventsInCalendar: DatedNS.EventsNS.Type[] = []
    const eventsByUser: DatedNS.EventsNS.Type[] = []

    Object.keys(calendarEvents).forEach(calendar => {
      if (calendarEvents[calendar as KhayyamNS.Calendars]) {
        eventsInCalendar.push(...dated.events[calendar as KhayyamNS.Calendars])
      }
    })

    userEvents.forEach(({ date, name }) => {
      const eventDated = new Dated(date, 'gregorian')
      const gregorianDated = dated.toGregorian()
      if (eventDated.isEqual(gregorianDated.dated)) {
        eventsByUser.push({
          ar: name,
          en: name,
          fa: name,
          day: dated.dated.day,
          month: dated.dated.month,
          isHoliday: false,
          ref: undefined,
        })
      }
    })

    return {
      calendar: eventsInCalendar,
      user: eventsByUser,
      all: [...eventsByUser, ...eventsInCalendar],
    }
  })

  const classes = classNames('day-item-child', {
    today: dated.toGregorian().isEqual(Dated.now()),
    holiday:
      (calendar === 'jalali' && events.calendar.some(event => event.isHoliday)) ||
      weekends[calendar]?.map(holidayWeekDay => holidayWeekDay - 1).includes(weekDay),
  })

  return (
    <div className="day-item">
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
