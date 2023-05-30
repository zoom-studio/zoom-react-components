import { type Range } from '@zoom-studio/zoom-js-ts-utils';
import { type BaseRange, Node, Path } from 'slate';
import { type EmojiNS, RichTextEditorMakerNS } from '../..';
import { EditorCurrentWord } from '.';
import { TableElementNS } from '../elements/table/types';
import { type RichTextEditorMakerProviderNS } from '../provider';
export declare namespace RichUtilsNS {
    interface Params {
        editor: RichTextEditorMakerNS.Editor;
        editorContext?: Required<RichTextEditorMakerProviderNS.ProviderValue>;
    }
    interface GetCurrentWordReturnType {
        currentWord: string;
        currentRange: BaseRange;
    }
    interface CreateTableRowParams {
        rowIndex: number;
        tableInfo: RichTextEditorMakerNS.TableInfo;
        tableID: string;
    }
    interface CreateTableColParams {
        colIndex: number;
        rowIndex: number;
        tableInfo: RichTextEditorMakerNS.TableInfo;
        tableID: string;
    }
    interface NodeInfo {
        path: Path;
        node: Node;
    }
}
export declare class RichUtils {
    editor: RichTextEditorMakerNS.Editor;
    currentWord: EditorCurrentWord;
    context?: Required<RichTextEditorMakerProviderNS.ProviderValue>;
    constructor(params: RichUtilsNS.Params);
    private readonly deepFindNode;
    private readonly getHeadingType;
    private readonly getLocationToApplyMarks;
    private readonly insertNodes;
    private readonly toggleBlockType;
    private readonly createTableRow;
    private readonly createTableCol;
    private readonly getTableColumnInfo;
    private readonly getTableRowInfo;
    focusEditor: () => void;
    collapseSelection: () => void;
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
    focusFirstTableCell: (tableID: string) => void;
    changeTableStyle: (tableID: string) => () => void;
    deleteTable: (tableID: string) => () => void;
    removeTableColumn: (colIndexToRemove: number, id: string) => void;
    insertTableColumn: (colIndexToAppend: number, side: TableElementNS.HorizontalSide, id: string) => void;
    removeTableRow: (rowIndexToRemove: number, id: string) => void;
    insertTableRow: (rowIndexToAppend: number, side: TableElementNS.VerticalSide, id: string) => void;
    insertLink: (linkInfo: RichTextEditorMakerNS.LinkInfo) => void;
    removeLink: () => void;
    getLinkInfo: () => RichTextEditorMakerNS.LinkInfo | undefined;
    toggleList: (listModel: RichTextEditorMakerNS.ListTypes) => () => void;
    insertParagraph: (text?: string) => void;
    insertRule: () => void;
    insertImage: (imageInfo: RichTextEditorMakerNS.ImageInfo) => void;
    insertVideo: (videoInfo: RichTextEditorMakerNS.VideoInfo) => void;
    insertFile: (fileInfo: RichTextEditorMakerNS.FileInfo) => void;
    insertEmoji: (emojiName: EmojiNS.Emojis.Names) => void;
    insertMention: (mentionInfo: RichTextEditorMakerNS.MentionInfo) => void;
    insertHashtag: (hashtagInfo: RichTextEditorMakerNS.HashtagInfo) => void;
}
