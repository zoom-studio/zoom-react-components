import { type FC, type ReactNode } from 'react';
import { type CommonVariants } from '../../types';
export declare namespace CopyToClipboardNS {
    type State = 'copying' | 'copied' | 'errored' | 'initial';
    interface ChildrenCallback {
        copy: () => void;
        isLoading: boolean;
        error: null;
        state: State;
        variant: CommonVariants;
    }
    interface Props {
        text: string;
        children: ReactNode | ((handlers: ChildrenCallback) => ReactNode);
        resetTimeout?: number;
        toastOnError?: boolean;
        toastOnSuccess?: boolean;
        errorMessage?: string;
        successMessage?: string;
        onCopyClicked?: () => void;
    }
}
export declare const CopyToClipboard: FC<CopyToClipboardNS.Props>;
