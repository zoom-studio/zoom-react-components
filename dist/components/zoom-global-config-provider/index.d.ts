import React, { type FC, type ReactNode } from 'react';
import { type logs } from '../../constants';
import { type ImageViewerNS, type EmojiPickerNS, type TourNS, type RichTextEditorNS, type ImageEditorNS, type ExplorerNS, type UploaderNS, type TableNS } from '..';
export declare namespace ZoomGlobalConfigProviderNS {
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
declare const ZoomGlobalConfigContext: React.Context<ZoomGlobalConfigProviderNS.ProviderValue>;
export declare const ZoomGlobalConfigProvider: FC<ZoomGlobalConfigProviderNS.Props>;
export { ZoomGlobalConfigContext as zoomGlobalConfigContext };
