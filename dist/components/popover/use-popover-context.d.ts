/// <reference types="react" />
import { type usePopover } from './use-popover';
export declare namespace UsePopoverContextNS {
    type ContextType = ReturnType<typeof usePopover> | null;
}
export declare const PopoverContext: import("react").Context<UsePopoverContextNS.ContextType>;
export declare const usePopoverContext: () => {
    placement: import("@floating-ui/core").Placement;
    strategy: import("@floating-ui/core").Strategy;
    middlewareData: import("@floating-ui/core").MiddlewareData;
    x: number;
    y: number;
    update: () => void;
    context: {
        update: () => void;
        x: number;
        y: number;
        placement: import("@floating-ui/core").Placement;
        strategy: import("@floating-ui/core").Strategy;
        middlewareData: import("@floating-ui/core").MiddlewareData;
        isPositioned: boolean;
        floatingStyles: import("react").CSSProperties;
        open: boolean;
        onOpenChange: (open: boolean) => void;
        events: import("@floating-ui/react").FloatingEvents;
        dataRef: import("react").MutableRefObject<import("@floating-ui/react").ContextData>;
        nodeId: string | undefined;
        floatingId: string;
        refs: import("@floating-ui/react").ExtendedRefs<import("@floating-ui/react").ReferenceType>;
        elements: import("@floating-ui/react").ExtendedElements<import("@floating-ui/react").ReferenceType>;
    };
    refs: import("@floating-ui/react").ExtendedRefs<import("@floating-ui/react").ReferenceType>;
    elements: import("@floating-ui/react").ExtendedElements<import("@floating-ui/react").ReferenceType>;
    isPositioned: boolean;
    floatingStyles: import("react").CSSProperties;
    getReferenceProps: (userProps?: import("react").HTMLProps<Element> | undefined) => Record<string, unknown>;
    getFloatingProps: (userProps?: import("react").HTMLProps<HTMLElement> | undefined) => Record<string, unknown>;
    getItemProps: (userProps?: import("react").HTMLProps<HTMLElement> | undefined) => Record<string, unknown>;
    open: () => void;
    close: () => void;
    toggle: () => void;
    isOpen: boolean;
};
