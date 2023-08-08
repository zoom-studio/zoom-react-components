import React from 'react';
import { Dated, type DatedNS, type Range } from '@zoom-studio/js-ts-utils';
import { type KhayyamNS } from 'omar-khayyam';
import { type BaseComponent } from '../../types';
import { type UseDatePickerI18nNS } from './use-i18n';
export declare namespace DatePickerNS {
    type I18n = UseDatePickerI18nNS.I18n;
    type EntryModes = (typeof EntryModes)[number];
    const EntryModes: readonly ["single", "multiple", "range", "readonly"];
    type TimePickerTypes = (typeof TimePickerTypes)[number];
    const TimePickerTypes: readonly ["hour", "minute", "second"];
    type DatePickerTypes = (typeof DatePickerTypes)[number];
    const DatePickerTypes: readonly ["year", "month", "day"];
    interface SelectedRange {
        start?: Dated;
        end?: Dated;
    }
    interface UserEvent {
        date: DatedNS.DateNS.DateInput;
        name: string;
    }
    type FindEvents = (dated: Dated | undefined) => {
        calendar: DatedNS.EventsNS.Type[];
        user: DatedNS.EventsNS.Type[];
        all: DatedNS.EventsNS.Type[];
    };
    interface Props extends Omit<BaseComponent, 'children'> {
        calendar?: KhayyamNS.Calendars;
        locale?: DatedNS.LocaleNS.Locales;
        secondaryCalendar?: KhayyamNS.Calendars;
        entryMode?: EntryModes;
        timePickers?: Partial<Record<TimePickerTypes, boolean>> | false;
        showCurrentTime?: boolean;
        i18n?: I18n;
        onWriteSingle?: (dated?: Dated) => void;
        onWriteMultiple?: (dateds: Dated[]) => void;
        onWriteRange?: (start: Dated, end: Dated) => void;
        onWillChangeYear?: () => void;
        onWillChangeMonth?: () => void;
        onWillChangeDay?: () => void;
        onWillChangeHour?: () => void;
        onWillChangeMinute?: () => void;
        onWillChangeSecond?: () => void;
        onWillNavigateForward?: () => void;
        onWillNavigateBackward?: () => void;
        showEventPointers?: boolean;
        userEvents?: UserEvent[];
        calendarEvents?: Partial<Record<KhayyamNS.Calendars, boolean>>;
        showEvents?: boolean;
        minimumSelectableYear?: (currentYear: number) => number;
        maximumSelectableYear?: (currentYear: number) => number;
        disabledYear?: (dated: DatedNS.DateNS.Dated) => boolean;
        maximumSelectableMonth?: ((currentMonth: number) => number) | number;
        minimumSelectableMonth?: ((currentMonth: number) => number) | number;
        disabledMonth?: (dated: DatedNS.DateNS.Dated) => boolean;
        startingDayOfWeek?: Record<KhayyamNS.Calendars, Range<1, 8>>;
        weekends?: Partial<Record<KhayyamNS.Calendars, number[]>>;
        disabledDay?: (dated: DatedNS.DateNS.Dated) => boolean;
        disabledHour?: (dated: DatedNS.DateNS.Dated) => boolean;
        minimumSelectableHour?: ((currentHour: number) => number) | number;
        maximumSelectableHour?: ((currentHour: number) => number) | number;
        disabledMinute?: (dated: DatedNS.DateNS.Dated) => boolean;
        minimumSelectableMinute?: ((currentMinute: number) => number) | number;
        maximumSelectableMinute?: ((currentMinute: number) => number) | number;
        disabledSecond?: (dated: DatedNS.DateNS.Dated) => boolean;
        minimumSelectableSecond?: ((currentSecond: number) => number) | number;
        maximumSelectableSecond?: ((currentSecond: number) => number) | number;
    }
}
export declare const DatePicker: React.ForwardRefExoticComponent<DatePickerNS.Props & React.RefAttributes<HTMLDivElement>>;
