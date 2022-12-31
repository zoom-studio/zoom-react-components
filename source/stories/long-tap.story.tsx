import React, { FC, useState } from 'react'

import { ComponentMeta } from '@storybook/react'

import { Button, LongTap, LongTapNS } from '..'
import { BannerStory } from './components'
import { useI18n } from './hooks/use-i18n'

export default {
  title: 'Call To Action/Long tap',
  component: LongTap,
  args: {
    // eslint-disable-next-line no-console
    callback: () => console.log('long tap'),
    style: { display: 'initial' },
    timeout: 2000,
  },
} as ComponentMeta<typeof LongTap>

export const Playground: FC<LongTapNS.Props> = props => {
  const { t } = useI18n('longTap')
  return (
    <LongTap {...props}>
      <Button>{t('buttonTitle')}</Button>
    </LongTap>
  )
}

export const WithCallback: FC = () => {
  const { t } = useI18n('longTap')
  const [number, setNumber] = useState(0)
  const handleLongTapCallback = () => setNumber(number => number + 1)
  return (
    <LongTap callback={handleLongTapCallback} timeout={2000}>
      <BannerStory title={t('title')} description={number} emoji="thumbs up" />
    </LongTap>
  )
}
