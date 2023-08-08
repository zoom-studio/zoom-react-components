import React, { type FC, type ReactNode } from 'react';
import { type logs } from '../../constants';
import { type ChatBubbleNS, type ChatInputNS, type DatePickerNS, type EmojiPickerNS, type ExplorerNS, type ImageEditorNS, type ImageViewerNS, type QRCodePopoverNS, type RichTextEditorNS, type TableNS, type TourNS, type UploaderNS } from '..';
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
            chatBubble?: ChatBubbleNS.I18n;
            chatInput?: ChatInputNS.I18n;
            datePicker?: DatePickerNS.I18n;
            qrCodePopover?: QRCodePopoverNS.I18n;
        };
    }
}
declare const ZoomGlobalConfigContext: React.Context<ZoomGlobalConfigProviderNS.ProviderValue>;
export declare const ZoomGlobalConfigProvider: FC<ZoomGlobalConfigProviderNS.Props>;
export { ZoomGlobalConfigContext as zoomGlobalConfigContext };
