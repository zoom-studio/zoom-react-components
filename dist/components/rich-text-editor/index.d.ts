import React from 'react';
import { type ExplorerNS, type RichTextEditorMakerNS } from '..';
import { type BaseComponent } from '../../types';
import { type UseRichTextEditorI18nNS } from './use-i18n';
import { type RichTextEditorMakerProviderNS } from '../rich-text-editor-maker/provider';
export declare namespace RichTextEditorNS {
    type Actions = (typeof Actions)[number];
    const Actions: readonly ["h1", "h2", "h3", "h4", "bold", "italic", "underline", "strikethrough", "quote", "highlight", "link", "removeLink", "orderedList", "unorderedList", "rule", "table", "image", "video", "file", "emoji", "undo", "redo"];
    type I18n = UseRichTextEditorI18nNS.I18n;
    interface ImageExplorerProps extends Omit<ExplorerNS.Props, 'filterTypes' | 'defaultTypeQuery' | 'multiSelect' | 'isTypeSelectDisabled' | 'onSelectItems'> {
    }
    interface VideoExplorerProps extends Omit<ExplorerNS.Props, 'filterTypes' | 'defaultTypeQuery' | 'multiSelect' | 'isTypeSelectDisabled' | 'onSelectItems'> {
    }
    interface FileExplorerProps extends Omit<ExplorerNS.Props, 'filterTypes' | 'defaultTypeQuery' | 'multiSelect' | 'isTypeSelectDisabled' | 'onSelectItems'> {
    }
    type EditorMakerProps = Omit<RichTextEditorMakerNS.Props, 'children' | 'editor' | 'id' | 'renderLinkElement'>;
    type EditorMakerProviderProps = Omit<RichTextEditorMakerProviderNS.Props, 'children' | 'id' | 'enableMention' | 'enableHashtag'>;
    interface Props extends Omit<BaseComponent, 'children' | 'id'> {
        imageExplorerProps?: ImageExplorerProps;
        videoExplorerProps?: VideoExplorerProps;
        fileExplorerProps?: FileExplorerProps;
        editorProps?: EditorMakerProps & EditorMakerProviderProps;
        stickyActions?: boolean;
        resizable?: boolean;
        maxHeight?: string | number;
        minHeight?: string | number;
        initialHeight?: string | number;
        enableAdvancedLinkInserter?: boolean;
        id: string;
        i18n?: I18n;
        actions?: {
            [action in Actions]?: boolean;
        };
    }
}
export declare const RichTextEditor: React.ForwardRefExoticComponent<RichTextEditorNS.Props & React.RefAttributes<HTMLDivElement>>;
