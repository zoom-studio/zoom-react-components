import React, { useState, type FC } from 'react'

import { type Meta } from '@storybook/react'
import { type DatedNS } from '@zoom-studio/zoom-js-ts-utils'
import { type KhayyamNS } from 'omar-khayyam'

import { DatePicker, type DatePickerNS } from '../components'
import { StoryPlayground } from './components'

export default {
  title: 'Data Entry/Date picker',
  component: DatePicker,
  args: {
    secondaryCalendar: 'gregorian',
    userEvents: [{ date: [2023, 6, 26], name: 'User event 1' }],
    disabledYear: year => [2024, 2028, 2020, 2017].includes(year),
  },
} as Meta<typeof DatePicker>

export const Playground: FC<DatePickerNS.Props> = props => {
  const [calendar, setCalendar] = useState<KhayyamNS.Calendars>('jalali')
  const [locale, setLocale] = useState<DatedNS.LocaleNS.Locales>('fa')

  return (
    <>
      <div style={{ display: 'flex', gap: 20 }}>
        <div style={{ color: 'white', display: 'flex', flexDirection: 'column' }}>
          <label>
            en
            <input
              type="radio"
              name="locale"
              checked={locale === 'en'}
              onChange={evt => {
                setLocale(evt.currentTarget.value as DatedNS.LocaleNS.Locales)
              }}
              value="en"
            />
          </label>
          <label>
            fa
            <input
              type="radio"
              name="locale"
              checked={locale === 'fa'}
              onChange={val => {
                setLocale(val.currentTarget.value as DatedNS.LocaleNS.Locales)
              }}
              value="fa"
            />
          </label>
          <label>
            ar
            <input
              type="radio"
              name="locale"
              checked={locale === 'ar'}
              onChange={val => {
                setLocale(val.currentTarget.value as DatedNS.LocaleNS.Locales)
              }}
              value="ar"
            />
          </label>
        </div>

        <div style={{ color: 'white', display: 'flex', flexDirection: 'column' }}>
          <label>
            gregorian
            <input
              type="radio"
              name="calendar"
              checked={calendar === 'gregorian'}
              onChange={evt => {
                setCalendar(evt.currentTarget.value as KhayyamNS.Calendars)
              }}
              value="gregorian"
            />
          </label>
          <label>
            jalali
            <input
              type="radio"
              name="calendar"
              checked={calendar === 'jalali'}
              onChange={val => {
                setCalendar(val.currentTarget.value as KhayyamNS.Calendars)
              }}
              value="jalali"
            />
          </label>
          <label>
            islamic
            <input
              type="radio"
              name="calendar"
              checked={calendar === 'islamic'}
              onChange={val => {
                setCalendar(val.currentTarget.value as KhayyamNS.Calendars)
              }}
              value="islamic"
            />
          </label>
        </div>
      </div>

      <StoryPlayground
        key={calendar}
        containerProps={{
          style: {
            minHeight: '80vh',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
          },
        }}
        component={DatePicker}
        props={{ ...props, calendar, locale }}
      />
    </>
  )
}
