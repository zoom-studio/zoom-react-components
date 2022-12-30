import React, { FC } from 'react'

import { ComponentMeta } from '@storybook/react'

import { Text as TextComponent, Title } from '../..'
// import './styles/_typography.scss'

export default {
  title: 'Typography',
  component: TextComponent,
} as ComponentMeta<typeof TextComponent>

export const Text: FC = (): JSX.Element => (
  <div className="typography-component-wrapper">
    <Title h2 className="header-title">
      Common
    </Title>
    <TextComponent common small>
      یه متن عادی با سایز کوچیک
    </TextComponent>
    <TextComponent common normal>
      یه متن عادی با سایز عادی
    </TextComponent>
    <TextComponent common large>
      یه متن عادی با سایز بزرگ
    </TextComponent>

    <Title h2 className="header-title">
      Bold
    </Title>
    <TextComponent bold small>
      یه متن بولد با سایز کوچیک
    </TextComponent>
    <TextComponent bold normal>
      یه متن بولد با سایز عادی
    </TextComponent>
    <TextComponent bold large>
      یه متن بولد با سایز بزرگ
    </TextComponent>

    <Title h3 className="header-title">
      Light
    </Title>
    <TextComponent light small>
      یه متن لایت با سایز کوچیک
    </TextComponent>
    <TextComponent light normal>
      یه متن لایت با سایز عادی
    </TextComponent>
    <TextComponent light large>
      یه متن لایت با سایز بزرگ
    </TextComponent>

    <Title h3 className="header-title">
      Underlined
    </Title>
    <TextComponent underlined small>
      یه متن زیرخط دار با سایز کوچیک
    </TextComponent>
    <TextComponent underlined normal>
      یه متن زیرخط دار با سایز عادی
    </TextComponent>
    <TextComponent underlined large>
      یه متن زیرخط دار با سایز بزرگ
    </TextComponent>

    <Title h3 className="header-title">
      Strikethrough
    </Title>
    <TextComponent strikethrough small>
      یه متن روخط دار با سایز کوچیک
    </TextComponent>
    <TextComponent strikethrough normal>
      یه متن روخط دار با سایز عادی
    </TextComponent>
    <TextComponent strikethrough large>
      یه متن روخط دار با سایز بزرگ
    </TextComponent>
  </div>
)
