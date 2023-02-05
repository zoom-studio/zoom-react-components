import React, { MouseEvent, ReactNode } from 'react'

import { useZoomComponent } from '../../hooks'
import { BaseComponent } from '../../types'

import {
  AvatarNS,
  BadgeNS,
  ButtonGroupNS,
  ButtonNS,
  CheckboxNS,
  ContextMenuNS,
  EmojiNS,
  IconNS,
  ImageNS,
  InfiniteScrollView,
  InfiniteScrollViewNS,
  RadioButtonNS,
  ScrollView,
  ScrollViewNS,
  SwitchNS,
} from '..'

import { ListViewItem } from './list-item'
import { CustomLinkNS } from '../custom-link'

export namespace ListViewNS {
  export type ImageProps = Pick<
    ImageNS.Props,
    | 'lazy'
    | 'withImageViewer'
    | 'imageViewerOpenerIconSize'
    | 'imageViewerCustomImages'
    | 'shape'
    | 'imageViewerProps'
    | 'erroredStateIconFontSize'
  >

  export type AvatarProps = Pick<AvatarNS.Props, 'withImageViewer' | 'imageProps'>

  export type DataBadge = Pick<
    BadgeNS.Props,
    'count' | 'emoji' | 'icon' | 'background' | 'color' | 'dot'
  >

  export type BadgeProps = Pick<
    BadgeNS.Props,
    'direction' | 'showZero' | 'overflowCount' | 'offset'
  >

  export type ButtonProps = Pick<ButtonGroupNS.Props, 'buttonsProps' | 'direction'>

  export type DataCheckbox = Pick<
    CheckboxNS.Props,
    'disabled' | 'loading' | 'label' | 'state' | 'onWrite'
  >

  export type DataRadioButton = Pick<
    RadioButtonNS.Props,
    'name' | 'disabled' | 'loading' | 'label' | 'state' | 'onWrite' | 'value'
  >

  export type DataSwitch = Pick<
    SwitchNS.Props,
    'disabled' | 'loading' | 'label' | 'state' | 'onWrite'
  >

  export interface ListData<ContentType = unknown> {
    avatars?: AvatarNS.Props['avatars'][0]
    content?: ContentType
    title?: string
    description?: string
    image?: string
    badge?: DataBadge
    actions?: ButtonNS.Props[]
    icon?: IconNS.Names
    emoji?: EmojiNS.Emojis.Names
    checkbox?: DataCheckbox
    radioButton?: DataRadioButton
    switcher?: DataSwitch
    contextMenu?: Omit<ContextMenuNS.Props, 'children'>
    link?: string
    onClick?: (evt: MouseEvent<HTMLDivElement | HTMLAnchorElement>) => void
  }

  export interface ChildrenCallbackParams<ContentType = unknown> {
    content?: ContentType
    index: number
  }

  export interface Props<ContentType = unknown> extends Omit<BaseComponent, 'children'> {
    dataset: ListData<ContentType>[]
    children?: ReactNode | ((params: ChildrenCallbackParams<ContentType>) => ReactNode)
    imageProps?: ImageProps
    avatarProps?: AvatarProps
    badgeHolderGutter?: number | string
    badgeHolderGutterReversed?: boolean
    badgeProps?: BadgeProps
    actionsProps?: ButtonProps
    infiniteScroll?: Omit<
      InfiniteScrollViewNS.Props,
      'children' | 'dataset' | 'maxHeight' | 'itemsContainerProps'
    >
    scrollViewProps?: Omit<ScrollViewNS.Props, 'children' | 'maxHeight'>
    maxHeight: ScrollViewNS.Props['maxHeight']
    itemsContainerProps?: Omit<BaseComponent, 'children'>
    itemsProps?: Omit<BaseComponent, 'children' | 'onClick'>
    linkComponent?: CustomLinkNS.Props['userLink']
    hover?: boolean
  }
}

export const ListView = <ContentType extends unknown = unknown>({
  itemsContainerProps: providedItemsContainerProps,
  dataset,
  className,
  containerProps,
  reference,
  infiniteScroll,
  scrollViewProps,
  maxHeight,
  id,
  onClick,
  style,
  ...listViewItemProps
}: ListViewNS.Props<ContentType>): JSX.Element => {
  const { createClassName } = useZoomComponent('list-view')

  const classes = createClassName(className)

  const itemsContainerProps: ListViewNS.Props<ContentType>['itemsContainerProps'] = {
    ...providedItemsContainerProps,
    className: createClassName(providedItemsContainerProps?.className, 'items'),
  }

  return (
    <div
      {...containerProps}
      className={classes}
      id={id}
      onClick={onClick}
      style={style}
      ref={reference}
    >
      {infiniteScroll ? (
        <InfiniteScrollView
          {...infiniteScroll}
          itemsContainerProps={itemsContainerProps}
          dataset={dataset}
          maxHeight={maxHeight}
        >
          {(data, { index }) => <ListViewItem {...listViewItemProps} {...data} index={index} />}
        </InfiniteScrollView>
      ) : (
        <ScrollView {...scrollViewProps} maxHeight={maxHeight}>
          <div {...itemsContainerProps}>
            {dataset.map((data, index) => (
              <ListViewItem {...listViewItemProps} {...data} index={index} key={index} />
            ))}
          </div>
        </ScrollView>
      )}
    </div>
  )
}
