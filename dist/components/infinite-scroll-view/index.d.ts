import { type ReactNode, type RefObject } from 'react';
import { type ScrollViewNS, type SpinNS } from '..';
import { type BaseComponent } from '../../types';
export declare namespace InfiniteScrollViewNS {
    const INDEX_IDENTIFIER = "__ZOOMRC_INFINITE_SCROLL_VIEW_MUTATED_DATASET_INDEX_IDENTIFIER__";
    type PickedScrollViewProps = 'maxWidth' | 'maxHeight' | 'autoHide';
    interface ChildrenCallbackParams {
        index: number;
    }
    interface BetwixtRenderParams<DataType extends unknown[] = unknown[]> {
        datasetKey: string;
        datasetKeyIndex: number;
        dataset: DataType;
    }
    interface Props<DataType extends unknown[] = unknown[]> extends Omit<BaseComponent, 'children'>, Pick<ScrollViewNS.Props, PickedScrollViewProps> {
        dataset: DataType;
        groupBy?: keyof DataType[0];
        isLoading: boolean;
        handleOnLoadMore: () => void | Promise<void>;
        children: (data: DataType[0], params: ChildrenCallbackParams) => JSX.Element;
        scrollViewProps?: Omit<ScrollViewNS.Props, PickedScrollViewProps>;
        maxDatasetLength?: number;
        reverseScroll?: boolean;
        loadOnMount?: boolean;
        threshold?: number;
        reference?: RefObject<HTMLDivElement>;
        spinProps?: SpinNS.Props;
        endMessage?: string | ReactNode;
        itemsContainerProps?: Omit<BaseComponent, 'children'>;
        itemContainerProps?: Omit<BaseComponent, 'children'>;
        itemsReferenceKey?: string;
        handleSetProps?: (index: number, reference: null | undefined) => Record<string, any>;
        useScrollViewComponent?: boolean;
        renderBetwixtBeforeDataset?: (params: BetwixtRenderParams) => ReactNode;
        renderBetwixtAfterDataset?: (params: BetwixtRenderParams) => ReactNode;
    }
}
export declare const InfiniteScrollView: <DataType extends unknown[] = unknown[]>({ useScrollViewComponent, itemsReferenceKey, reverseScroll, loadOnMount, threshold, endMessage, isLoading, className, children, spinProps, handleSetProps, containerProps, reference, dataset, scrollViewProps, maxHeight, maxWidth, handleOnLoadMore, maxDatasetLength, autoHide, itemsContainerProps, itemContainerProps, groupBy, renderBetwixtAfterDataset, renderBetwixtBeforeDataset, ...rest }: InfiniteScrollViewNS.Props<DataType>) => JSX.Element;
