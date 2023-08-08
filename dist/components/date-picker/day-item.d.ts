import { type FC } from 'react';
import { Dated, type DatedNS } from '@zoom-studio/js-ts-utils';
import { type DatePickerNS } from '..';
export declare namespace DayItemNS {
    interface Props extends Pick<DatePickerNS.Props, 'secondaryCalendar'>, Required<Pick<DatePickerNS.Props, 'showEventPointers' | 'calendar' | 'locale' | 'weekends' | 'disabledDay'>> {
        day: number;
        firstDayOfMonth: number;
        index: number;
        year: number;
        month: number;
        getWeeks: (dated: Dated) => DatedNS.LocaleNS.Name[];
        onClick: (dated: Dated) => void;
        onHover: (dated: Dated) => void;
        onHoverOut: (dated: Dated) => void;
        selectedRange: DatePickerNS.SelectedRange;
        selectedSingle: Dated | undefined;
        selectedReadonly: Dated | undefined;
        selectedMultiple: Dated[];
        hoveredSingle: Dated | undefined;
        findEvents: DatePickerNS.FindEvents;
    }
}
export declare const DayItem: FC<DayItemNS.Props>;
