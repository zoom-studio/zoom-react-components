import React, { FC } from 'react'

import { Link as RouterLink, LinkProps } from 'react-router-dom'

import { HTMLLink, HTMLLinkNS } from './html-link'

export namespace CustomLinkNS {
  export interface Props extends Omit<LinkProps, 'to'>, HTMLLinkNS.Props {
    UserLink?: FC<any> | 'htmlLink'
  }
}

export const CustomLink: FC<CustomLinkNS.Props> = ({
  UserLink,
  children,
  href,
  ...rest
}) => {
  if (!UserLink) {
    return (
      <RouterLink to={href || '/'} {...rest}>
        {children}
      </RouterLink>
    )
  }

  const Link = UserLink === 'htmlLink' ? HTMLLink : UserLink

  return (
    <Link href={href} {...rest}>
      {children}
    </Link>
  )
}
