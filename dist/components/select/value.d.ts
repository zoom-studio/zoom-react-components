import { type FC } from 'react';
import { type SelectNS } from '.';
import { type SelectOptionNS } from './option';
export declare namespace SelectValueNS {
    interface Props extends Pick<SelectNS.Props<SelectOptionNS.Value>, 'placeholder' | 'size' | 'multiSelect' | 'onChange'> {
        options: SelectNS.GroupedOptions;
    }
}
export declare const SelectValue: FC<SelectValueNS.Props>;
