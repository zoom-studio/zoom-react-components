import { RefObject } from 'react';
import { ZoomLogProviderNS } from '../../zoom-log-provider';
import { TableNS } from '../types';
export declare namespace UseTableInfiniteScrollNS {
    const DEFAULT_THRESHOLD = 5;
    interface Prams {
        infiniteScrollSettings: TableNS.InfiniteScrollSettings;
        virtualizedSettings?: TableNS.VirtualizedSettings;
        dataset: unknown[];
        isLoading: boolean;
        sendLog: ZoomLogProviderNS.Log;
        scrollableContainerRef: RefObject<HTMLDivElement>;
    }
}
export declare const useTableInfiniteScroll: ({ infiniteScrollSettings: { threshold, loadOnMount, handleOnLoadMore, maxDatasetLength, }, dataset, isLoading, sendLog, virtualizedSettings, scrollableContainerRef, }: UseTableInfiniteScrollNS.Prams) => {
    lastRowRef: (node: HTMLTableRowElement | null) => null | undefined;
    isMoreDataRemaining: boolean;
};
