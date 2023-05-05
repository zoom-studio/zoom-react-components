import { useZoomComponent } from '../../hooks';
export declare namespace UseRichTextEditorI18nNS {
    interface I18n {
        linkURLPlaceholder?: string;
        linkTargetLabel?: string;
        linkNoFollowLabel?: string;
        confirmLinkButton?: string;
        textSize?: string;
        heading1?: string;
        heading2?: string;
        heading3?: string;
        heading4?: string;
        bold?: string;
        strikethrough?: string;
        italic?: string;
        underline?: string;
        link?: string;
        highlight?: string;
        removeLink?: string;
        blockquote?: string;
        ol?: string;
        ul?: string;
        emoji?: string;
        icon?: string;
        image?: string;
        file?: string;
        copy?: string;
        cut?: string;
        paste?: string;
        images?: string;
        horizontalRule?: string;
        table?: string;
        video?: string;
        videos?: string;
        sticker?: string;
        undo?: string;
        redo?: string;
    }
}
export declare const useRichTextEditorI18n: (globalI18ns: ReturnType<typeof useZoomComponent>['globalI18ns']) => Required<UseRichTextEditorI18nNS.I18n>;
