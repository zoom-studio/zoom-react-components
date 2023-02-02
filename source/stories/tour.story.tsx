import React, { FC } from 'react'

import { ComponentMeta } from '@storybook/react'

import { Button, ReactionRate, Switch, Text, Tour, TourNS, useMessage } from '../components'
import { LoremPage, useCreateLoremSectionRefs } from '../fixtures'
import { WithButtonsStory } from './components'
import { useI18n } from './hooks/use-i18n'

const renderContent = (
  next: string,
  prev: string,
  toStep3: string,
  stopTour: string,
  switchMe: string,
  description: string,
  currentIndex: string,
): TourNS.Step['content'] => {
  return handlers => (
    <div>
      <ReactionRate />
      <Switch label={switchMe} />
      <Text>{description}</Text>
      <Button size="small" onClick={() => handlers.navigateTo('next')}>
        {next}
      </Button>
      <Button size="small" onClick={() => handlers.navigateTo('prev')}>
        {prev}
      </Button>
      <Button size="small" onClick={() => handlers.navigateTo(2)}>
        {toStep3}
      </Button>
      <Button size="small" onClick={handlers.stopTour}>
        {stopTour}
      </Button>
      <Text>
        {currentIndex}: {handlers.currentStep}
      </Text>
    </div>
  )
}

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

  const next = t('next')
  const prev = t('prev')
  const toStep3 = t('toStep3')
  const stopTour = t('stopTour')
  const switchMe = t('switchMe')
  const description = t('content')
  const currentIndex = t('currentStep')

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
      content: renderContent(next, prev, toStep3, stopTour, switchMe, description, currentIndex),
      reference: refs.btn1,
    },
    {
      content: renderContent(next, prev, toStep3, stopTour, switchMe, description, currentIndex),
      reference: refs.img2,
      title: t('ttl.everyThingTogether'),
      description: t('desc.everyThingTogether'),
      closable: true,
      emoji: 'smiling face',
      icon: 'emoji_emotions',
      loading: true,
      onClose: () => message.toast.success('The tour has been canceled'),
      onReach: () => message.toast.success('You have reached tot the everything together step'),
      positionOnFocusReference: 'center',
      selfPosition: 'center',
    },
    {
      reference: refs.ttl2,
      title: t('ttl.topEnd'),
      description: t('desc.topEnd'),
      selfPosition: 'top-end',
    },
    {
      reference: refs.dcp2,
      title: t('ttl.topCenter'),
      description: t('desc.topCenter'),
      selfPosition: 'top-center',
    },
    {
      reference: refs.btn2,
      title: t('ttl.topStart'),
      description: t('desc.topStart'),
      selfPosition: 'top-start',
    },
    {
      reference: refs.img3,
      title: t('ttl.centerEnd'),
      description: t('desc.centerEnd'),
      selfPosition: 'center-end',
    },
    {
      reference: refs.ttl3,
      title: t('ttl.center'),
      description: t('desc.center'),
      selfPosition: 'center',
    },
    {
      reference: refs.dcp3,
      title: t('ttl.centerStart'),
      description: t('desc.centerStart'),
      selfPosition: 'center-start',
    },
    {
      reference: refs.btn3,
      title: t('ttl.bottomEnd'),
      description: t('desc.bottomEnd'),
      selfPosition: 'bottom-end',
    },
    {
      reference: refs.img4,
      title: t('ttl.bottomCenter'),
      description: t('desc.bottomCenter'),
      selfPosition: 'bottom-center',
    },
    {
      reference: refs.ttl4,
      title: t('ttl.bottomStart'),
      description: t('desc.bottomStart'),
      selfPosition: 'bottom-start',
    },
    {
      reference: refs.dcp4,
      title: t('ttl.refPositionStart'),
      description: t('desc.refPositionStart'),
      positionOnFocusReference: 'start',
    },
    {
      reference: refs.btn4,
      title: t('ttl.refPositionCenter'),
      description: t('desc.refPositionCenter'),
      positionOnFocusReference: 'center',
    },
    {
      reference: refs.img5,
      title: t('ttl.refPositionEnd'),
      description: t('desc.refPositionEnd'),
      positionOnFocusReference: 'end',
    },
    {
      reference: refs.ttl5,
      title: t('ttl.emoji'),
      description: t('desc.emoji'),
      emoji: 'grinning cat with smiling eyes',
    },
    {
      reference: refs.dcp5,
      title: t('ttl.icon'),
      description: t('desc.icon'),
      icon: 'subway',
    },
    {
      reference: refs.btn5,
      title: t('ttl.noneClosable'),
      description: t('desc.noneClosable'),
      closable: false,
    },
    {
      reference: refs.img6,
      title: t('ttl.loading'),
      description: t('desc.loading'),
      loading: true,
    },
  ]

  const commonProps: Omit<TourNS.Props, 'children'> = {
    steps,
    onStart: () => message.toast.neutral('The tour has been started!'),
    onEnd: () => message.toast.neutral('Completed! now you are a pro!'),
  }

  return { refs, steps, commonProps }
}

export const Basic: FC = () => {
  const { refs, commonProps } = useTourStory()
  return (
    <Tour {...commonProps}>
      {({ startTour }) => (
        <WithButtonsStory buttons={[{ children: 'Start the tour', onClick: startTour }]}>
          <LoremPage refs={refs} />
        </WithButtonsStory>
      )}
    </Tour>
  )
}

export const DefaultActiveStep: FC = () => {
  const { refs, commonProps } = useTourStory()
  return (
    <Tour {...commonProps} defaultActiveStep={5}>
      {({ startTour }) => (
        <WithButtonsStory buttons={[{ children: 'Start the tour', onClick: startTour }]}>
          <LoremPage refs={refs} />
        </WithButtonsStory>
      )}
    </Tour>
  )
}

export const NoneFluidContainer: FC = () => {
  const { refs, commonProps } = useTourStory()
  return (
    <Tour {...commonProps} fluidContainer={false}>
      {({ startTour }) => (
        <WithButtonsStory buttons={[{ children: 'Start the tour', onClick: startTour }]}>
          <LoremPage refs={refs} />
        </WithButtonsStory>
      )}
    </Tour>
  )
}

export const Playground: FC<TourNS.Props> = props => {
  const { refs, commonProps } = useTourStory()
  return (
    <Tour {...props} {...commonProps}>
      {({ startTour }) => (
        <WithButtonsStory buttons={[{ children: 'Start the tour', onClick: startTour }]}>
          <LoremPage refs={refs} />
        </WithButtonsStory>
      )}
    </Tour>
  )
}
