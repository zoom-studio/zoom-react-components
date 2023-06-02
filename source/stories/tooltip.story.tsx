import React, { type FC } from 'react'

import { type Meta } from '@storybook/react'

import { Text, Tooltip, type TooltipNS } from '..'
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
    children: (
      <div style={{ display: 'inline-block' }}>
        <Children />
      </div>
    ),
  },
} as Meta<typeof Tooltip>

export const Basic: FC = () => {
  const { t } = useI18n('tooltip')
  return (
    <CommonStory
      component={Tooltip}
      stories={[
        {
          group: [
            {
              props: {
                children: (
                  <div style={{ display: 'inline-block' }}>
                    <Children />
                  </div>
                ),
                title: t('title'),
              },
            },
          ],
        },
      ]}
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
            {
              name: '800ms (Default)',
              props: {
                children: (
                  <div style={{ display: 'inline-block' }}>
                    <Children />
                  </div>
                ),
                title: t('title'),
              },
            },
            {
              name: 'Immediate',
              props: {
                children: (
                  <div style={{ display: 'inline-block' }}>
                    <Children />
                  </div>
                ),
                title: t('title'),
                hoverDelay: 0,
              },
            },
            {
              name: 'Two seconds',
              props: {
                children: (
                  <div style={{ display: 'inline-block' }}>
                    <Children />
                  </div>
                ),
                title: t('title'),
                hoverDelay: 2000,
              },
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
      props={{
        children: (
          <div style={{ display: 'inline-block' }}>
            <Children />
          </div>
        ),
        title: t('title'),
        hoverDelay: 0,
      }}
    />
  )
}

export const Playground: FC<TooltipNS.Props> = props => (
  <StoryPlayground component={Tooltip} props={props} />
)
