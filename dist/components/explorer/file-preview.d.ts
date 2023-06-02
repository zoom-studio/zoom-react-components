import { type FC } from 'react';
import { type ExplorerNS } from '.';
export declare namespace ExplorerFilePreviewNS {
    interface Props {
        type: ExplorerNS.MaybeAllFileTypes;
        link: string;
        typeColors: ExplorerNS.TypeColors;
    }
}
export declare const ExplorerFilePreview: FC<ExplorerFilePreviewNS.Props>;
