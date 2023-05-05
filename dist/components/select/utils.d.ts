import { RefObject } from 'react';
import { SelectNS } from '.';
import { ZoomLogProviderNS } from '../zoom-log-provider';
import { SelectOptionNS } from './option';
export declare const groupOptions: (options?: SelectNS.Option<SelectOptionNS.Value>[], defaultValue?: SelectNS.Props<SelectOptionNS.Value>['defaultValue']) => SelectNS.GroupedOptions;
export declare const getSelectedOptions: (currentOptions?: SelectNS.GroupedOptions) => SelectNS.SingleOption[];
export declare const scrollToTop: (containerRef: RefObject<HTMLDivElement>, scrollOnOpen: boolean, sendLog: ZoomLogProviderNS.Log) => undefined;
export declare const focusSearchBox: (inputRef: RefObject<HTMLInputElement>, sendLog: ZoomLogProviderNS.Log) => Promise<undefined>;
export declare const defaultEmpty: (options?: SelectNS.Option<SelectOptionNS.Value>[]) => false | "empty-list";
export declare const filterLabel: (label: string, searchQuery: string) => boolean;
