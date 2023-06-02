import { type FC, type ReactNode } from 'react';
import { type RenderElementProps } from 'slate-react';
export declare namespace FileElementNS {
    interface Props extends RenderElementProps {
        children: ReactNode;
    }
}
export declare const FileElement: FC<FileElementNS.Props>;
