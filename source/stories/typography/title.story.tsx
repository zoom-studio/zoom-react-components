import React, { FC } from 'react'

import { ComponentMeta } from '@storybook/react'

import { Title as TitleComponent } from '../../components'
// import './styles/_typography.scss'

export default {
  title: 'Typography',
  component: TitleComponent,
} as ComponentMeta<typeof TitleComponent>

export const Title: FC = () => (
  <div className="typography-component-wrapper">
    <TitleComponent h1>1. یه متن انتخاب شده بعنوان تایتل از نوع اول</TitleComponent>

    <TitleComponent h2>2. یه متن انتخاب شده بعنوان تایتل از نوع دوم</TitleComponent>

    <TitleComponent h3>3. یه متن انتخاب شده بعنوان تایتل از نوع سوم</TitleComponent>

    <TitleComponent h4>4. یه متن انتخاب شده بعنوان تایتل از نوع چهارم</TitleComponent>

    <TitleComponent h5>5. یه متن انتخاب شده بعنوان تایتل از نوع پنجم</TitleComponent>

    <TitleComponent h6>6. یه متن انتخاب شده بعنوان تایتل از نوع ششم</TitleComponent>
  </div>
)
