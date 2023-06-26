import { type FC } from 'react';
import { type UseObjectedStateNS } from '@zoom-studio/zoom-js-ts-utils';
import { type RichTextEditorMakerNS, type RichTextEditorNS } from '../../..';
export declare namespace FileExplorerNS {
    interface Props extends Pick<RichTextEditorNS.Props, 'fileExplorerProps'> {
        isFileDialogOpen: UseObjectedStateNS.ReturnType<boolean>;
        handleCreateFile: (fileInfo: RichTextEditorMakerNS.FileInfo) => void;
    }
}
export declare const FileExplorer: FC<FileExplorerNS.Props>;
