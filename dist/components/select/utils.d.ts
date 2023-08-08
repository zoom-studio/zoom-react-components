import { type MutableRefObject } from 'react';
import { type SelectNS } from '.';
import { type ScrollArrowNS } from './scroll-arrow';
export declare const SCROLL_ARROW_PADDING = 10;
export declare const shouldShowArrow: (scrollRef: MutableRefObject<HTMLDivElement | null>, dir: ScrollArrowNS.ArrowDir) => boolean;
export declare const defaultEmpty: <Value extends SelectNS.PossibleValues = number, Data = unknown>(options?: SelectNS.Option<Value, Data>[]) => SelectNS.EmptyState;
export declare const findDefaultValue: <MultiSelect extends boolean = false, Value extends SelectNS.PossibleValues = number, Data = unknown>(options: SelectNS.CustomizedOption<Value, Data>[], defaultValue?: import("@zoom-studio/js-ts-utils").MaybeArray<Value | SelectNS.Option<Value, Data>> | undefined) => number[];
