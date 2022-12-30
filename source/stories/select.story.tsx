import React, { FC } from 'react'

import { ComponentMeta } from '@storybook/react'

import { Button, Select, SelectNS, Title } from '..'
import { SELECT_OPTIONS } from '../fixtures'

import { useAddDataAttrs } from './hooks'
import './styles/_form.scss'

export default {
  title: 'Select',
  component: Select,
  args: {
    optionsPerScroll: 200,
    size: 'normal',
    // label: 'یه متن تقریبا بلند برای اینکه ترانکیت هم تست شود در اینجا',
    label: 'لیبل',
    multiSelect: true,
    placeholder: 'پلیس هولدر',
  },
} as ComponentMeta<typeof Select>

export const _Select: FC<SelectNS.Props> = props => {
  const { nextLayout, toggleLayout } = useAddDataAttrs('rtl')
  return (
    <>
      <div className="form-components-story">
        <Title h1>Layout</Title>
        <Button onClick={toggleLayout}>Switch to {nextLayout}</Button>
      </div>

      <div className="form-components-story">
        <Title h1>Playground</Title>

        <div>
          <Select {...props} options={SELECT_OPTIONS} />
        </div>
      </div>

      {/* {selects.map(({ title, group }, index) => (
        <div key={index} className="form-components-story">
          <Title h1>{title}</Title>
          {group.map(({ title, ...props }, index) => (
            <div key={index}>
              <Title>{title}</Title>
              <Select {...props} options={SELECT_OPTIONS} />
            </div>
          ))}
        </div>
      ))} */}
    </>
  )
}

// const selects: Array<{
//   title: string
//   group: Array<SelectNS.Props & { title: string }>
// }> = [
//   {
//     title: 'Loading or disabled',
//     group: [
//       {
//         title: 'Not loading or disabled',
//         placeholder: 'کاملا نرمال',
//         label: 'کاملا نرمال',
//       },
//       {
//         title: 'Loading',
//         placeholder: 'در حال بارگذاری',
//         label: 'در حال بارگذاری',
//         loading: true,
//         state: ['info'],
//       },
//       {
//         title: 'Loading but not disabled',
//         placeholder: 'در حال بارگذاری',
//         label: 'در حال بارگذاری',
//         loading: true,
//         disabledOnLoading: false,
//       },
//       {
//         title: 'Disabled',
//         placeholder: 'غیر فعال',
//         label: 'غیر فعال',
//         disabled: true,
//       },
//     ],
//   },
//   {
//     title: 'Sizes',
//     group: [
//       {
//         title: 'Small input 29',
//         placeholder: 'اینپوت کوچک',
//         label: 'اینپوت کوچک',
//         size: 'small',
//       },
//       {
//         title: 'Normal input 36',
//         placeholder: 'اینپوت نرمال',
//         label: 'اینپوت نرمال',
//         size: 'normal',
//       },
//       {
//         title: 'Large input 47',
//         placeholder: 'اینپوت بزرگ',
//         label: 'اینپوت بزرگ',
//         size: 'large',
//       },
//     ],
//   },
//   {
//     title: 'States',
//     group: [
//       {
//         title: 'Neutral',
//         placeholder: 'کد ملی',
//         label: 'کد ملی',
//         state: ['neutral'],
//       },
//       {
//         title: 'Success',
//         placeholder: 'شماره همراه',
//         label: 'شماره همراه',
//         state: ['success', 'شماره همراه شما با موفقیت ثبت گردید'],
//       },

//       {
//         title: 'Info',
//         placeholder: 'رمز عبور',
//         label: 'رمز عبور',
//         state: ['info', 'رمز عبور باید شامل حروف و اعداد باشد'],
//       },
//       {
//         title: 'Warning',
//         placeholder: 'ایمیل',
//         label: 'ایمیل',
//         state: ['warning', 'بهتر است ایمیل خود را وارد کنید'],
//       },
//       {
//         title: 'Error',
//         placeholder: 'نام و نام خانوادگی',
//         label: 'نام و نام خانوادگی',
//         state: ['error', 'لطفا نام و نام خانوادگی خود را وارد کنید'],
//       },
//     ],
//   },

//   {
//     title: 'Label and placeholder',
//     group: [
//       {
//         title: 'With label and placeholder',
//         placeholder: 'پلیس‌هولدر در اینجا قرار می‌گیرد',
//         label: 'لیبل در اینجا قرار می‌گیرد',
//       },
//       {
//         title: 'With label only',
//         label: 'لیبل در اینجا قرار می‌گیرد',
//       },
//     ],
//   },
// ]
