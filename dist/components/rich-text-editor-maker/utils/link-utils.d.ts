import { type UseObjectedStateNS } from '@zoom-studio/js-ts-utils';
import { type BaseRange } from 'slate';
import { type RichTextEditorMakerNS } from '../..';
import { type RichUtils } from './rich-utils';
export declare namespace LinkUtilsNS {
    interface Params {
        editor: RichTextEditorMakerNS.Editor;
        noFollowedLink: UseObjectedStateNS.ReturnType<boolean>;
        blankedLink: UseObjectedStateNS.ReturnType<boolean>;
        linkURL: UseObjectedStateNS.ReturnType<string>;
        richUtils: RichUtils;
    }
    interface GetCurrentWordReturnType {
        currentWord: string;
        currentRange: BaseRange;
    }
}
export declare class LinkUtils {
    editor: RichTextEditorMakerNS.Editor;
    noFollowedLink: UseObjectedStateNS.ReturnType<boolean>;
    blankedLink: UseObjectedStateNS.ReturnType<boolean>;
    linkURL: UseObjectedStateNS.ReturnType<string>;
    richUtils: RichUtils;
    constructor(params: LinkUtilsNS.Params);
    resetLinkInfo: () => void;
    setLinkInfo: ({ url, noFollow, openInNewTab }: RichTextEditorMakerNS.LinkInfo) => void;
}
