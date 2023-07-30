import React from 'react';
import { type Descendant } from 'slate';
import { type BaseComponent } from '../../types';
export declare namespace RichTextViewerNS {
    interface Props extends Omit<BaseComponent, 'children' | 'id'> {
        id: string;
        parentId?: string;
        value: Descendant[];
    }
}
export declare const RichTextViewer: React.ForwardRefExoticComponent<RichTextViewerNS.Props & React.RefAttributes<HTMLDivElement>>;
