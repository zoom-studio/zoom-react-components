import React, { FC } from 'react'

import { ComponentMeta } from '@storybook/react'

import { Tour, TourNS, useMessage } from '../components'
import { LoremPage, useCreateLoremSectionRefs } from '../fixtures'
import { WithButtonsStory } from './components'
import { useI18n } from './hooks/use-i18n'

export default {
  title: 'Data display/Tour',
  component: Tour,
  args: {
    steps: [],
    onStart: undefined,
    onEnd: undefined,
    defaultActiveStep: 0,
    children: undefined,
    id: undefined,
    className: undefined,
    style: {},
    backdropProps: {},
    containerProps: {},
    onClick: undefined,
  },
} as ComponentMeta<typeof Tour>

const useTourStory = () => {
  const refs = useCreateLoremSectionRefs()
  const message = useMessage()
  const { t } = useI18n('tour')

  const steps: TourNS.Step[] = [
    {
      reference: refs.img1,
      title: t('ttl.sample'),
      description: t('desc.sample'),
    },
    {
      reference: refs.ttl1,
      title: t('ttl.onReach'),
      description: t('desc.onReach'),
      onReach: () => message.toast.success('Reached to this step'),
    },
    {
      reference: refs.dcp1,
      title: t('ttl.onClose'),
      description: t('desc.onClose'),
      onClose: () => message.toast.error('You have closed the tour when you were in this step'),
    },
    {
      reference: refs.btn1,
      content: () => <p>xxxxxxxxx</p>,
    },
    {
      reference: refs.img2,
      title: t('ttl.everyThingTogether'),
      description: t('desc.everyThingTogether'),
    },
    {
      reference: refs.ttl2,
      title: t('ttl.everyThingTogether'),
      description: t('desc.everyThingTogether'),
    },
    {
      reference: refs.dcp2,
      title: t('ttl.topEnd'),
      description: t('desc.topEnd'),
      selfPosition: 'top-end',
    },
    {
      reference: refs.btn2,
      title: t('ttl.topCenter'),
      description: t('desc.topCenter'),
      selfPosition: 'top-center',
    },
    {
      reference: refs.img3,
      title: t('ttl.topStart'),
      description: t('desc.topStart'),
      selfPosition: 'top-start',
    },
    {
      reference: refs.ttl3,
      title: t('ttl.centerEnd'),
      description: t('desc.centerEnd'),
      selfPosition: 'center-end',
    },
    {
      reference: refs.dcp3,
      title: t('ttl.center'),
      description: t('desc.center'),
      selfPosition: 'center',
    },
    {
      reference: refs.btn3,
      title: t('ttl.centerStart'),
      description: t('desc.centerStart'),
      selfPosition: 'center-start',
    },
    {
      reference: refs.img4,
      title: t('ttl.bottomEnd'),
      description: t('desc.bottomEnd'),
      selfPosition: 'bottom-end',
    },
    {
      reference: refs.ttl4,
      title: t('ttl.bottomCenter'),
      description: t('desc.bottomCenter'),
      selfPosition: 'bottom-center',
    },
    {
      reference: refs.dcp4,
      title: t('ttl.bottomStart'),
      description: t('desc.bottomStart'),
      selfPosition: 'bottom-start',
    },
    {
      reference: refs.btn4,
      title: t('ttl.refPositionStart'),
      description: t('desc.refPositionStart'),
      positionOnFocusReference: 'start',
    },
    {
      reference: refs.img5,
      title: t('ttl.refPositionCenter'),
      description: t('desc.refPositionCenter'),
      positionOnFocusReference: 'center',
    },
    {
      reference: refs.ttl5,
      title: t('ttl.refPositionEnd'),
      description: t('desc.refPositionEnd'),
      positionOnFocusReference: 'end',
    },
    {
      reference: refs.dcp5,
      title: t('ttl.emoji'),
      description: t('desc.emoji'),
    },
    {
      reference: refs.btn5,
      title: t('ttl.icon'),
      description: t('desc.icon'),
    },
    {
      reference: refs.img6,
      title: t('ttl.puls'),
      description: t('desc.puls'),
    },
    {
      reference: refs.ttl6,
      title: t('ttl.noneClosable'),
      description: t('desc.noneClosable'),
    },
    {
      reference: refs.dcp6,
      title: t('ttl.loading'),
      description: t('desc.loading'),
    },
    {
      reference: refs.btn6,
      title: t('ttl.withoutBadge'),
      description: t('desc.withoutBadge'),
    },
  ]

  const commonProps: Omit<TourNS.Props, 'children'> = {
    steps,
    onStart: () => message.toast.neutral('The tour has been started!'),
    onEnd: () => message.toast.neutral('Completed! now you are a pro!'),
  }

  return { refs, steps, commonProps }
}

export const Playground: FC<TourNS.Props> = props => {
  const { refs, commonProps } = useTourStory()
  return (
    <Tour {...props} {...commonProps}>
      {({ startTour, stopTour }) => (
        <WithButtonsStory
          buttons={[
            { children: 'Start the tour', onClick: startTour },
            { children: 'Stop the tour', onClick: stopTour },
          ]}
        >
          <LoremPage refs={refs} />
        </WithButtonsStory>
      )}
    </Tour>
  )
}
