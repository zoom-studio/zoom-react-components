import React, { FC, HTMLAttributes } from 'react'

import { classNames } from '@zoom-studio/zoom-js-ts-utils'

import { Range } from '../../types/enumerable'

export namespace TypographyNS {
  export namespace TextNS {
    export type Types =
      | 'common'
      | 'bold'
      | 'light'
      | 'underlined'
      | 'strikethrough'

    export type Sizes = 'small' | 'normal' | 'large'

    export interface Props extends HTMLAttributes<HTMLParagraphElement> {
      // types
      common?: boolean
      bold?: boolean
      light?: boolean
      underlined?: boolean
      strikethrough?: boolean
      // sizes
      small?: boolean
      normal?: boolean
      large?: boolean
    }
  }

  export namespace TitleNS {
    export type Sizes = Range<1, 7>

    export interface Props extends HTMLAttributes<HTMLHeadElement> {
      h1?: boolean
      h2?: boolean
      h3?: boolean
      h4?: boolean
      h5?: boolean
      h6?: boolean
    }
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

  const size: TypographyNS.TextNS.Sizes = small
    ? 'small'
    : normal
    ? 'normal'
    : large
    ? 'large'
    : 'normal'

  const classes = classNames(`zoomrc-text-${type}-${size}`, {
    [className ?? '']: true,
  })

  return (
    <p {...rest} className={classes}>
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
  ...rest
}) => {
  const size: TypographyNS.TitleNS.Sizes = h1
    ? 1
    : h2
    ? 2
    : h3
    ? 3
    : h4
    ? 4
    : h5
    ? 5
    : h6
    ? 6
    : 4

  const classes = classNames(`zoomrc-title-${size}`, {
    [className ?? '']: true,
  })

  switch (size) {
    case 1: {
      return (
        <h1 {...rest} className={classes}>
          {children}
        </h1>
      )
    }
    case 2: {
      return (
        <h2 {...rest} className={classes}>
          {children}
        </h2>
      )
    }
    case 3: {
      return (
        <h3 {...rest} className={classes}>
          {children}
        </h3>
      )
    }
    case 4: {
      return (
        <h4 {...rest} className={classes}>
          {children}
        </h4>
      )
    }
    case 5: {
      return (
        <h5 {...rest} className={classes}>
          {children}
        </h5>
      )
    }
    case 6: {
      return (
        <h6 {...rest} className={classes}>
          {children}
        </h6>
      )
    }
  }
}
