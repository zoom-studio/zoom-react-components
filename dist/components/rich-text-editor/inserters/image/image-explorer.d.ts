import { type FC } from 'react';
import { type UseObjectedStateNS } from '@zoom-studio/zoom-js-ts-utils';
import { type RichTextEditorMakerNS, type RichTextEditorNS } from '../../..';
import { type useRichTextEditorI18n } from '../../use-i18n';
export declare namespace ImageExplorerNS {
    interface Props extends Pick<RichTextEditorNS.Props, 'imageExplorerProps'> {
        i18n: ReturnType<typeof useRichTextEditorI18n>;
        isImageDialogOpen: UseObjectedStateNS.ReturnType<boolean>;
        handleCreateImage: (imageInfo: RichTextEditorMakerNS.ImageInfo) => void;
    }
}
export declare const ImageExplorer: FC<ImageExplorerNS.Props>;
