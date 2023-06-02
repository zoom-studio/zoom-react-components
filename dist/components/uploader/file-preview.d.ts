import { type FC } from 'react';
import { type ExplorerNS } from '..';
export declare namespace UploaderFilePreviewNS {
    interface Props {
        type: ExplorerNS.MaybeAllFileTypes;
        typeColors: ExplorerNS.TypeColors;
        imageSource?: string | null;
        previewsSize: number;
    }
}
export declare const UploaderFilePreview: FC<UploaderFilePreviewNS.Props>;
