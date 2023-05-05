import { BaseRange } from 'slate';
import { Range, UseObjectedStateNS } from '@zoom-studio/zoom-js-ts-utils';
import { EmojiNS, RichTextEditorMakerNS } from '../..';
export declare namespace RichUtilsNS {
    interface Params {
        editor: RichTextEditorMakerNS.Editor;
        noFollowedLink: UseObjectedStateNS.ReturnType<boolean>;
        blankedLink: UseObjectedStateNS.ReturnType<boolean>;
        linkURL: UseObjectedStateNS.ReturnType<string>;
    }
    interface GetCurrentWordReturnType {
        currentWord: string;
        currentRange: BaseRange;
    }
}
export declare class RichUtils {
    editor: RichTextEditorMakerNS.Editor;
    noFollowedLink: UseObjectedStateNS.ReturnType<boolean>;
    blankedLink: UseObjectedStateNS.ReturnType<boolean>;
    linkURL: UseObjectedStateNS.ReturnType<string>;
    wordRegExp: RegExp;
    constructor(params: RichUtilsNS.Params);
    private readonly getHeadingType;
    private readonly getLeftChar;
    private readonly getRightChar;
    private readonly getCurrentWord;
    private readonly getLocationToApplyMarks;
    focusEditor: () => void;
    isActive: (elementType: RichTextEditorMakerNS.ElementTypes) => boolean;
    toggleHeading: (headingLevel: Range<1, 5>) => () => void;
    toggleQuote: () => void;
    isRangeSelected: () => boolean;
    toggleBold: () => void;
    toggleItalic: () => void;
    toggleUnderline: () => void;
    toggleHighlight: () => void;
    toggleStrikethrough: () => void;
    insertTable: (tableInfo: RichTextEditorMakerNS.TableInfo) => void;
    insertLink: (linkInfo: RichTextEditorMakerNS.LinkInfo) => void;
    removeLink: () => void;
    resetLinkInfo: () => void;
    setLinkInfo: ({ url, noFollow, openInNewTab }: RichTextEditorMakerNS.LinkInfo) => void;
    getLinkInfo: () => RichTextEditorMakerNS.LinkInfo | undefined;
    toggleList: (listModel: RichTextEditorMakerNS.ListTypes) => () => void;
    insertParagraph: (text?: string) => void;
    insertRule: () => void;
    insertImage: (imageInfo: RichTextEditorMakerNS.ImageInfo) => void;
    insertVideo: (videoInfo: RichTextEditorMakerNS.VideoInfo) => void;
    insertFile: (fileInfo: RichTextEditorMakerNS.FileInfo) => void;
    insertEmoji: (emojiName: EmojiNS.Emojis.Names) => void;
}
