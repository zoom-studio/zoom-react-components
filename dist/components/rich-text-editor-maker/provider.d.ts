import { FC, ReactNode } from 'react';
import { Descendant } from 'slate';
import { useMention } from './plugins';
import { RichTextEditorMakerNS } from './types';
export declare namespace RichTextEditorMakerProviderNS {
    interface ChildrenCallbackParams {
        providerEditor: RichTextEditorMakerNS.Editor;
        mention: ReturnType<typeof useMention>;
    }
    interface MentionSettings {
        usernames: string[];
        restrictResult?: number;
        usernameRegex?: RegExp;
    }
    interface Props {
        defaultValue?: Descendant[];
        children: (params: ChildrenCallbackParams) => ReactNode;
        enableMention?: MentionSettings;
    }
}
export declare const RichTextEditorMakerProvider: FC<RichTextEditorMakerProviderNS.Props>;
