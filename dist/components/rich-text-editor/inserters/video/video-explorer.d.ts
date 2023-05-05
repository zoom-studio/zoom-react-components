import { FC } from 'react';
import { UseObjectedStateNS } from '@zoom-studio/zoom-js-ts-utils';
import { RichTextEditorMakerNS, RichTextEditorNS } from '../../..';
import { useRichTextEditorI18n } from '../../use-i18n';
export declare namespace VideoExplorerNS {
    interface Props extends Pick<RichTextEditorNS.Props, 'videoExplorerProps'> {
        i18n: ReturnType<typeof useRichTextEditorI18n>;
        isVideoDialogOpen: UseObjectedStateNS.ReturnType<boolean>;
        handleCreateVideo: (videoInfo: RichTextEditorMakerNS.VideoInfo) => void;
    }
}
export declare const VideoExplorer: FC<VideoExplorerNS.Props>;
