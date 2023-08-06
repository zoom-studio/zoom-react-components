import { randomNumber, randomString } from '@zoom-studio/zoom-js-ts-utils'

import { CommandNS } from '../components'
import { randomEmoji } from './random-emoji'
import { randomIcon } from './random-icon'

const randomActionsArray = () => Array.from(Array(randomNumber({ min: 1, max: 4 })))

const randomActionType = (): CommandNS.ActionType => {
  return CommandNS.ActionType[randomNumber({ min: 0, max: CommandNS.ActionType.length - 1 })]
}

const LEVEL3_SUB_ACTIONS = (index: number, icon?: boolean): CommandNS.Action => ({
  id: randomString(),
  name: `Action ${index + 1}/L3`,
  description: `Action ${index + 1} on level 3`,
  keywords: `action ${index + 1} on level 3`,
  icon: icon ? randomIcon() : undefined,
  emoji: !icon ? randomEmoji() : undefined,
  type: randomActionType(),
  performs: () => {
    alert(`action ${index + 1} on level 3`)
  },
})

const LEVEL2_SECTIONS = (index: number): CommandNS.Item => ({
  sectionName: `Section ${index + 1} of sub actions on level 2`,
  actions: randomActionsArray().map((_, index) => LEVEL3_SUB_ACTIONS(index, index % 2 === 0)),
})

const LEVEL2_SUB_ACTIONS = (index: number, icon?: boolean): CommandNS.Action => ({
  id: randomString(),
  name: `Action ${index + 1}/L2`,
  description: `Action ${index + 1} on level 2`,
  keywords: `action ${index + 1} on level 2`,
  icon: icon ? randomIcon() : undefined,
  emoji: !icon ? randomEmoji() : undefined,
  subItems: randomActionsArray().map((_, index) => LEVEL2_SECTIONS(index)),
})

const LEVEL1_SECTIONS = (index: number): CommandNS.Item => ({
  sectionName: `Section ${index + 1} of sub actions on level 1`,
  actions: randomActionsArray().map((_, index) => LEVEL2_SUB_ACTIONS(index, index % 2 !== 0)),
})

const LEVEL1_SUB_ACTIONS = (index: number, icon?: boolean): CommandNS.Action => ({
  id: randomString(),
  name: `Nested action ${index + 1}`,
  description: `Nested action that has an ${icon ? 'icon' : 'emoji'} inside`,
  keywords: `nested action that has an ${icon ? 'icon' : 'emoji'} inside`,
  icon: icon ? randomIcon() : undefined,
  emoji: !icon ? randomEmoji() : undefined,
  subItems: randomActionsArray().map((_, index) => LEVEL1_SECTIONS(index)),
})

export const COMMAND_ITEMS: CommandNS.Props['items'] = [
  {
    sectionName: 'Nested actions',
    actions: randomActionsArray().map((_, index) => LEVEL1_SUB_ACTIONS(index, index % 2 === 0)),
  },
  {
    sectionName: 'Performer models',
    actions: [
      {
        id: randomString(),
        name: 'Without performer',
      },
      {
        id: randomString(),
        name: 'Function performer',
        type: 'callback',
        performs: action => {
          alert(JSON.stringify(action, null, 2))
        },
      },
      {
        id: randomString(),
        name: 'Internal link performer',
        performs: { url: '/' },
        type: 'jump-to',
      },
      {
        id: randomString(),
        name: 'External link performer',
        performs: { url: 'https://example.com', target: '_blank' },
        type: 'jump-to',
      },
    ],
  },
  {
    sectionName: 'Actions with icons',
    actions: [
      {
        id: randomString(),
        name: 'Favorites',
        icon: 'favorite',
        description: 'The items that you have mark them as favorite',
        keywords: 'favorite',
        type: 'callback',
        performs: () => {
          alert('favorite')
        },
      },
      {
        id: randomString(),
        name: 'Gifts',
        icon: 'redeem',
        description: 'The gifts you have earned',
        keywords: 'gifts',
        type: 'callback',
        performs: () => {
          alert('gifts')
        },
      },
    ],
  },
  {
    sectionName: 'Actions with emojis',
    actions: [
      {
        id: randomString(),
        name: 'Winking face',
        description: 'The emoji named [winking face]',
        keywords: 'winking face',
        emoji: 'winking face',
        type: 'callback',
        performs: () => {
          alert('winking face')
        },
      },
      {
        id: randomString(),
        name: 'Dotted line face',
        description: 'The emoji named [dotted line face]',
        keywords: 'dotted line face',
        emoji: 'dotted line face',
        type: 'callback',
        performs: () => {
          alert('dotted line face')
        },
      },
    ],
  },
  {
    sectionName: 'Action types',
    actions: [
      {
        id: randomString(),
        name: 'Jump-to action',
        description: 'The actions with type jump-to',
        keywords: 'jump-to',
        type: 'jump-to',
        performs: () => {
          alert('jump-to')
        },
      },
      {
        id: randomString(),
        name: 'callback action',
        description: 'The actions with type callback',
        keywords: 'callback',
        type: 'callback',
        performs: () => {
          alert('callback')
        },
      },
    ],
  },
  {
    id: randomString(),
    name: 'Simplest',
  },
  {
    id: randomString(),
    name: 'Icon added',
    icon: 'rocket_launch',
    performs: () => {
      alert('simplest')
    },
  },
  {
    id: randomString(),
    name: 'Description added',
    icon: 'rocket_launch',
    description: 'Some new descriptions that explains these kind of actions',
    performs: () => {
      alert('simplest')
    },
  },
  {
    id: randomString(),
    name: 'Type added',
    icon: 'rocket_launch',
    description: 'Some new descriptions that explains these kind of actions',
    type: 'callback',
    performs: () => {
      alert('simplest')
    },
  },
]
