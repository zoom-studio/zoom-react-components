import React, { type ReactNode, type RefObject } from 'react';
import { type BaseComponent } from '../../types';
export declare namespace CarouselNS {
    interface HorizontalProps {
        orientation?: 'horizontal';
    }
    interface VerticalProps {
        orientation?: 'vertical';
        maxHeight: 'string' | number;
    }
    interface BaseProps<DataType extends object = object> extends Omit<BaseComponent, 'children'> {
        dataset: DataType[];
        children: (data: DataType, index: number) => ReactNode;
        itemsPerScroll?: number;
        containerRef?: RefObject<HTMLDivElement>;
        autoPlay?: number;
        showIndicators?: boolean;
        showNavigators?: boolean;
        title?: string;
    }
    type Props<DataType extends object = object> = BaseProps<DataType> & (HorizontalProps | VerticalProps);
}
export declare const Carousel: <DataType extends object = object>(props: CarouselNS.Props<DataType>) => React.JSX.Element;
