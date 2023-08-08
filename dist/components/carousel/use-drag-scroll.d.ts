import { type MouseEvent } from 'react';
import { type ZoomGlobalConfigProviderNS } from '../zoom-global-config-provider';
export declare const useDragScroll: (slidesRef: React.MutableRefObject<HTMLDivElement | null>, isVertical: boolean, sendLog: ZoomGlobalConfigProviderNS.Log) => {
    onMouseLeave: () => void;
    onMouseUp: () => void;
    onMouseDown: (evt: MouseEvent<HTMLDivElement>) => void;
    onMouseMove: (evt: MouseEvent<HTMLDivElement>) => void;
};
