import React, { FC } from 'react'

import { ComponentMeta } from '@storybook/react'

import { Select, SelectNS } from '..'
import { DYNAMIC_SIMPLE_SELECT, SELECT_OPTIONS, SIMPLE_SELECT_OPTIONS } from '../fixtures'
import { CommonStory, StoryPlayground } from './components'
import { useI18n } from './hooks/use-i18n'

export default {
  title: 'Data Entry/Select',
  component: Select,
  args: {
    label: 'لیبل',
    multiSelect: true,
    placeholder: 'پلیس هولدر',
    options: SIMPLE_SELECT_OPTIONS,
  },
} as ComponentMeta<typeof Select>

const useSelectStory = () => {
  const { t } = useI18n('select')
  return {
    label: t('label'),
    placeholder: t('placeholder'),
  }
}

export const Basic: FC = () => {
  const { label, placeholder } = useSelectStory()
  return (
    <CommonStory
      component={Select}
      stories={[
        {
          group: [
            { props: { options: SIMPLE_SELECT_OPTIONS, label, placeholder, showSearch: false } },
          ],
        },
      ]}
    />
  )
}

export const Grouped: FC = () => {
  const { label, placeholder } = useSelectStory()
  return (
    <CommonStory
      component={Select}
      stories={[{ group: [{ props: { options: SELECT_OPTIONS, label, placeholder } }] }]}
    />
  )
}

export const Sizes: FC = () => {
  const { label, placeholder } = useSelectStory()
  return (
    <CommonStory
      component={Select}
      stories={[
        {
          group: [
            {
              props: { options: SELECT_OPTIONS, label, placeholder, size: 'small' },
              name: 'Small',
            },
            {
              props: { options: SELECT_OPTIONS, label, placeholder, size: 'normal' },
              name: 'Normal',
            },
            {
              props: { options: SELECT_OPTIONS, label, placeholder, size: 'large' },
              name: 'Large',
            },
          ],
        },
      ]}
    />
  )
}

export const MultiSelection: FC = () => {
  const { label, placeholder } = useSelectStory()
  return (
    <CommonStory
      component={Select}
      stories={[
        {
          group: [
            {
              props: { options: SIMPLE_SELECT_OPTIONS, label, placeholder, multiSelect: true },
              name: 'Simple',
            },
            {
              props: { options: SELECT_OPTIONS, label, placeholder, multiSelect: true },
              name: 'Grouped',
            },
          ],
        },
      ]}
    />
  )
}

export const States: FC = () => {
  const { label, placeholder } = useSelectStory()
  const { t } = useI18n('global')
  return (
    <CommonStory
      component={Select}
      stories={[
        {
          group: [
            {
              props: {
                options: SIMPLE_SELECT_OPTIONS,
                label,
                placeholder,
                state: ['neutral', t('states.neutral')],
              },
              name: 'Neutral',
            },
            {
              props: {
                options: SIMPLE_SELECT_OPTIONS,
                label,
                placeholder,
                state: ['success', t('states.success')],
              },
              name: 'Success',
            },
            {
              props: {
                options: SIMPLE_SELECT_OPTIONS,
                label,
                placeholder,
                state: ['info', t('states.info')],
              },
              name: 'Info',
            },
            {
              props: {
                options: SIMPLE_SELECT_OPTIONS,
                label,
                placeholder,
                state: ['warning', t('states.warning')],
              },
              name: 'Warning',
            },
            {
              props: {
                options: SIMPLE_SELECT_OPTIONS,
                label,
                placeholder,
                state: ['error', t('states.error')],
              },
              name: 'Error',
            },
          ],
        },
      ]}
    />
  )
}

export const DisabledOptions: FC = () => {
  const { label, placeholder } = useSelectStory()
  return (
    <CommonStory
      component={Select}
      stories={[
        {
          group: [
            {
              props: {
                options: DYNAMIC_SIMPLE_SELECT(20, index => index % 2 === 0),
                label,
                placeholder,
                multiSelect: true,
              },
            },
          ],
        },
      ]}
    />
  )
}

export const OptionsPerScroll: FC = () => {
  const { label, placeholder } = useSelectStory()
  return (
    <CommonStory
      component={Select}
      stories={[
        {
          group: [
            {
              name: '20 options at first scroll view',
              props: {
                options: DYNAMIC_SIMPLE_SELECT(50),
                label,
                placeholder,
                optionsPerScroll: 20,
              },
            },
          ],
        },
      ]}
    />
  )
}

export const EmptyList: FC = () => {
  const { label, placeholder } = useSelectStory()
  return (
    <CommonStory component={Select} stories={[{ group: [{ props: { label, placeholder } }] }]} />
  )
}

export const LoadingAndDisabled: FC = () => {
  const { label, placeholder } = useSelectStory()
  return (
    <CommonStory
      component={Select}
      stories={[
        {
          group: [
            { name: 'Normal', props: { label, placeholder, options: SIMPLE_SELECT_OPTIONS } },
            { name: 'Loading', props: { label, placeholder, loading: true } },
            {
              name: 'Loading but not disabled',
              props: {
                label,
                placeholder,
                options: SIMPLE_SELECT_OPTIONS,
                loading: true,
                disabledOnLoading: false,
              },
            },
            { name: 'Disabled', props: { label, placeholder, disabled: true } },
          ],
        },
      ]}
    />
  )
}

export const SearchBox: FC = () => {
  const { label, placeholder } = useSelectStory()
  return (
    <CommonStory
      component={Select}
      stories={[
        {
          group: [
            {
              props: { label, placeholder, options: SELECT_OPTIONS },
              name: 'With search box (Default)',
            },
            {
              props: { label, placeholder, options: SIMPLE_SELECT_OPTIONS, showSearch: false },
              name: 'Without search box',
            },
            {
              props: { label, placeholder, options: SELECT_OPTIONS, searchQuery: 'React' },
              name: 'With custom search query',
            },
          ],
        },
      ]}
    />
  )
}

export const DefaultValue: FC = () => {
  const { label, placeholder } = useSelectStory()
  return (
    <CommonStory
      component={Select}
      stories={[
        {
          group: [
            {
              props: { label, placeholder, options: SELECT_OPTIONS, defaultValue: 1 },
              name: 'Single select',
            },
            {
              props: {
                label,
                placeholder,
                options: SELECT_OPTIONS,
                multiSelect: true,
                defaultValue: [1, 2, 8],
              },
              name: 'Multi select',
            },
          ],
        },
      ]}
    />
  )
}

export const Playground: FC<SelectNS.Props<any>> = props => {
  return <StoryPlayground component={Select} props={props} />
}
