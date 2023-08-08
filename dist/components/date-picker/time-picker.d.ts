import { type FC } from 'react';
import { type SelectNS } from '..';
export declare namespace TimePickerNS {
    interface Props {
        options: SelectNS.Option<number>[];
        value: number;
        title: string;
        onWrite: (value: number) => void;
        colon?: boolean;
        onWillOpen?: () => void;
    }
}
export declare const TimePicker: FC<TimePickerNS.Props>;
