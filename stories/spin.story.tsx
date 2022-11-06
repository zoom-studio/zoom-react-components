import React, { FC } from 'react'

import { ComponentMeta } from '@storybook/react'

import { Spin as SpinComponent, SpinNS } from '../source/components'
import './styles/_spin.scss'

export default {
  title: 'Spin',
  component: SpinComponent,
  args: {
    speed: '0.5s',
    size: 'normal',
    tip: 'اسپین آزمایشی...',
  },
} as ComponentMeta<typeof SpinComponent>

export const Spin: FC<SpinNS.Props> = props => (
  <>
    <div className="storybook-spin-component-container">
      <SpinComponent {...props} />
    </div>

    <div className="storybook-spin-component-container">
      <SpinComponent size="small" />
      <SpinComponent size="normal" />
      <SpinComponent size="large" />
    </div>

    <div className="storybook-spin-component-container with-tip">
      <SpinComponent size="small" tip="در حال دریافت اطلاعات..." />
      <SpinComponent size="normal" tip="در حال دریافت اطلاعات..." />
      <SpinComponent size="large" tip="در حال دریافت اطلاعات..." />
    </div>
  </>
)
