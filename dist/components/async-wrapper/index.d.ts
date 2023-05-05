import { DependencyList } from 'react';
import { AsyncFunction } from '@zoom-studio/zoom-js-ts-utils';
export declare namespace AsyncWrapperNS {
    interface ChildrenCallbackParams<Processor extends AsyncFunction> {
        isProcessing: boolean;
        processed: Awaited<ReturnType<Processor>>;
    }
    interface Props<Processor extends AsyncFunction, Processable> {
        processor: Processor;
        processable: Processable;
        children: (params: ChildrenCallbackParams<Processor>) => JSX.Element;
        deps?: DependencyList;
    }
}
export declare const AsyncWrapper: <Processable, Processor extends AsyncFunction<Processable[], any>>({ processor, processable, children, deps, }: AsyncWrapperNS.Props<Processor, Processable>) => JSX.Element;
