import React, { type DependencyList } from 'react';
import { type AsyncFunction } from '@zoom-studio/zoom-js-ts-utils';
export declare namespace AsyncWrapperNS {
    interface ChildrenCallbackParams<Processor extends AsyncFunction> {
        isProcessing: boolean;
        processed: Awaited<ReturnType<Processor>> | null;
    }
    interface Props<Processor extends AsyncFunction, Processable> {
        processor: Processor;
        processable: Processable;
        children: (params: ChildrenCallbackParams<Processor>) => JSX.Element;
        deps?: DependencyList;
    }
}
export declare const AsyncWrapper: <Processable, Processor extends AsyncFunction<Processable[]>>({ processor, processable, children, deps, }: AsyncWrapperNS.Props<Processor, Processable>) => React.JSX.Element;
