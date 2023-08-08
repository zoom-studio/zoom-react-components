export declare namespace UseZoomComponentNS {
    type CreateClassNameFN = (userClassNames?: string, staticClassNameSuffix?: string, dynamicClassNames?: Record<string, boolean>) => string;
}
export declare const useZoomComponent: (componentName: string) => {
    createClassName: UseZoomComponentNS.CreateClassNameFN;
    sendLog: import("../components").ZoomGlobalConfigProviderNS.Log;
    globalErrors: {
        onCopyFailure?: string | undefined;
        onCopySuccess?: string | undefined;
    } | undefined;
    globalI18ns: {
        imageViewer?: import("../components/image-viewer/use-i18n").UseImageViewerI18nNS.I18n | undefined;
        emojiPicker?: import("../components").EmojiPickerNS.I18n | undefined;
        tour?: import("../components/tour/use-i18n").UseTourI18nNS.I18n | undefined;
        richTextEditor?: import("../components/rich-text-editor/use-i18n").UseRichTextEditorI18nNS.I18n | undefined;
        imageEditor?: import("../components/image-editor/use-i18n").UseImageEditorI18nNS.I18n | undefined;
        explorer?: import("../components/explorer/use-i18n").UseExplorerI18nNS.I18n | undefined;
        uploader?: import("../components/uploader/use-i18n").UseUploaderI18nNS.I18n | undefined;
        table?: import("../components/table/use-i18n").UseTableI18nNS.I18n | undefined;
        chatBubble?: import("../components/chat-bubble/use-i18n").UseChatBubbleI18nNS.I18n | undefined;
        chatInput?: import("../components/chat-input/use-i18n").UseChatInputI18nNS.I18n | undefined;
        datePicker?: import("../components/date-picker/use-i18n").UseDatePickerI18nNS.I18n | undefined;
        qrCodePopover?: import("../components/qr-code-popover/use-i18n").UseQRCodePopoverI18nNS.I18n | undefined;
    } | undefined;
};
