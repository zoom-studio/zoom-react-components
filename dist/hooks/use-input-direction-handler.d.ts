import { type RefObject } from 'react';
export declare const useInputDirectionHandler: (inputRef: RefObject<HTMLInputElement | HTMLTextAreaElement | null>, onSendLog: VoidFunction, isEnabled?: boolean) => (value?: string) => null | undefined;
