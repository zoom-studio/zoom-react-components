/// <reference types="react" />
import { type BaseRange } from 'slate';
import { type RichTextEditorMakerProviderNS } from '../provider';
import { type RichTextEditorMakerNS } from '../types';
export declare namespace UseHashtagNS {
    interface Params extends Pick<RichTextEditorMakerProviderNS.Props, 'enableHashtag'> {
        editor: RichTextEditorMakerNS.Editor;
    }
}
export declare const useHashtag: ({ editor, enableHashtag }: UseHashtagNS.Params) => {
    manageHashtagOnChange: () => null | undefined;
    setHashtagTarget: import("react").Dispatch<import("react").SetStateAction<BaseRange | undefined>>;
    hashtagQuery: string;
    selectedHashtagIndex: number;
    foundHashtags: string[];
    shouldRenderList: boolean;
    hashtagTarget: BaseRange | undefined;
};
