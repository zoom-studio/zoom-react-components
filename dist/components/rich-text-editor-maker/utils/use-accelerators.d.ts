import { KeyboardEvent } from 'react';
import { RichTextEditorMakerNS } from '../types';
import { RichUtils } from './rich-utils';
export declare namespace UseAcceleratorsNS {
    interface Params {
        editor: RichTextEditorMakerNS.Editor;
        richUtils: RichUtils;
    }
}
export declare const useAccelerators: ({ editor, richUtils }: UseAcceleratorsNS.Params) => (evt: KeyboardEvent<HTMLDivElement>) => void;
