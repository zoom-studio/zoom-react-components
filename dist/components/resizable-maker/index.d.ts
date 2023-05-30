import { type FC, type MouseEvent, type ReactNode, type RefObject } from 'react';
export declare namespace ResizableMakerNS {
    type Evt = MouseEvent<HTMLElement> | globalThis.MouseEvent;
    type ResizeDirection = (typeof ResizeDirection)[number];
    const ResizeDirection: readonly ["topEnd", "top", "topStart", "start", "bottomEnd", "bottom", "bottomStart", "end"];
    interface ChildrenCallbackParams {
        resize: (direction: ResizeDirection) => (evt: ResizableMakerNS.Evt) => void;
        isResizing: boolean;
    }
    interface Props {
        resizable: (() => HTMLElement) | RefObject<HTMLElement | null>;
        children: ReactNode | ((params: ChildrenCallbackParams) => ReactNode);
    }
}
export declare const ResizableMaker: FC<ResizableMakerNS.Props>;
