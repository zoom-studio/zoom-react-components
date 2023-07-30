import { type KeyboardEvent, type Dispatch, type ForwardRefExoticComponent, type ReactNode, type RefAttributes, type SetStateAction } from 'react';
import { type BaseEditor } from 'slate';
import { type ReactEditor } from 'slate-react';
import { type BaseComponent } from '../../types';
import { type ExplorerNS } from '../explorer';
import { type RichTextEditorMakerProvider } from './provider';
import { type LinkUtils, type RichUtils } from './utils';
export declare namespace RichTextEditorMakerNS {
    type Editor = BaseEditor & ReactEditor;
    type ListTypes = Extract<BlockTypes, 'ordered-list' | 'unordered-list'>;
    type BlockTypes = (typeof BlockTypes)[number];
    const BlockTypes: readonly ["paragraph", "normal", "h1", "h2", "h3", "h4", "quote", "ordered-list", "unordered-list", "list-item", "list-item-text", "break", "table", "table-row", "table-cell", "image", "video", "file", "rule"];
    type MarkTypes = (typeof MarkTypes)[number];
    const MarkTypes: readonly ["bold", "italic", "underline", "link", "emoji", "mention", "hashtag", "highlight", "strikethrough"];
    type ElementTypes = (typeof ElementTypes)[number];
    const ElementTypes: readonly ["paragraph", "normal", "h1", "h2", "h3", "h4", "quote", "ordered-list", "unordered-list", "list-item", "list-item-text", "break", "table", "table-row", "table-cell", "image", "video", "file", "rule", "bold", "italic", "underline", "link", "emoji", "mention", "hashtag", "highlight", "strikethrough"];
    interface LinkInfo {
        url: string;
        openInNewTab?: boolean;
        noFollow?: boolean;
    }
    interface MentionInfo {
        displayName: string;
        [key: string]: any;
    }
    interface HashtagInfo {
        displayName: string;
        [key: string]: any;
    }
    type TableData = string[][];
    interface TableCells {
        rows: number;
        cols: number;
    }
    type TableInfo = TableCells;
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
    interface ChildrenCallback extends Pick<RichUtils, 'toggleHeading' | 'toggleBold' | 'isActive' | 'focusEditor' | 'toggleItalic' | 'toggleUnderline' | 'toggleStrikethrough' | 'toggleQuote' | 'insertLink' | 'removeLink' | 'toggleHighlight' | 'toggleList' | 'isRangeSelected' | 'insertRule' | 'insertParagraph' | 'insertTable' | 'insertImage' | 'insertVideo' | 'insertFile' | 'insertEmoji' | 'insertMention' | 'insertHashtag' | 'isValid'>, Pick<LinkUtils, 'resetLinkInfo'> {
        renderEditor: () => JSX.Element;
        setIsBlankedLink: Dispatch<SetStateAction<boolean | undefined>>;
        setIsNoFollowLink: Dispatch<SetStateAction<boolean | undefined>>;
        setLinkURL: Dispatch<SetStateAction<string | undefined>>;
        selectionLink: Required<LinkInfo>;
        undo: () => void;
        redo: () => void;
    }
    interface Props extends Omit<BaseComponent, 'children' | 'id'> {
        editor: Editor;
        placeholder?: string;
        children?: ((handlers: ChildrenCallback) => ReactNode) | ReactNode;
        renderLinkElement?: (params: RenderLinkInfoCallbackParams) => ReactNode;
        collapseOnEscape?: boolean;
        searchQuery?: string;
        onKeyDown?: (evt: KeyboardEvent<HTMLDivElement>) => void;
    }
    type ComponentType = ForwardRefExoticComponent<Props & RefAttributes<HTMLDivElement>> & {
        provider: typeof RichTextEditorMakerProvider;
    };
}
