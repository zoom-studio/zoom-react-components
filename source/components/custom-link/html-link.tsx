import React, { FC, HTMLAttributes } from 'react'

export namespace HTMLLinkNS {
  export interface Props extends HTMLAttributes<HTMLAnchorElement> {
    href?: string
  }
}

export const HTMLLink: FC<HTMLLinkNS.Props> = props => <a {...props} />
