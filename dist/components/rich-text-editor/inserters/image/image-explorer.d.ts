import { FC } from 'react';
import { UseObjectedStateNS } from '@zoom-studio/zoom-js-ts-utils';
import { RichTextEditorMakerNS, RichTextEditorNS } from '../../..';
import { useRichTextEditorI18n } from '../../use-i18n';
export declare namespace ImageExplorerNS {
    interface Props extends Pick<RichTextEditorNS.Props, 'imageExplorerProps'> {
        i18n: ReturnType<typeof useRichTextEditorI18n>;
        isImageDialogOpen: UseObjectedStateNS.ReturnType<boolean>;
        handleCreateImage: (imageInfo: RichTextEditorMakerNS.ImageInfo) => void;
    }
}
export declare const ImageExplorer: FC<ImageExplorerNS.Props>;
