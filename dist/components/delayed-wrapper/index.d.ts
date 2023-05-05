import { FC, ReactNode } from 'react';
export declare namespace DelayedWrapperNS {
    interface Props {
        timeout: number;
        loader?: ReactNode;
        children?: ReactNode;
    }
}
export declare const DelayedWrapper: FC<DelayedWrapperNS.Props>;
