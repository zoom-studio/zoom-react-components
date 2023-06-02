import { type FC, type HTMLAttributes } from 'react';
export declare namespace HTMLLinkNS {
    interface Props extends HTMLAttributes<HTMLAnchorElement> {
        href?: string;
    }
}
export declare const HTMLLink: FC<HTMLLinkNS.Props>;
