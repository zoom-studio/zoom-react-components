import { FC, ReactNode } from 'react';
import { Descendant } from 'slate';
import { RichTextEditorMakerNS } from './types';
export declare namespace RichTextEditorMakerProviderNS {
    interface ChildrenCallbackParams {
        providerEditor: RichTextEditorMakerNS.Editor;
    }
    interface Props {
        defaultValue?: Descendant[];
        children: (params: ChildrenCallbackParams) => ReactNode;
    }
}
export declare const RichTextEditorMakerProvider: FC<RichTextEditorMakerProviderNS.Props>;
