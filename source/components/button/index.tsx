import React, { FC, HTMLAttributes, ReactNode } from 'react'

import { Link } from 'react-router-dom'
import { AccountBookFilled } from '@ant-design/icons'

import { useZoomComponent } from '../../hooks/use-zoom-component'
import { Spin, EmojiNS, Emoji } from '..'

export namespace ButtonNS {
  export type Types = 'primary' | 'secondary' | 'dashed' | 'link' | 'text'
  export type HtmlType = 'submit' | 'reset' | 'button'
  export type Size = 'small' | 'normal' | 'large'
  export type HtmlTypes = '_self' | '_blank' | '_parent' | '_top'
  export type Variants = 'inherit' | 'success' | 'info' | 'warning' | 'error'
  export type Icon = typeof AccountBookFilled | EmojiNS.Emojis.Names

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
    prefixIcon?: Icon
    suffixIcon?: Icon
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
  prefixIcon,
  suffixIcon,
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
    Icon?: ButtonNS.Icon,
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
          (type === 'suffix' && !!prefixIcon) ||
          (type === 'prefix' && !!suffixIcon),
      },
    )
    if (typeof Icon === 'string') {
      return <Emoji name={Icon} className={classNames} />
    }
    return <Icon className={classNames} />
  }

  const createChildren = (): ReactNode => {
    const child = (
      <>
        {createIcon('suffix', suffixIcon)}
        {children}
        {createIcon('prefix', prefixIcon)}
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
