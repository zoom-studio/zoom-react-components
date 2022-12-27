import React, { FC } from 'react'

import { ComponentMeta } from '@storybook/react'

import { Button, Select, SelectNS, Title } from '..'

import { useAddDataAttrs } from './hooks'
import './styles/_form.scss'

export default {
  title: 'Select',
  component: Select,
  args: {
    size: 'normal',
    label: 'یه متن تقریبا بلند برای اینکه ترانکیت هم تست شود در اینجا',
    optionsPerScroll: 200,
    defaultIsOpen: true,
    multiSelect: true,
    options: [
      {
        label: 'Turning a React app',
        disabled: true,
        options: [
          { label: 'into an', value: Math.random() },
          { label: 'installable PWA', value: Math.random() },
          { label: 'with offline', value: Math.random() },
          { label: 'detection', value: Math.random() },
          { label: 'service workers', value: Math.random() },
        ],
      },
      { label: 'and theming', value: Math.random() },
      { label: 'Recently I decided', value: Math.random(), selected: false },
      {
        label: 'to take the dive into',
        disabled: true,
        options: [
          { label: 'making my web app', value: Math.random() },
          { label: 'progressive', value: Math.random() },
          { label: 'Some of the benefits', value: Math.random() },
          { label: 'are excellent caching', value: Math.random() },
          { label: 'sped up page load', value: Math.random() },
        ],
      },
      {
        label: 'times and the',
        disabled: true,
        selected: false,
        options: [
          { label: 'ability for a', value: Math.random() },
          { label: 'user to install it "natively"', value: Math.random() },
          { label: 'There are definitely some', value: Math.random() },
          { label: 'gotchas and other interesting', value: Math.random() },
          { label: "tidbits which I'll", value: Math.random() },
        ],
      },
      {
        label: 'also be covering below',
        selected: false,
        options: [
          { label: "I'm using React", value: Math.random() },
          { label: "so I'll assume you are too", value: Math.random() },
          { label: 'If you want to jump in to the code', value: Math.random() },
          {
            label: "it's all in the mixmello GitHub repo.",
            value: Math.random(),
          },
          { label: "Let's get started!", value: Math.random() },
        ],
      },
      {
        label: 'Setting Up Service Workers',
        value: Math.random(),
        disabled: true,
      },
      {
        label: 'Create-react-app provides us',
        value: Math.random(),
        disabled: true,
      },
      {
        label: 'a couple of excellent service worker',
        value: Math.random(),
        disabled: true,
        selected: false,
      },
      { label: 'files to help us  ', value: Math.random(), disabled: true },
      { label: 'get started', value: Math.random(), disabled: true },
      {
        label: 'They automatically configure',
        value: Math.random(),
        disabled: true,
        selected: false,
      },
      { label: 'lots of useful things', value: Math.random(), disabled: true },
      {
        label: 'like caching your webpack output',
        disabled: true,
        options: [
          { label: "They'll pretty much contain", value: Math.random() },
          { label: 'everything we need for our PWA', value: Math.random() },
          { label: 'You can get these', value: Math.random() },
          { label: 'files by running', value: Math.random() },
          { label: 'npx create-react-app', value: Math.random() },
        ],
      },
      {
        label: 'my-app --template',
        options: [
          { label: 'cra-template-pwa', value: Math.random() },
          { label: 'This will give you two files', value: Math.random() },
          { label: 'you can move into your project', value: Math.random() },
          { label: 'serviceWorkerRegistration.js', value: Math.random() },
          { label: 'and', value: Math.random() },
        ],
      },
      {
        label: 'service-worker.js',
        disabled: true,
        options: [
          { label: 'Add these into /src', value: Math.random() },
          { label: 'of your project', value: Math.random() },
          {
            label: '(or use the new project provided by the command)',
            value: Math.random(),
          },
          {
            label: "I'm not going to deep dive into these files",
            value: Math.random(),
          },
          { label: 'today as they are extremely', value: Math.random() },
        ],
      },
      {
        label: 'well documented via comments',
        options: [
          { label: 'Now we actually', value: Math.random() },
          { label: 'need to register our service', value: Math.random() },
          { label: 'worker on launch', value: Math.random() },
          { label: 'In your app index', value: Math.random() },
          { label: 'file, import the service worker', value: Math.random() },
        ],
      },
      {
        label: 'Now simply run the',
        options: [
          { label: 'function with', value: Math.random() },
          { label: 'registerServiceWorker();', value: Math.random() },
          { label: 'A finished index file', value: Math.random() },
          { label: 'should look something', value: Math.random() },
          { label: 'like this', value: Math.random() },
        ],
      },
      {
        label: 'Service workers will only',
        options: [
          { label: 'register/run in a production build', value: Math.random() },
          { label: 'unless specifically enabled', value: Math.random() },
          { label: 'see create-react-app documentation', value: Math.random() },
          { label: 'in the extras section below', value: Math.random() },
          { label: 'This is because hot-reloading', value: Math.random() },
        ],
      },
      {
        label: 'and service worker caching',
        options: [
          { label: "don't mix very well!", value: Math.random() },
          { label: "This means you won't", value: Math.random() },
          { label: 'see the service worker', value: Math.random() },
          { label: 'running in', value: Math.random() },
          {
            label: 'Dev tools > Application > Service Workers',
            value: Math.random(),
          },
        ],
      },
      {
        label: 'Offline Detection & UI/UX',
        options: [
          { label: 'Offline detection is not', value: Math.random() },
          {
            label: 'specifically a service worker/PWA feature',
            value: Math.random(),
          },
          { label: 'however, PWAs are', value: Math.random() },
          { label: "'offline first'", value: Math.random() },
          { label: "meaning it's a good idea", value: Math.random() },
        ],
      },
      { label: 'to have code to handle', value: Math.random() },
      { label: 'offline/online state', value: Math.random() },
      { label: 'In my application', value: Math.random() },
      {
        label: 'I decided to add a little bubble',
        value: Math.random(),
        disabled: true,
      },
      { label: 'that comes down from', value: Math.random(), selected: false },
      { label: 'the top of the screen', value: Math.random() },
      { label: 'and block the page', value: Math.random() },
    ],
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
          <Select {...props} />
        </div>
      </div>

      {/* {selects.map(({ title, group }, index) => (
        <div key={index} className="form-components-story">
          <Title h1>{title}</Title>
          {group.map(({ title, ...props }, index) => (
            <div key={index}>
              <Title>{title}</Title>
              <Select {...props} />
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
//       // {
//       //   title: 'With placeholder only',
//       //   placeholder: 'لیبل در اینجا قرار می‌گیرد',
//       // },
//       {
//         title: 'With label only',
//         label: 'لیبل در اینجا قرار می‌گیرد',
//       },
//       // {
//       //   title: 'Without label and placeholder',
//       // },
//     ],
//   },
// ]
