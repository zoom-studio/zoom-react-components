import React, { FC } from 'react'

import { ComponentMeta } from '@storybook/react'

import { Input, InputNS, Title } from '../..'

// import './styles/_form.scss'

export default {
  title: 'Input',
  component: Input,
  args: {
    label: 'Some input in here',
    size: 'small',
    disabled: false,
    loading: false,
  },
} as ComponentMeta<typeof Input>

export const _Input: FC<InputNS.Props> = props => {
  return (
    <>
      <div className="form-components-story">
        <div>
          <Title h1>Playground</Title>
          <Input {...props} />
        </div>
      </div>

      {inputs.map(({ title, group }, index) => (
        <div key={index} className="form-components-story">
          <Title h1>{title}</Title>
          {group.map(({ title, ...props }, index) => (
            <div key={index}>
              <Title>{title}</Title>
              <Input {...props} />
            </div>
          ))}
        </div>
      ))}
    </>
  )
}

const inputs: Array<{
  title: string
  group: Array<InputNS.Props & { title: string }>
}> = [
  {
    title: 'Loading or disabled',
    group: [
      {
        title: 'Not loading or disabled',
        placeholder: 'کاملا نرمال',
        label: 'کاملا نرمال',
      },
      {
        title: 'Loading',
        placeholder: 'در حال بارگذاری',
        label: 'در حال بارگذاری',
        loading: true,
      },
      {
        title: 'Loading but not disabled',
        placeholder: 'در حال بارگذاری',
        label: 'در حال بارگذاری',
        loading: true,
        disabledOnLoading: false,
      },
      {
        title: 'Disabled',
        placeholder: 'غیر فعال',
        label: 'غیر فعال',
        disabled: true,
      },
    ],
  },
  {
    title: 'Sizes',
    group: [
      {
        title: 'Small input',
        placeholder: 'اینپوت کوچک',
        label: 'اینپوت کوچک',
        size: 'small',
      },
      {
        title: 'Normal input',
        placeholder: 'اینپوت نرمال',
        label: 'اینپوت نرمال',
        size: 'normal',
      },
      {
        title: 'Large input',
        placeholder: 'اینپوت بزرگ',
        label: 'اینپوت بزرگ',
        size: 'large',
      },
    ],
  },

  {
    title: 'States',
    group: [
      {
        title: 'Neutral',
        placeholder: 'کد ملی',
        label: 'کد ملی',
        state: ['neutral'],
      },
      {
        title: 'Success',
        placeholder: 'شماره همراه',
        label: 'شماره همراه',
        state: ['success', 'شماره همراه شما با موفقیت ثبت گردید'],
      },

      {
        title: 'Info',
        placeholder: 'رمز عبور',
        label: 'رمز عبور',
        state: ['info', 'رمز عبور باید شامل حروف و اعداد باشد'],
      },
      {
        title: 'Warning',
        placeholder: 'ایمیل',
        label: 'ایمیل',
        state: ['warning', 'بهتر است ایمیل خود را وارد کنید'],
      },
      {
        title: 'Error',
        placeholder: 'نام و نام خانوادگی',
        label: 'نام و نام خانوادگی',
        state: ['error', 'لطفا نام و نام خانوادگی خود را وارد کنید'],
      },
    ],
  },

  {
    title: 'Label and placeholder',
    group: [
      {
        title: 'With label and placeholder',
        placeholder: 'پلیس‌هولدر در اینجا قرار می‌گیرد',
        label: 'لیبل در اینجا قرار می‌گیرد',
      },
      {
        title: 'With placeholder only',
        placeholder: 'لیبل در اینجا قرار می‌گیرد',
      },
      {
        title: 'With label only',
        label: 'لیبل در اینجا قرار می‌گیرد',
      },
      {
        title: 'Without label and placeholder',
      },
    ],
  },
]
