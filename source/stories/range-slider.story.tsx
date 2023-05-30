import React, { type FC } from 'react'

import { type Meta } from '@storybook/react'

import { RangeSlider, type RangeSliderNS } from '../components'
import { CommonStory, StoryPlayground } from './components'
import { useI18n } from './hooks/use-i18n'

export default {
  title: 'Data entry/Range sliders',
  component: RangeSlider,
  args: {
    min: 0,
    max: 100,
    step: 1,
    value: 50,
    size: 'normal',
    label: 'Title',
    masks: { 0: '0%', 50: '50%', 100: '100%' },
    state: ['neutral'],
    thumbContent: { icon: 'volume_up' },
    renderPopover: value => `${value} KG....`,
    disabled: false,
    disabledOnLoading: false,
    labelColon: true,
    loading: false,
    className: 'my-range-slider',
    id: 'my-range-slider',
    style: undefined,
    containerProps: undefined,
    onClick: undefined,
    onWrite: undefined,
    reference: undefined,
    stateMessageProps: undefined,
  },
} as Meta<typeof RangeSlider>

const useRangeSliderStory = () => {
  const { t } = useI18n('rangeSlider')

  const masks: RangeSliderNS.Props['masks'] = { 0: '0', 50: '50', 100: '100' }
  const label = t('label')
  const thumbContentIcon: RangeSliderNS.Props['thumbContent'] = { icon: 'volume_up' }
  const thumbContentEmoji: RangeSliderNS.Props['thumbContent'] = { emoji: 'speaker high volume' }
  const thumbContentCustom: RangeSliderNS.Props['thumbContent'] = <>v</>

  return { masks, label, thumbContentEmoji, thumbContentIcon, thumbContentCustom }
}

export const LoadingAndDisabled: FC = () => {
  const { label } = useRangeSliderStory()
  return (
    <CommonStory
      component={RangeSlider}
      stories={[
        {
          group: [
            { name: 'Normal', props: { label } },
            { name: 'Loading', props: { label, loading: true } },
            {
              name: 'Loading but not disabled',
              props: { label, loading: true, disabledOnLoading: false },
            },
            { name: 'Disabled', props: { label, disabled: true } },
          ],
        },
      ]}
    />
  )
}

export const Sizes: FC = () => {
  const { label } = useRangeSliderStory()

  return (
    <CommonStory
      component={RangeSlider}
      stories={[
        {
          group: [
            { name: 'Small', props: { size: 'small', label } },
            { name: 'Normal', props: { size: 'normal', label } },
            { name: 'Large', props: { size: 'large', label } },
          ],
        },
      ]}
    />
  )
}

export const States: FC = () => {
  const { label } = useRangeSliderStory()
  const { t } = useI18n('global')
  return (
    <CommonStory
      component={RangeSlider}
      stories={[
        {
          group: [
            { props: { label, state: ['neutral', t('states.neutral')] }, name: 'Neutral' },
            { props: { label, state: ['success', t('states.success')] }, name: 'Success' },
            { props: { label, state: ['info', t('states.info')] }, name: 'Info' },
            { props: { label, state: ['warning', t('states.warning')] }, name: 'Warning' },
            { props: { label, state: ['error', t('states.error')] }, name: 'Error' },
          ],
        },
      ]}
    />
  )
}

export const LabelAndMasks: FC = () => {
  const { label, masks } = useRangeSliderStory()
  return (
    <CommonStory
      component={RangeSlider}
      stories={[
        {
          group: [
            { name: 'Without label and masks' },
            { props: { label }, name: 'With label' },
            { props: { masks }, name: 'With masks' },
            { props: { label, masks }, name: 'With label and masks' },
          ],
        },
      ]}
    />
  )
}

export const CustomSteps: FC = () => {
  const { label } = useRangeSliderStory()
  return (
    <CommonStory
      component={RangeSlider}
      stories={[
        {
          group: [
            { props: { label }, name: 'step=1 (Default)' },
            { props: { label, step: 5 }, name: 'step=5' },
            { props: { label, step: 0.5 }, name: 'step=0.5' },
          ],
        },
      ]}
    />
  )
}

export const CustomPopover: FC = () => {
  const { label } = useRangeSliderStory()
  return (
    <CommonStory
      component={RangeSlider}
      stories={[
        {
          group: [
            { props: { label }, name: 'Numeric (Default)' },
            { props: { label, renderPopover: value => `${value} KG` }, name: 'Custom' },
            { props: { label, renderPopover: false }, name: 'Without popover' },
          ],
        },
      ]}
    />
  )
}

export const CustomThumbContent: FC = () => {
  const { label, thumbContentEmoji, thumbContentCustom, thumbContentIcon } = useRangeSliderStory()
  return (
    <CommonStory
      component={RangeSlider}
      stories={[
        {
          group: [
            { props: { label }, name: 'Nothing (Default)' },
            { props: { label, thumbContent: thumbContentEmoji }, name: 'Emoji' },
            { props: { label, thumbContent: thumbContentIcon }, name: 'Icon' },
            { props: { label, thumbContent: thumbContentCustom }, name: 'Custom' },
          ],
        },
      ]}
    />
  )
}

export const Playground: FC<RangeSliderNS.Props> = props => {
  return <StoryPlayground component={RangeSlider} props={props} />
}
