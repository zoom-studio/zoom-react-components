import React, { FC } from 'react'

import { ComponentMeta } from '@storybook/react'

import { Text, Tooltip, TooltipNS } from '..'
import { color } from '../utils'
import { CommonStory, PlacementsStory, StoryPlayground } from './components'
import { useI18n } from './hooks/use-i18n'

const Children: FC = () => {
  const { t } = useI18n('tooltip')
  return <Text style={{ color: color({ source: 'text' }), margin: 0 }}>{t('children')}</Text>
}

export default {
  title: 'Data Display/Tooltip',
  component: Tooltip,
  args: {
    title: 'Some example of tooltip',
    children: <Children />,
  },
} as ComponentMeta<typeof Tooltip>

export const Basic: FC = () => {
  const { t } = useI18n('tooltip')
  return (
    <CommonStory
      component={Tooltip}
      stories={[{ group: [{ props: { children: <Children />, title: t('title') } }] }]}
    />
  )
}

export const CustomDelay: FC = () => {
  const { t } = useI18n('tooltip')
  return (
    <CommonStory
      component={Tooltip}
      stories={[
        {
          group: [
            { name: '800ms (Default)', props: { children: <Children />, title: t('title') } },
            {
              name: 'Immediate',
              props: { children: <Children />, title: t('title'), hoverDelay: 0 },
            },
            {
              name: 'Two seconds',
              props: { children: <Children />, title: t('title'), hoverDelay: 2000 },
            },
          ],
        },
      ]}
    />
  )
}

export const Placements: FC = () => {
  const { t } = useI18n('tooltip')
  return (
    <PlacementsStory
      component={Tooltip}
      props={{ children: <Children />, title: t('title'), hoverDelay: 0 }}
    />
  )
}

export const Playground: FC<TooltipNS.Props> = props => (
  <StoryPlayground component={Tooltip} props={props} />
)
