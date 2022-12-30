import React, { FC } from 'react'

import { ComponentMeta } from '@storybook/react'

import { Select, SelectNS, Title } from '../..'
import { DYNAMIC_SIMPLE_SELECT, SELECT_OPTIONS, SIMPLE_SELECT_OPTIONS } from '../../fixtures'

// import './styles/_form.scss'

export default {
  title: 'Select',
  component: Select,
  args: {
    label: 'لیبل',
    multiSelect: true,
    placeholder: 'پلیس هولدر',
    options: SIMPLE_SELECT_OPTIONS,
  },
} as ComponentMeta<typeof Select>

export const _Select: FC<SelectNS.Props> = props => {
  return (
    <>
      <div className="form-components-story">
        <Title h1>Playground</Title>
        <div>
          <Select {...props} />
        </div>
      </div>

      {selects.map(({ title, group }, index) => (
        <div key={index} className="form-components-story">
          <Title h1>{title}</Title>
          {group.map(({ title, ...props }, index) => (
            <div key={index}>
              <Title>{title}</Title>
              <Select {...props} />
            </div>
          ))}
        </div>
      ))}
    </>
  )
}

const selects: Array<{
  title: string
  group: Array<SelectNS.Props & { title: string }>
}> = [
  {
    title: 'Simple and grouped options',
    group: [
      {
        title: 'None options',
        label: 'بدون گروه‌بندی',
        options: SIMPLE_SELECT_OPTIONS,
      },
      {
        title: 'Grouped options',
        label: 'اپشن‌های گروه‌بندی شده',
        options: SELECT_OPTIONS,
      },
    ],
  },

  {
    title: 'Sizes',
    group: [
      {
        title: 'Small input',
        placeholder: 'سلکت کوچک',
        label: 'سلکت کوچک',
        size: 'small',
        options: SIMPLE_SELECT_OPTIONS,
      },
      {
        title: 'Normal input',
        placeholder: 'سلکت نرمال',
        label: 'سلکت نرمال',
        size: 'normal',
        options: SIMPLE_SELECT_OPTIONS,
      },
      {
        title: 'Large input',
        placeholder: 'سلکت بزرگ',
        label: 'سلکت بزرگ',
        size: 'large',
        options: SIMPLE_SELECT_OPTIONS,
      },
    ],
  },

  {
    title: 'Multi & single select',
    group: [
      {
        title: 'Multi select',
        placeholder: 'امکان انتخاب چند گزینه',
        label: 'چند گزینه‌ای',
        options: SIMPLE_SELECT_OPTIONS,
        multiSelect: true,
      },
      {
        title: 'Single select',
        placeholder: 'امکان انتخاب فقط یه گزینه',
        label: 'تک گزینه‌ای',
        options: SIMPLE_SELECT_OPTIONS,
      },
    ],
  },

  {
    title: 'States',
    group: [
      {
        title: 'Neutral',
        label: 'لیبل',
        state: ['neutral'],
        options: SIMPLE_SELECT_OPTIONS,
      },
      {
        title: 'Success',
        label: 'لیبل',
        state: ['success', 'با موفقیت انتخاب شد'],
        options: SIMPLE_SELECT_OPTIONS,
      },

      {
        title: 'Info',
        label: 'لیبل',
        state: ['info', 'یکی از گزینه‌ها را انتخاب کنید'],
        options: SIMPLE_SELECT_OPTIONS,
      },
      {
        title: 'Warning',
        label: 'لیبل',
        state: ['warning', 'بهتره یه گزینه انتخاب بشه'],
        options: SIMPLE_SELECT_OPTIONS,
      },
      {
        title: 'Error',
        label: 'لیبل',
        state: ['error', 'لطفا یکی از گزینه‌ها را انتخاب کنید'],
        options: SIMPLE_SELECT_OPTIONS,
      },
    ],
  },

  {
    title: 'Disabled options',
    group: [
      {
        title: 'With some disabled options',
        label: 'با تعدادی اپشن غیرفعال',
        options: DYNAMIC_SIMPLE_SELECT(10, index => index % 2 === 0),
      },
    ],
  },

  {
    title: 'Options per scroll view',
    group: [
      {
        title: 'Default (6 options per scroll)',
        label: 'شش آیتم',
        options: DYNAMIC_SIMPLE_SELECT(20),
      },
      {
        title: '10 options',
        label: 'ده آیتم',
        options: DYNAMIC_SIMPLE_SELECT(20),
        optionsPerScroll: 10,
      },
      {
        title: '10 options (Grouped)',
        label: 'ده آیتم با قابلیت گروه بندی',
        options: SELECT_OPTIONS,
        optionsPerScroll: 10,
      },
    ],
  },

  {
    title: 'Scroll on open',
    group: [
      {
        title: 'Default (on mobile devices only)',
        label: 'اسکرول موقع باز شدن در موبایل',
        options: SIMPLE_SELECT_OPTIONS,
      },
      {
        title: 'Always',
        label: 'اسکرول موقع باز شدن همیشه',
        options: SIMPLE_SELECT_OPTIONS,
        scrollOnOpen: true,
      },
      {
        title: 'Never',
        label: 'اسکرول موقع باز شدن هیچ‌وقت',
        options: SIMPLE_SELECT_OPTIONS,
        scrollOnOpen: false,
      },
    ],
  },

  {
    title: 'Label and placeholder',
    group: [
      {
        title: 'With label and placeholder',
        placeholder: 'پلیس‌هولدر',
        label: 'لیبل',
        options: SIMPLE_SELECT_OPTIONS,
      },
      {
        title: 'With placeholder only',
        placeholder: 'پلیس‌هولدر',
        options: SIMPLE_SELECT_OPTIONS,
      },
      {
        title: 'With label only',
        label: 'لیبل',
        options: SIMPLE_SELECT_OPTIONS,
      },
      {
        title: 'Without label and placeholder',
        options: SIMPLE_SELECT_OPTIONS,
      },
    ],
  },

  {
    title: 'With(out) options',
    group: [
      {
        title: 'Empty list',
        placeholder: 'هیچ گزینه‌ای ندارم',
        label: 'لیبل خالی',
      },
      {
        title: 'With some simple options',
        placeholder: 'با چند گزینه ساده',
        label: 'لیبل اپشن‌دار',
        options: SIMPLE_SELECT_OPTIONS,
      },
    ],
  },

  {
    title: 'Loading or disabled',
    group: [
      {
        title: 'Not loading or disabled',
        placeholder: 'کاملا نرمال',
        label: 'کاملا نرمال',
        options: SIMPLE_SELECT_OPTIONS,
      },
      {
        title: 'Loading',
        placeholder: 'در حال بارگذاری',
        label: 'در حال بارگذاری',
        loading: true,
        options: SIMPLE_SELECT_OPTIONS,
      },
      {
        title: 'Loading but not disabled',
        placeholder: 'در حال بارگذاری',
        label: 'در حال بارگذاری',
        loading: true,
        disabledOnLoading: false,
        options: SIMPLE_SELECT_OPTIONS,
      },
      {
        title: 'Disabled',
        placeholder: 'غیر فعال',
        label: 'غیر فعال',
        disabled: true,
        options: SIMPLE_SELECT_OPTIONS,
      },
    ],
  },

  {
    title: 'With(out) search box',
    group: [
      {
        title: 'With searchbox (Default)',
        label: 'با سرچ',
        options: SIMPLE_SELECT_OPTIONS,
      },
      {
        title: 'Without search',
        label: 'بدون سرچ',
        options: SIMPLE_SELECT_OPTIONS,
        showSearch: false,
      },
    ],
  },

  {
    title: 'Default search query',
    group: [
      {
        title: 'With initial search query',
        label: 'با جستجوی پیشفرض',
        options: SIMPLE_SELECT_OPTIONS,
        searchQuery: 'option 1',
      },
    ],
  },

  {
    title: 'Default value',
    group: [
      {
        title: 'On single select',
        label: 'در انتخاب تکی',
        options: SIMPLE_SELECT_OPTIONS,
        defaultValue: SIMPLE_SELECT_OPTIONS[2].value,
      },
      {
        title: 'On Multi select',
        label: 'در انتخاب چندتایی',
        options: SIMPLE_SELECT_OPTIONS,
        defaultValue: SIMPLE_SELECT_OPTIONS.slice(2, 4).map(option => option.value),
        multiSelect: true,
      },
    ],
  },
]
