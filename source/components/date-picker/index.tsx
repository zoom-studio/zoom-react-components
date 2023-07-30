import React, { forwardRef, useEffect, useMemo, useState } from 'react'

import { Dated, useFutureEffect, type DatedNS, type Range } from '@zoom-studio/zoom-js-ts-utils'
import { type IsEqualNS } from '@zoom-studio/zoom-js-ts-utils/utilities/dated/utilities'
import { type KhayyamNS } from 'omar-khayyam'

import { Button, Select, Text, type ButtonNS, type SelectNS } from '..'
import { useZoomComponent } from '../../hooks'
import { type BaseComponent } from '../../types'
import { DayPicker } from './day-picker'
import { findIndex, pullAt } from 'lodash'
import { TimePicker } from './time-picker'
import { CurrentTime } from './current-time'
import { useDatePickerI18n, type UseDatePickerI18nNS } from './use-i18n'

export namespace DatePickerNS {
  export type I18n = UseDatePickerI18nNS.I18n

  export type EntryModes = (typeof EntryModes)[number]
  export const EntryModes = ['single', 'multiple', 'range', 'readonly'] as const

  export type TimePickerTypes = (typeof TimePickerTypes)[number]
  export const TimePickerTypes = ['hour', 'minute', 'second'] as const

  export type DatePickerTypes = (typeof DatePickerTypes)[number]
  export const DatePickerTypes = ['year', 'month', 'day'] as const

  export interface SelectedRange {
    start?: Dated
    end?: Dated
  }

  export interface UserEvent {
    date: DatedNS.DateNS.DateInput
    name: string
  }

  export type FindEvents = (dated: Dated | undefined) => {
    calendar: DatedNS.EventsNS.Type[]
    user: DatedNS.EventsNS.Type[]
    all: DatedNS.EventsNS.Type[]
  }

  export interface Props extends Omit<BaseComponent, 'children'> {
    // calendar
    calendar?: KhayyamNS.Calendars
    locale?: DatedNS.LocaleNS.Locales
    secondaryCalendar?: KhayyamNS.Calendars
    // misc
    entryMode?: EntryModes
    timePickers?: Partial<Record<TimePickerTypes, boolean>> | false
    showCurrentTime?: boolean
    i18n?: I18n
    // handlers
    onWriteSingle?: (dated?: Dated) => void
    onWriteMultiple?: (dateds: Dated[]) => void
    onWriteRange?: (start: Dated, end: Dated) => void
    onWillChangeYear?: () => void
    onWillChangeMonth?: () => void
    onWillChangeDay?: () => void
    onWillChangeHour?: () => void
    onWillChangeMinute?: () => void
    onWillChangeSecond?: () => void
    onWillNavigateForward?: () => void
    onWillNavigateBackward?: () => void
    // events
    showEventPointers?: boolean
    userEvents?: UserEvent[]
    calendarEvents?: Partial<Record<KhayyamNS.Calendars, boolean>>
    showEvents?: boolean
    // year
    minimumSelectableYear?: (currentYear: number) => number
    maximumSelectableYear?: (currentYear: number) => number
    disabledYear?: (dated: DatedNS.DateNS.Dated) => boolean
    // month
    maximumSelectableMonth?: ((currentMonth: number) => number) | number
    minimumSelectableMonth?: ((currentMonth: number) => number) | number
    disabledMonth?: (dated: DatedNS.DateNS.Dated) => boolean
    // day
    startingDayOfWeek?: Record<KhayyamNS.Calendars, Range<1, 8>>
    weekends?: Partial<Record<KhayyamNS.Calendars, number[]>>
    disabledDay?: (dated: DatedNS.DateNS.Dated) => boolean
    // hour
    disabledHour?: (dated: DatedNS.DateNS.Dated) => boolean
    minimumSelectableHour?: ((currentHour: number) => number) | number
    maximumSelectableHour?: ((currentHour: number) => number) | number
    // minute
    disabledMinute?: (dated: DatedNS.DateNS.Dated) => boolean
    minimumSelectableMinute?: ((currentMinute: number) => number) | number
    maximumSelectableMinute?: ((currentMinute: number) => number) | number
    // second
    disabledSecond?: (dated: DatedNS.DateNS.Dated) => boolean
    minimumSelectableSecond?: ((currentSecond: number) => number) | number
    maximumSelectableSecond?: ((currentSecond: number) => number) | number
  }
}

