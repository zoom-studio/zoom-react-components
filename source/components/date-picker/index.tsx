import React, { forwardRef, useEffect, useState } from 'react'

import { Dated, type DatedNS, type Range } from '@zoom-studio/zoom-js-ts-utils'
import { type KhayyamNS } from 'omar-khayyam'

import { Select, type SelectNS } from '..'
import { useZoomComponent } from '../../hooks'
import { type BaseComponent } from '../../types'
import { DayPicker } from './day-picker'
import { TimePicker } from './time-picker'

export namespace DatePickerNS {
  export type EntryModes = (typeof EntryModes)[number]
  export const EntryModes = ['single', 'multiple', 'range', 'week'] as const

  export type TimePickerTypes = (typeof TimePickerTypes)[number]
  export const TimePickerTypes = ['hour', 'minute', 'second'] as const

  export type DatePickerTypes = (typeof DatePickerTypes)[number]
  export const DatePickerTypes = ['year', 'month', 'day'] as const

  export interface UserEvent {
    date: DatedNS.DateNS.DateInput
    name: string
  }

  export interface Props extends Omit<BaseComponent, 'children'> {
    // calendar
    calendar?: KhayyamNS.Calendars
    locale?: DatedNS.LocaleNS.Locales
    secondaryCalendar?: KhayyamNS.Calendars
    // misc
    entryMode?: EntryModes
    timePickers?: Partial<Record<TimePickerTypes, boolean>>
    // events
    showEventPointers?: boolean
    userEvents?: UserEvent[]
    calendarEvents?: Partial<Record<KhayyamNS.Calendars, boolean>>
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
    weekends: Partial<Record<KhayyamNS.Calendars, number[]>>
    disabledDay?: (dated: DatedNS.DateNS.Dated) => boolean
    // hour
    maximumSelectableHour?: ((currentHour: number) => number) | number
    minimumSelectableHour?: ((currentHour: number) => number) | number
    disabledHour?: (dated: DatedNS.DateNS.Dated) => boolean
    // minute
    maximumSelectableMinute?: ((currentMinute: number) => number) | number
    minimumSelectableMinute?: ((currentMinute: number) => number) | number
    disabledMinute?: (dated: DatedNS.DateNS.Dated) => boolean
    // second
    maximumSelectableSecond?: ((currentSecond: number) => number) | number
    minimumSelectableSecond?: ((currentSecond: number) => number) | number
    disabledSecond?: (dated: DatedNS.DateNS.Dated) => boolean
  }
}

