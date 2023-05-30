import { type RefObject } from 'react';
import { type ZoomGlobalConfigProviderNS } from '../../zoom-global-config-provider';
import { type TableNS } from '../types';
export declare namespace UseTableInfiniteScrollNS {
    const DEFAULT_THRESHOLD = 5;
    interface Prams {
        infiniteScrollSettings: TableNS.InfiniteScrollSettings;
        virtualizedSettings?: TableNS.VirtualizedSettings;
        dataset: unknown[];
        isLoading: boolean;
        sendLog: ZoomGlobalConfigProviderNS.Log;
        scrollableContainerRef: RefObject<HTMLDivElement>;
    }
}
export declare const useTableInfiniteScroll: ({ infiniteScrollSettings: { threshold, loadOnMount, handleOnLoadMore, maxDatasetLength, }, dataset, isLoading, sendLog, virtualizedSettings, scrollableContainerRef, }: UseTableInfiniteScrollNS.Prams) => {
    lastRowRef: (node: HTMLTableRowElement | null) => null | undefined;
    isMoreDataRemaining: boolean;
};
