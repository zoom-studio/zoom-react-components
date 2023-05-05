/// <reference types="react" />
import { usePopover } from './use-popover';
export declare namespace UsePopoverContextNS {
    type ContextType = ReturnType<typeof usePopover> | null;
}
export declare const PopoverContext: import("react").Context<UsePopoverContextNS.ContextType>;
export declare const usePopoverContext: () => {
    placement: import("@floating-ui/core").Placement;
    strategy: import("@floating-ui/core").Strategy;
    middlewareData: import("@floating-ui/core").MiddlewareData;
    x: number | null;
    y: number | null;
    update: () => void;
    reference: (node: import("@floating-ui/react").ReferenceType | null) => void;
    floating: (node: HTMLElement | null) => void;
    positionReference: (node: import("@floating-ui/react").ReferenceType | null) => void;
    context: {
        reference: (node: import("@floating-ui/react").ReferenceType | null) => void;
        update: () => void;
        x: number | null;
        y: number | null;
        placement: import("@floating-ui/core").Placement;
        strategy: import("@floating-ui/core").Strategy;
        middlewareData: import("@floating-ui/core").MiddlewareData;
        floating: (node: HTMLElement | null) => void;
        isPositioned: boolean;
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
    getReferenceProps: (userProps?: import("react").HTMLProps<Element> | undefined) => Record<string, unknown>;
    getFloatingProps: (userProps?: import("react").HTMLProps<HTMLElement> | undefined) => Record<string, unknown>;
    getItemProps: (userProps?: import("react").HTMLProps<HTMLElement> | undefined) => Record<string, unknown>;
    open: () => void;
    close: () => void;
    toggle: () => void;
    isOpen: boolean;
};
