import { type FC, type RefObject } from 'react';
import { type ZoomGlobalConfigProviderNS } from '../zoom-global-config-provider';
export declare namespace ResizeEditorHandleNS {
    interface ResizableInfo {
        clientY: number;
        height: number;
        isResizing: boolean;
    }
    interface Props {
        editorContainerRef: RefObject<HTMLDivElement>;
        sendLog: ZoomGlobalConfigProviderNS.Log;
    }
}
export declare const ResizeEditorHandle: FC<ResizeEditorHandleNS.Props>;
