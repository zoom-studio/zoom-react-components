import React, { FC } from 'react'

import { ComponentMeta } from '@storybook/react'

import { Icon, IconNS } from '../..'
// import './styles/_icons.scss'

export default {
  title: 'Icon',
  component: Icon,
} as ComponentMeta<typeof Icon>

export const _Icon: FC<IconNS.Props> = ({ name }) => {
  return (
    <div className="sb-icon-component">
      <a
        href="https://fonts.google.com/icons?icon.set=Material+Icons"
        target="_blank"
        rel="noreferrer"
      >
        Check me out to explore all icons
      </a>

      <Icon name={name ?? 'insert_emoticon'} />
    </div>
  )
}
