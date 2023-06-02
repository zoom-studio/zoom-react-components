import React, { type Dispatch, type FC, type KeyboardEvent, type ReactNode, type SetStateAction } from 'react';
import { type Descendant } from 'slate';
import { type RichTextEditorMakerNS } from './types';
import { useHashtag, useMention } from './utils';
export declare namespace RichTextEditorMakerProviderNS {
    interface ChildrenCallbackParams {
        providerEditor: RichTextEditorMakerNS.Editor;
        mention: Omit<ReturnType<typeof useMention>, 'manageMentionOnChange'>;
        hashtag: Omit<ReturnType<typeof useHashtag>, 'manageHashtagOnChange'>;
    }
    interface MentionKeyboardEvent {
        mention: ReturnType<typeof useMention>;
        evt: KeyboardEvent<HTMLDivElement>;
        handlers: RichTextEditorMakerNS.ChildrenCallback;
    }
    interface MentionSettings {
        usernames: string[];
        restrictResult?: number;
        usernameRegex?: RegExp;
        onArrowDown?: (evt: MentionKeyboardEvent) => void;
        onArrowUp?: (evt: MentionKeyboardEvent) => void;
        onTab?: (evt: MentionKeyboardEvent) => void;
        onEnter?: (evt: MentionKeyboardEvent) => void;
        onEscape?: (evt: MentionKeyboardEvent) => void;
    }
    interface HashtagKeyboardEvent {
        hashtag: ReturnType<typeof useHashtag>;
        evt: KeyboardEvent<HTMLDivElement>;
        handlers: RichTextEditorMakerNS.ChildrenCallback;
    }
    interface HashtagSettings {
        hashtags: string[];
        restrictResult?: number;
        hashtagRegex?: RegExp;
        onArrowDown?: (evt: HashtagKeyboardEvent) => void;
        onArrowUp?: (evt: HashtagKeyboardEvent) => void;
        onTab?: (evt: HashtagKeyboardEvent) => void;
        onEnter?: (evt: HashtagKeyboardEvent) => void;
        onEscape?: (evt: HashtagKeyboardEvent) => void;
    }
    interface Props {
        defaultValue?: Descendant[];
        children: (params: ChildrenCallbackParams) => ReactNode;
        enableMention?: MentionSettings;
        enableHashtag?: HashtagSettings;
        saveDraft?: boolean;
        id: string;
    }
    interface ProviderValue extends Pick<Props, 'enableMention' | 'enableHashtag'> {
        mention?: ReturnType<typeof useMention>;
        hashtag?: ReturnType<typeof useHashtag>;
        editorValue?: Descendant[];
        setEditorValue?: Dispatch<SetStateAction<Descendant[]>>;
        handleListsOnKeyDown?: (evt: KeyboardEvent<HTMLDivElement>) => void;
        undo?: () => void;
        redo?: () => void;
        editor?: RichTextEditorMakerNS.Editor;
        id?: string;
    }
}
export declare const EditorContext: React.Context<RichTextEditorMakerProviderNS.ProviderValue>;
export declare const RichTextEditorMakerProvider: FC<RichTextEditorMakerProviderNS.Props>;
