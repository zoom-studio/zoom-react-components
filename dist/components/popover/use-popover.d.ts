import { type MutableRefObject } from 'react';
import { type PopoverNS } from '.';
export declare namespace UsePopoverNS {
    interface Params extends Pick<PopoverNS.Props, 'onOpenChange' | 'isOpen' | 'placement' | 'onOpen' | 'onClose' | 'autoCloseDelay' | 'defaultIsOpen' | 'showArrow'> {
        arrowRef: MutableRefObject<SVGSVGElement | null>;
    }
}
export declare const usePopover: ({ isOpen: controlledIsOpen, onOpenChange: setControlledOpen, placement, onClose, autoCloseDelay, onOpen, defaultIsOpen, arrowRef, showArrow, }: UsePopoverNS.Params) => {
    placement: import("@floating-ui/react").Placement;
    strategy: import("@floating-ui/react").Strategy;
    middlewareData: import("@floating-ui/react").MiddlewareData;
    x: number;
    y: number;
    update: () => void;
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
        dataRef: MutableRefObject<import("@floating-ui/react").ContextData>;
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
