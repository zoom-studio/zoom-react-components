import { type ReactNode, type RefObject } from 'react';
import { type ScrollViewNS, type SpinNS } from '..';
import { type BaseComponent } from '../../types';
export declare namespace InfiniteScrollViewNS {
    type PickedScrollViewProps = 'maxWidth' | 'maxHeight' | 'autoHide';
    interface ChildrenCallbackParams {
        index: number;
    }
    interface Props<DataType extends unknown[] = unknown[]> extends Omit<BaseComponent, 'children'>, Pick<ScrollViewNS.Props, PickedScrollViewProps> {
        dataset: DataType;
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
    }
}
export declare const InfiniteScrollView: <DataType extends unknown[] = unknown[]>({ useScrollViewComponent, itemsReferenceKey, reverseScroll, loadOnMount, threshold, endMessage, isLoading, className, children, spinProps, handleSetProps, containerProps, reference, dataset, scrollViewProps, maxHeight, maxWidth, handleOnLoadMore, maxDatasetLength, autoHide, itemsContainerProps, itemContainerProps, ...rest }: InfiniteScrollViewNS.Props<DataType>) => JSX.Element;
