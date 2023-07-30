import React from 'react';
import { type RichTextEditorMakerNS, type RichTextEditorNS } from '..';
import type { BaseComponent } from '../../types';
import { type RichTextEditorMakerProviderNS } from '../rich-text-editor-maker/provider';
import { type UseChatInputI18nNS } from './use-i18n';
export declare namespace ChatInputNS {
    type I18n = UseChatInputI18nNS.I18n;
    interface Props extends Omit<BaseComponent, 'children' | 'id'> {
        id: string;
        imageExplorerProps?: RichTextEditorNS.ImageExplorerProps;
        videoExplorerProps?: RichTextEditorNS.VideoExplorerProps;
        fileExplorerProps?: RichTextEditorNS.FileExplorerProps;
        containerId?: string;
        i18n?: I18n;
        onSend?: (value: string) => void;
        richTextEditorProps?: Omit<RichTextEditorMakerNS.Props, 'editor' | 'children' | 'onKeyDown'>;
        richTextEditorProviderProps?: Omit<RichTextEditorMakerProviderNS.Props, 'id' | 'children' | 'defaultValue'>;
    }
}
export declare const ChatInput: React.ForwardRefExoticComponent<ChatInputNS.Props & React.RefAttributes<HTMLDivElement>>;