export const DatePicker = forwardRef<HTMLDivElement, DatePickerNS.Props>(
  (
    {
      calendar = 'gregorian',
      locale = 'en',
      maximumSelectableYear = currentYear => currentYear + 10,
      minimumSelectableYear = currentYear => currentYear - 10,
      disabledYear = () => false,
      maximumSelectableMonth = 12,
      minimumSelectableMonth = 1,
      disabledMonth,
      disabledDay,
      startingDayOfWeek = { gregorian: 1, jalali: 7, islamic: 7 },
      weekends = { gregorian: [7, 1], islamic: [7, 1], jalali: [7] },
      calendarEvents = { gregorian: true, islamic: true, jalali: true },
      userEvents = [],
      showEventPointers = true,
      timePickers = { hour: true, minute: true, second: true },
      entryMode,
      className,
      containerProps,
      secondaryCalendar,
      disabledHour,
      disabledMinute,
      disabledSecond,
      maximumSelectableHour,
      maximumSelectableMinute,
      maximumSelectableSecond,
      minimumSelectableHour,
      minimumSelectableMinute,
      minimumSelectableSecond,
    },
    reference,
  ) => {
    const { createClassName } = useZoomComponent('date-picker')
    const classes = createClassName(className)

    const [dated, setDated] = useState<Dated>(
      new Dated(Dated.now(), 'gregorian').to(calendar).setLocale(locale),
    )

    // const handleNavigateYear = (direction: 'forward' | 'backward') => () => {
    //   setDated(currentDated => {
    //     const newDated = new Dated(currentDated.dated, calendar, locale)

    //     if (direction === 'forward') {
    //       newDated.add(1, 'years')
    //     } else {
    //       newDated.subtract(1, 'years')
    //     }

    //     const curYear = new Dated().to(calendar).setLocale(locale).dated.year
    //     const newYear = newDated.dated.year
    //     const maxYear = maximumSelectableYear(curYear)
    //     const minYear = minimumSelectableYear(curYear)

    //     return newYear <= maxYear && newYear >= minYear ? newDated : currentDated
    //   })
    // }

    // const handleNavigateMonth = (direction: 'forward' | 'backward') => () => {
    //   setDated(currentDated => {
    //     const newDated = new Dated(currentDated.dated, calendar, locale)
    //     if (direction === 'forward') {
    //       newDated.add(1, 'months')
    //     } else {
    //       newDated.subtract(1, 'months')
    //     }

    //     const curMonth = new Dated().to(calendar).setLocale(locale).dated.month
    //     const newMonth = newDated.dated.month
    //     const maxMonth =
    //       typeof maximumSelectableMonth === 'number'
    //         ? maximumSelectableMonth
    //         : maximumSelectableMonth(curMonth)
    //     const minMonth =
    //       typeof minimumSelectableMonth === 'number'
    //         ? minimumSelectableMonth
    //         : minimumSelectableMonth(curMonth)

    //     return newMonth <= maxMonth && newMonth >= minMonth ? newDated : currentDated
    //   })
    // }

    const handleNavigateHour = (mode: 'increase' | 'decrease') => () => {
      setDated(currentDated => {
        const newDated = new Dated(currentDated.dated, calendar, locale)
        if (mode === 'increase') {
          newDated.add(1, 'hours')
        } else {
          newDated.subtract(1, 'hours')
        }
        return newDated
      })
    }

    const handleNavigateMinute = (mode: 'increase' | 'decrease') => () => {
      setDated(currentDated => {
        const newDated = new Dated(currentDated.dated, calendar, locale)
        if (mode === 'increase') {
          newDated.add(1, 'minutes')
        } else {
          newDated.subtract(1, 'minutes')
        }
        return newDated
      })
    }

    const handleNavigateSecond = (mode: 'increase' | 'decrease') => () => {
      setDated(currentDated => {
        const newDated = new Dated(currentDated.dated, calendar, locale)
        if (mode === 'increase') {
          newDated.add(1, 'seconds')
        } else {
          newDated.subtract(1, 'seconds')
        }
        return newDated
      })
    }

    // const selectorButtonProps: ButtonNS.Props = {
    //   type: 'link',
    //   shape: 'circle',
    //   className: 'selector-button',
    //   materialIconProps: { flipOn: 'rtl' },
    // }

    const getYears = (): SelectNS.Option<number>[] => {
      const currentYear = new Dated().to(calendar).setLocale(locale).dated.year
      const minYear = minimumSelectableYear(currentYear)
      const maxYear = maximumSelectableYear(currentYear)

      const years: SelectNS.Option<number>[] = []

      Array.from(Array(maxYear - minYear + 1)).forEach((_, index) => {
        const year = index + minYear
        years.push({
          label: year.toString(),
          value: year,
        })
      })

      return years
    }

    useEffect(() => {
      setDated(new Dated(Dated.now(), 'gregorian').to(calendar).setLocale(locale))
    }, [calendar, locale])

    return (
      <div {...containerProps} ref={reference} className={classes}>
        <div className="header">
          <div className="selector">
            <Select options={getYears()} />

            {/* <Button
              {...selectorButtonProps}
              prefixMaterialIcon="chevron_left"
              onClick={handleNavigateMonth('backward')}
            />
            <Text className="selector-value month">{dated.format('$MMM')}</Text>
            <Button
              {...selectorButtonProps}
              prefixMaterialIcon="chevron_right"
              onClick={handleNavigateMonth('forward')}
            /> */}
          </div>

          <div className="selector">
            {/* <Button
              {...selectorButtonProps}
              prefixMaterialIcon="chevron_left"
              onClick={handleNavigateYear('backward')}
            />
            <Text className="selector-value year">{dated.dated.year}</Text>
            <Button
              {...selectorButtonProps}
              prefixMaterialIcon="chevron_right"
              onClick={handleNavigateYear('forward')}
            /> */}
          </div>
        </div>

        <DayPicker
          dated={dated}
          calendar={calendar}
          startingDayOfWeek={startingDayOfWeek}
          secondaryCalendar={secondaryCalendar}
          showEventPointers={showEventPointers}
          locale={locale}
          userEvents={userEvents}
          calendarEvents={calendarEvents}
          weekends={weekends}
        />

        <div className="time-pickers">
          {timePickers.hour && (
            <TimePicker
              onIncrease={handleNavigateHour('increase')}
              onDecrease={handleNavigateHour('decrease')}
              value={dated.dated.hour.toString().padStart(2, '0')}
            />
          )}

          {timePickers.minute && (
            <>
              <span>:</span>
              <TimePicker
                onIncrease={handleNavigateMinute('increase')}
                onDecrease={handleNavigateMinute('decrease')}
                value={dated.dated.minute.toString().padStart(2, '0')}
              />
            </>
          )}

          {timePickers.second && (
            <>
              <span>:</span>
              <TimePicker
                onIncrease={handleNavigateSecond('increase')}
                onDecrease={handleNavigateSecond('decrease')}
                value={dated.dated.second.toString().padStart(2, '0')}
              />
            </>
          )}
        </div>
      </div>
    )
  },
)
/**
 * TODO:
 *
 * about disabled stuff (like year, day, hour, ...)
 * they should be visually disabled. some approaches like change their color to ref, or make them a little bit transparent my work just fine.
 *
 * about [max/min]imumSelectable[stuff]:
 * they provide the range of selectable stuff
 *
 * important:
 * for the disabled[Stuff]:
 * the only argument they need to be triggered, is the [dated] state
 * so integrate them all into one specific interface like:
 * (dated: DatedNS.DateNS.Dated) => boolean
 *
 */
