import { FC } from 'react';
import { LinkProps } from 'react-router-dom';
import { HTMLLinkNS } from './html-link';
export declare namespace CustomLinkNS {
    interface Props extends Omit<LinkProps, 'to'>, HTMLLinkNS.Props {
        userLink?: FC<any> | 'htmlLink';
    }
}
export declare const CustomLink: FC<CustomLinkNS.Props>;
