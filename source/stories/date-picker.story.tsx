import React, { type FC } from 'react'

import { type Meta } from '@storybook/react'

import { DatePicker, type DatePickerNS } from '../components'
import { CommonStory, StoryPlayground } from './components'

export default {
  title: 'Data Entry/Date picker',
  component: DatePicker,
  args: {
    calendar: 'gregorian',
    secondaryCalendar: 'jalali',
    locale: 'en',
    entryMode: 'range',
    showCurrentTime: true,
    showEventPointers: true,
    showEvents: true,
    calendarEvents: { gregorian: true, islamic: true, jalali: true },
    userEvents: [{ date: new Date(), name: 'some example of user event' }],
    timePickers: { hour: true, minute: true, second: true },
    startingDayOfWeek: { gregorian: 1, jalali: 7, islamic: 7 },
    weekends: { gregorian: [7, 1], islamic: [7, 1], jalali: [7] },
    disabledYear: undefined,
    minimumSelectableYear: currentYear => currentYear - 20,
    maximumSelectableYear: currentYear => currentYear + 20,
    disabledMonth: undefined,
    minimumSelectableMonth: 1,
    maximumSelectableMonth: 12,
    disabledDay: undefined,
    disabledHour: undefined,
    minimumSelectableHour: 0,
    maximumSelectableHour: 23,
    disabledMinute: undefined,
    minimumSelectableMinute: 0,
    maximumSelectableMinute: 59,
    disabledSecond: undefined,
    minimumSelectableSecond: 0,
    maximumSelectableSecond: 59,
    i18n: { noEventMessage: 'no event found', hour: 'H', minute: 'M', second: 'S' },
    onWriteRange: undefined,
    onWriteMultiple: undefined,
    onWriteSingle: undefined,
    onWillChangeYear: undefined,
    onWillChangeMonth: undefined,
    onWillChangeDay: undefined,
    onWillChangeHour: undefined,
    onWillChangeMinute: undefined,
    onWillChangeSecond: undefined,
    onWillNavigateBackward: undefined,
    onWillNavigateForward: undefined,
    className: 'my-date-picker',
    id: 'my-date-picker',
    style: {},
    onClick: undefined,
    containerProps: undefined,
    ref: undefined,
  },
} as Meta<typeof DatePicker>

export const Calendars: FC = () => {
  return (
    <CommonStory
      component={DatePicker}
      stories={[
        {
          group: [
            { name: 'Gregorian', props: { calendar: 'gregorian' } },
            { name: 'Jalali', props: { calendar: 'jalali' } },
            { name: 'Islamic', props: { calendar: 'islamic' } },
          ],
        },
      ]}
    />
  )
}

export const Locales: FC = () => {
  return (
    <CommonStory
      component={DatePicker}
      stories={[
        {
          group: [
            { name: 'English', props: { locale: 'en' } },
            { name: 'Farsi', props: { locale: 'fa' } },
            { name: 'Arabic', props: { locale: 'ar' } },
          ],
        },
      ]}
    />
  )
}

export const SecondaryCalendars: FC = () => {
  return (
    <CommonStory
      component={DatePicker}
      stories={[
        {
          group: [
            { name: 'Gregorian', props: { secondaryCalendar: 'gregorian' } },
            { name: 'Jalali', props: { secondaryCalendar: 'jalali' } },
            { name: 'Islamic', props: { secondaryCalendar: 'islamic' } },
          ],
        },
      ]}
    />
  )
}

export const EntryMode: FC = () => {
  return (
    <CommonStory
      component={DatePicker}
      stories={[
        {
          group: [
            { name: 'Readonly', props: { entryMode: 'readonly' } },
            { name: 'Range', props: { entryMode: 'range' } },
            { name: 'Single', props: { entryMode: 'single' } },
            { name: 'Multiple', props: { entryMode: 'multiple' } },
          ],
        },
      ]}
    />
  )
}

export const Playground: FC<DatePickerNS.Props> = props => {
  return <StoryPlayground component={DatePicker} props={props} />
}
