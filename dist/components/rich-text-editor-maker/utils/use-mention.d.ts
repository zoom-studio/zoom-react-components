/// <reference types="react" />
import { type BaseRange } from 'slate';
import { type RichTextEditorMakerProviderNS } from '../provider';
import { type RichTextEditorMakerNS } from '../types';
export declare namespace UseMentionNS {
    interface Params extends Pick<RichTextEditorMakerProviderNS.Props, 'enableMention'> {
        editor: RichTextEditorMakerNS.Editor;
    }
}
export declare const useMention: ({ editor, enableMention }: UseMentionNS.Params) => {
    manageMentionOnChange: () => null | undefined;
    setMentionTarget: import("react").Dispatch<import("react").SetStateAction<BaseRange | undefined>>;
    mentionQuery: string;
    selectedMentionIndex: number;
    foundUsernames: string[];
    shouldRenderList: boolean;
    mentionTarget: BaseRange | undefined;
};
