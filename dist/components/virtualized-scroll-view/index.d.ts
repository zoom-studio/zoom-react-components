import { type ScrollViewNS } from '../scroll-view';
export declare namespace VirtualizedScrollViewNS {
    interface Props {
        scrollViewProps?: Omit<ScrollViewNS.Props, 'children' | 'maxHeight'>;
    }
}
export * as VirtualizedScrollView from './virtualizers';
