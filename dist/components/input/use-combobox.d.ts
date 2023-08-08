import { type KeyboardEvent } from 'react';
export declare namespace UseComboBoxNS {
    interface Params {
        comboBoxData?: string[];
        inputValue?: string;
        setValue: (value: string) => void;
        isComboBox: boolean;
    }
}
export declare const useComboBox: ({ comboBoxData, setValue, inputValue, isComboBox, }: UseComboBoxNS.Params) => {
    open: boolean;
    refs: import("@floating-ui/react").ExtendedRefs<HTMLInputElement>;
    context: {
        update: () => void;
        x: number;
        y: number;
        placement: import("@floating-ui/react").Placement;
        strategy: import("@floating-ui/react").Strategy;
        middlewareData: import("@floating-ui/react").MiddlewareData;
        isPositioned: boolean;
        floatingStyles: import("react").CSSProperties;
        open: boolean;
        onOpenChange: (open: boolean) => void;
        events: import("@floating-ui/react").FloatingEvents;
        dataRef: import("react").MutableRefObject<import("@floating-ui/react").ContextData>;
        nodeId: string | undefined;
        floatingId: string;
        refs: import("@floating-ui/react").ExtendedRefs<HTMLInputElement>;
        elements: import("@floating-ui/react").ExtendedElements<HTMLInputElement>;
    };
    floatingStyles: import("react").CSSProperties;
    listRef: import("react").MutableRefObject<(HTMLElement | null)[]>;
    activeIndex: number | null;
    items: string[];
    setOpen: import("react").Dispatch<import("react").SetStateAction<boolean>>;
    getItemProps: (userProps?: import("react").HTMLProps<HTMLElement> | undefined) => Record<string, unknown>;
    getReferenceProps: (userProps?: import("react").HTMLProps<Element> | undefined) => Record<string, unknown>;
    handleComboBoxOnWrite: (value: string) => void;
    handleComboBoxOnKeyDown: (evt: KeyboardEvent<HTMLInputElement>) => void;
    getFloatingProps: (userProps?: import("react").HTMLProps<HTMLElement> | undefined) => Record<string, unknown>;
};
