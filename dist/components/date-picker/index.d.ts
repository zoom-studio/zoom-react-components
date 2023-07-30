import React from 'react';
import { type DatedNS } from '@zoom-studio/zoom-js-ts-utils';
import { type KhayyamNS } from 'omar-khayyam';
import { type BaseComponent } from '../../types';
export declare namespace DatePickerNS {
    interface Props extends Omit<BaseComponent, 'children'> {
        calendar?: KhayyamNS.Calendars;
        locale?: DatedNS.LocaleNS.Locales;
        disabledYear?: (year: number) => boolean;
        disabledDay?: (day: number) => boolean;
        disabledMonth?: (month: number) => boolean;
    }
}
export declare const DatePicker: React.ForwardRefExoticComponent<DatePickerNS.Props & React.RefAttributes<HTMLDivElement>>;
