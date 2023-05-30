import { type FC } from 'react';
import { type RichTextEditorMakerNS } from '../../../rich-text-editor-maker/types';
export declare namespace LinkElementNS {
    interface Props extends RichTextEditorMakerNS.RenderLinkInfoCallbackParams {
        openLinkPopover: () => void;
    }
}
export declare const LinkElement: FC<LinkElementNS.Props>;
