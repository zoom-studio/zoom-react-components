import { FC, RefObject } from 'react';
import { ZoomLogProviderNS } from '../zoom-log-provider';
export declare namespace ResizeEditorHandleNS {
    interface ResizableInfo {
        clientY: number;
        height: number;
        isResizing: boolean;
    }
    interface Props {
        editorContainerRef: RefObject<HTMLDivElement>;
        sendLog: ZoomLogProviderNS.Log;
    }
}
export declare const ResizeEditorHandle: FC<ResizeEditorHandleNS.Props>;
