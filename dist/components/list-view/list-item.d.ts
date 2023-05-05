/// <reference types="react" />
import { ListViewNS } from '.';
export declare namespace ListViewItemNS {
    interface Props<ContentType> extends ListViewNS.ListData<ContentType>, Pick<ListViewNS.Props<ContentType>, 'children' | 'imageProps' | 'avatarProps' | 'badgeProps' | 'actionsProps' | 'itemsProps' | 'linkComponent' | 'badgeHolderGutter' | 'hover' | 'badgeHolderGutterReversed'> {
        index: number;
    }
}
export declare const ListViewItem: <ContentType extends unknown = unknown>({ hover, badgeHolderGutter, badgeHolderGutterReversed, actions, avatars, badge, checkbox, content, description, image, radioButton, switcher, title, contextMenu, children, actionsProps, link, avatarProps, badgeProps, imageProps, linkComponent, index, itemsProps, onClick, emoji, icon, }: ListViewItemNS.Props<ContentType>) => JSX.Element;
