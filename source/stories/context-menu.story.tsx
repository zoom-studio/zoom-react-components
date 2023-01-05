import React, { FC } from 'react'

import { ComponentMeta } from '@storybook/react'

import { Button, ContextMenu, ContextMenuNS } from '..'
import { enMenuItems, faMenuItems } from '../fixtures'
import { BannerStory } from './components'
import { useI18n } from './hooks/use-i18n'
import { useSettings } from './hooks/use-settings'

export default {
  title: 'Menu/Context menu',
  component: ContextMenu,
  args: {
    items: enMenuItems,
  },
} as ComponentMeta<typeof ContextMenu>

export const ComplexMenu: FC = () => {
  const { language } = useSettings()
  const { t } = useI18n('contextMenu')
  return (
    <ContextMenu items={language === 'en' ? enMenuItems : faMenuItems}>
      <BannerStory title={t('title')} description={t('description')} />
    </ContextMenu>
  )
}

export const Playground: FC<ContextMenuNS.Props> = props => {
  const { t } = useI18n('contextMenu')
  return (
    <ContextMenu {...props}>
      <Button>{t('buttonTitle')}</Button>
    </ContextMenu>
  )
}
