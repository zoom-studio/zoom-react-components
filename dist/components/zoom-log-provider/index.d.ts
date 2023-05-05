import React, { FC, ReactNode } from 'react';
import { logs } from '../../constants';
import { ImageViewerNS, EmojiPickerNS, TourNS, RichTextEditorNS, ImageEditorNS, ExplorerNS, UploaderNS, TableNS } from '..';
export declare namespace ZoomLogProviderNS {
    type Error = string | object;
    type Log = (description: logs, error?: Error | undefined) => undefined;
    interface ProviderValue extends Pick<Props, 'globalErrors' | 'globalI18ns'> {
        sendLog?: Log;
    }
    interface Props {
        onLog: Log;
        children?: ReactNode;
        globalErrors?: {
            onCopyFailure?: string;
            onCopySuccess?: string;
        };
        globalI18ns?: {
            imageViewer?: ImageViewerNS.I18n;
            emojiPicker?: EmojiPickerNS.I18n;
            tour?: TourNS.I18n;
            richTextEditor?: RichTextEditorNS.I18n;
            imageEditor?: ImageEditorNS.I18n;
            explorer?: ExplorerNS.I18n;
            uploader?: UploaderNS.I18n;
            table?: TableNS.I18n;
        };
    }
}
declare const ZoomLogContext: React.Context<ZoomLogProviderNS.ProviderValue>;
export declare const ZoomLogProvider: FC<ZoomLogProviderNS.Props>;
export { ZoomLogContext as zoomLogContext };
