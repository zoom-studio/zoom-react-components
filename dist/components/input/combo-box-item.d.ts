import React, { type HTMLAttributes } from 'react';
export declare namespace ComboBoxItemNS {
    interface Props extends HTMLAttributes<HTMLDivElement> {
        active: boolean;
        item: string;
    }
}
export declare const ComboBoxItem: React.ForwardRefExoticComponent<ComboBoxItemNS.Props & React.RefAttributes<HTMLDivElement>>;
