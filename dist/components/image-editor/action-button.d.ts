import { type FC } from 'react';
import { type IconNS } from '..';
export declare namespace EditorActionButtonNS {
    interface Props {
        icon: IconNS.Names;
        title: string;
        isActive?: boolean;
        onClick: () => void;
        className?: string;
        disabled?: boolean;
    }
}
export declare const EditorActionButton: FC<EditorActionButtonNS.Props>;
