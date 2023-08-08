import { type CSSProperties } from 'react';
import { type SelectNS } from '.';
import { type ZoomGlobalConfigProviderNS } from '../zoom-global-config-provider';
export declare namespace UseMacOSSelectNS {
    interface Params<MultiSelect extends boolean = false, Value extends SelectNS.PossibleValues = number, Data = unknown> extends Pick<SelectNS.Props<MultiSelect, Value, Data>, 'onWillOpen' | 'onWillClose' | 'onChange' | 'onWrite' | 'multiSelect' | 'options' | 'showSearch' | 'defaultValue' | 'optionsWidth'> {
        sendLog: ZoomGlobalConfigProviderNS.Log;
    }
}
export declare const useMacOSSelect: <MultiSelect extends boolean = false, Value extends SelectNS.PossibleValues = number, Data = unknown>({ multiSelect, options, showSearch, onWillClose, onWillOpen, onChange, onWrite, sendLog, defaultValue, optionsWidth, }: UseMacOSSelectNS.Params<MultiSelect, Value, Data>) => {
    listRef: import("react").MutableRefObject<(HTMLElement | null)[]>;
    listContentRef: import("react").MutableRefObject<(string | null)[]>;
    createReferenceProps: () => Record<string, unknown>;
    scrollRef: import("react").RefObject<HTMLDivElement>;
    selectedIndexes: number[];
    refs: import("@floating-ui/react").ExtendedRefs<import("@floating-ui/react").ReferenceType>;
    open: boolean;
    touch: boolean;
    createFloatingProps: () => {
        style: CSSProperties;
    };
    context: {
        update: () => void;
        x: number;
        y: number;
        placement: import("@floating-ui/react").Placement;
        strategy: import("@floating-ui/react").Strategy;
        middlewareData: import("@floating-ui/react").MiddlewareData;
        isPositioned: boolean;
        floatingStyles: CSSProperties;
        open: boolean;
        onOpenChange: (open: boolean) => void;
        events: import("@floating-ui/react").FloatingEvents;
        dataRef: import("react").MutableRefObject<import("@floating-ui/react").ContextData>;
        nodeId: string | undefined;
        floatingId: string;
        refs: import("@floating-ui/react").ExtendedRefs<import("@floating-ui/react").ReferenceType>;
        elements: import("@floating-ui/react").ExtendedElements<import("@floating-ui/react").ReferenceType>;
    };
    floatingStyles: CSSProperties;
    blockSelection: boolean;
    innerOffset: number;
    isPositioned: boolean;
    handleArrowScroll: (amount: number) => void;
    handleArrowHide: () => void;
    scrollTop: number;
    createItemProps: (index: number, selectable?: boolean) => Record<string, unknown>;
    createScrollArrowProps: (dir: 'up' | 'down') => {
        key: "up" | "down";
        dir: "up" | "down";
        scrollTop: number;
        scrollRef: import("react").RefObject<HTMLDivElement>;
        innerOffset: number;
        isPositioned: boolean;
        onScroll: (amount: number) => void;
        onHide: () => void;
    };
    valuesContainerRef: import("react").RefObject<HTMLParagraphElement>;
    labelRef: import("react").RefObject<HTMLParagraphElement>;
    floatingOverlayRef: import("react").RefObject<HTMLDivElement>;
    searchInputRef: import("react").RefObject<HTMLInputElement>;
    handleSetEmptyList: () => Promise<void>;
    customizedOptions: SelectNS.CustomizedOption<Value, Data>[];
    emptyState: SelectNS.EmptyState;
};