export const DatePicker = forwardRef<HTMLDivElement, DatePickerNS.Props>(
  (
    {
      i18n: componentI18n,
      calendar = 'gregorian',
      locale = 'en',
      entryMode = 'range',
      maximumSelectableYear = currentYear => currentYear + 10,
      minimumSelectableYear = currentYear => currentYear - 10,
      disabledYear = () => false,
      maximumSelectableMonth = 12,
      minimumSelectableMonth = 1,
      disabledDay = () => false,
      startingDayOfWeek = { gregorian: 1, jalali: 7, islamic: 7 },
      weekends = { gregorian: [7, 1], islamic: [7, 1], jalali: [7] },
      calendarEvents = { gregorian: true, islamic: true, jalali: true },
      userEvents = [],
      showEventPointers = true,
      timePickers = { hour: true, minute: true, second: true },
      showEvents = true,
      minimumSelectableHour = 0,
      maximumSelectableHour = 23,
      minimumSelectableMinute = 0,
      maximumSelectableMinute = 59,
      minimumSelectableSecond = 0,
      maximumSelectableSecond = 59,
      className,
      containerProps,
      secondaryCalendar,
      showCurrentTime,
      disabledHour,
      disabledMonth,
      disabledMinute,
      disabledSecond,
      onWillChangeDay,
      onWillChangeHour,
      onWillChangeMinute,
      onWillChangeMonth,
      onWillChangeSecond,
      onWillChangeYear,
      onWillNavigateBackward,
      onWillNavigateForward,
      onWriteSingle,
      onWriteMultiple,
      onWriteRange,
      ...rest
    },
    reference,
  ) => {
    const { createClassName, globalI18ns } = useZoomComponent('date-picker')
    const classes = createClassName(className)

    const i18n = useDatePickerI18n(globalI18ns, componentI18n)

    const [dated, setDated] = useState<Dated>(
      new Dated(Dated.now(), 'gregorian').to(calendar).setLocale(locale),
    )

    const [selectedRange, setSelectedRange] = useState<DatePickerNS.SelectedRange>({})
    const [selectedSingle, setSelectedSingle] = useState<Dated>()
    const [selectedReadonly, setSelectedReadonly] = useState<Dated>()
    const [selectedMultiple, setSelectedMultiple] = useState<Dated[]>([])
    const [hoveredSingle, setHoveredSingle] = useState<Dated>()

    const handleSetYear = (newYear: number) => {
      setDated(currentDated =>
        new Dated(currentDated.dated, calendar, locale).jumpTo('years', newYear),
      )
    }

    const handleSetMonth = (newMonth: number) => {
      setDated(currentDated =>
        new Dated(currentDated.dated, calendar, locale).jumpTo('months', newMonth),
      )
    }

    const handleSetHour = (newHour: number) => {
      setDated(currentDated =>
        new Dated(currentDated.dated, calendar, locale).jumpTo('hours', newHour),
      )
    }

    const handleSetMinute = (newMinute: number) => {
      setDated(currentDated =>
        new Dated(currentDated.dated, calendar, locale).jumpTo('minutes', newMinute),
      )
    }

    const handleSetSecond = (newSecond: number) => {
      setDated(currentDated =>
        new Dated(currentDated.dated, calendar, locale).jumpTo('seconds', newSecond),
      )
    }

    const handleNavigateMonth = (direction: 'forward' | 'backward') => () => {
      setDated(currentDated => {
        const newDated = new Dated(currentDated.dated, calendar, locale)
        if (direction === 'forward') {
          onWillNavigateForward?.()
          newDated.add(1, 'months')
        } else {
          onWillNavigateBackward?.()
          newDated.subtract(1, 'months')
        }

        const curMonth = new Dated().to(calendar).setLocale(locale).dated.month
        const newMonth = newDated.dated.month
        const maxMonth =
          typeof maximumSelectableMonth === 'number'
            ? maximumSelectableMonth
            : maximumSelectableMonth(curMonth)
        const minMonth =
          typeof minimumSelectableMonth === 'number'
            ? minimumSelectableMonth
            : minimumSelectableMonth(curMonth)

        return newMonth <= maxMonth && newMonth >= minMonth ? newDated : currentDated
      })
    }

    const selectorButtonProps: ButtonNS.Props = {
      type: 'link',
      shape: 'circle',
      className: 'navigate-button',
      materialIconProps: { flipOn: 'rtl' },
    }

    const getYears = (): SelectNS.Option<number>[] => {
      const currentYear = new Dated().to(calendar).setLocale(locale).dated.year
      const minYear = minimumSelectableYear(currentYear)
      const maxYear = maximumSelectableYear(currentYear)

      const years: SelectNS.Option<number>[] = []

      Array.from(Array(maxYear - minYear + 1)).forEach((_, index) => {
        const year = index + minYear
        years.push({
          value: year,
          disabled: disabledYear?.(
            new Dated(dated.dated, calendar, locale).jumpTo('years', year).dated,
          ),
        })
      })

      return years
    }

    const getMonths = (): SelectNS.Option<number>[] => {
      const { months } = new Dated().to(calendar).setLocale(locale).calendarInfo

      return months.map(month => ({
        label: month.long,
        value: month.index,
        disabled: disabledMonth?.(
          new Dated(dated.dated, calendar, locale).jumpTo('months', month.index).dated,
        ),
      }))
    }

    const getHours = (): SelectNS.Option<number>[] => {
      const currentHour = new Dated().to(calendar).setLocale(locale).dated.hour
      const minHour =
        typeof minimumSelectableHour === 'number'
          ? minimumSelectableHour
          : minimumSelectableHour(currentHour)
      const maxHour =
        typeof maximumSelectableHour === 'number'
          ? maximumSelectableHour
          : maximumSelectableHour(currentHour)

      return Array.from(Array(maxHour - minHour + 1)).map((_, index) => {
        const hour = index + minHour
        return {
          value: hour,
          disabled: disabledHour?.(
            new Dated(dated.dated, calendar, locale).jumpTo('hours', hour).dated,
          ),
        }
      })
    }

    const getMinutes = (): SelectNS.Option<number>[] => {
      const currentMinute = new Dated().to(calendar).setLocale(locale).dated.minute
      const minMinute =
        typeof minimumSelectableMinute === 'number'
          ? minimumSelectableMinute
          : minimumSelectableMinute(currentMinute)
      const maxMinute =
        typeof maximumSelectableMinute === 'number'
          ? maximumSelectableMinute
          : maximumSelectableMinute(currentMinute)

      return Array.from(Array(maxMinute - minMinute + 1)).map((_, index) => {
        const minute = index + minMinute
        return {
          value: minute,
          disabled: disabledMinute?.(
            new Dated(dated.dated, calendar, locale).jumpTo('minutes', minute).dated,
          ),
        }
      })
    }

    const getSeconds = (): SelectNS.Option<number>[] => {
      const currentSecond = new Dated().to(calendar).setLocale(locale).dated.second
      const minSecond =
        typeof minimumSelectableSecond === 'number'
          ? minimumSelectableSecond
          : minimumSelectableSecond(currentSecond)
      const maxSecond =
        typeof maximumSelectableSecond === 'number'
          ? maximumSelectableSecond
          : maximumSelectableSecond(currentSecond)

      return Array.from(Array(maxSecond - minSecond + 1)).map((_, index) => {
        const second = index + minSecond
        return {
          value: second,
          disabled: disabledSecond?.(
            new Dated(dated.dated, calendar, locale).jumpTo('seconds', second).dated,
          ),
        }
      })
    }

    const handleOnDayItemHover = (dated: Dated) => {
      switch (entryMode) {
        case 'range': {
          if (selectedRange.start && !selectedRange.end) {
            setHoveredSingle(dated)
          }
          break
        }
      }
    }

    const handleOnDayItemHoverOut = (dated: Dated) => {
      switch (entryMode) {
        case 'range': {
          setHoveredSingle(undefined)
          break
        }
      }
    }

    const handleOnDayItemClick = (dated: Dated) => {
      onWillChangeDay?.()

      const equalityCheckOptions: IsEqualNS.CheckOptions = {
        year: true,
        month: true,
        day: true,
        hour: false,
        minute: false,
        second: false,
        millisecond: false,
      }

      switch (entryMode) {
        case 'single': {
          setSelectedSingle(dated)
          break
        }

        case 'multiple': {
          setSelectedMultiple(currents => {
            const foundIndex = findIndex(currents, current =>
              current.isEqual(dated.dated, equalityCheckOptions),
            )
            if (foundIndex >= 0) {
              const dates = [...currents]
              pullAt(dates, [foundIndex])
              return dates
            }
            return [...currents, dated]
          })
          break
        }

        case 'range': {
          setSelectedRange(({ start, end }) => {
            if (start && end) {
              return { start: dated, end: undefined }
            } else if (start) {
              if (start.isEqual(dated.dated, equalityCheckOptions)) {
                return { start: undefined, end: undefined }
              } else if (start.isBefore(dated.dated)) {
                return { start, end: dated }
              } else {
                return { start: dated, end: start }
              }
            } else {
              return { start: dated, end: undefined }
            }
          })
          break
        }

        case 'readonly': {
          setSelectedReadonly(currentSelected => {
            if (!currentSelected) {
              return dated
            }

            if (currentSelected.isEqual(dated.dated)) {
              return undefined
            }

            return dated
          })
        }
      }
    }

    const findEvents: DatePickerNS.FindEvents = dated => {
      if (!dated) {
        return {
          all: [],
          calendar: [],
          user: [],
        }
      }

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
    }

    const events = useMemo(() => findEvents(selectedReadonly ?? dated), [selectedReadonly])

    useEffect(() => {
      setDated(new Dated(Dated.now(), 'gregorian').to(calendar).setLocale(locale))
    }, [calendar, locale])

    useFutureEffect(() => {
      onWriteMultiple?.(selectedMultiple)
    }, [selectedMultiple])

    useFutureEffect(() => {
      if (selectedRange.start && selectedRange.end) {
        onWriteRange?.(selectedRange.start, selectedRange.end)
      }
    }, [selectedRange])

    useFutureEffect(() => {
      onWriteSingle?.(selectedSingle)
    }, [selectedSingle])

    return (
      <div {...containerProps} {...rest} ref={reference} className={classes}>
        <div className="header">
          <Button
            {...selectorButtonProps}
            prefixMaterialIcon="chevron_left"
            onClick={handleNavigateMonth('forward')}
          />

          <div className="selectors">
            <Select
              options={getYears()}
              defaultValue={dated.dated.year}
              showSearch={false}
              optionsWidth="80px"
              onWrite={handleSetYear}
              key={dated.dated.year}
              onWillOpen={onWillChangeYear}
            >
              {({ value }) => <Text normal>{value}</Text>}
            </Select>

            <Select
              options={getMonths()}
              defaultValue={dated.dated.month}
              showSearch={false}
              optionsWidth="fit-content"
              portalClassName="date-picker-month-selector-portal"
              onWrite={handleSetMonth}
              key={dated.dated.month}
              onWillOpen={onWillChangeMonth}
            />
          </div>

          <Button
            {...selectorButtonProps}
            prefixMaterialIcon="chevron_right"
            onClick={handleNavigateMonth('backward')}
          />
        </div>

        {secondaryCalendar && (
          <div className="secondary-header">
            <Text small italic className="secondary-date">
              {new Dated(dated.dated, calendar, locale).to(secondaryCalendar).format('$yyyy $MMM')}
            </Text>
          </div>
        )}

        <DayPicker
          dated={dated}
          calendar={calendar}
          startingDayOfWeek={startingDayOfWeek}
          secondaryCalendar={secondaryCalendar}
          showEventPointers={showEventPointers}
          locale={locale}
          findEvents={findEvents}
          weekends={weekends}
          disabledDay={disabledDay}
          onDayItemClick={handleOnDayItemClick}
          handleOnDayItemHover={handleOnDayItemHover}
          handleOnDayItemHoverOut={handleOnDayItemHoverOut}
          selectedRange={selectedRange}
          selectedSingle={selectedSingle}
          selectedMultiple={selectedMultiple}
          hoveredSingle={hoveredSingle}
          selectedReadonly={selectedReadonly}
        />

        {showCurrentTime && <CurrentTime dated={dated} />}

        {timePickers && (
          <div className="time-pickers">
            {timePickers.hour && (
              <TimePicker
                title={i18n.hour}
                options={getHours()}
                value={dated.dated.hour}
                onWrite={handleSetHour}
                colon={false}
                onWillOpen={onWillChangeHour}
              />
            )}
            {timePickers.minute && (
              <TimePicker
                title={i18n.minute}
                options={getMinutes()}
                value={dated.dated.minute}
                onWrite={handleSetMinute}
                onWillOpen={onWillChangeMinute}
              />
            )}
            {timePickers.second && (
              <TimePicker
                title={i18n.second}
                options={getSeconds()}
                value={dated.dated.second}
                onWrite={handleSetSecond}
                onWillOpen={onWillChangeSecond}
              />
            )}
          </div>
        )}

        {showEvents && (
          <div className="events">
            {events.all.length > 0 ? (
              <>
                {events.user.map((event, index) => (
                  <Text key={index} className="event user-event">
                    {event.en}
                  </Text>
                ))}

                {events.calendar.map((event, index) => (
                  <Text key={index} className="event calendar-event">
                    {event[locale]}
                  </Text>
                ))}
              </>
            ) : (
              <Text className="event no-event">{i18n.noEventMessage}</Text>
            )}
          </div>
        )}
      </div>
    )
  },
)
