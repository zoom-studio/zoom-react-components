import { ReactNode, RefObject } from 'react';
import { ScrollViewNS, SpinNS } from '..';
import { BaseComponent } from '../../types';
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
        handleSetProps?: (index: number, reference: null | undefined) => {
            [prop: string]: any;
        };
    }
}
export declare const InfiniteScrollView: <DataType extends unknown[] = unknown[]>({ itemsReferenceKey, reverseScroll, loadOnMount, threshold, endMessage, isLoading, className, children, spinProps, handleSetProps, containerProps, reference, dataset, scrollViewProps, maxHeight, maxWidth, handleOnLoadMore, maxDatasetLength, autoHide, itemsContainerProps, itemContainerProps, ...rest }: InfiniteScrollViewNS.Props<DataType>) => JSX.Element;
