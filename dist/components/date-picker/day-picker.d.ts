import { type FC } from 'react';
import { Dated } from '@zoom-studio/js-ts-utils';
import { type DatePickerNS } from '..';
export declare namespace DayPickerNS {
    interface Props extends Required<Pick<DatePickerNS.Props, 'startingDayOfWeek' | 'calendar' | 'showEventPointers' | 'locale' | 'weekends' | 'disabledDay'>>, Pick<DatePickerNS.Props, 'secondaryCalendar'> {
        dated: Dated;
        onDayItemClick: (dated: Dated) => void;
        handleOnDayItemHover: (dated: Dated) => void;
        handleOnDayItemHoverOut: (dated: Dated) => void;
        selectedRange: DatePickerNS.SelectedRange;
        selectedSingle: Dated | undefined;
        selectedMultiple: Dated[];
        hoveredSingle: Dated | undefined;
        findEvents: DatePickerNS.FindEvents;
        selectedReadonly: Dated | undefined;
    }
}
export declare const DayPicker: FC<DayPickerNS.Props>;
