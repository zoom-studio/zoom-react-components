import { MenuItem } from '../components/menu'

export const enMenuItems: MenuItem[] = [
  {
    title: 'Level first first',
    children: [
      { title: 'Level second first' },
      {
        title: 'Level second second',
        children: [
          {
            title: 'Level third first',
            children: [
              {
                title: 'Level fourth first',
              },
              {
                title: 'Level fourth second',
                children: [
                  { title: 'Level fifth first' },
                  {
                    title: 'Level fifth second',
                    children: [
                      { title: 'Level sixth first' },
                      { title: 'Level sixth second' },
                      { title: 'Level sixth third' },
                      { title: 'Level sixth fourth' },
                      {
                        title: 'Level sixth fifth',
                        children: [
                          { title: 'Level seventh first' },
                          { title: 'Level seventh second' },
                          { title: 'Level seventh third' },
                        ],
                      },
                      { title: 'Level sixth sixth' },
                      { title: 'Level sixth seventh' },
                    ],
                  },
                ],
              },
              {
                title: 'Level fourth third',
              },
            ],
          },
          {
            title: 'Level third second',
            children: [
              {
                title: 'Level fourth first',
              },
              {
                title: 'Level fourth second',
                children: [
                  { title: 'Level fifth first' },
                  {
                    title: 'Level fifth second',
                    children: [
                      { title: 'Level sixth first' },
                      { title: 'Level sixth second' },
                      { title: 'Level sixth third' },
                      { title: 'Level sixth fourth' },
                      {
                        title: 'Level sixth fifth',
                        children: [
                          { title: 'Level seventh first' },
                          { title: 'Level seventh second' },
                          { title: 'Level seventh third' },
                        ],
                      },
                      { title: 'Level sixth sixth' },
                      { title: 'Level sixth seventh' },
                    ],
                  },
                ],
              },
              {
                title: 'Level fourth third',
              },
            ],
          },
          {
            title: 'Level third third',
          },
        ],
      },
      {
        title: 'Level second third',
        accelerator: { ctrlOrCmd: 'command', otherKeys: 'X+Y+Z' },
      },
      {
        title: 'Level second fourth',
        accelerator: { ctrlOrCmd: 'control', otherKeys: 'Shift+Alt+Z' },
      },
      {
        title: 'Level second fifth',
        accelerator: { ctrlOrCmd: 'command', otherKeys: 'Aly+F2+Z' },
      },
    ],
  },
  {
    title: 'Level first second',
    link: '/',
    accelerator: { ctrlOrCmd: 'command', otherKeys: 'X+Y+Z' },
  },
  {
    title: 'Level first third',
    onClick: () => {},
    accelerator: { ctrlOrCmd: 'control', otherKeys: 'Shift+Alt+Z' },
  },
]
