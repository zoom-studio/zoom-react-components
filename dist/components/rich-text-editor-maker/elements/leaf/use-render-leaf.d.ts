/// <reference types="react" />
import { RenderLeafProps } from 'slate-react';
import { RichTextEditorMakerNS } from '../../types';
export declare namespace UseRenderLeafNS {
    interface Params extends Pick<RichTextEditorMakerNS.Props, 'renderLinkElement'> {
        handlers: RichTextEditorMakerNS.ChildrenCallback;
    }
}
export declare const useRenderLeaf: (params: UseRenderLeafNS.Params) => (props: RenderLeafProps) => JSX.Element;
