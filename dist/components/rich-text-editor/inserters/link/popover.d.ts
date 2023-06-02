import { type Dispatch, type FC, type SetStateAction } from 'react';
import { type RichTextEditorNS } from '../..';
import { type RichTextEditorMakerNS } from '../../..';
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
