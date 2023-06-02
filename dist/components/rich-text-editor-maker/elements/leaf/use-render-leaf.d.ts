import React from 'react';
import { type RenderLeafProps } from 'slate-react';
import { type RichTextEditorMakerNS } from '../../types';
export declare namespace UseRenderLeafNS {
    interface Params extends Pick<RichTextEditorMakerNS.Props, 'renderLinkElement'> {
        handlers: RichTextEditorMakerNS.ChildrenCallback;
    }
}
export declare const useRenderLeaf: (params: UseRenderLeafNS.Params) => (props: RenderLeafProps) => React.JSX.Element;
