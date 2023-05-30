import React, { forwardRef, type ReactNode } from 'react'

import { Link } from 'react-router-dom'

import { Emoji, type EmojiNS, Icon, type IconNS, Spin } from '..'
import { useComponentSize, useZoomComponent } from '../../hooks'
import { type BaseComponent, type CommonSize, type CommonVariants } from '../../types'
import { ConditionalWrapper } from '../conditional-wrapper'

export namespace ButtonNS {
  export type HtmlType = 'submit' | 'reset' | 'button'
  export type HtmlTargets = '_self' | '_blank' | '_parent' | '_top'

  export const Types = ['primary', 'secondary', 'dashed', 'link', 'text', 'bordered'] as const
  export type Types = (typeof Types)[number]

  export const Shapes = ['default', 'circle', 'sharp', 'square', 'sharp-square', 'rounded'] as const
  export type Shapes = (typeof Shapes)[number]

  export type MaterialIcon = IconNS.Names
  export type EmojiIcon = EmojiNS.Emojis.Names

  export interface Props extends BaseComponent<HTMLButtonElement> {
    type?: Types
    htmlType?: HtmlType
    size?: CommonSize
    shape?: Shapes
    href?: string
    target?: HtmlTargets
    innerClassName?: string
    suffixClassName?: string
    prefixClassName?: string
    disabled?: boolean
    loading?: boolean
    full?: boolean
    active?: boolean
    disabledOnLoading?: boolean
    variant?: CommonVariants
    prefixMaterialIcon?: MaterialIcon
    prefixEmojiIcon?: EmojiIcon
    suffixMaterialIcon?: MaterialIcon
    suffixEmojiIcon?: EmojiIcon
    useSpan?: boolean
    showSpinOnLoading?: boolean
  }
}

export const Button = forwardRef<HTMLButtonElement, ButtonNS.Props>(
  (
    {
      size: providedSize,
      type = 'primary',
      htmlType = 'button',
      target = '_self',
      full = false,
      disabled = false,
      loading,
      active = false,
      disabledOnLoading = true,
      showSpinOnLoading = true,
      variant = 'neutral',
      shape = 'default',
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
      useSpan,
      containerProps,
      ...rest
    },
    reference,
  ) => {
    const { createClassName } = useZoomComponent('button')
    const size = useComponentSize(providedSize)
    const isDisabled = disabledOnLoading ? loading || disabled : disabled

    const classNames = createClassName(className, `${type}-${variant}`, {
      [`${createClassName()}`]: true,
      [`${createClassName(undefined, size)}`]: true,
      [`${createClassName(undefined, shape)}`]: true,
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

      return loading ? (
        showSpinOnLoading ? (
          <Spin size={size} color="unset">
            {child}
          </Spin>
        ) : (
          child
        )
      ) : (
        child
      )
    }

    return (
      <ConditionalWrapper
        condition={useSpan}
        trueWrapper={children => (
          <span
            {...rest}
            {...containerProps}
            className={classNames}
            aria-disabled={isDisabled}
            ref={reference}
          >
            {children}
          </span>
        )}
        falseWrapper={children => (
          <button
            {...rest}
            {...containerProps}
            type={htmlType}
            className={classNames}
            disabled={isDisabled}
            ref={reference}
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
  },
)
