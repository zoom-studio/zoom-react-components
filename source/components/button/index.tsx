import React, { FC, HTMLAttributes, ReactNode } from 'react'

import { Link } from 'react-router-dom'

import { useZoomComponent } from '../../hooks'
import { Spin, EmojiNS, Emoji, IconNS, Icon } from '..'

export namespace ButtonNS {
  export type Types = 'primary' | 'secondary' | 'dashed' | 'link' | 'text'
  export type HtmlType = 'submit' | 'reset' | 'button'
  export type Size = 'small' | 'normal' | 'large'
  export type HtmlTypes = '_self' | '_blank' | '_parent' | '_top'
  export type Variants = 'inherit' | 'success' | 'info' | 'warning' | 'error'
  export type MaterialIcon = IconNS.Names
  export type EmojiIcon = EmojiNS.Emojis.Names

  export interface Props
    extends Omit<HTMLAttributes<HTMLButtonElement>, 'type'> {
    type?: Types
    htmlType?: HtmlType
    size?: Size
    href?: string
    target?: HtmlTypes
    innerClassName?: string
    suffixClassName?: string
    prefixClassName?: string
    disabled?: boolean
    loading?: boolean
    full?: boolean
    active?: boolean
    variant?: Variants
    prefixMaterialIcon?: MaterialIcon
    prefixEmojiIcon?: EmojiIcon
    suffixMaterialIcon?: MaterialIcon
    suffixEmojiIcon?: EmojiIcon
  }
}

export const Button: FC<ButtonNS.Props> = ({
  type = 'primary',
  htmlType = 'button',
  size = 'normal',
  target = '_self',
  full = false,
  disabled = false,
  loading = false,
  active = false,
  variant = 'inherit',
  children,
  className,
  href,
  innerClassName,
  suffixClassName,
  prefixClassName,
  prefixEmojiIcon,
  prefixMaterialIcon,
  suffixEmojiIcon,
  suffixMaterialIcon,
  ...rest
}) => {
  const { createClassName } = useZoomComponent('button')

  const classNames = createClassName(className, `${type}-${variant}`, {
    [`${createClassName(undefined, size)}`]: true,
    [`${createClassName(undefined, 'full')}`]: full,
    active,
  })

  const innerChildClassnames = createClassName(
    innerClassName,
    `${size}-inner-child`,
  )

  const createIcon = (
    type: 'suffix' | 'prefix',
    materialIcon?: ButtonNS.MaterialIcon,
    emojiIcon?: ButtonNS.EmojiIcon,
  ): ReactNode => {
    if (!Icon) {
      return null
    }
    const classNames = createClassName(
      type === 'suffix' ? suffixClassName : prefixClassName,
      type,
      {
        [`${createClassName(undefined, 'icon-with-margin')}`]:
          !!children ||
          (type === 'suffix' && (!!prefixMaterialIcon || !!prefixEmojiIcon)) ||
          (type === 'prefix' && (!!suffixMaterialIcon || !!suffixEmojiIcon)),
      },
    )
    if (materialIcon) {
      return <Icon name={materialIcon} className={classNames} />
    } else if (emojiIcon) {
      return <Emoji name={emojiIcon} className={classNames} />
    } else {
      return <></>
    }
  }

  const createChildren = (): ReactNode => {
    const child = (
      <>
        {createIcon('suffix', suffixMaterialIcon, suffixEmojiIcon)}
        {children}
        {createIcon('prefix', prefixMaterialIcon, prefixEmojiIcon)}
      </>
    )

    return loading ? <Spin size={size}>{child}</Spin> : child
  }

  return (
    <button
      {...rest}
      type={htmlType}
      className={classNames}
      disabled={disabled || loading}
    >
      {href ? (
        <Link to={href} target={target} className={innerChildClassnames}>
          {createChildren()}
        </Link>
      ) : (
        <span className={innerChildClassnames}>{createChildren()}</span>
      )}
    </button>
  )
}
