import React, { ClassAttributes, FC, HTMLAttributes } from 'react'

import { classNames } from '@zoom-studio/zoom-js-ts-utils'

import { BaseComponent, CommonSize, Range } from '../../types'

export namespace TypographyNS {
  export namespace TextNS {
    export const Types = ['common', 'bold', 'light', 'underlined', 'strikethrough'] as const
    export type Types = typeof Types[number]

    export interface TypeProps {
      common?: boolean
      bold?: boolean
      light?: boolean
      underlined?: boolean
      strikethrough?: boolean
    }

    export interface SizeProps {
      small?: boolean
      normal?: boolean
      large?: boolean
    }

    export interface Props extends BaseComponent<HTMLParagraphElement>, TypeProps, SizeProps {}
  }

  export namespace TitleNS {
    export type Sizes = Range<1, 7>

    export interface HeadingProps {
      h1?: boolean
      h2?: boolean
      h3?: boolean
      h4?: boolean
      h5?: boolean
      h6?: boolean
    }

    export interface Props extends BaseComponent<HTMLHeadingElement>, HeadingProps {}
  }
}

export const Text: FC<TypographyNS.TextNS.Props> = ({
  common,
  bold,
  light,
  underlined,
  strikethrough,
  small,
  normal,
  large,
  className,
  children,
  containerProps,
  reference,
  ...rest
}) => {
  const type: TypographyNS.TextNS.Types = common
    ? 'common'
    : bold
    ? 'bold'
    : light
    ? 'light'
    : underlined
    ? 'underlined'
    : strikethrough
    ? 'strikethrough'
    : 'common'

  const size: CommonSize = small ? 'small' : normal ? 'normal' : large ? 'large' : 'normal'

  const classes = classNames(`zoomrc-text-${type}-${size} zoomrc-typography`, {
    [className ?? '']: true,
  })

  return (
    <p {...rest} {...containerProps} ref={reference} className={classes}>
      {children}
    </p>
  )
}

export const Title: FC<TypographyNS.TitleNS.Props> = ({
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  className,
  children,
  containerProps,
  reference,
  ...rest
}) => {
  const size: TypographyNS.TitleNS.Sizes = h1 ? 1 : h2 ? 2 : h3 ? 3 : h4 ? 4 : h5 ? 5 : h6 ? 6 : 4

  const classes = classNames(`zoomrc-title-${size} zoomrc-typography`, {
    [className ?? '']: true,
  })

  const props: HTMLAttributes<HTMLHeadingElement> | ClassAttributes<HTMLHeadingElement> = {
    ...rest,
    ...containerProps,
    ref: reference,
    className: classes,
  }

  switch (size) {
    case 1:
      return <h1 {...props} children={children} />
    case 2:
      return <h2 {...props} children={children} />
    case 3:
      return <h3 {...props} children={children} />
    case 4:
      return <h4 {...props} children={children} />
    case 5:
      return <h5 {...props} children={children} />
    case 6:
      return <h6 {...props} children={children} />
  }
}
