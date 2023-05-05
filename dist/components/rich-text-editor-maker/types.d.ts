import { Dispatch, ForwardRefExoticComponent, ReactNode, RefAttributes, SetStateAction } from 'react';
import { BaseEditor } from 'slate';
import { ReactEditor } from 'slate-react';
import { RichTextEditorMakerProvider } from './provider';
import { RichUtils } from './utils';
import { BaseComponent } from '../../types';
import { ExplorerNS } from '../explorer';
export declare namespace RichTextEditorMakerNS {
    type Editor = BaseEditor & ReactEditor;
    type ListTypes = Extract<BlockTypes, 'ordered-list' | 'unordered-list'>;
    type BlockTypes = typeof BlockTypes[number];
    const BlockTypes: readonly ["paragraph", "normal", "h1", "h2", "h3", "h4", "quote", "ordered-list", "unordered-list", "list-item", "break", "table", "image", "video", "file", "sticker", "rule"];
    type MarkTypes = typeof MarkTypes[number];
    const MarkTypes: readonly ["bold", "italic", "underline", "link", "emoji", "emoji", "mention", "hashtag", "highlight", "strikethrough"];
    type ElementTypes = typeof ElementTypes[number];
    const ElementTypes: readonly ["paragraph", "normal", "h1", "h2", "h3", "h4", "quote", "ordered-list", "unordered-list", "list-item", "break", "table", "image", "video", "file", "sticker", "rule", "bold", "italic", "underline", "link", "emoji", "emoji", "mention", "hashtag", "highlight", "strikethrough"];
    interface LinkInfo {
        url: string;
        openInNewTab?: boolean;
        noFollow?: boolean;
    }
    interface TableInfo {
        rows: number;
        cols: number;
    }
    interface ImageInfo {
        src: string;
        alt?: string;
    }
    interface FileInfo {
        type: ExplorerNS.MaybeAllFileTypes;
        src: string;
        name: string;
        size: number;
    }
    interface VideoInfo {
        src: string;
    }
    interface RenderLinkInfoCallbackParams extends LinkInfo {
        children: ReactNode;
        handlers: ChildrenCallback;
    }
    interface ChildrenCallback extends Pick<RichUtils, 'toggleHeading' | 'toggleBold' | 'isActive' | 'focusEditor' | 'toggleItalic' | 'toggleUnderline' | 'toggleStrikethrough' | 'toggleQuote' | 'insertLink' | 'removeLink' | 'resetLinkInfo' | 'toggleHighlight' | 'toggleList' | 'insertRule' | 'insertParagraph' | 'insertTable' | 'insertImage' | 'insertVideo' | 'insertFile' | 'insertEmoji'> {
        renderEditor: () => JSX.Element;
        setIsBlankedLink: Dispatch<SetStateAction<boolean | undefined>>;
        setIsNoFollowLink: Dispatch<SetStateAction<boolean | undefined>>;
        setLinkURL: Dispatch<SetStateAction<string | undefined>>;
        selectionLink: Required<LinkInfo>;
    }
    interface Props extends Omit<BaseComponent, 'children'> {
        editor: Editor;
        placeholder?: string;
        children?: ((handlers: ChildrenCallback) => ReactNode) | ReactNode;
        renderLinkElement?: (params: RenderLinkInfoCallbackParams) => ReactNode;
    }
    type ComponentType = ForwardRefExoticComponent<Props & RefAttributes<HTMLDivElement>> & {
        provider: typeof RichTextEditorMakerProvider;
    };
}
