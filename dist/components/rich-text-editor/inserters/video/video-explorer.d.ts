import { type FC } from 'react';
import { type UseObjectedStateNS } from '@zoom-studio/js-ts-utils';
import { type RichTextEditorMakerNS, type RichTextEditorNS } from '../../..';
export declare namespace VideoExplorerNS {
    interface Props extends Pick<RichTextEditorNS.Props, 'videoExplorerProps'> {
        isVideoDialogOpen: UseObjectedStateNS.ReturnType<boolean>;
        handleCreateVideo: (videoInfo: RichTextEditorMakerNS.VideoInfo) => void;
        defaultTypeQuery: string;
    }
}
export declare const VideoExplorer: FC<VideoExplorerNS.Props>;
