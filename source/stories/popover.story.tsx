import React, { type FC } from 'react'

import { type Meta } from '@storybook/react'

import { Button, Emoji, Popover, type PopoverNS } from '..'
import { lorem } from '../fixtures'
import { CommonStory, PlacementsStory, StoryPlayground } from './components'
import { useI18n } from './hooks/use-i18n'

const CustomContent: FC = () => (
  <div style={{ width: '100%', display: 'flex', justifyContent: 'space-around' }}>
    <Emoji name="grinning face with smiling eyes" style={{ width: 30 }} />
    <Emoji name="beaming face with smiling eyes" style={{ width: 30 }} />
    <Emoji name="face with tears of joy" style={{ width: 30 }} />
    <Emoji name="rolling on the floor laughing" style={{ width: 30 }} />
  </div>
)

export default {
  title: 'Data Display/Popover',
  component: Popover,
  args: {
    title: 'Some title for the popover component',
    description: lorem(2),
    children: <Button>Trigger popover by me</Button>,
    trigger: 'click',
    content: <CustomContent />,
    placement: 'top-end',
    defaultIsOpen: true,
  },
} as Meta<typeof Popover>

export const Placements: FC = () => {
  const { t } = useI18n('popover')
  return (
    <PlacementsStory
      component={Popover}
      props={{ content: <CustomContent />, title: t('title'), description: t('description') }}
    />
  )
}

export const Triggers: FC = () => {
  const { t } = useI18n('global')
  return (
    <CommonStory
      component={Popover}
      stories={[
        {
          title: 'Click',
          custom: (
            <Popover trigger="click" content={<CustomContent />} title={t('triggers.click')}>
              <Button>{t('triggers.click')}</Button>
            </Popover>
          ),
        },
        {
          title: 'Hover',
          custom: (
            <Popover trigger="hover" content={<CustomContent />} title={t('triggers.hover')}>
              <Button>{t('triggers.hover')}</Button>
            </Popover>
          ),
        },
        {
          title: 'Focus',
          custom: (
            <Popover trigger="focus" content={<CustomContent />} title={t('triggers.focus')}>
              <Button>{t('triggers.focus')}</Button>
            </Popover>
          ),
        },
      ]}
    />
  )
}

export const AutoClose: FC = () => {
  const { t } = useI18n('global')
  return (
    <CommonStory
      component={Popover}
      stories={[
        {
          title: 'Click',
          custom: (
            <Popover
              trigger="click"
              content={<CustomContent />}
              title={t('triggers.click')}
              autoCloseDelay={1000}
            >
              <Button>{t('triggers.click')}</Button>
            </Popover>
          ),
        },
        {
          title: 'Hover',
          custom: (
            <Popover
              trigger="hover"
              content={<CustomContent />}
              title={t('triggers.hover')}
              autoCloseDelay={1000}
            >
              <Button>{t('triggers.hover')}</Button>
            </Popover>
          ),
        },
        {
          title: 'Focus',
          custom: (
            <Popover
              trigger="focus"
              content={<CustomContent />}
              title={t('triggers.focus')}
              autoCloseDelay={1000}
            >
              <Button>{t('triggers.focus')}</Button>
            </Popover>
          ),
        },
      ]}
    />
  )
}

export const Loading: FC = () => {
  const { t } = useI18n('global')
  return (
    <CommonStory
      component={Popover}
      stories={[
        {
          title: 'With some message',
          custom: (
            <Popover loading spinProps={{ tip: t('fetching') }} defaultIsOpen trigger="click">
              <Button>{t('triggers.click')}</Button>
            </Popover>
          ),
        },
        {
          title: 'Without message',
          custom: (
            <Popover loading placement="bottom" defaultIsOpen trigger="click">
              <Button>{t('triggers.click')}</Button>
            </Popover>
          ),
        },
      ]}
    />
  )
}

export const Arrow: FC = () => {
  const { t } = useI18n('global')
  return (
    <CommonStory
      component={Popover}
      stories={[
        {
          title: 'With arrow (default)',
          custom: (
            <Popover description={t('triggers.click')} defaultIsOpen trigger="click">
              <Button>{t('triggers.click')}</Button>
            </Popover>
          ),
        },
        {
          title: 'Without arrow',
          custom: (
            <Popover
              description={t('triggers.click')}
              defaultIsOpen
              trigger="click"
              showArrow={false}
            >
              <Button>{t('triggers.click')}</Button>
            </Popover>
          ),
        },
      ]}
    />
  )
}

export const HoverDelay: FC = () => {
  const { t } = useI18n('global')
  return (
    <CommonStory
      component={Popover}
      stories={[
        {
          title: 'Immediate (default)',
          custom: (
            <Popover description={t('triggers.hover')}>
              <Button>{t('triggers.hover')}</Button>
            </Popover>
          ),
        },
        {
          title: 'Two seconds',
          custom: (
            <Popover description={t('triggers.hover')} hoverDelay={2000}>
              <Button>{t('triggers.hover')}</Button>
            </Popover>
          ),
        },
      ]}
    />
  )
}

export const Playground: FC<PopoverNS.Props> = props => {
  return (
    <StoryPlayground
      containerProps={{
        style: { minHeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center' },
      }}
      component={Popover}
      props={props}
    />
  )
}
