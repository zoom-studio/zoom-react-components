import React, { FC, useState } from 'react'

import { ComponentMeta } from '@storybook/react'

import { SVGIcon, SVGIconNS, Input } from '..'
import './styles/_svg-icon.scss'

export default {
  title: 'SVGIcon',
  component: SVGIcon,
} as ComponentMeta<typeof SVGIcon>

export const _SVGIcon: FC<SVGIconNS.Props> = () => {
  const [query, setQuery] = useState('')

  return (
    <div className="svg-icon-story">
      <Input
        placeholder="Search for the icons..."
        autoFocus
        value={query}
        onInput={evt => setQuery(evt.currentTarget.value)}
        size="large"
        label="Query"
        labelColon={false}
      />

      <div className="icons">
        {SVGIconNS.SVGIconNames.map((name, index) =>
          name.toLowerCase().trim().includes(query.toLowerCase().trim()) ? (
            <span key={index} className="icon-container">
              <SVGIcon name={name} size={50} />
              <span className="name">{name}</span>
            </span>
          ) : (
            <></>
          ),
        )}
      </div>
    </div>
  )
}
