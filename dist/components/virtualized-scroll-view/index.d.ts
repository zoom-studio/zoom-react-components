import { type AllRefType } from '@zoom-studio/js-ts-utils';
import { type ScrollViewNS } from '../scroll-view';
export declare namespace VirtualizedScrollViewNS {
    interface Props {
        scrollViewProps?: Omit<ScrollViewNS.Props, 'children' | 'maxHeight'>;
        scrollViewRef?: AllRefType<ScrollViewNS.ContainerNode>;
    }
}
export * as VirtualizedScrollView from './virtualizers';
