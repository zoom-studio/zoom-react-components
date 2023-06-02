import { type MenuNS } from '../components'

export const faMenuItems: MenuNS.Item[] = [
  {
    title: 'سطح اول اول',
    children: [
      { title: 'سطح دوم اول' },
      {
        title: 'سطح دوم دوم',
        children: [
          {
            title: 'سطح سوم اول',
            children: [
              {
                title: 'سطح چهارم اول',
              },
              {
                title: 'سطح چهارم دوم',
                children: [
                  { title: 'سطح پنجم اول' },
                  {
                    title: 'سطح پنجم دوم',
                    children: [
                      { title: 'سطح ششم اول' },
                      { title: 'سطح ششم دوم' },
                      { title: 'سطح ششم سوم' },
                      { title: 'سطح ششم چهارم' },
                      {
                        title: 'سطح ششم پنجم',
                        children: [
                          { title: 'سطح هفتم اول' },
                          { title: 'سطح هفتم دوم' },
                          { title: 'سطح هفتم سوم' },
                        ],
                      },
                      { title: 'سطح ششم ششم' },
                      { title: 'سطح ششم هفتم' },
                    ],
                  },
                ],
              },
              {
                title: 'سطح چهارم سوم',
              },
            ],
          },
          {
            title: 'سطح سوم دوم',
            children: [
              {
                title: 'سطح چهارم اول',
              },
              {
                title: 'سطح چهارم دوم',
                children: [
                  { title: 'سطح پنجم اول' },
                  {
                    title: 'سطح پنجم دوم',
                    children: [
                      { title: 'سطح ششم اول' },
                      { title: 'سطح ششم دوم' },
                      { title: 'سطح ششم سوم' },
                      { title: 'سطح ششم چهارم' },
                      {
                        title: 'سطح ششم پنجم',
                        children: [
                          { title: 'سطح هفتم اول' },
                          { title: 'سطح هفتم دوم' },
                          { title: 'سطح هفتم سوم' },
                        ],
                      },
                      { title: 'سطح ششم ششم' },
                      { title: 'سطح ششم هفتم' },
                    ],
                  },
                ],
              },
              {
                title: 'سطح چهارم سوم',
              },
            ],
          },
          {
            title: 'سطح سوم سوم',
          },
        ],
      },
      {
        title: 'سطح دوم سوم',
        accelerator: { ctrlOrCmd: true, otherKeys: ['X', 'Y', 'Z'] },
      },
      {
        title: 'سطح دوم چهارم',
        accelerator: { ctrlOrCmd: true, otherKeys: ['Shift', 'Alt', 'Z'] },
      },
      {
        title: 'سطح دوم پنجم',
        accelerator: { ctrlOrCmd: true, otherKeys: ['Alt', 'F2', 'Z'] },
      },
    ],
  },
  {
    title: 'سطح اول دوم',
    link: '/',
    accelerator: { ctrlOrCmd: true, otherKeys: ['X', 'Y', 'Z'] },
  },
  { isSeparator: true },
  {
    title: 'سطح اول سوم',
    onClick: () => {},
    isActive: true,
    accelerator: { otherKeys: ['Shift', 'Alt', 'Z'] },
  },
  {
    title: 'غیرفعال بدون زیر منو',
    accelerator: { otherKeys: ['Shift', 'Alt', 'Z'] },
    isDisabled: true,
  },
  {
    title: 'غیرفعال بدون زیر منو و اکتیو',
    isActive: true,
    accelerator: { otherKeys: ['Shift', 'Alt', 'Z'] },
    isDisabled: true,
  },
  {
    title: 'غیر فعال با زیر منو',
    isDisabled: true,
    children: [{ title: 'زیر منوی غیرفعال' }],
  },
]
