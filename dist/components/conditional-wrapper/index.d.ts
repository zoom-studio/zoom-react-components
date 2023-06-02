import { type FC, type ReactNode } from 'react';
export declare namespace ConditionalWrapperNS {
    type Wrapper = (children?: ReactNode) => JSX.Element;
    interface Props {
        condition: boolean | null | undefined;
        trueWrapper?: Wrapper;
        falseWrapper?: Wrapper;
        children?: ReactNode;
    }
}
export declare const ConditionalWrapper: FC<ConditionalWrapperNS.Props>;
