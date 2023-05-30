import { type FC, type ReactNode } from 'react';
import { type RichTextEditorMakerNS } from '../types';
export declare namespace LinkElementNS {
    interface Props extends RichTextEditorMakerNS.LinkInfo {
        children: ReactNode;
    }
}
export declare const LinkElement: FC<LinkElementNS.Props>;
