import React, { FC } from 'react'

import { ComponentMeta } from '@storybook/react'

import { Menu as MenuComponent, MenuNS } from '../components'

export default {
  title: 'Menu',
  component: MenuComponent,
} as ComponentMeta<typeof MenuComponent>

export const Menu: FC<MenuNS.Props> = () => {
  return (
    <>
      <MenuComponent
        items={[
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
                accelerator: { ctrlOrCmd: 'command', otherKeys: 'X+Y+Z' },
              },
              {
                title: 'سطح دوم چهارم',
                accelerator: { ctrlOrCmd: 'control', otherKeys: 'Shift+Alt+Z' },
              },
              {
                title: 'سطح دوم پنجم',
                accelerator: { ctrlOrCmd: 'command', otherKeys: 'Aly+F2+Z' },
              },
            ],
          },
          {
            title: 'سطح اول دوم',
            link: '/',
            accelerator: { ctrlOrCmd: 'command', otherKeys: 'X+Y+Z' },
          },
          {
            title: 'سطح اول سوم',
            onClick: () => {},
            accelerator: { ctrlOrCmd: 'control', otherKeys: 'Shift+Alt+Z' },
          },
        ]}
      >
        some button
      </MenuComponent>
    </>
  )
}
