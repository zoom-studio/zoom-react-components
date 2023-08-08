import { type FC } from 'react';
import { type UseObjectedStateNS } from '@zoom-studio/js-ts-utils';
import { type RichTextEditorMakerNS, type RichTextEditorNS } from '../../..';
export declare namespace ImageExplorerNS {
    interface Props extends Pick<RichTextEditorNS.Props, 'imageExplorerProps'> {
        isImageDialogOpen: UseObjectedStateNS.ReturnType<boolean>;
        handleCreateImage: (imageInfo: RichTextEditorMakerNS.ImageInfo) => void;
        defaultTypeQuery: string;
    }
}
export declare const ImageExplorer: FC<ImageExplorerNS.Props>;
