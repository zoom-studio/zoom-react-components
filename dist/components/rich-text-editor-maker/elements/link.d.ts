import { FC, ReactNode } from 'react';
import { RichTextEditorMakerNS } from '../types';
export declare namespace LinkElementNS {
    interface Props extends RichTextEditorMakerNS.LinkInfo {
        children: ReactNode;
    }
}
export declare const LinkElement: FC<LinkElementNS.Props>;
