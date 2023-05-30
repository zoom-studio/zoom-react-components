import { type KeyboardEvent } from 'react';
import { type RichTextEditorMakerNS } from '../types';
import { type RichUtils } from '.';
export declare namespace UseAcceleratorsNS {
    interface Params extends Pick<RichTextEditorMakerNS.Props, 'collapseOnEscape'> {
        editor: RichTextEditorMakerNS.Editor;
        richUtils: RichUtils;
        combineHandlers: () => RichTextEditorMakerNS.ChildrenCallback;
    }
}
export declare const useAccelerators: ({ editor, richUtils, combineHandlers, collapseOnEscape, }: UseAcceleratorsNS.Params) => (evt: KeyboardEvent<HTMLDivElement>) => void;
