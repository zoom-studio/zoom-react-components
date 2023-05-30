import { type FC, type ReactNode } from 'react';
import { ResizableMakerNS } from '../resizable-maker';
import { type BaseComponent } from '../../types';
export declare namespace ResizableNS {
    type Size = number | string;
    type HandlersObject = {
        [handler in ResizableMakerNS.ResizeDirection]?: boolean;
    };
    interface ChildrenCallbackParams {
        isResizing: boolean;
    }
    interface Props extends Omit<BaseComponent, 'children'>, HandlersObject {
        initialWidth?: Size;
        initialHeight?: Size;
        maxWidth?: Size;
        maxHeight?: Size;
        minWidth?: Size;
        minHeight?: Size;
        children?: ReactNode | ((params: ChildrenCallbackParams) => ReactNode);
    }
}
export declare const Resizable: FC<ResizableNS.Props>;
