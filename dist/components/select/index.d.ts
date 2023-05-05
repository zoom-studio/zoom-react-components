import { HTMLAttributes, RefObject } from 'react';
import { InputNS, TypographyNS } from '..';
import { BaseComponent, CommonSize, DataEntriesState } from '../../types';
import { SelectGroupNS } from './group';
import { SelectOptionNS } from './option';
export declare namespace SelectNS {
    type EmptyState = 'nothing-found' | 'empty-list' | false;
    type Option<Values extends SelectOptionNS.Value> = SelectGroupNS.Props<Values> & SelectOptionNS.Props<Values>;
    type SingleOption = Pick<SelectOptionNS.Props<SelectOptionNS.Value>, 'value' | 'label'>;
    type SelectedOption = SelectOptionNS.Value | SelectGroupNS.GroupedSelectedOptions;
    type SingleSelectedOption<Values extends SelectOptionNS.Value> = [Values, Values?];
    type SelectValue = Pick<Option<SelectOptionNS.Value>, 'label' | 'value'>;
    type SelectOptions = (currentOptions: SelectNS.GroupedOptions, selectedOptions: SelectNS.SelectedOption) => SelectNS.GroupedOptions;
    interface GroupedOptions {
        [value: SelectOptionNS.Value]: SelectGroupNS.GroupedProps;
    }
    interface Props<Values extends SelectOptionNS.Value> extends BaseComponent {
        options?: Option<Values>[];
        multiSelect?: boolean;
        reference?: RefObject<HTMLDivElement>;
        label?: string;
        placeholder?: string;
        stateMessageProps?: TypographyNS.TextNS.Props;
        dropdownProps?: HTMLAttributes<HTMLDivElement>;
        size?: CommonSize;
        state?: DataEntriesState;
        disabled?: boolean;
        loading?: boolean;
        labelColon?: boolean;
        disabledOnLoading?: boolean;
        optionsPerScroll?: number;
        showSearch?: boolean;
        childRef?: RefObject<HTMLDivElement>;
        dropdownRef?: RefObject<HTMLDivElement>;
        defaultIsOpen?: boolean;
        searchInputProps?: InputNS.Props;
        searchInputRef?: RefObject<HTMLInputElement>;
        selectAllText?: string;
        deselectAllText?: string;
        searchQuery?: string;
        nothingFoundText?: string;
        emptyListText?: string;
        scrollOnOpen?: boolean;
        onChange?: (options: SingleOption[]) => void;
        defaultValue?: Values | Values[];
        onWillOpen?: () => void;
        onWillClose?: () => void;
        onWrite?: (values: Values[]) => void;
    }
}
export declare const Select: <Values extends SelectOptionNS.Value>({ size: providedSize, options: providedOptions, childRef: providedChildRef, dropdownRef: providedDropdownRef, searchQuery: providedSearchQuery, labelColon, disabledOnLoading, showSearch, state, optionsPerScroll, selectAllText, deselectAllText, nothingFoundText, emptyListText, scrollOnOpen, className, searchInputRef, reference, containerProps, defaultIsOpen, defaultValue, disabled, dropdownProps, label, loading, multiSelect, onChange, onWillClose, onWillOpen, onWrite, placeholder, searchInputProps, stateMessageProps, ...rest }: SelectNS.Props<Values>) => JSX.Element;
