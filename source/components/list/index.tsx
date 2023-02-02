import React, { ReactNode } from 'react'

import { BaseComponent } from '../../types'
import { useZoomComponent } from '../../hooks'

import {
  AvatarNS,
  ImageNS,
  BadgeNS,
  ButtonGroupNS,
  ButtonNS,
  CheckboxNS,
  RadioButtonNS,
  SwitchNS,
} from '..'

export namespace ListNS {
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
    'name' | 'disabled' | 'loading' | 'label' | 'state' | 'onWrite'
  >

  export type DataSwitch = Pick<
    SwitchNS.Props,
    'disabled' | 'loading' | 'label' | 'state' | 'onWrite'
  >

  export interface ListData<ContentType extends unknown[] = unknown[]> {
    avatars?: AvatarNS.Props['avatars'][0]
    content?: ContentType[0]
    title?: string
    description?: string
    image?: string
    badge?: DataBadge
    actions?: ButtonNS.Props[]
    checkbox?: DataCheckbox
    radioButton?: DataRadioButton
    switch?: DataSwitch
  }

  export interface ChildrenCallbackParams<ContentType extends unknown[] = unknown[]> {
    content: ContentType[0]
    index: number
  }

  export interface Props<ContentType extends unknown[] = unknown[]>
    extends Omit<BaseComponent<HTMLUListElement>, 'children'> {
    dataset: ListData<ContentType>[]
    children: ReactNode | ((params: ChildrenCallbackParams) => ReactNode)
    imageProps?: ImageProps
    avatarProps?: AvatarProps
    badgeProps?: BadgeProps
    actionsProps?: ButtonProps
  }
}

export function List<ContentType extends unknown[] = unknown[]>({
  dataset,
  className,
  containerProps,
  children,
  reference,
}: ListNS.Props<ContentType>): JSX.Element {
  const { createClassName } = useZoomComponent('list')

  const classes = createClassName(className)

  return (
    <ul {...containerProps} className={classes} ref={reference}>
      {dataset?.map((data, index) => (
        <li key={index}>{typeof children === 'function' ? <>content</> : children}</li>
      ))}
    </ul>
  )
}
