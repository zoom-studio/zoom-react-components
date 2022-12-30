import React, { FC } from 'react'

import { ComponentMeta } from '@storybook/react'

import { Button as ButtonComponent, Title, ButtonNS } from '../../components'
// import './styles/_button.scss'
import { useTranslation } from 'react-i18next'

export default {
  title: 'Button',
  component: ButtonComponent,
  args: {
    disabled: false,
    loading: false,
    full: false,
    active: false,
    type: 'primary',
    variant: 'inherit',
    size: 'normal',
    htmlType: 'button',
    target: '_blank',
    innerClassName: 'class-for-inner-child',
  },
} as ComponentMeta<typeof ButtonComponent>

interface ButtonGroups {
  title: string
  groups: Array<{
    title: string
    size: ButtonNS.Size
    disabled?: boolean
    loading?: boolean
    variant?: ButtonNS.Variants
    suffixMaterial?: ButtonNS.MaterialIcon
    suffixEmoji?: ButtonNS.EmojiIcon
    prefixMaterial?: ButtonNS.MaterialIcon
    prefixEmoji?: ButtonNS.EmojiIcon
  }>
}

export const Button: FC<ButtonNS.Props> = props => {
  const { t } = useTranslation()

  const buttons: ButtonNS.Props[] = [
    { type: 'primary', children: 'دکمه پرایمری' },
    { type: 'secondary', children: 'دکمه سکندری' },
    { type: 'dashed', children: 'دکمه دشد' },
    {
      type: 'link',
      children: 'دکمه لینک',
      href: '/?path=/story/button--button',
    },
    { type: 'text', children: 'دکمه تکست' },
  ]

  const buttonGroups: ButtonGroups[] = [
    {
      title: 'Common',
      groups: [
        { title: 'Small', size: 'small' },
        { title: 'Normal', size: 'normal' },
        { title: 'Large', size: 'large' },
      ],
    },
    {
      title: 'Disabled',
      groups: [
        { title: 'Small', size: 'small', disabled: true },
        { title: 'Normal', size: 'normal', disabled: true },
        { title: 'Large', size: 'large', disabled: true },
      ],
    },
    {
      title: 'Loading',
      groups: [
        { title: 'Small', size: 'small', loading: true },
        { title: 'Normal', size: 'normal', loading: true },
        { title: 'Large', size: 'large', loading: true },
      ],
    },
    {
      title: 'With variants',
      groups: [
        { title: 'Inherit (Default)', size: 'normal', variant: 'inherit' },
        { title: 'Success', size: 'normal', variant: 'success' },
        { title: 'Info', size: 'normal', variant: 'info' },
        { title: 'Warning', size: 'normal', variant: 'warning' },
        { title: 'Error', size: 'normal', variant: 'error' },
      ],
    },
    {
      title: 'With icon',
      groups: [
        {
          title: 'Icon on prefix',
          size: 'normal',
          prefixMaterial: 'favorite_border',
        },
        {
          title: 'Emoji on prefix',
          size: 'normal',
          prefixEmoji: 'mechanical arm',
        },
        {
          title: 'Icon on suffix',
          size: 'normal',
          suffixMaterial: 'account_balance_wallet',
        },
        { title: 'Emoji on suffix', size: 'normal', suffixEmoji: 'balloon' },
      ],
    },
  ]

  return (
    <>
      <div className="buttons-story-container">
        <Title h1>{t('button.title')}</Title>
        <div>
          <ButtonComponent {...props}>دکمه آزمایشی</ButtonComponent>
        </div>
      </div>

      {buttonGroups.map(({ groups, title }, index) => (
        <div className="buttons-story-container" key={index}>
          <Title h1>{title}</Title>
          {groups.map((group, index) => (
            <div key={index}>
              <Title>{group.title}</Title>
              {buttons.map((button, index) => (
                <ButtonComponent
                  {...button}
                  key={index}
                  size={group.size}
                  disabled={group.disabled}
                  loading={group.loading}
                  variant={group.variant}
                  suffixMaterialIcon={group.suffixMaterial}
                  suffixEmojiIcon={group.suffixEmoji}
                  prefixMaterialIcon={group.prefixMaterial}
                  prefixEmojiIcon={group.prefixEmoji}
                />
              ))}
            </div>
          ))}
        </div>
      ))}
    </>
  )
}
