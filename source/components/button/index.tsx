import React, { FC, HTMLAttributes, ReactNode, RefObject } from 'react'

import { Link } from 'react-router-dom'

import { useZoomComponent, useComponentSize } from '../../hooks'
import { Spin, EmojiNS, Emoji, IconNS, Icon } from '..'
import { ConditionalWrapper } from '../conditional-wrapper'
import { CommonSize, CommonVariants } from '../../types'

export namespace ButtonNS {
  export type HtmlType = 'submit' | 'reset' | 'button'
  export type HtmlTypes = '_self' | '_blank' | '_parent' | '_top'

  export const Types = ['primary', 'secondary', 'dashed', 'link', 'text'] as const
  export type Types = typeof Types[number]

  export type MaterialIcon = IconNS.Names
  export type EmojiIcon = EmojiNS.Emojis.Names

  export interface Props extends Omit<HTMLAttributes<HTMLButtonElement>, 'type'> {
    type?: Types
    htmlType?: HtmlType
    size?: CommonSize
    containerRef?: RefObject<HTMLButtonElement>
    href?: string
    target?: HtmlTypes
    innerClassName?: string
    suffixClassName?: string
    prefixClassName?: string
    disabled?: boolean
    loading?: boolean
    full?: boolean
    active?: boolean
    variant?: CommonVariants
    prefixMaterialIcon?: MaterialIcon
    prefixEmojiIcon?: EmojiIcon
    suffixMaterialIcon?: MaterialIcon
    suffixEmojiIcon?: EmojiIcon
    useSpan?: boolean
  }
}

export const Button: FC<ButtonNS.Props> = ({
  size: providedSize,
  type = 'primary',
  htmlType = 'button',
  target = '_self',
  full = false,
  disabled = false,
  loading = false,
  active = false,
  variant = 'neutral',
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
  containerRef,
  useSpan,
  ...rest
}) => {
  const { createClassName } = useZoomComponent('button')
  const size = useComponentSize(providedSize)

  const classNames = createClassName(className, `${type}-${variant}`, {
    [`${createClassName(undefined, size)}`]: true,
    [`${createClassName(undefined, 'full')}`]: full,
    active,
  })

  const innerChildClassnames = createClassName(
    innerClassName,
    `${size}-inner-child zoomrc-button-inner-child`,
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
    <ConditionalWrapper
      condition={useSpan}
      trueWrapper={children => (
        <span
          {...rest}
          className={classNames}
          aria-disabled={disabled || loading}
          ref={containerRef}
        >
          {children}
        </span>
      )}
      falseWrapper={children => (
        <button
          {...rest}
          type={htmlType}
          className={classNames}
          disabled={disabled || loading}
          ref={containerRef}
        >
          {children}
        </button>
      )}
    >
      {href ? (
        <Link to={href} target={target} className={innerChildClassnames}>
          {createChildren()}
        </Link>
      ) : (
        <span className={innerChildClassnames}>{createChildren()}</span>
      )}
    </ConditionalWrapper>
  )
}
