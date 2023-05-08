import { BaseRange } from 'slate';
import { RichTextEditorMakerProviderNS } from '../provider';
import { RichTextEditorMakerNS } from '../types';
export declare namespace UseMentionNS {
    interface PortalPosition {
        top: number | string;
        left?: number | string;
    }
    const DEFAULT_PORTAL_POSITION: PortalPosition;
    interface Params extends Pick<RichTextEditorMakerProviderNS.Props, 'enableMention'> {
        editor: RichTextEditorMakerNS.Editor;
    }
}
export declare const useMention: ({ editor, enableMention }: UseMentionNS.Params) => {
    manageMentionOnChange: () => null | undefined;
    mentionTarget: BaseRange | undefined;
    mentionQuery: string;
    selectedMentionIndex: number;
    foundUsernames: string[];
    portalPosition: UseMentionNS.PortalPosition;
};
