import { FC, MouseEvent, ReactNode, RefObject } from 'react';
export declare namespace ResizableMakerNS {
    const ResizeDirections: readonly ["Y", "X", "XY"];
    type ResizeDirections = typeof ResizeDirections[number];
    type CursorDirections = typeof CursorDirections[number];
    const CursorDirections: readonly ["ns", "ew", "ne", "se"];
    interface ResizableInfo {
        clientY: number;
        clientX: number;
        height: number;
        width: number;
        isResizing: boolean;
    }
    interface childrenCallbackParams {
        resize: (cursorDirection: CursorDirections) => (evt: MouseEvent<HTMLDivElement>) => void;
    }
    interface Props {
        direction: ResizeDirections;
        resizable: (() => HTMLElement) | RefObject<HTMLElement | null>;
        children: ReactNode | ((params: childrenCallbackParams) => ReactNode);
    }
}
export declare const ResizableMaker: FC<ResizableMakerNS.Props>;
