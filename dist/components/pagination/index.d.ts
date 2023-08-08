import React from 'react';
import { type BaseComponent } from '../../types';
export declare namespace PaginationNS {
    interface PagesResult {
        start: number[];
        middle: number[];
        end: number[];
    }
    interface Props extends Omit<BaseComponent, 'children'> {
        totalPages: number;
        defaultPage?: number;
        showCustomPageInput?: boolean;
        linkify?: (page: number) => string;
        onWrite?: (page: number) => void;
        disabledPage?: (page: number) => boolean;
        disabled?: boolean;
    }
}
export declare const Pagination: React.ForwardRefExoticComponent<PaginationNS.Props & React.RefAttributes<HTMLDivElement>>;
