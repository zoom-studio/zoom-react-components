import React from 'react';
import { type TextareaNS } from '..';
import { type BaseComponent } from '../../types';
export declare namespace MentionNS {
    const ReservedKeys: readonly ["ArrowDown", "ArrowUp", "Enter"];
    type ReservedKeys = (typeof ReservedKeys)[number];
    interface User {
        name: string;
        username: string;
        avatar: string;
    }
    interface Props extends BaseComponent {
        users: User[];
        maxHeight?: string | number;
        usernameRegex?: RegExp;
        symbol?: string;
        closeUsersListOnBlur?: boolean;
        textareaProps?: TextareaNS.Props;
    }
}
export declare const Mention: React.ForwardRefExoticComponent<MentionNS.Props & React.RefAttributes<HTMLDivElement>>;
