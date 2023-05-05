import { Dispatch, FC, SetStateAction } from 'react';
import { RichTextEditorNS } from '../..';
import { RichTextEditorMakerNS } from '../../..';
export declare namespace LinkInserterPopoverNS {
    interface Props extends Pick<RichTextEditorNS.Props, 'enableAdvancedLinkInserter'> {
        isValidURL: (URL: string | undefined) => boolean;
        i18n: Required<RichTextEditorNS.I18n>;
        setIsBlankedLink: Dispatch<SetStateAction<boolean | undefined>>;
        setIsNoFollowLink: Dispatch<SetStateAction<boolean | undefined>>;
        setLinkURL: Dispatch<SetStateAction<string | undefined>>;
        selectionLink: Required<RichTextEditorMakerNS.LinkInfo>;
        createLink: RichTextEditorMakerNS.ChildrenCallback['insertLink'];
        resetLinkInfo: () => void;
        closePopover: () => void;
        focusEditor: () => void;
    }
}
export declare const LinkInserterPopover: FC<LinkInserterPopoverNS.Props>;
