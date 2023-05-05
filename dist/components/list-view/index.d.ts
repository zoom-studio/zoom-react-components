import { MouseEvent, ReactNode, RefObject } from 'react';
import { BaseComponent } from '../../types';
import { AvatarNS, BadgeNS, ButtonGroupNS, ButtonNS, CheckboxNS, ContextMenuNS, EmojiNS, IconNS, ImageNS, InfiniteScrollViewNS, RadioButtonNS, ScrollViewNS, SwitchNS } from '..';
import { CustomLinkNS } from '../custom-link';
export declare namespace ListViewNS {
    type ImageProps = Pick<ImageNS.Props, 'lazy' | 'withImageViewer' | 'imageViewerOpenerIconSize' | 'imageViewerCustomImages' | 'shape' | 'imageViewerProps' | 'erroredStateIconFontSize'>;
    type AvatarProps = Pick<AvatarNS.Props, 'withImageViewer' | 'imageProps'>;
    type DataBadge = Pick<BadgeNS.Props, 'count' | 'emoji' | 'icon' | 'background' | 'color' | 'dot'>;
    type BadgeProps = Pick<BadgeNS.Props, 'direction' | 'showZero' | 'overflowCount' | 'offset'>;
    type ButtonProps = Pick<ButtonGroupNS.Props, 'buttonsProps' | 'direction'>;
    type DataCheckbox = Pick<CheckboxNS.Props, 'disabled' | 'loading' | 'label' | 'state' | 'onWrite'>;
    type DataRadioButton = Pick<RadioButtonNS.Props, 'name' | 'disabled' | 'loading' | 'label' | 'state' | 'onWrite' | 'value'>;
    type DataSwitch = Pick<SwitchNS.Props, 'disabled' | 'loading' | 'label' | 'state' | 'onWrite' | 'checked' | 'onChange'>;
    interface ListData<ContentType = unknown> {
        avatars?: AvatarNS.Props['avatars'][0];
        content?: ContentType;
        title?: string;
        description?: string;
        image?: string;
        badge?: DataBadge;
        actions?: ButtonNS.Props[];
        icon?: IconNS.Names;
        emoji?: EmojiNS.Emojis.Names;
        checkbox?: DataCheckbox;
        radioButton?: DataRadioButton;
        switcher?: DataSwitch;
        contextMenu?: Omit<ContextMenuNS.Props, 'children'>;
        link?: string;
        onClick?: (evt: MouseEvent<HTMLDivElement | HTMLAnchorElement>) => void;
    }
    interface ChildrenCallbackParams<ContentType = unknown> {
        content?: ContentType;
        index: number;
    }
    interface Props<ContentType = unknown> extends Omit<BaseComponent, 'children'> {
        dataset: ListData<ContentType>[];
        children?: ReactNode | ((params: ChildrenCallbackParams<ContentType>) => ReactNode);
        imageProps?: ImageProps;
        avatarProps?: AvatarProps;
        badgeHolderGutter?: number | string;
        badgeHolderGutterReversed?: boolean;
        badgeProps?: BadgeProps;
        actionsProps?: ButtonProps;
        reference?: RefObject<HTMLDivElement>;
        infiniteScroll?: Omit<InfiniteScrollViewNS.Props, 'children' | 'dataset' | 'maxHeight' | 'itemsContainerProps'>;
        scrollViewProps?: Omit<ScrollViewNS.Props, 'children' | 'maxHeight'>;
        maxHeight: ScrollViewNS.Props['maxHeight'];
        itemsContainerProps?: Omit<BaseComponent, 'children'>;
        itemsProps?: Omit<BaseComponent, 'children' | 'onClick'> & {
            reference?: RefObject<HTMLDivElement>;
        };
        linkComponent?: CustomLinkNS.Props['userLink'];
        hover?: boolean;
    }
}
export declare const ListView: <ContentType extends unknown = unknown>({ itemsContainerProps: providedItemsContainerProps, dataset, className, containerProps, reference, infiniteScroll, scrollViewProps, maxHeight, id, onClick, style, ...listViewItemProps }: ListViewNS.Props<ContentType>) => JSX.Element;
