import React from 'react';
import { ExplorerNS, RichTextEditorMakerNS } from '..';
import { BaseComponent } from '../../types';
import { UseRichTextEditorI18nNS } from './use-i18n';
export declare namespace RichTextEditorNS {
    type I18n = UseRichTextEditorI18nNS.I18n;
    interface ImageExplorerProps extends Omit<ExplorerNS.Props, 'filterTypes' | 'defaultTypeQuery' | 'multiSelect' | 'isTypeSelectDisabled' | 'onSelectItems'> {
    }
    interface VideoExplorerProps extends Omit<ExplorerNS.Props, 'filterTypes' | 'defaultTypeQuery' | 'multiSelect' | 'isTypeSelectDisabled' | 'onSelectItems'> {
    }
    interface FileExplorerProps extends Omit<ExplorerNS.Props, 'filterTypes' | 'defaultTypeQuery' | 'multiSelect' | 'isTypeSelectDisabled' | 'onSelectItems'> {
    }
    interface Props extends Omit<BaseComponent, 'children'> {
        imageExplorerProps?: ImageExplorerProps;
        videoExplorerProps?: VideoExplorerProps;
        fileExplorerProps?: FileExplorerProps;
        editorProps?: Omit<RichTextEditorMakerNS.Props, 'children'>;
        stickyActions?: boolean;
        resizable?: boolean;
        maxHeight?: string | number;
        minHeight?: string | number;
        initialHeight?: string | number;
        enableAdvancedLinkInserter?: boolean;
    }
}
export declare const RichTextEditor: React.ForwardRefExoticComponent<RichTextEditorNS.Props & React.RefAttributes<HTMLDivElement>>;
