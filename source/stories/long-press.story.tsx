import React, { type FC, useState } from 'react'

import { type Meta } from '@storybook/react'

import { Button, LongPress, type LongPressNS } from '..'
import { BannerStory } from './components'
import { useI18n } from './hooks/use-i18n'

export default {
  title: 'Call To Action/Long press',
  component: LongPress,
  args: {
    callback: () => {
      // eslint-disable-next-line no-console
      console.log('long press')
    },
    style: { display: 'initial' },
  },
} as Meta<typeof LongPress>

export const WithCallback: FC = () => {
  const { t } = useI18n('longPress')
  const [number, setNumber] = useState(0)
  const handleLongPressCallback = () => {
    setNumber(number => number + 1)
  }
  return (
    <LongPress callback={handleLongPressCallback}>
      <BannerStory title={t('title')} description={number} emoji="thumbs up" />
    </LongPress>
  )
}

export const Playground: FC<LongPressNS.Props> = props => {
  const { t } = useI18n('longPress')
  return (
    <LongPress {...props}>
      <Button>{t('buttonTitle')}</Button>
    </LongPress>
  )
}
