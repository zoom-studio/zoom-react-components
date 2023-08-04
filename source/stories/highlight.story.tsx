import React, { type FC } from 'react'

import { type Meta } from '@storybook/react'

import { Highlight, type HighlightNS } from '../components'
import { color } from '../utils'
import { CommonStory, StoryPlayground } from './components'

const lorem = `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo, minus esse dolores neque
tempore aut vero eveniet ipsa repudiandae sapiente omnis aperiam eius animi asperiores
cumque sit praesentium impedit adipisci. Repudiandae harum esse repellendus libero enim
deserunt quis excepturi cumque voluptatibus, delectus nisi autem ad quisquam ab dolore
mollitia iusto consequuntur itaque quia et! Omnis aperiam iste libero eum? Aliquam.
Architecto, dolores distinctio porro placeat consectetur mollitia cum esse amet illo
voluptatum molestiae repellendus sequi doloremque ab iusto recusandae ipsa quisquam
reprehenderit. Est, dignissimos soluta tenetur delectus odit inventore mollitia. Ipsa id
fugit laborum, ratione ipsam dolorem magnam ullam culpa repellendus amet consequuntur
corrupti, neque ea aliquam tenetur autem incidunt molestiae provident dolores nam debitis
nesciunt vitae voluptatibus! Cumque, sit. Tempora labore omnis ratione magnam, rem ab magni
nisi architecto asperiores eius animi quidem ipsam aliquid maiores accusantium dolorum optio
minima temporibus, vel assumenda, possimus excepturi. Magnam nisi veritatis atque. Minus
inventore soluta rem esse repudiandae perferendis quos quis. Fugiat molestias quo quas
excepturi nam rem fuga, labore officiis corrupti enim repellendus voluptas facere ad
voluptatem eaque, voluptates sequi cum! Natus numquam ipsa, vitae blanditiis repellendus
totam eos aliquam, sit fugit est eum ut enim accusamus iusto tempore possimus ipsum
repudiandae officiis architecto nobis, officia quibusdam animi. Dolore, similique eius. Sed
aliquam praesentium nisi porro aut, saepe cupiditate ipsa eum rem totam laborum blanditiis
itaque quos minima aliquid eaque, quas ab maxime recusandae qui voluptas vero! Est aperiam
sint doloremque. Perferendis, veritatis! Aspernatur temporibus sequi dolor aliquam ratione,
nemo voluptate, tempora reiciendis, quae quisquam pariatur a necessitatibus voluptatum
aliquid incidunt! Magnam, explicabo quae culpa reiciendis incidunt corrupti eum libero
tempora! Ipsam deleniti a officia voluptates perferendis rerum dolorem blanditiis quos
laudantium unde veniam, est nostrum vero fugiat commodi ratione voluptatibus accusantium,
cum modi nobis aliquid. Eveniet distinctio hic quisquam aspernatur?`

export default {
  title: 'Data display/Highlight',
  component: Highlight,
  args: {
    children: lorem,
    search: 'lorem',
  },
} as Meta<typeof Highlight>

export const SearchModel: FC = () => {
  return (
    <CommonStory
      component={Highlight}
      stories={[
        {
          group: [
            { name: 'String search (lorem)', props: { children: lorem, search: 'lorem' } },
            {
              name: `Array of strings search ${"['lore', 'dolor', 'fuga']"}`,
              props: { children: lorem, search: ['lore', 'dolor', 'fuga'] },
            },
          ],
        },
      ]}
    />
  )
}

export const Playground: FC<HighlightNS.Props> = props => {
  return (
    <StoryPlayground
      component={Highlight}
      props={props}
      containerProps={{ style: { color: color({ source: 'text' }) } }}
    />
  )
}
