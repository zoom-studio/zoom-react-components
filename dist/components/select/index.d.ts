import React, { type ReactNode } from 'react';
import { type MaybeArray } from '@zoom-studio/js-ts-utils';
import { type TypographyNS } from '..';
import type { BaseComponent, CommonSize, DataEntriesState } from '../../types';
export declare namespace SelectNS {
    type PossibleValues = string | number;
    type EmptyState = 'nothing-found' | 'empty-list' | false;
    interface Option<Value extends PossibleValues = number, Data = unknown> {
        value: Value;
        label?: string | number;
        disabled?: boolean;
        data?: Data;
        groupTitle?: string;
        groupOptions?: Omit<Option<Value, Data>, 'groupTitle' | 'groupOptions'>[];
    }
    interface CustomizedOption<Value extends PossibleValues = number, Data = unknown> extends Option<Value, Data> {
        isChildOption?: boolean;
    }
    interface Props<MultiSelect extends boolean = false, Value extends PossibleValues = number, Data = unknown> extends Omit<BaseComponent, 'children'> {
        options: Option<Value, Data>[];
        size?: CommonSize;
        label?: string;
        multiSelect?: MultiSelect;
        placeholder?: string;
        stateMessageProps?: TypographyNS.TextNS.Props;
        state?: DataEntriesState;
        disabled?: boolean;
        loading?: boolean;
        labelColon?: boolean;
        disabledOnLoading?: boolean;
        showSearch?: boolean;
        searchQuery?: string;
        searchPlaceholder?: string;
        nothingFoundText?: string;
        emptyListText?: string;
        defaultValue?: MaybeArray<Value | Option<Value, Data>>;
        optionsWidth?: string | number;
        portalClassName?: string;
        children?: (option: Option<Value, Data>) => ReactNode;
        renderSelectedOption?: (option: Option<Value, Data>) => ReactNode;
        optionSearchModel?: (option: Option<Value, Data>) => string;
        onWillOpen?: () => void;
        onWillClose?: () => void;
        onWrite?: (values: MultiSelect extends true ? Value[] : Value) => void;
        onChange?: (options: MultiSelect extends true ? Option<Value, Data>[] : Option<Value, Data>) => void;
    }
}
export declare const Select: <MultiSelect extends boolean = false, Value extends SelectNS.PossibleValues = number, Data = unknown>({ size: providedSize, searchQuery: providedSearchQuery, labelColon, disabledOnLoading, showSearch, state, nothingFoundText, emptyListText, children, renderSelectedOption, optionSearchModel, searchPlaceholder, className, portalClassName, defaultValue, containerProps, label, disabled, loading, multiSelect, placeholder, stateMessageProps, options, optionsWidth, onChange, onWillClose, onWillOpen, onWrite, ...rest }: SelectNS.Props<MultiSelect, Value, Data>) => React.JSX.Element;
