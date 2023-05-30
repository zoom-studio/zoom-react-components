import { type FC, type ReactNode } from 'react';
export declare namespace IntervalWrapperNS {
    interface Props {
        interval: number;
        strategy?: 'toggle' | 'immediate-reload';
        immediateReloadDelay?: number;
        children?: ReactNode;
        loader?: ReactNode;
    }
}
export declare const IntervalWrapper: FC<IntervalWrapperNS.Props>;
