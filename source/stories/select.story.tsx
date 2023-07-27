import React, { type FC } from 'react'

import { type Meta } from '@storybook/react'

import { Select, type SelectNS } from '..'

import { DYNAMIC_SIMPLE_SELECT, SELECT_OPTIONS, SIMPLE_SELECT_OPTIONS } from '../fixtures'
import { CommonStory, StoryPlayground } from './components'
import { useI18n } from './hooks/use-i18n'

export default {
  title: 'Data Entry/Select',
  component: Select,
  args: {
    options: SIMPLE_SELECT_OPTIONS,
    label: 'لیبل',
    placeholder: 'پلیس هولدر',
    searchPlaceholder: 'جستجوی موارد...',
    multiSelect: true,
    showSearch: true,
    loading: false,
    disabled: false,
    disabledOnLoading: true,
    labelColon: true,
    defaultValue: 'value 3',
    children: ({ label, value }) => label ?? value,
    optionSearchModel: ({ label }) => label,
    renderSelectedOption: ({ label }) => label,
    emptyListText: 'هیچی نداریم',
    nothingFoundText: 'هیجی پیدا نشد',
    size: 'normal',
    searchQuery: '',
    state: ['neutral', 'خنثی'],
    className: 'my-select-component',
    id: 'my-select-component',
    onWrite: undefined,
    onChange: undefined,
    onWillClose: undefined,
    onWillOpen: undefined,
    onClick: undefined,
    stateMessageProps: undefined,
    containerProps: undefined,
    style: undefined,
  },
} as Meta<typeof Select>

const useSelectStory = () => {
  const { t } = useI18n('select')
  return {
    label: t('label'),
    placeholder: t('placeholder'),
    searchPlaceholder: t('searchPlaceholder'),
  }
}

export const Basic = () => {
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
      stories={[
        { group: [{ props: { options: SELECT_OPTIONS, label, placeholder, showSearch: false } }] },
      ]}
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
              props: {
                options: SELECT_OPTIONS,
                label,
                placeholder,
                size: 'small',
                showSearch: false,
              },
              name: 'Small',
            },
            {
              props: {
                options: SELECT_OPTIONS,
                label,
                placeholder,
                size: 'normal',
                showSearch: false,
              },
              name: 'Normal',
            },
            {
              props: {
                options: SELECT_OPTIONS,
                label,
                placeholder,
                size: 'large',
                showSearch: false,
              },
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
              props: {
                options: SIMPLE_SELECT_OPTIONS,
                label,
                placeholder,
                multiSelect: true,
                showSearch: false,
              },
              name: 'Simple',
            },
            {
              props: {
                options: SELECT_OPTIONS,
                label,
                placeholder,
                multiSelect: true,
                showSearch: false,
              },
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
                showSearch: false,
              },
              name: 'Neutral',
            },
            {
              props: {
                options: SIMPLE_SELECT_OPTIONS,
                label,
                placeholder,
                state: ['success', t('states.success')],
                showSearch: false,
              },
              name: 'Success',
            },
            {
              props: {
                options: SIMPLE_SELECT_OPTIONS,
                label,
                placeholder,
                state: ['info', t('states.info')],
                showSearch: false,
              },
              name: 'Info',
            },
            {
              props: {
                options: SIMPLE_SELECT_OPTIONS,
                label,
                placeholder,
                state: ['warning', t('states.warning')],
                showSearch: false,
              },
              name: 'Warning',
            },
            {
              props: {
                options: SIMPLE_SELECT_OPTIONS,
                label,
                placeholder,
                state: ['error', t('states.error')],
                showSearch: false,
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
                showSearch: false,
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
    <CommonStory
      component={Select}
      stories={[{ group: [{ props: { label, placeholder, options: [] } }] }]}
    />
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
            {
              name: 'Normal',
              props: { label, placeholder, options: SIMPLE_SELECT_OPTIONS, showSearch: false },
            },
            {
              name: 'Loading',
              props: { label, placeholder, loading: true, options: [], showSearch: false },
            },
            {
              name: 'Loading but not disabled',
              props: {
                label,
                placeholder,
                options: SIMPLE_SELECT_OPTIONS,
                loading: true,
                showSearch: false,
                disabledOnLoading: false,
              },
            },
            {
              name: 'Disabled',
              props: { label, placeholder, disabled: true, options: [], showSearch: false },
            },
          ],
        },
      ]}
    />
  )
}

export const SearchBox: FC = () => {
  const { label, placeholder, searchPlaceholder } = useSelectStory()
  return (
    <CommonStory
      component={Select}
      stories={[
        {
          group: [
            {
              props: { label, placeholder, options: SELECT_OPTIONS, searchPlaceholder },
              name: 'With search box (Default)',
            },
            {
              props: { label, placeholder, options: SIMPLE_SELECT_OPTIONS, showSearch: false },
              name: 'Without search box',
            },
            {
              props: {
                label,
                placeholder,
                options: SELECT_OPTIONS,
                searchQuery: 'React',
                searchPlaceholder,
              },
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

export const Playground: FC<SelectNS.Props<any, any, any>> = props => {
  return <StoryPlayground component={Select} props={props} />
}
