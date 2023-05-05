import { FC } from 'react';
import { UseObjectedStateNS } from '@zoom-studio/zoom-js-ts-utils';
import { RichTextEditorMakerNS, RichTextEditorNS } from '../../..';
import { useRichTextEditorI18n } from '../../use-i18n';
export declare namespace FileExplorerNS {
    interface Props extends Pick<RichTextEditorNS.Props, 'fileExplorerProps'> {
        i18n: ReturnType<typeof useRichTextEditorI18n>;
        isFileDialogOpen: UseObjectedStateNS.ReturnType<boolean>;
        handleCreateFile: (fileInfo: RichTextEditorMakerNS.FileInfo) => void;
    }
}
export declare const FileExplorer: FC<FileExplorerNS.Props>;
